import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, PDFFont, PDFPage, RGB, rgb } from "pdf-lib";

import {
  shopifyProjectBriefPdfContent as copy,
  shopifyProjectBriefPdfTheme as theme,
} from "@/content/landing/shopify-project-brief-pdf-content";
import type { ProjectBriefPdfInput } from "@/interfaces/shopify-project-brief-pdf-interface";
import { getShopifyPaymentSchedule } from "@/lib/shopify-payment-schedule";
import {
  getShopifyDeliveryEstimate,
  shopifyDeliveryCopy,
} from "@/content/landing/shopify-delivery-content";

export type { ProjectBriefPdfInput } from "@/interfaces/shopify-project-brief-pdf-interface";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 44;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const CONTENT_TOP = 100;
const CONTENT_BOTTOM = PAGE_HEIGHT - 72;
const BODY_SIZE = 10.5;
const LINE_HEIGHT = 16;

function colour(hex: string): RGB {
  return rgb(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  );
}

const colours = {
  primary: colour(theme.primary),
  ink: colour(theme.ink),
  paragraph: colour(theme.paragraph),
  muted: colour(theme.muted),
  ice: colour(theme.ice),
  border: colour(theme.border),
  white: colour(theme.white),
};

function cleanText(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function displayText(
  value: string,
  fallback: string = copy.notProvided,
): string {
  return cleanText(value) || fallback;
}

/**
 * Creates a PDF entirely in memory. The caller supplies font bytes and chooses
 * how to save the result; this module makes no network or filesystem requests.
 */
export async function createProjectBriefPdf(
  input: ProjectBriefPdfInput,
): Promise<Uint8Array> {
  if (
    !Number.isFinite(input.plan.price) ||
    input.plan.price < 0 ||
    !Number.isSafeInteger(input.plan.products) ||
    input.plan.products < 0
  ) {
    throw new Error(copy.errors.invalidScope);
  }

  const document = await PDFDocument.create();
  document.registerFontkit(fontkit);
  const [regular, bold] = await Promise.all([
    document.embedFont(input.fonts.regular, { subset: false }),
    document.embedFont(input.fonts.bold, { subset: false }),
  ]);

  document.setTitle(`${copy.title} | ${copy.subtitle}`);
  document.setAuthor(copy.brand);
  document.setCreator(copy.creator);
  document.setSubject(copy.introduction);
  document.setLanguage("en-US");
  const createdDate = new Date(input.createdAt);
  const validDate = Number.isFinite(createdDate.getTime());
  if (validDate) {
    document.setCreationDate(createdDate);
    document.setModificationDate(createdDate);
  }
  const dateLabel = validDate
    ? `${copy.created} ${new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(createdDate)}`
    : copy.noDate;

  const characterSets = new Map<PDFFont, Set<number>>([
    [regular, new Set(regular.getCharacterSet())],
    [bold, new Set(bold.getCharacterSet())],
  ]);
  const checkedText = new Map<PDFFont, Set<string>>([
    [regular, new Set<string>()],
    [bold, new Set<string>()],
  ]);

  function assertCharacters(text: string, font: PDFFont): void {
    const checked = checkedText.get(font)!;
    if (checked.has(text)) return;
    const characterSet = characterSets.get(font)!;
    const unsupported = Array.from(new Set(Array.from(text))).filter(
      (character) =>
        character !== "\n" && !characterSet.has(character.codePointAt(0)!),
    );
    if (unsupported.length) {
      const codepoints = unsupported
        .slice(0, 8)
        .map(
          (character) =>
            `U+${character.codePointAt(0)!.toString(16).toUpperCase()}`,
        )
        .join(", ");
      throw new Error(`${copy.errors.unsupportedCharacters} ${codepoints}`);
    }
    checked.add(text);
  }

  function textWidth(text: string, size: number, font: PDFFont): number {
    return font.widthOfTextAtSize(text, size);
  }

  // Split at words where possible and at Unicode code points for long URLs,
  // filenames or unbroken text. No customer text is truncated to fit a page.
  function wrapText(
    value: string,
    width: number,
    size = BODY_SIZE,
    font = regular,
  ): string[] {
    const text = cleanText(value);
    assertCharacters(text, font);
    const lines: string[] = [];
    for (const paragraph of text.split("\n")) {
      if (!paragraph) {
        lines.push("");
        continue;
      }
      let line = "";
      for (const word of paragraph.split(" ")) {
        const candidate = line ? `${line} ${word}` : word;
        if (textWidth(candidate, size, font) <= width) {
          line = candidate;
          continue;
        }
        if (line) lines.push(line);
        line = "";
        const characters = Array.from(word);
        let offset = 0;
        while (offset < characters.length) {
          const remaining = characters.slice(offset).join("");
          if (textWidth(remaining, size, font) <= width) {
            line = remaining;
            break;
          }
          let low = 1;
          let high = characters.length - offset;
          let fits = 1;
          while (low <= high) {
            const middle = Math.floor((low + high) / 2);
            const fragment = characters.slice(offset, offset + middle).join("");
            if (textWidth(fragment, size, font) <= width) {
              fits = middle;
              low = middle + 1;
            } else {
              high = middle - 1;
            }
          }
          lines.push(characters.slice(offset, offset + fits).join(""));
          offset += fits;
        }
      }
      if (line) lines.push(line);
    }
    return lines;
  }

  let page: PDFPage;
  let cursor = CONTENT_TOP;
  let activeSection = "";
  let sectionNumber = 0;

  function drawText(
    text: string,
    x: number,
    top: number,
    size = BODY_SIZE,
    font = regular,
    color = colours.paragraph,
  ): void {
    if (!text) return;
    assertCharacters(text, font);
    page.drawText(text, {
      x,
      y: PAGE_HEIGHT - top - size,
      size,
      font,
      color,
    });
  }

  function addPage(continued = true): void {
    page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cursor = CONTENT_TOP;
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 5,
      width: PAGE_WIDTH,
      height: 5,
      color: colours.primary,
    });
    drawText(copy.brand, MARGIN, 33, 18, bold, colours.ink);
    drawText(copy.header, MARGIN, 58, 8.5, regular, colours.muted);
    drawText(
      dateLabel,
      PAGE_WIDTH - MARGIN - textWidth(dateLabel, 8.5, regular),
      39,
      8.5,
      regular,
      colours.muted,
    );
    page.drawLine({
      start: { x: MARGIN, y: PAGE_HEIGHT - 80 },
      end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 80 },
      thickness: 0.6,
      color: colours.border,
    });
    if (continued && activeSection) {
      drawText(
        `${activeSection} (${copy.continued})`,
        MARGIN,
        cursor,
        11,
        bold,
        colours.primary,
      );
      cursor += 30;
    }
  }

  function ensureSpace(height: number, continued = true): void {
    if (cursor + height > CONTENT_BOTTOM) addPage(continued);
  }

  function section(title: string): void {
    const gap = cursor > CONTENT_TOP ? 18 : 0;
    ensureSpace(gap + 96, false);
    if (cursor > CONTENT_TOP) cursor += gap;
    activeSection = title;
    sectionNumber += 1;
    drawText(
      String(sectionNumber).padStart(2, "0"),
      MARGIN,
      cursor + 2,
      9,
      bold,
      colours.primary,
    );
    drawText(title, MARGIN + 28, cursor, 15, bold, colours.ink);
    cursor += 32;
  }

  function label(text: string, continuation = false): void {
    drawText(
      continuation ? `${text} (${copy.continued})` : text,
      MARGIN,
      cursor,
      8.5,
      bold,
      colours.muted,
    );
    cursor += 17;
  }

  function flowText(
    text: string,
    options: {
      x?: number;
      width?: number;
      size?: number;
      lineHeight?: number;
      font?: PDFFont;
      color?: RGB;
      continuationLabel?: string;
      bullet?: boolean;
    } = {},
  ): void {
    const x = options.x ?? MARGIN;
    const width = options.width ?? CONTENT_WIDTH;
    const size = options.size ?? BODY_SIZE;
    const lineHeight = options.lineHeight ?? LINE_HEIGHT;
    const font = options.font ?? regular;
    const color = options.color ?? colours.paragraph;
    const lines = wrapText(text, width, size, font);
    ensureSpace(Math.min(lines.length, 2) * lineHeight);
    let offset = 0;
    while (offset < lines.length) {
      let capacity = Math.floor((CONTENT_BOTTOM - cursor) / lineHeight);
      if (capacity < 1 || (capacity === 1 && lines.length - offset > 1)) {
        addPage();
        if (options.continuationLabel) label(options.continuationLabel, true);
        capacity = Math.floor((CONTENT_BOTTOM - cursor) / lineHeight);
      }
      let count = Math.min(capacity, lines.length - offset);
      if (lines.length - offset - count === 1 && count > 1) count -= 1;
      for (let index = 0; index < count; index += 1) {
        if (options.bullet && offset + index === 0) {
          page.drawCircle({
            x: MARGIN + 3,
            y: PAGE_HEIGHT - cursor - 7.5,
            size: 2,
            color: colours.primary,
          });
        }
        drawText(lines[offset + index], x, cursor, size, font, color);
        cursor += lineHeight;
      }
      offset += count;
    }
  }

  function field(title: string, value: string): void {
    const text = displayText(value);
    const lines = wrapText(text, CONTENT_WIDTH);
    ensureSpace(17 + Math.min(lines.length, 2) * LINE_HEIGHT);
    label(title);
    flowText(text, { continuationLabel: title });
    cursor += 11;
  }

  function bullets(values: string[], fallback: string): void {
    const items = values.map(cleanText).filter(Boolean);
    if (!items.length) {
      flowText(fallback, { color: colours.muted });
      cursor += 9;
      return;
    }
    for (const value of items) {
      flowText(value, {
        x: MARGIN + 16,
        width: CONTENT_WIDTH - 16,
        bullet: true,
      });
      cursor += 6;
    }
    cursor += 3;
  }

  function note(text: string): void {
    const padding = 14;
    const size = 9.5;
    const lineHeight = 14;
    const lines = wrapText(text, CONTENT_WIDTH - padding * 2, size);
    let offset = 0;
    while (offset < lines.length) {
      ensureSpace(
        padding * 2 + Math.min(lines.length - offset, 2) * lineHeight,
      );
      const capacity = Math.floor(
        (CONTENT_BOTTOM - cursor - padding * 2) / lineHeight,
      );
      const count = Math.min(capacity, lines.length - offset);
      const height = padding * 2 + count * lineHeight;
      page.drawRectangle({
        x: MARGIN,
        y: PAGE_HEIGHT - cursor - height,
        width: CONTENT_WIDTH,
        height,
        color: colours.ice,
      });
      page.drawRectangle({
        x: MARGIN,
        y: PAGE_HEIGHT - cursor - height,
        width: 2,
        height,
        color: colours.primary,
      });
      cursor += padding;
      for (const line of lines.slice(offset, offset + count)) {
        drawText(
          line,
          MARGIN + padding,
          cursor,
          size,
          regular,
          colours.paragraph,
        );
        cursor += lineHeight;
      }
      cursor += padding + 10;
      offset += count;
    }
  }

  addPage(false);
  drawText(copy.planningLabel, MARGIN, cursor, 8.5, bold, colours.primary);
  cursor += 22;
  flowText(copy.title, {
    size: 26,
    lineHeight: 33,
    font: bold,
    color: colours.ink,
  });
  cursor += 3;
  drawText(copy.subtitle, MARGIN, cursor, 17, regular, colours.ink);
  cursor += 31;
  flowText(copy.introduction, {
    width: CONTENT_WIDTH - 25,
    color: colours.muted,
  });
  cursor += 12;

  section(copy.scope.title);
  field(copy.scope.package, input.plan.name);
  ensureSpace(17 + 32);
  label(copy.scope.fee);
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(input.plan.price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(input.plan.price);
  flowText(`${price} ${copy.scope.currency}`, {
    font: bold,
    size: 23,
    lineHeight: 32,
    color: colours.primary,
  });
  cursor += 11;
  const payment = getShopifyPaymentSchedule(input.plan.price);
  const formatPayment = (amount: number) => `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)} ${copy.scope.currency}`;
  field(copy.scope.upfront, formatPayment(payment.upfront));
  field(copy.scope.balance, formatPayment(payment.balance));
  note(copy.scope.paymentPlan);
  field(
    copy.scope.products,
    `${copy.scope.productPrefix} ${input.plan.products.toLocaleString("en-US")} ${copy.scope.productSuffix}`,
  );
  const deliveryEstimate = getShopifyDeliveryEstimate(input.plan.name);
  if (deliveryEstimate) {
    field(shopifyDeliveryCopy.label, deliveryEstimate);
    note(shopifyDeliveryCopy.timingNote);
  }
  ensureSpace(17 + LINE_HEIGHT * 2);
  label(copy.scope.features);
  bullets(input.plan.features, copy.scope.noFeatures);
  ensureSpace(17 + 70);
  label(copy.scope.exclusionsLabel);
  note(copy.scope.exclusions);

  section(copy.business.title);
  field(copy.business.projectType, input.business.projectType);
  if (input.business.businessType) field(copy.business.businessType, input.business.businessType);
  if (input.business.businessCategory) field(copy.business.businessCategory, input.business.businessCategory);
  field(copy.business.brand, input.business.brand);
  field(copy.business.brief, input.business.brief);
  field(copy.business.existingStore, input.business.existingStore);
  field(copy.business.name, input.business.name);
  field(copy.business.email, input.business.email);
  field(copy.business.phone, input.business.phone || "");

  section(copy.design.title);
  field(copy.design.reference, input.design.reference);
  note(copy.design.referenceNote);
  field(copy.design.layout, input.design.layout);
  field(copy.design.palette, input.design.palette);
  if (input.design.customColors?.length) {
    ensureSpace(17 + LINE_HEIGHT * 2);
    label(copy.design.customColors);
    bullets(
      input.design.customColors.map(
        (entry) => `${displayText(entry.label)}: ${displayText(entry.value)}`,
      ),
      copy.notProvided,
    );
  }
  ensureSpace(17 + LINE_HEIGHT * 2);
  label(copy.design.priorities);
  bullets(input.design.priorities, copy.design.noPriorities);
  field(copy.design.references, input.design.references);
  field(copy.design.requirements, input.design.requirements);

  section(copy.assets.title);
  note(copy.assets.note);
  field(
    copy.assets.logo,
    displayText(input.assets.logoName, copy.assets.noLogo),
  );
  ensureSpace(17 + LINE_HEIGHT * 2);
  label(copy.assets.products);
  bullets(input.assets.productNames, copy.assets.noProducts);

  section(copy.next.title);
  copy.next.steps.forEach((step, index) => {
    ensureSpace(55);
    drawText(
      `${index + 1}. ${step.title}`,
      MARGIN,
      cursor,
      11,
      bold,
      colours.ink,
    );
    cursor += 21;
    flowText(step.description);
    cursor += 13;
  });
  note(copy.next.closing);

  const pages = document.getPages();
  pages.forEach((footerPage, index) => {
    page = footerPage;
    page.drawLine({
      start: { x: MARGIN, y: 54 },
      end: { x: PAGE_WIDTH - MARGIN, y: 54 },
      thickness: 0.6,
      color: colours.border,
    });
    drawText(copy.footer, MARGIN, PAGE_HEIGHT - 42, 8, bold, colours.muted);
    drawText(copy.status, MARGIN, PAGE_HEIGHT - 28, 7, regular, colours.muted);
    const pageLabel = `${copy.page} ${index + 1} ${copy.of} ${pages.length}`;
    drawText(
      pageLabel,
      PAGE_WIDTH - MARGIN - textWidth(pageLabel, 8, regular),
      PAGE_HEIGHT - 42,
      8,
      regular,
      colours.muted,
    );
  });

  return document.save({ useObjectStreams: true });
}
