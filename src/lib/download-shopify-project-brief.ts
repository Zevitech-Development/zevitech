import type { ProjectBriefPdfInput } from "@/interfaces/shopify-project-brief-pdf-interface";

let fontRequest: Promise<ProjectBriefPdfInput["fonts"]> | undefined;

async function loadBriefFonts() {
  if (!fontRequest) {
    fontRequest = Promise.all(
      ["Regular", "Bold"].map(async (weight) => {
        const response = await fetch(`/store-studio/fonts/Inter-${weight}.ttf`);
        if (!response.ok) throw new Error("PDF fonts could not be loaded.");
        return new Uint8Array(await response.arrayBuffer());
      }),
    )
      .then(([regular, bold]) => ({ regular, bold }))
      .catch((error) => {
        fontRequest = undefined;
        throw error;
      });
  }
  return fontRequest;
}

/** Generates locally. Only static font files are requested from this website. */
export async function downloadShopifyProjectBrief(
  input: Omit<ProjectBriefPdfInput, "fonts">,
) {
  const [{ createProjectBriefPdf }, fonts] = await Promise.all([
    import("./shopify-project-brief-pdf"),
    loadBriefFonts(),
  ]);
  const bytes = await createProjectBriefPdf({ ...input, fonts });
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "zevitech-project-brief.pdf";
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    // Let the browser finish opening the download before releasing the bytes.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}
