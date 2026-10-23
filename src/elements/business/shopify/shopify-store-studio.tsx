"use client";
import { shopifyShowcaseThumbnails } from "@/content/landing/shopify-showcase-thumbnails";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { useForm, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UploadCloud,
  Download,
  Loader2,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Maximize2,
  X,
  Layers3,
  Lock,
  ShieldCheck,
  Star,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { workspaceCopy } from "@/content/landing/shopify-workspace-enhancements";
import { salesJourneyCopy } from "@/content/landing/shopify-sales-journey";
import ShopifyStudioSelect from "./shopify-studio-select";
import ShopifyPackagePicker from "./shopify-package-picker";
import ShopifyPackageNextTier from "./shopify-package-next-tier";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import { getShopifyPaymentSchedule } from "@/lib/shopify-payment-schedule";
import { shopifyPaymentCopy } from "@/content/landing/shopify-payment-content";
import { getShopifyDeliveryEstimate, shopifyDeliveryCopy } from "@/content/landing/shopify-delivery-content";
import { shopifyWizardCopy as wizard } from "@/content/landing/shopify-wizard-content";
import ShopifyThemeUpgrade from "./shopify-theme-upgrade";
import { themeUpgradeCopy } from "@/content/landing/shopify-theme-upgrade-content";
import { themeTiers } from "@/content/landing/shopify-theme-tier-content";
import { canUseThemeLayout, getThemeMinimumPackage, getThemeTierByPackage } from "@/lib/shopify-theme-access";
import { getAdjacentShopifyReferenceIndex, getShopifyReferenceOrder } from "@/lib/shopify-reference-order";
import type { ShopifyDesignAction, ShopifyPendingThemeUpgrade } from "@/interfaces/shopify-theme-upgrade-interface";
import { packageUpgradeCopy } from "@/content/landing/shopify-package-upgrade-content";
import type { ShopifyPendingUpgrade } from "@/interfaces/shopify-package-upgrade-interface";
import { packageExplorerCopy } from "@/content/landing/shopify-package-explorer-content";
import {
  packageRecommendationCopy as journey,
  packageFeatureNeeds,
} from "@/content/landing/shopify-package-recommendation-content";
import {
  findMatchingShopifyPackage,
  shopifyPackageMatchesNeeds,
} from "@/lib/shopify-package-recommendation";
import ShopifyOrderSummary from "./shopify-order-summary";
import ShopifyDesignDraftControls from "./shopify-design-draft-controls";
import { designDraftCopy } from "@/content/landing/shopify-design-draft-content";
import { SHOPIFY_DESIGN_DRAFT_KEY, parseDesignDraft, serializeDesignDraft, type ShopifyDesignDraft } from "@/lib/shopify-design-draft";
import ShopifyTemplateGallery from "./shopify-template-gallery";
import ShopifyBusinessCategoryPicker from "./shopify-business-category-picker";
import { resolveCategoryReference, shopifyCategoryLabel, SHOPIFY_CUSTOM_CATEGORY, shopifyBusinessTypeOptions, shopifyBusinessCategoryCopy } from "@/content/landing/shopify-business-categories";
import {
  studioTemplates,
  templateCopy,
  studioColourPalettes,
} from "@/content/landing/shopify-studio-templates";
import { ShopifyStudioCheckoutDetailsSchema, ShopifyStudioSchema } from "@/schemas/shopify-studio-schema";
import {
  ShopifyStudioProps,
  ShopifyStudioFormType,
} from "@/interfaces/shopify-studio-interface";
import { cn } from "@/lib/utils";
import { OpenLiveChat } from "@/utils/open-live-chat";
import { trackShopifySavedLead } from "@/lib/shopify-lead-analytics";
import { captureShopifyCheckoutAttribution, readShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution-client";
// The live storefront preview and the card checkout are large; load them only when the customer reaches them.
const previewFallback = () => <div aria-hidden="true" className="min-h-[430px] w-full animate-pulse rounded-xl bg-muted" />;
const ShopifyStudioPreview = dynamic(() => import("./shopify-studio-preview"), { ssr: false, loading: previewFallback });
const ShopifyPackageCheckout = dynamic(() => import("./shopify-package-checkout"), { ssr: false, loading: previewFallback });
const samples = studioTemplates[0].images;
function studioScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
export default function ShopifyStoreStudio({
  copy,
  plans,
}: ShopifyStudioProps) {
  const [plan, setPlan] = useState(0),
    [step, setStep] = useState(0),
    [started, setStarted] = useState(false),
    [layout, setLayout] = useState(0),
    [palette, setPalette] = useState(1),
    [mobile, setMobile] = useState(false),
    [images, setImages] = useState(samples),
    [logo, setLogo] = useState(""),
    [fileError, setFileError] = useState(""),
    [downloaded, setDownloaded] = useState(false);
  const [template, setTemplate] = useState(0),
    [expanded, setExpanded] = useState(false);
  const imageUrls = useRef<string[]>([]),
    logoUrl = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);
  const previewReturnFocus = useRef<HTMLElement | null>(null);
  const previewScroll = useRef<HTMLDivElement | null>(null);
  const previewCloseDestination = useRef<"customize" | "gallery" | null>(null);
  const [directionReady, setDirectionReady] = useState(false);
  const [productCount, setProductCount] = useState("10");
  const [featureNeeds, setFeatureNeeds] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState("");
  const [pendingUpgrade, setPendingUpgrade] = useState<ShopifyPendingUpgrade | null>(null);
  const [upgradeNotice, setUpgradeNotice] = useState("");
  const [pendingTheme, setPendingTheme] = useState<ShopifyPendingThemeUpgrade | null>(null);
  const [newThemesAvailable, setNewThemesAvailable] = useState(false);
  const [browseAllThemes, setBrowseAllThemes] = useState(true);
  const leadKey = useRef("");
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  function openPackages() {
    setGalleryOpen(false);
    setFurthestStep(current => Math.max(current, 1));
    setStep(2);
    requestAnimationFrame(() => document.getElementById("studio-design-flow")?.scrollIntoView({ behavior: studioScrollBehavior(), block: "start" }));
  }
  useEffect(() => {
    captureShopifyCheckoutAttribution();
    const showAllDesigns = () => {
      setBrowseAllThemes(true); setStep(0); setGalleryOpen(true);
      setNewThemesAvailable(false);
      requestAnimationFrame(() => document.getElementById("studio-design-flow")?.scrollIntoView({behavior: studioScrollBehavior(), block: "start"}));
    };
    const showPackagesForHash = () => {
      if (window.location.hash === "#studio-packages") openPackages();
      else if (window.location.hash === "#studio") showAllDesigns();
    };
    const showPackagesForLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href="#studio-packages"]')) openPackages();
      else if (event.target instanceof Element && event.target.closest('a[href="#studio"]')) showAllDesigns();
    };
    showPackagesForHash();
    window.addEventListener("hashchange", showPackagesForHash);
    document.addEventListener("click", showPackagesForLink);
    return () => {
      window.removeEventListener("hashchange", showPackagesForHash);
      document.removeEventListener("click", showPackagesForLink);
    };
  }, []);
  const previousTeamDirection = useRef(false);
  const [teamDirection, setTeamDirection] = useState(false);
  const [layoutChosen, setLayoutChosen] = useState(false);
  const [paletteChosen, setPaletteChosen] = useState(false);
  const files = useRef<string[]>([]);
  const {
    register,
    watch,
    trigger,
    formState: { errors },
    getValues,
    setValue,
    getFieldState,
    setError,
    clearErrors,
  } = useForm<ShopifyStudioFormType>({
    resolver: zodResolver(ShopifyStudioSchema),
    defaultValues: {
      ...copy.defaults,
      headline: studioTemplates[0].headline,
      brand: "",
      brief: "",
      product: studioTemplates[0].product,
      price: studioTemplates[0].price,
      name: "",
      email: "",
      phone: "",
      customAccent: "#1557b0",
      customInk: "#10243b",
      customSurface: "#ffffff",
      customSoft: "#eaf2fb",
      projectType: "New store",
      businessType: "products",
      businessCategory: "Clothing & fashion",
      customCategory: "",
      existingStore: "",
      references: "",
      requirements: "",
      additionalRequirements: "",
    },
  });
  const [pdfState, setPdfState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);
  const [previewPlan, setPreviewPlan] = useState<number | null>(null);
  const [logoName, setLogoName] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(true);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [priorityNotice, setPriorityNotice] = useState("");
  const [furthestStep, setFurthestStep] = useState(0);
  const [dragging, setDragging] = useState<string | null>(null);
  const [savedDesign, setSavedDesign] = useState<ShopifyDesignDraft | null>(null);
  const [draftNotice, setDraftNotice] = useState("");
  useEffect(() => {
    try { setSavedDesign(parseDesignDraft(localStorage.getItem(SHOPIFY_DESIGN_DRAFT_KEY))); } catch { /* Browsing remains available when storage is blocked. */ }
  }, []);
  function saveDesign() {
    const form = getValues();
    const raw = serializeDesignDraft({
      version: 1, savedAt: Date.now(), templateId: studioTemplates[template].id,
      layout, palette, teamDirection, layoutChosen, paletteChosen,
      productCount, featureIds: featureNeeds, packageName: started ? plans[plan].name : null, projectType: form.projectType,
      businessType: form.businessType, businessCategory: form.businessCategory, customCategory: form.customCategory,
      customColours: { accent: form.customAccent, ink: form.customInk, surface: form.customSurface, soft: form.customSoft },
    });
    if (!raw) { setDraftNotice(designDraftCopy.invalid); return; }
    try {
      localStorage.setItem(SHOPIFY_DESIGN_DRAFT_KEY, raw);
      setSavedDesign(parseDesignDraft(raw));
      setDraftNotice(designDraftCopy.saved);
    } catch { setDraftNotice(designDraftCopy.error); }
  }
  function resumeDesign() {
    if (!savedDesign) return;
    const index = studioTemplates.findIndex(item => item.id === savedDesign.templateId);
    if (index < 0) return;
    chooseTemplate(index);
    const savedPlanIndex = plans.findIndex(item => item.name === savedDesign.packageName);
    setLayout(savedDesign.layout);
    setPalette(savedDesign.palette);
    setTeamDirection(savedDesign.teamDirection); setLayoutChosen(savedDesign.layoutChosen); setPaletteChosen(savedDesign.paletteChosen);
    setValue("customAccent", savedDesign.customColours.accent);
    setValue("customInk", savedDesign.customColours.ink);
    setValue("customSurface", savedDesign.customColours.surface);
    setValue("customSoft", savedDesign.customColours.soft);
    setValue("projectType", "New store");
    setValue("businessType", savedDesign.businessType === "both"
      ? (studioTemplates[index].businessType === "services" ? "services" : "products")
      : savedDesign.businessType ?? "products");
    setValue("businessCategory", savedDesign.businessCategory ?? shopifyCategoryLabel(studioTemplates[index].category));
    setValue("customCategory", savedDesign.customCategory ?? "");
    setProductCount(savedDesign.productCount);
    setFeatureNeeds(savedDesign.featureIds.filter(id => !id.startsWith("theme-")));
    setPendingUpgrade(null); setUpgradeNotice("");
    const minimum = plans.findIndex(item => item.name === getThemeMinimumPackage(savedDesign.layout));
    const usable = savedPlanIndex >= 0 && canUseThemeLayout(plans[savedPlanIndex].name, savedDesign.layout);
    setPlan(usable ? savedPlanIndex : Math.max(0, minimum));
    setStarted(usable); setBrowseAllThemes(true);
    setDirectionReady(true); setFurthestStep(1);
    setDraftNotice(designDraftCopy.restored); go(2);
  }

  function removeSavedDesign() {
    try {
      localStorage.removeItem(SHOPIFY_DESIGN_DRAFT_KEY);
      setSavedDesign(null); setDraftNotice(designDraftCopy.removed);
    } catch { setDraftNotice(designDraftCopy.error); }
  }
  function openReferencePreview(referenceIndex?: number, useMobile = false) {
    previewReturnFocus.current = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : document.getElementById("studio-reference-library");
    previewCloseDestination.current = null;
    setPreviewPlan(null);
    if (referenceIndex !== undefined) setPreviewTemplate(referenceIndex);
    if (useMobile) setMobile(true);
    setExpanded(true);
  }
  function explorePackage(index: number) {
    if (!plans[index]) return;
    previewReturnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previewCloseDestination.current = null;
    setPreviewTemplate(null);
    setPreviewPlan(index);
    setExpanded(true);
  }
  function showThemes(all = browseAllThemes, toGrid = false) {
    setBrowseAllThemes(all);
    setStep(0);
    setGalleryOpen(true);
    setFurthestStep(current => Math.max(current, 0));
    setNewThemesAvailable(false);
    requestAnimationFrame(() => {
      const library = document.getElementById("studio-reference-library");
      library?.focus({ preventScroll: true });
      // "Change design" lands on the design cards, not the business questions above them.
      const grid = toGrid ? library?.querySelector(".studio-reference-grid")?.parentElement : null;
      (grid ?? document.getElementById("studio-design-flow"))?.scrollIntoView({
        behavior: studioScrollBehavior(),
        block: "start",
      });
    });
  }
  const values = watch();
  useEffect(() => { setSelectionError(""); }, [values.projectType, values.additionalRequirements, productCount, featureNeeds]);
  const customizationIds: ("customPalette" | "headline" | "productDetails")[] = [
    ...(palette === studioColourPalettes.length ? ["customPalette" as const] : []),
    ...(getFieldState("headline").isDirty ? ["headline" as const] : []),
    ...(getFieldState("product").isDirty || getFieldState("price").isDirty ? ["productDetails" as const] : []),
  ];
  const themeTier = getThemeTierByPackage(plans[plan].name)!;
  const designFeatureIds = designRequirements(layout, customizationIds);
  const effectiveFeatureNeeds = Array.from(new Set([...featureNeeds, ...designFeatureIds]));
  const wizardStep = galleryOpen ? 0 : step === 2 || step === 1 ? 1 : 2;
  const recommendationIndex = findMatchingShopifyPackage(plans, productCount, effectiveFeatureNeeds);
  // Recommendations are based on product setup and requested functionality, never a reference layout.
  const designMinimumIndex = recommendationIndex ?? Math.max(0, plans.findIndex(item => item.name === getThemeMinimumPackage(layout)));
  const referencePreviewPlan = previewPlan ?? plans.length - 1;
  const selectedMatchesNeeds = shopifyPackageMatchesNeeds(plans, plan, productCount, effectiveFeatureNeeds);
  const featureLabels = packageFeatureNeeds.filter(item => effectiveFeatureNeeds.includes(item.id)).map(item => item.label);
  function designRequirements(nextLayout: number, customizations: typeof customizationIds) {
    return Array.from(new Set([
      ...customizations.flatMap(id => {
        const minimum = themeTiers.find(item => item.capabilities[id]);
        return minimum?.requirementId ? [minimum.requirementId] : [];
      }),
    ]));
  }
  const withoutThemeIds = (ids: string[]) => ids.filter(id => !id.startsWith("theme-"));
  const browsing = studioTemplates[previewTemplate ?? template];
  const previewValues = { ...values };
  if (previewTemplate !== null)
    for (const key of ["headline", "brief", "product", "price"] as const)
      if (!getFieldState(key).isDirty) previewValues[key] = browsing[key];
  if (values.businessType === "both" && browsing.businessType === "services") previewValues.businessType = "services";
  function moveReference(direction: -1 | 1) {
    const nextIndex = getAdjacentShopifyReferenceIndex(
      browsing.category, selected.name, browseAllThemes, previewTemplate ?? template, direction,
    );
    if (nextIndex === null) return;
    setPreviewTemplate(nextIndex);
    requestAnimationFrame(() => previewScroll.current?.scrollTo({ top: 0, behavior: "instant" }));
  }

  const selected = plans[plan];
  // Redesigns and migrations are priced by quote: they share the details step but send a quote request instead of paying.
  const quoteMode = values.projectType !== "New store";
  const libraryCategory = resolveCategoryReference(values.businessCategory, values.businessType);
  const layoutPreference =
    teamDirection && !layoutChosen
      ? salesJourneyCopy.teamDirection
      : templateCopy.layoutNames[layout];
  const palettePreference =
    teamDirection && !paletteChosen
      ? salesJourneyCopy.teamDirection
      : studioColourPalettes[palette]?.name || templateCopy.customPalette;
  useEffect(
    () => () => {
      imageUrls.current.forEach(URL.revokeObjectURL);
      if (logoUrl.current) URL.revokeObjectURL(logoUrl.current);
    },
    [],
  );
  function chooseTemplate(index: number, undo = false) {
    const t = studioTemplates[index];
    if (undo) setTeamDirection(previousTeamDirection.current);
    else {
      previousTeamDirection.current = teamDirection;
      setTeamDirection(false);
    }
    setTemplate(index);
    setLayout(t.layout);
    setLayoutChosen(false);
    setPalette(t.palette);
    for (const key of ["headline", "product", "price"] as const) {
      if (!getFieldState(key).isDirty)
        setValue(key, t[key], { shouldValidate: false, shouldDirty: false });
    }
    if (!imageUrls.current.length) setImages(t.images);
    if (step >= 2) setStep(0);
  }
  function updateBusinessCategory(businessType: "products" | "services" | "both", category: string, customCategory: string) {
    const referenceCategory = resolveCategoryReference(category, businessType);
    const changedCategory = resolveCategoryReference(values.businessCategory, values.businessType) !== referenceCategory
      || values.businessType !== businessType;
    setValue("businessType", businessType);
    setValue("businessCategory", category);
    setValue("customCategory", customCategory);
    clearErrors(["businessCategory", "customCategory"]);
    setPdfState("idle");
    if (changedCategory) {
      const nextReference = studioTemplates.findIndex(item => item.category === referenceCategory && item.layout === layout);
      const fallback = studioTemplates.findIndex(item => item.category === referenceCategory);
      if (nextReference >= 0 || fallback >= 0) chooseTemplate(nextReference >= 0 ? nextReference : fallback);
      setDirectionReady(false);
     
    }
  }
  function applyDesignAction(action: ShopifyDesignAction) {
    if (action.kind === "template") {
      chooseTemplate(action.index);
      setPreviewTemplate(null); setExpanded(false); setGalleryOpen(false);
      setDirectionReady(true); go(2);
    } else if (action.kind === "layout") {
      const matchingReference = studioTemplates.findIndex(item => item.category === studioTemplates[template].category && item.layout === action.index);
      const fallbackReference = studioTemplates.findIndex(item => item.category === studioTemplates[template].category && item.layout === (action.index === 5 ? 3 : 0));
      setTemplate(matchingReference >= 0 ? matchingReference : Math.max(0, fallbackReference));
      setLayout(action.index); setLayoutChosen(true);
    } else if (action.kind === "customPalette") {
      setPalette(studioColourPalettes.length); setPaletteChosen(true);
    }
    setPdfState("idle");
  }
  function requestDesignAction(action: ShopifyDesignAction) {
    if (action.kind === "template") {
      // Browsing a visual reference never commits the customer to a package.
      setSelectionError(""); applyDesignAction(action);
      return;
    }
    const nextLayout = action.kind === "layout" ? action.index : layout;
    const nextCustomizations = action.kind === "customPalette" || action.kind === "headline" || action.kind === "productDetails"
      ? Array.from(new Set([...customizationIds, action.kind]))
      : customizationIds;
    const required = [...withoutThemeIds(featureNeeds), ...designRequirements(nextLayout, nextCustomizations)];
    const target = findMatchingShopifyPackage(plans, productCount, required);
    if (target === null) { setSelectionError(themeUpgradeCopy.cannotMatch); return; }
    if (plans[target].price > plans[plan].price) {
      const label = action.kind === "layout" ? templateCopy.layoutNames[action.index] : themeUpgradeCopy[action.kind];
      setExpanded(false); setPreviewTemplate(null);
      setPendingTheme({action, packageIndex: target, label});
      return;
    }
    applyDesignAction(action);
  }
  function confirmThemeUpgrade() {
    if (!pendingTheme) return;
    setPlan(pendingTheme.packageIndex); setStarted(true);
    setSelectionError("");
    setUpgradeNotice(packageUpgradeCopy.confirmed.replace("{price}", `$${plans[pendingTheme.packageIndex].price.toLocaleString()}`));
    applyDesignAction(pendingTheme.action);
    setPendingTheme(null);
  }
  function updateStoreNeeds(nextProductCount: string, nextFeatureNeeds: string[]) {
    const nextIds = withoutThemeIds(nextFeatureNeeds);
    const required = Array.from(new Set([...nextIds, ...designFeatureIds]));
    setProductCount(nextProductCount); setFeatureNeeds(nextIds);
    setPendingUpgrade(null); setSelectionError(""); setUpgradeNotice("");
   
    if (started && !shopifyPackageMatchesNeeds(plans, plan, nextProductCount, required)) {
      const compatiblePlans = plans.map((item, index) => ({ item, index }))
        .filter(({ item, index }) => item.price >= plans[plan].price
          && shopifyPackageMatchesNeeds(plans, index, nextProductCount, required))
        .sort((a, b) => a.item.price - b.item.price);
      const upgrade = compatiblePlans[0];
      if (upgrade) {
        setPendingUpgrade({ packageIndex: upgrade.index, previousPackageIndex: plan, difference: upgrade.item.price - plans[plan].price, productCount: nextProductCount, featureIds: nextIds });
      } else {
        setStarted(false);
        setSelectionError(packageUpgradeCopy.needsReview);
      }
    }
    setPdfState("idle");
  }

  function confirmUpgrade() {
    if (!pendingUpgrade) return;
    setPlan(pendingUpgrade.packageIndex);
    setProductCount(pendingUpgrade.productCount);
    setFeatureNeeds(withoutThemeIds(pendingUpgrade.featureIds));
    setStarted(true);
    setUpgradeNotice(packageUpgradeCopy.confirmed.replace("{price}", `$${plans[pendingUpgrade.packageIndex].price.toLocaleString()}`));
    setPendingUpgrade(null);
    setSelectionError("");
    setPdfState("idle");
    setNewThemesAvailable(true);
  }
  function cancelUpgrade() {
    setPendingUpgrade(null);
    setUpgradeNotice(packageUpgradeCopy.unchanged);
  }
  function packageReadyForContact(index = plan) {
    if (!businessCategoryReady()) return false;
    const business = getValues();
    if (!started) { setSelectionError(wizard.confirmationNeeded); return false; }
    if (business.projectType !== "New store" || business.additionalRequirements.trim()) {
      setSelectionError(packageUpgradeCopy.customScopeBeforeContact);
      return false;
    }
    if (!shopifyPackageMatchesNeeds(plans, index, productCount, effectiveFeatureNeeds)) {
      setSelectionError(packageUpgradeCopy.scopeBeforeContact);
      return false;
    }
    return true;
  }
  function go(n: number) {
    setStep(n);
    setGalleryOpen(false);
    setFurthestStep((current) => Math.max(current, n === 2 || n === 1 ? 1 : 2));
    setDownloaded(false);
    setPdfState("idle");
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      document
        .getElementById("studio-design-flow")
        ?.scrollIntoView({ behavior: studioScrollBehavior(), block: "start" });
    });
  }
  const stepFields: FieldPath<ShopifyStudioFormType>[][] = [
    [
      "brand",
      "headline",
      "product",
      "price",
      "references",
      ...(palette === studioColourPalettes.length
        ? ([
            "customAccent",
            "customInk",
            "customSurface",
            "customSoft",
          ] as const)
        : []),
    ],
    [
      "brief",
      "businessType",
      "businessCategory",
      "customCategory",
      "requirements",
      "additionalRequirements",
      "projectType",
      "existingStore",
    ],
    [],
    ["name", "email", "phone", "brand", "brief"],
  ];
  function revealStepError(index: number, fields = stepFields[index]) {
    // Business details live on the design step; branding fields on the optional branding step.
    if (index === 1) showThemes(true); else go(index);
    requestAnimationFrame(() => {
      const invalidField = fields.find((name) => getFieldState(name).invalid);
      const input = invalidField
        ? document.querySelector<HTMLElement>(`#studio-customise [name="${invalidField}"]`)
        : null;
      let details = input?.closest("details");
      while (details) {
        details.open = true;
        details = details.parentElement?.closest("details") || null;
      }
      void trigger(fields, { shouldFocus: true });
    });
  }
  async function validateProjectSteps(includeContact = false) {
    if (!businessCategoryReady()) return false;
    for (const index of [0, 1]) {
      const fields = includeContact
        ? stepFields[index].filter((name) => name !== "brand" && name !== "brief")
        : stepFields[index];
      if (!(await trigger(fields, { shouldFocus: false }))) {
        revealStepError(index, fields);
        return false;
      }
    }
    if (includeContact) {
      clearErrors(stepFields[3]);
      const result = ShopifyStudioCheckoutDetailsSchema.safeParse(getValues());
      if (!result.success) {
        for (const issue of result.error.issues) {
          const fieldName = issue.path[0] as FieldPath<ShopifyStudioFormType>;
          if (stepFields[3].includes(fieldName)) {
            setError(fieldName, { type: "manual", message: issue.message });
          }
        }
        go(3);
        requestAnimationFrame(() => {
          const firstField = stepFields[3].find((name) => result.error.issues.some((issue) => issue.path[0] === name));
          if (firstField) document.querySelector<HTMLElement>(`#studio-customise [name="${firstField}"]`)?.focus();
        });
        return false;
      }
    }
    return true;
  }
  function businessCategoryReady() {
    if (values.businessCategory === SHOPIFY_CUSTOM_CATEGORY && !values.customCategory.trim()) {
      setError("customCategory", { type: "manual", message: shopifyBusinessCategoryCopy.customRequired });
      showThemes(true);
      return false;
    }
    return true;
  }
  async function navigateWizard(target: number) {
    if (target === 0) { showThemes(); return; }
    if (target === 1) { openPackages(); return; }
    if (!directionReady) { showThemes(true); return; }
    await continueToCheckout();
  }
  /** A budget buyer taps a locked package: show the designs that package can build. */
  function showPackageDesigns(index: number) {
    setPlan(index); setStarted(true); setSelectionError("");
    showThemes(false, true);
  }
  /** Emails the customer's details and brief to the business before any payment. Sent once per unchanged lead. */
  async function captureLead(intent: "checkout" | "quote") {
    const form = getValues();
    const body = JSON.stringify({
      intent, name: form.name, email: form.email, phone: form.phone, brand: form.brand, brief: form.brief,
      projectType: form.projectType, businessType: form.businessType, businessCategory: form.businessCategory,
      customCategory: form.customCategory || undefined, existingStore: form.existingStore || undefined,
      design: teamDirection ? salesJourneyCopy.teamDirection : studioTemplates[template].name,
      productCount, featureIds: effectiveFeatureNeeds,
      designNotes: form.requirements, customRequirements: form.additionalRequirements,
      packageName: plans[plan].name, packagePrice: plans[plan].price, attribution: readShopifyCheckoutAttribution(),
    });
    if (leadKey.current === body) return true;
    try {
      const result = await fetch("/api/shopify-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body });
      if (result.ok) {
        const saved = await result.json();
        if (saved.ok !== true || !/^lead-[a-f0-9-]{36}$/.test(saved.leadId || "")) return false;
        leadKey.current = body;
        trackShopifySavedLead(saved.leadId, intent);
        return true;
      }
    } catch { /* Only a durable saved lead permits checkout to open. */ }
    return false;
  }
  async function validateAndCaptureCheckoutLead() {
    const valid = await validateProjectSteps(true);
    if (!valid) return false;
    setLeadState("sending");
    const saved = await captureLead("checkout");
    setLeadState(saved ? "sent" : "error");
    return saved;
  }
  async function requestQuote() {
    if (!(await validateProjectSteps(true))) return;
    setLeadState("sending");
    setLeadState(await captureLead("quote") ? "sent" : "error");
  }
  async function continueToCheckout() {
    if (!directionReady) { showThemes(false); return; }
    if (!businessCategoryReady()) return;
    if (quoteMode && started) { go(3); return; }
    if (!packageReadyForContact()) { openPackages(); return; }
    go(3);
  }
  async function next() {
    if (!(await trigger(stepFields[step], {shouldFocus: false}))) { revealStepError(step); return; }
    if (!packageReadyForContact()) { openPackages(); return; }
    go(3);
  }
  function selectPackage(index: number) {
    if (directionReady && !shopifyPackageMatchesNeeds(plans, index, productCount, effectiveFeatureNeeds)) {
      setSelectionError(wizard.lowerPackage); return;
    }
    setPendingUpgrade(null); setUpgradeNotice(""); setPlan(index); setStarted(true);
    setSelectionError(""); setPdfState("idle"); setNewThemesAvailable(false);
  }
  function togglePriority(value: string) {
    if (priorities.includes(value)) {
      setPriorities(priorities.filter((item) => item !== value));
      setPriorityNotice("");
    } else if (priorities.length < 3) {
      setPriorities([...priorities, value]);
      setPriorityNotice("");
    } else setPriorityNotice(workspaceCopy.priorityLimit);
  }
  function removeProductImage(index: number) {
    URL.revokeObjectURL(imageUrls.current[index]);
    imageUrls.current = imageUrls.current.filter((_, i) => i !== index);
    files.current = files.current.filter((_, i) => i !== index);
    setImages(
      imageUrls.current.length
        ? [...imageUrls.current]
        : studioTemplates[template].images,
    );
  }
  function makeCoverImage(index: number) {
    imageUrls.current = [
      imageUrls.current[index],
      ...imageUrls.current.filter((_, i) => i !== index),
    ];
    files.current = [
      files.current[index],
      ...files.current.filter((_, i) => i !== index),
    ];
    setImages([...imageUrls.current]);
  }
  function upload(chosen: File[], isLogo: boolean) {
    if (!chosen.length) return;
    if (
      chosen.length > (isLogo ? 1 : 4) ||
      chosen.some(
        (f) =>
          !["image/jpeg", "image/png", "image/webp"].includes(f.type) ||
          f.size > 10 * 1024 * 1024,
      )
    ) {
      setFileError(copy.ui.fileError);
      return;
    }
    setFileError("");
    if (isLogo) {
      if (logoUrl.current) URL.revokeObjectURL(logoUrl.current);
      logoUrl.current = URL.createObjectURL(chosen[0]);
      setLogo(logoUrl.current);
      setLogoName(chosen[0].name);
    } else {
      imageUrls.current.forEach(URL.revokeObjectURL);
      imageUrls.current = chosen.map((f) => URL.createObjectURL(f));
      files.current = chosen.map((f) => f.name);
      setImages(imageUrls.current);
    }
  }
  function buildBriefPayload() {
    const business = getValues();
    return {
      version: 2,
      package: {
        name: selected.name,
        price: selected.price,
        currency: "USD",
        productLimit: selected.products,
      },
      paymentSchedule: {
        ...getShopifyPaymentSchedule(selected.price),
        currency: "USD",
        upfrontPercent: 10,
        balancePercent: 90,
        balanceDue: "After delivery",
      },
      business: {
        ...business,
        designNotes: business.requirements,
        requirements: business.additionalRequirements,
      },
      design: {
        template: teamDirection ? salesJourneyCopy.teamDirection : studioTemplates[template].name,
        layout: layoutPreference,
        palette: palettePreference,
      },
      imageFilenames: files.current,
      logoFilename: logoName,
      priorities,
      needs: {
        productCount,
        featureIds: effectiveFeatureNeeds,
        designLayout: layout,
        customizationIds,
        featureLabels,
        scopeConfirmed: started && selectedMatchesNeeds && !business.additionalRequirements.trim() && business.projectType === "New store",
      },
      checkoutConnected: false,
    };
  }
  function download() {
    const payload = buildBriefPayload();
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "zevitech-store-brief.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }
  async function downloadPdf() {
    if (pdfState === "loading") return;
    setPdfState("loading");
    try {
      const { downloadShopifyProjectBrief } =
        await import("@/lib/download-shopify-project-brief");
      await downloadShopifyProjectBrief({
        createdAt: new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(new Date()),
        plan: selected,
        business: {
          projectType: values.projectType,
          businessType: shopifyBusinessTypeOptions.find(item => item.value === values.businessType)?.label,
          businessCategory: values.businessCategory === SHOPIFY_CUSTOM_CATEGORY ? values.customCategory : values.businessCategory,
          brand: values.brand,
          brief: values.brief,
          existingStore: values.existingStore,
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
        design: {
          reference: teamDirection
            ? salesJourneyCopy.teamDirection
            : studioTemplates[template].name,
          layout: layoutPreference,
          palette: palettePreference,
          customColors:
            palette === studioColourPalettes.length
              ? [
                  {
                    label: copy.fields.customAccent,
                    value: values.customAccent,
                  },
                  { label: copy.fields.customInk, value: values.customInk },
                  {
                    label: copy.fields.customSurface,
                    value: values.customSurface,
                  },
                  { label: copy.fields.customSoft, value: values.customSoft },
                ]
              : undefined,
          priorities,
          references: values.references,
          requirements: `${journey.productSetup}: ${productCount === "more" ? "500+" : productCount}\n${journey.selectedFeatures}: ${featureLabels.join(", ") || journey.noFeatures}\n${copy.fields.requirements}: ${values.requirements || "—"}\n${copy.fields.additionalRequirements}: ${values.additionalRequirements || "—"}`,
        },
        assets: { logoName, productNames: files.current },
      });
      setPdfState("ready");
    } catch {
      setPdfState("error");
    }
  }
  function downloadReadableBrief() {
    const lines = [
      "Zevitech — Store project brief",
      `${selected.name} — USD ${selected.price}`,
      `${shopifyPaymentCopy.upfront}: USD ${getShopifyPaymentSchedule(selected.price).upfront.toFixed(2)}`,
      `${shopifyPaymentCopy.balance}: USD ${getShopifyPaymentSchedule(selected.price).balance.toFixed(2)}`,
      `${shopifyDeliveryCopy.label}: ${getShopifyDeliveryEstimate(selected.name)}`,
      shopifyDeliveryCopy.timingNote,
      "DESIGN REFERENCE ONLY — final scope to be agreed",
      "",
      `Project: ${values.projectType}`,
      `Business type: ${shopifyBusinessTypeOptions.find(item => item.value === values.businessType)?.label}`,
      `Business category: ${values.businessCategory === SHOPIFY_CUSTOM_CATEGORY ? values.customCategory : values.businessCategory}`,
      `Brand: ${values.brand}`,
      `Business: ${values.brief}`,
      `Existing website: ${values.existingStore || "—"}`,
      `Reference: ${teamDirection ? salesJourneyCopy.teamDirection : studioTemplates[template].name}`,
      `Layout: ${layoutPreference}`,
      `Palette: ${palettePreference}`,
      ...(palette === studioColourPalettes.length
        ? [
            `Custom colours: ${[values.customAccent, values.customInk, values.customSurface, values.customSoft].join(", ")}`,
          ]
        : []),
      `Other references: ${values.references || "—"}`,
      `Estimated product setup: ${productCount === "more" ? "500+" : productCount}`,
      `Requested features: ${featureLabels.join(", ") || journey.noFeatures}`,
      `${copy.fields.requirements}: ${values.requirements || "—"}`,
      `${copy.fields.additionalRequirements}: ${values.additionalRequirements || "—"}`,
      `Priorities: ${priorities.join(", ") || workspaceCopy.noPriorities}`,
      `Logo: ${logoName || "—"}`,
      `Product filenames: ${files.current.join(", ") || "—"}`,
      "",
      "Included scope:",
      ...selected.features.map((f) => `- ${f}`),
      "",
      `Contact: ${values.name} / ${values.email}`,
      `${copy.fields.phone}: ${values.phone || "—"}`,
      "Planning brief — not a payment receipt. Check your checkout confirmation for order and payment status. Media files are not included in this text export.",
    ];
    const url = URL.createObjectURL(
      new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "zevitech-project-brief.txt";
    a.click();
    setDownloaded(true);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const field = (key: FieldPath<ShopifyStudioFormType> & keyof typeof copy.fields, multiline = false, label = copy.fields[key], required = false) => (
    <label
      className="block min-w-0 mb-4 break-words text-sm font-medium leading-relaxed"
      key={key}
      htmlFor={`studio-${key}`}
    >
      {label}
      {multiline ? (
        <textarea
          id={`studio-${key}`}
          aria-label={label}
          {...register(key)}
          rows={3}
          required={required}
          maxLength={key === "brief" ? 1200 : 2000}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `error-${key}` : undefined}
          className="mt-2 min-w-0 max-w-full w-full min-h-28 resize-y border border-border rounded-lg p-3 bg-background text-base leading-relaxed focus-visible:outline-primary"
        />
      ) : (
        <input
          id={`studio-${key}`}
          aria-label={label}
          {...register(key)}
          type={key === "email" ? "email" : key === "phone" ? "tel" : key === "price" ? "number" : "text"}
          inputMode={key === "price" ? "decimal" : key === "phone" ? "tel" : key === "email" ? "email" : key === "existingStore" ? "url" : undefined}
          required={required}
          maxLength={key === "phone" ? 40 : undefined}
          min={key === "price" ? 0 : undefined}
          step={key === "price" ? "0.01" : undefined}
          autoComplete={
            key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : key === "brand" ? "organization" : "off"
          }
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `error-${key}` : undefined}
          className="mt-2 min-w-0 max-w-full w-full min-h-12 border border-border rounded-lg p-3 bg-background text-base leading-relaxed focus-visible:outline-primary"
        />
      )}
      {errors[key] && (
        <span
          id={`error-${key}`}
          role="alert"
          className="block mt-1 break-words text-destructive"
        >
          {errors[key]?.message}
        </span>
      )}
    </label>
  );
  return (
    <section
      id="studio"
      className="section-padding-standard bg-secondary-background scroll-mt-6"
    >
      <div className="layout-standard">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-primary text-sm tracking-widest font-semibold mb-3">{copy.eyebrow}</p>
          <h2 className="font-heading text-heading text-3xl md:text-5xl">{wizard.title}</h2>
          <p className="mt-4 text-paragraph text-lg">{wizard.intro}</p>
        </div>
        <div id="studio-design-flow" className="scroll-mt-6 rounded-2xl border border-border bg-background p-4 md:p-7">
          <nav aria-label={wizard.progress} className="grid grid-cols-3 gap-1 sm:gap-3 mb-6 border-b border-border pb-5">
            {wizard.steps.map((label, index) => (
              <button type="button" key={label} onClick={() => void navigateWizard(index)} disabled={index > furthestStep}
                aria-current={wizardStep === index ? "step" : undefined}
                className={cn("flex min-w-0 min-h-14 flex-col items-center gap-2 rounded-xl px-1 py-2 text-[10px] sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40", wizardStep === index ? "bg-mix-primary/5 text-primary font-semibold" : "text-paragraph")}>
                <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-xs", wizardStep === index ? "bg-primary text-primary-foreground" : "bg-muted")}>{(index < wizardStep && (index === 0 ? directionReady : started)) ? <Check size={14} aria-hidden="true"/> : index + 1}</span>
                <span className="break-words text-center">{label}</span>
              </button>
            ))}
          </nav>
          {!galleryOpen && step !== 2 && directionReady && <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-sm">
            <div><p className="font-semibold text-heading">{started ? selected.name : wizard.minimum} <span className="font-normal text-paragraph">{started ? "· " : ""}${plans[Math.max(0, started ? plan : plans.findIndex(item => item.name === getThemeMinimumPackage(layout)))].price.toLocaleString()} USD</span></p>{started && <><ShopifyPaymentSchedule total={selected.price} compact className="mt-1"/><ShopifyDeliveryEstimate packageName={selected.name} className="mt-1" /></>}</div>
            <button type="button" onClick={openPackages} className="min-h-11 px-2 text-primary underline underline-offset-4">{wizard.compare}</button>
          </div>}
          {step === 2 && <div id="studio-packages" className={cn("scroll-mt-8", started && "pb-40 md:pb-28")}>
            <h3 ref={heading} tabIndex={-1} className="font-heading text-2xl sm:text-3xl outline-none">{wizard.packageTitle}</h3>
            <p className="mt-3 max-w-3xl text-paragraph text-sm leading-relaxed">{directionReady
              ? wizard.packageForDesign.replace("{design}", studioTemplates[template].name).replace("{package}", `${plans[designMinimumIndex].name} ($${plans[designMinimumIndex].price.toLocaleString()})`)
              : wizard.packageIntro}</p>
            {directionReady && <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl border-2 border-mix-primary/30 bg-mix-primary/5 p-3 sm:p-4">
              <Image src={studioTemplates[template].conceptImage?.src || shopifyShowcaseThumbnails[studioTemplates[template].id] || studioTemplates[template].images[0]} alt="" width={96} height={72} unoptimized className="h-16 w-20 shrink-0 rounded-lg object-cover object-top" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-paragraph">{wizard.chosenDesign}</p>
                <p className="font-heading text-lg leading-tight text-heading break-words">{studioTemplates[template].name}</p>
                <p className="mt-0.5 text-xs text-paragraph">{wizard.designFrom.replace("{price}", `$${plans[designMinimumIndex].price.toLocaleString()}`)}</p>
              </div>
              <Button type="button" variant="outline" onClick={() => showThemes(true, true)} className="min-h-12 h-auto w-full whitespace-normal border-primary text-primary sm:w-auto"><ChevronLeft size={17} aria-hidden="true" />{wizard.changeTheme}</Button>

            </div>}
            {values.projectType !== "New store" && <div role="status" className="mt-5 rounded-xl border border-mix-primary/30 bg-mix-primary/5 p-5">
              <p className="text-sm leading-relaxed text-heading">{wizard.customReview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={OpenLiveChat} className="min-h-12 h-auto whitespace-normal"><MessageCircle size={17} aria-hidden="true" />{wizard.quoteAction}</Button>
                <Button asChild variant="outline" className="min-h-12 h-auto whitespace-normal"><a href="tel:+13022176872">{wizard.quotePhone}</a></Button>
              </div>
            </div>}
            <div className="mt-8">
              <ShopifyPackagePicker plans={plans} selected={plan} confirmed={started} onSelect={selectPackage}
                minimumIndex={directionReady ? designMinimumIndex : 0}
                recommendedIndex={plans.findIndex(item => item.name === "Top Tier")}
                designName={studioTemplates[template].name}
                onLockedSelect={directionReady ? showPackageDesigns : undefined} />
            </div>
            {started && !quoteMode && <ShopifyPackageNextTier plans={plans} packageIndex={plan} productCount={productCount} featureIds={effectiveFeatureNeeds} onSelect={selectPackage} />}
            <p className="text-xs leading-relaxed text-paragraph mt-5">{copy.billing}</p>
            {selectionError && <p role="alert" className="mt-3 text-sm text-destructive">{selectionError}</p>}
            <div role="group" aria-label={wizard.packageNextStep} className={cn(
              started ? "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:px-8 md:py-4" : "mt-6",
            )}>
              <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
                {started && <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mix-primary/10 text-primary sm:flex"><Check size={20} aria-hidden="true" /></span>
                  <div className="min-w-0">
                    <p className="text-xs text-paragraph">{wizard.selectedPackageLabel}</p>
                    <p className="text-base font-semibold text-heading">{selected.name} · ${selected.price.toLocaleString()} USD</p>
                    {!quoteMode && <p className="text-xs font-medium text-primary">{shopifyPaymentCopy.upfront}: ${getShopifyPaymentSchedule(selected.price).upfront.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
                  </div>
                </div>}
                {directionReady
                  ? <Button type="button" onClick={() => void continueToCheckout()} disabled={!started} className="h-auto min-h-12 w-full shrink-0 whitespace-normal px-6 text-sm font-semibold shadow-sm sm:w-auto">{!started ? wizard.choosePackage : quoteMode ? wizard.quoteContinue : wizard.confirmPackage}<ArrowRight size={18} aria-hidden="true"/></Button>
                  : <Button type="button" onClick={() => showThemes(false)} disabled={!started} className="h-auto min-h-12 w-full whitespace-normal px-6 sm:w-auto">{wizard.packageContinue}<ArrowRight size={18} aria-hidden="true"/></Button>}
              </div>
            </div>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-sm text-paragraph md:justify-end">
              {wizard.chatPrompt}
              <button type="button" onClick={OpenLiveChat} className="inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline underline-offset-4"><MessageCircle size={16} aria-hidden="true" />{wizard.chatAction}</button>
            </p>
          </div>}
          {galleryOpen && step !== 2 && <div id="studio-reference-library" role="region" aria-label={templateCopy.gallery} tabIndex={-1} className="scroll-mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-sm font-semibold text-primary">{wizard.startingPrice}</p><p className="text-sm text-paragraph mt-2">{started ? wizard.themeIntro : wizard.browseIntro}</p></div>
              <button type="button" onClick={openPackages} className="min-h-12 text-primary underline underline-offset-4 text-sm font-semibold">{wizard.compare}</button>
            </div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-border bg-mix-primary/5 px-4 py-2">
              <p className="text-sm leading-relaxed text-paragraph">{wizard.designHelp}</p>
              <button type="button" onClick={OpenLiveChat} className="inline-flex min-h-11 items-center gap-2 rounded text-left text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><MessageCircle size={17} aria-hidden="true" />{wizard.chatAction}</button>
            </div>
            <ShopifyBusinessCategoryPicker businessType={values.businessType} category={values.businessCategory} customCategory={values.customCategory} onChange={updateBusinessCategory} />
            {errors.customCategory && <p role="alert" className="my-3 text-sm text-destructive">{errors.customCategory.message}</p>}
            <ShopifyTemplateGallery browseAll={browseAllThemes} categoryFilter={resolveCategoryReference(values.businessCategory, values.businessType)} initialCategory={studioTemplates[template].category} packageName={selected.name} selected={directionReady && !teamDirection ? template : -1} onSelect={i => openReferencePreview(i)}/>
            {directionReady && <div className="mt-6 flex justify-end"><Button type="button" onClick={openPackages} className="min-h-12 h-auto whitespace-normal">{wizard.selectedAction}<ArrowRight size={17}/></Button></div>}
          </div>}
            {directionReady && !galleryOpen && step !== 2 && (
              <div
                className={cn(
                  "grid gap-6 items-start",
                  step === 0 ? "lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]" : "max-w-3xl mx-auto",
                )}
              >
                <div
                  id="studio-customise"
                  className="min-w-0 bg-background border border-border rounded-2xl p-4 md:p-7 scroll-mt-6"
                >
                  {step === 0 && <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 text-sm">
                    <div><p className="text-xs text-paragraph">{wizard.themeSelected}</p><p className="mt-1 font-semibold">{studioTemplates[template].name}</p></div>
                    <button type="button" onClick={() => showThemes()} className="min-h-11 text-primary underline underline-offset-4">{wizard.changeTheme}</button>
                  </div>}
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (step < 3) void next();
                    }}
                  >
                    {step !== 3 && <p className="text-xs text-paragraph mb-2">{journey.help[step]}</p>}
                    <h3
                      ref={heading}
                      tabIndex={-1}
                      className="font-heading text-2xl mb-5 outline-none"
                    >
                      {step === 3 ? (quoteMode ? wizard.quoteTitle : wizard.checkoutTitle) : journey.titles[step]}
                    </h3>
                    {step === 3 && <p className="-mt-3 mb-5 text-sm text-paragraph">{quoteMode ? wizard.quoteIntro : wizard.checkoutIntro}</p>}
                    {step === 0 && (
                      <>
                        {field("brand")}
                        {themeTier.capabilities.headline && <details
                          className="mb-5"
                          open={
                            !!(
                              errors.headline ||
                              errors.product ||
                              errors.price
                            ) || undefined
                          }
                        >
                          <summary className="cursor-pointer text-sm py-3 text-primary">
                            {wizard.moreDesignOptions}
                          </summary>
                          {field("headline")}
                          {themeTier.capabilities.productDetails && <>{field("product")}{field("price")}</>}
                        </details>}
                        <details className="mb-6 rounded-xl border border-border p-4">
                          <summary className="min-h-11 cursor-pointer content-center text-sm font-semibold">
                            {salesJourneyCopy.brandAssets}
                          </summary>
                          <p className="text-xs text-paragraph my-3">
                            {salesJourneyCopy.brandHelp}
                          </p>
                          {fileError && <p id="studio-upload-error" role="alert" className="mb-4 break-words text-sm text-destructive">{fileError}</p>}
                          <div className="space-y-5">
                            {[true, false].map((isLogo) => {
                              const kind = isLogo ? "logo" : "products";
                              const hasFiles = isLogo
                                ? !!logo
                                : imageUrls.current.length > 0;
                              return (
                                <div key={kind}>
                                  <p className="text-sm font-semibold mb-2">
                                    {isLogo
                                      ? copy.fields.logo
                                      : copy.fields.photos}
                                  </p>
                                  <label
                                    onDragOver={(e) => {
                                      e.preventDefault();
                                      setDragging(kind);
                                    }}
                                    onDragLeave={() => setDragging(null)}
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      setDragging(null);
                                      upload(
                                        Array.from(e.dataTransfer.files),
                                        isLogo,
                                      );
                                    }}
                                    className={cn(
                                      "relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-primary",
                                      dragging === kind
                                        ? "border-primary bg-mix-primary/10"
                                        : "border-border bg-muted hover:border-primary",
                                    )}
                                  >
                                    <input
                                      aria-label={
                                        isLogo
                                          ? copy.fields.logo
                                          : copy.fields.photos
                                      }
                                      type="file"
                                      multiple={!isLogo}
                                      accept="image/png,image/jpeg,image/webp"
                                      aria-describedby={fileError ? "studio-upload-error" : undefined}
                                      className="sr-only"
                                      onChange={(e) => {
                                        upload(
                                          Array.from(e.target.files || []),
                                          isLogo,
                                        );
                                        e.target.value = "";
                                      }}
                                    />
                                    <span className="rounded-xl bg-background shadow-sm p-3 mb-3">
                                      <UploadCloud
                                        size={26}
                                        className="text-primary"
                                      />
                                    </span>
                                    <span className="font-semibold text-sm">
                                      {isLogo
                                        ? templateCopy.dropLogo
                                        : templateCopy.dropProducts}
                                    </span>
                                    <span className="text-primary text-sm mt-1 underline">
                                      {hasFiles
                                        ? templateCopy.replaceFiles
                                        : templateCopy.browseFiles}
                                    </span>
                                    <span className="text-xs text-paragraph mt-3">
                                      {templateCopy.uploadLimits}
                                    </span>
                                  </label>
                                  <p className="text-xs text-paragraph mt-2">
                                    {isLogo
                                      ? templateCopy.logoHint
                                      : templateCopy.productHint}
                                  </p>
                                  {hasFiles && (
                                    <div className="mt-3 rounded-xl border border-border p-3">
                                      <p
                                        role="status"
                                        className="text-xs text-primary mb-3 flex items-center gap-2"
                                      >
                                        <Check size={14} />
                                        {templateCopy.uploaded}
                                      </p>
                                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-3">
                                        {(isLogo ? [logo] : images).map(
                                          (src, i) => (
                                            <div key={src} className="min-w-0">
                                              <Image
                                                src={src}
                                                alt={
                                                  isLogo
                                                    ? logoName
                                                    : files.current[i]
                                                }
                                                width={180}
                                                height={140}
                                                unoptimized
                                                className={cn(
                                                  "w-full h-24 rounded-lg bg-muted",
                                                  isLogo
                                                    ? "object-contain p-3"
                                                    : "object-cover",
                                                )}
                                              />
                                              <p title={isLogo ? logoName : files.current[i]} className="text-xs truncate mt-2">
                                                {isLogo
                                                  ? logoName
                                                  : files.current[i]}
                                              </p>
                                              {!isLogo && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                  <button
                                                    type="button"
                                                    disabled={i === 0}
                                                    onClick={() =>
                                                      makeCoverImage(i)
                                                    }
                                                    className="text-xs min-h-11 border border-border rounded-lg px-2 disabled:bg-muted disabled:text-primary"
                                                  >
                                                    {i === 0
                                                      ? workspaceCopy.cover
                                                      : workspaceCopy.makeCover}
                                                  </button>
                                                  <button
                                                    type="button"
                                                    aria-label={`${workspaceCopy.removeImage}: ${files.current[i]}`}
                                                    onClick={() =>
                                                      removeProductImage(i)
                                                    }
                                                    className="min-w-11 min-h-11 inline-flex items-center justify-center border border-border rounded-lg text-destructive"
                                                  >
                                                    <X size={15} />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                      <button
                                        type="button"
                                        className="text-sm text-destructive underline min-h-11 mt-2"
                                        onClick={() => {
                                          if (isLogo) {
                                            URL.revokeObjectURL(
                                              logoUrl.current,
                                            );
                                            logoUrl.current = "";
                                            setLogo("");
                                            setLogoName("");
                                          } else {
                                            imageUrls.current.forEach(
                                              URL.revokeObjectURL,
                                            );
                                            imageUrls.current = [];
                                            files.current = [];
                                            setImages(
                                              studioTemplates[template].images,
                                            );
                                          }
                                        }}
                                      >
                                        {isLogo
                                          ? copy.ui.removeLogo
                                          : copy.ui.removeImages}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            <p className="text-xs text-paragraph">
                              {copy.hints.photos}
                            </p>
                          </div>
                        </details>
                        <fieldset className="my-6">
                          <legend className="text-sm font-medium mb-3">
                            {copy.ui.colour}
                          </legend>
                          <div className="flex flex-wrap gap-3">
                            {studioColourPalettes.map((x, i) => (
                              <button
                                type="button"
                                key={x.name}
                                onClick={() => {
                                  setPalette(i);
                                  setPaletteChosen(true);
                                }}
                                aria-pressed={palette === i}
                                className={cn(
                                  "max-w-full px-4 py-3 rounded-lg border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                  palette === i
                                    ? "border-primary ring-2 ring-mix-primary/20"
                                    : "border-border",
                                )}
                              >
                                <span
                                  aria-hidden
                                  className="flex overflow-hidden rounded-md mb-2 h-6 border border-border"
                                >
                                  {[x.accent, x.ink, x.surface, x.soft].map(
                                    (colour, j) => (
                                      <span
                                        key={j}
                                        style={
                                          {
                                            "--swatch": colour,
                                          } as CSSProperties
                                        }
                                        className="bg-[var(--swatch)] w-7 h-full"
                                      />
                                    ),
                                  )}
                                </span>
                                {x.name}
                              </button>
                            ))}
                          </div>
                          {themeTier.capabilities.customPalette && <button
                            type="button"
                            aria-pressed={palette === 6}
                            onClick={() => {
                              requestDesignAction({kind: "customPalette"});
                            }}
                            className={cn(
                              "mt-3 max-w-full rounded-lg border px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              palette === 6
                                ? "border-primary ring-2 ring-mix-primary/20"
                                : "border-border",
                            )}
                          >
                            {templateCopy.customPalette}
                          </button>}
                          {palette === 6 && themeTier.capabilities.customPalette && (
                            <div className="mt-4 rounded-xl bg-muted p-4">
                              <p className="text-sm text-paragraph mb-4">
                                {templateCopy.customPaletteHint}
                              </p>
                              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-4">
                                {(
                                  [
                                    "customAccent",
                                    "customInk",
                                    "customSurface",
                                    "customSoft",
                                  ] as const
                                ).map((key) => (
                                  <div key={key} className="min-w-0">
                                    <label
                                      htmlFor={`picker-${key}`}
                                      className="text-sm block mb-2"
                                    >
                                      {copy.fields[key]}
                                    </label>
                                    <div className="flex min-w-0 gap-2">
                                      <input
                                        id={`picker-${key}`}
                                        type="color"
                                        aria-label={`${copy.fields[key]} picker`}
                                        value={
                                          /^#[0-9a-fA-F]{6}$/.test(values[key])
                                            ? values[key]
                                            : "#000000"
                                        }
                                        onChange={(e) =>
                                          setValue(key, e.target.value, {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                          })
                                        }
                                        className="w-12 h-12 shrink-0 cursor-pointer rounded border border-border focus-visible:outline-primary"
                                      />
                                      <input
                                        aria-label={`${copy.fields[key]} hex`}
                                        {...register(key)}
                                        maxLength={7}
                                        autoComplete="off"
                                        spellCheck={false}
                                        aria-invalid={!!errors[key]}
                                        aria-describedby={errors[key] ? `error-${key}` : undefined}
                                        className="min-w-0 w-full min-h-12 border border-border bg-background rounded px-3 text-base focus-visible:outline-primary"
                                      />
                                    </div>
                                    {errors[key] && (
                                      <p
                                        id={`error-${key}`}
                                        role="alert"
                                        className="break-words text-sm text-destructive mt-2"
                                      >
                                        {errors[key]?.message}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </fieldset>
                        <details className="mb-4 border border-border rounded-xl p-4">
                          <summary className="min-h-11 cursor-pointer content-center text-sm font-semibold">
                            {salesJourneyCopy.moreDetails}
                          </summary>
                          <div className="my-6 rounded-xl bg-muted p-4">
                            <p className="font-semibold mb-3">
                              {templateCopy.teamNote}
                            </p>
                            {field("references", true)}
                            <p className="text-sm text-paragraph">
                              {templateCopy.referenceHelp}
                            </p>
                          </div>
                          <fieldset className="mb-6">
                            <legend className="font-semibold mb-2">
                              {workspaceCopy.prioritiesTitle}
                            </legend>
                            <p className="text-sm text-paragraph mb-3">
                              {workspaceCopy.prioritiesHint}
                            </p>
                            <div className="grid gap-2">
                              {workspaceCopy.priorities.map((priority) => (
                                <button
                                  key={priority}
                                  type="button"
                                  aria-pressed={priorities.includes(priority)}
                                  onClick={() => togglePriority(priority)}
                                  className={cn(
                                    "min-h-11 text-left rounded-xl border px-3 py-3 text-sm flex items-center gap-3",
                                    priorities.includes(priority)
                                      ? "border-primary bg-muted text-heading"
                                      : "border-border bg-background text-paragraph",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                                      priorities.includes(priority)
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-border",
                                    )}
                                  >
                                    {priorities.includes(priority) && (
                                      <Check size={12} />
                                    )}
                                  </span>
                                  {priority}
                                </button>
                              ))}
                            </div>
                            <p
                              role="status"
                              className="text-xs text-primary mt-2"
                            >
                              {priorityNotice || `${priorities.length} / 3`}
                            </p>
                          </fieldset>
                        </details>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <h4 className="font-semibold mt-2 mb-4">
                          {salesJourneyCopy.contactTitle}
                        </h4>
                        <p className="text-sm text-paragraph mb-5">
                          {copy.ui.contactNote}
                        </p>
                        <div className="grid min-w-0 gap-x-5 sm:grid-cols-2">
                          {field("name", false, copy.fields.name, true)}
                          {field("email", false, copy.fields.email, true)}
                          {field("phone", false, copy.fields.phone, true)}
                          {field("brand", false, copy.reviewFields.brand, true)}
                        </div>
                        {field("brief", true, copy.reviewFields.brief, true)}
                        {quoteMode && field("existingStore", false, wizard.existingStoreLabel)}
                        <ShopifyOrderSummary
                          plan={selected}
                          onChangePackage={openPackages}
                        />
                        <div className="my-5 rounded-xl bg-muted p-4 text-sm leading-relaxed text-paragraph">
                          <p>{wizard.afterCheckout}</p>
                          <button type="button" onClick={() => go(0)} className="mt-2 min-h-11 text-left font-semibold text-primary underline underline-offset-4">{wizard.brandingOptional}</button>
                        </div>
                        {!selectedMatchesNeeds && <p role="status" className="text-sm text-paragraph rounded-xl bg-muted p-4 my-4">{journey.selectedBelowScope}</p>}
                      </>
                    )}
                    <div className="flex flex-wrap justify-between gap-3 mt-7">
                      <Button
                        type="button"
                        variant="outline"
                        className="min-h-11"
                        onClick={() => step === 0 ? go(3) : step === 1 ? showThemes() : openPackages()}
                      >
                        {copy.ui.back}
                      </Button>
                      {step < 2 && (
                        <Button type="submit" className="min-h-11 max-w-full whitespace-normal h-auto">
                          {wizard.next[step as 0 | 1]}
                          <ArrowRight size={16} />
                        </Button>
                      )}

                    </div>
                  </form>
                  {step === 3 && (
                    <div className="mt-6">
                      {quoteMode ? (
                        <div className="rounded-xl border border-mix-primary/30 bg-mix-primary/5 p-5">
                          {leadState === "sent"
                            ? <p role="status" className="flex items-start gap-2 text-sm font-semibold text-heading"><Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />{wizard.quoteSent}</p>
                            : <Button type="button" onClick={() => void requestQuote()} disabled={leadState === "sending"} className="min-h-12 h-auto w-full whitespace-normal">{leadState === "sending" ? <Loader2 size={17} aria-hidden="true" className="animate-spin" /> : null}{wizard.quoteSubmit}<ArrowRight size={17} aria-hidden="true" /></Button>}
                          {leadState === "error" && <p role="alert" className="mt-3 text-sm text-destructive">{wizard.quoteError}</p>}
                        </div>
                      ) : (
                        <>
                          <ul aria-label={wizard.trustLabel} className="mb-5 grid gap-3 rounded-xl border border-border bg-mix-muted/40 p-4 text-sm text-heading sm:grid-cols-3">
                            <li className="flex items-start gap-2"><Lock size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />{wizard.trustSecure}</li>
                            <li className="flex items-start gap-2"><ShieldCheck size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />{wizard.trustBalance}</li>
                            <li className="flex items-start gap-2"><Star size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" /><a href={wizard.trustReviewsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{wizard.trustReviews}</a></li>
                          </ul>
                          <p className="mb-4 text-sm text-paragraph">{wizard.leadNotice} <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{wizard.leadPrivacy}</a></p>
                          <ShopifyPackageCheckout
                            brief={buildBriefPayload()}
                            onValidate={validateAndCaptureCheckoutLead}
                            onReviewRequirements={openPackages}
                          />
                          {leadState === "error" && <p role="alert" className="mt-3 text-sm text-destructive">{wizard.leadError}</p>}
                          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-sm text-paragraph">
                            {wizard.chatBeforePaying}
                            <button type="button" onClick={OpenLiveChat} className="inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline underline-offset-4"><MessageCircle size={16} aria-hidden="true" />{wizard.chatAction}</button>
                          </p>
                        </>
                      )}
                      <div className="mt-6 border-t border-border pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full min-h-12 h-auto whitespace-normal px-3 py-3 mb-3"
                          disabled={pdfState === "loading"}
                          onClick={() => void downloadPdf()}
                        >
                          {pdfState === "loading" ? (
                            <Loader2
                              aria-hidden
                              className="h-4 w-4 animate-spin motion-reduce:animate-none"
                            />
                          ) : (
                            <Download aria-hidden className="h-4 w-4" />
                          )}
                          {pdfState === "loading"
                            ? salesJourneyCopy.preparingPdf
                            : salesJourneyCopy.downloadPdf}
                        </Button>
                        <p className="text-xs text-paragraph mb-4">
                          {salesJourneyCopy.pdfNote}
                        </p>
                        {pdfState === "ready" && (
                          <p
                            role="status"
                            className="text-sm text-primary mb-4"
                          >
                            {salesJourneyCopy.pdfReady}
                          </p>
                        )}
                        {pdfState === "error" && (
                          <p
                            role="alert"
                            className="text-sm text-destructive mb-4"
                          >
                            {salesJourneyCopy.pdfError}
                          </p>
                        )}
                        <details className="border-t border-border pt-4">
                          <summary className="min-h-11 content-center text-sm text-primary cursor-pointer">
                            {salesJourneyCopy.export}
                          </summary>
                          <div className="grid gap-3 mt-4">
                            <Button
                              type="button"
                              variant="outline"
                              className="min-h-12 h-auto max-w-full whitespace-normal px-3 py-3"
                              onClick={downloadReadableBrief}
                            >
                              {templateCopy.downloadReadable}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className="min-h-12 h-auto max-w-full whitespace-normal px-3 py-3"
                              onClick={download}
                            >
                              {copy.ui.download}
                            </Button>
                          </div>
                          <p className="text-xs text-paragraph mt-3">
                            {templateCopy.exportNote}
                          </p>
                        </details>
                        {downloaded && (
                          <p role="status" className="text-sm text-primary">
                            {workspaceCopy.downloadDone}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="min-w-0 lg:sticky lg:top-6"
                  hidden={step !== 0}
                  id="studio-live-preview"
                >
                  <div className="flex flex-wrap justify-between gap-3 items-center mb-3">
                    <p className="text-xs font-semibold tracking-widest">
                      {copy.ui.live}
                    </p>
                    <div className="flex max-w-full gap-2 border border-border bg-background rounded-lg p-1">
                      <button
                        type="button"
                        aria-pressed={!mobile}
                        onClick={() => setMobile(false)}
                        className={cn(
                          "min-h-11 flex items-center justify-center gap-2 p-2 text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          !mobile && "bg-muted",
                        )}
                      >
                        <Monitor size={16} />
                        {copy.ui.desktop}
                      </button>
                      <button
                        type="button"
                        aria-pressed={mobile}
                        onClick={() => setMobile(true)}
                        className={cn(
                          "min-h-11 flex items-center justify-center gap-2 p-2 text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          mobile && "bg-muted",
                        )}
                      >
                        <Smartphone size={16} />
                        {copy.ui.mobile}
                      </button>
                    </div>
                  </div>
                  <div
                    role="status"
                    className="text-sm text-primary bg-mix-primary/5 rounded-lg p-3 mb-3"
                  >
                    {journey.previewNote}
                  </div>
                  <button
                    type="button"
                    onClick={() => openReferencePreview()}
                    className="min-h-12 w-full border border-primary text-primary rounded-lg px-3 py-3 mb-3 inline-flex justify-center items-center gap-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Maximize2 size={17} />
                    {templateCopy.preview}
                  </button>
                  <ShopifyStudioPreview
                    compactScope
                    key={`${template}-${plan}`}
                    copy={copy}
                    plan={plan}
                    packageName={plans[plan].name}
                    scopeMode="package"
                    values={values.businessType === "both" && studioTemplates[template].businessType === "services" ? { ...values, businessType: "services" } : values}
                    images={images}
                    logo={logo}
                    layout={layout}
                    referenceId={studioTemplates[template].id}
                    palette={palette}
                    mobile={mobile}
                  />
                  <p className="text-xs text-paragraph mt-4">
                    {copy.previewNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        {(galleryOpen || step !== 3) && <details className="mt-5 rounded-xl border border-border bg-background px-4">
          <summary className="min-h-12 cursor-pointer content-center text-sm text-paragraph">{wizard.saved}</summary>
          <ShopifyDesignDraftControls saved={savedDesign} canSave={directionReady || started} notice={draftNotice} onSave={saveDesign} onResume={resumeDesign} onRemove={removeSavedDesign}/>
        </details>}
      </div>
      <Dialog
        open={expanded}
        onOpenChange={(open) => {
          setExpanded(open);
          if (!open) { setPreviewTemplate(null); setPreviewPlan(null); }
        }}
      >
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const destination = previewCloseDestination.current;
            requestAnimationFrame(() => {
              const target = destination === "customize"
                ? heading.current
                : destination === "gallery"
                  ? document.getElementById("studio-reference-library")
                  : previewReturnFocus.current;
              if (target?.isConnected) target.focus({ preventScroll: true });
            });
          }}
          className="w-[96vw] max-w-6xl h-[94dvh] flex flex-col overflow-hidden p-0 gap-0 [&>button]:h-11 [&>button]:w-11 [&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button]:right-2 [&>button]:top-2 [&>button]:bg-background [&>button]:shadow-sm"
        >
          <div ref={previewScroll} className="relative flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden">
          <DialogHeader className="p-3 md:px-6 border-b border-border pr-16 md:pr-16 text-left">
            <p className="text-xs font-semibold tracking-wider text-primary">{previewPlan !== null ? packageExplorerCopy.eyebrow : templateCopy.referenceOnly}</p>
            <DialogTitle>{previewPlan !== null ? packageExplorerCopy.title : browsing.name}</DialogTitle>
            <DialogDescription className="sr-only">{previewPlan !== null ? packageExplorerCopy.intro : templateCopy.previewSummary}</DialogDescription>
          </DialogHeader>
          <div className="min-w-0 p-3 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              {previewPlan === null ? <div className="flex gap-2 min-w-0">
                <Button
                  className="h-11 w-11 shrink-0 p-0 md:w-auto md:px-3"
                  type="button"
                  variant="outline"
                  aria-label={templateCopy.previousReference}
                  title={templateCopy.previousReference}
                  onClick={() => moveReference(-1)}
                >
                  <ChevronLeft aria-hidden="true" />
                  <span className="hidden md:inline">{templateCopy.previousReference}</span>
                </Button>
                <Button
                  className="h-11 w-11 shrink-0 p-0 md:w-auto md:px-3"
                  type="button"
                  variant="outline"
                  aria-label={templateCopy.nextReference}
                  title={templateCopy.nextReference}
                  onClick={() => moveReference(1)}
                >
                  <span className="hidden md:inline">{templateCopy.nextReference}</span>
                  <ChevronRight aria-hidden="true" />
                </Button>
              </div> : <div className="flex-1 min-w-0">
                <label htmlFor="package-preview-select" className="block text-sm font-semibold mb-2">{packageExplorerCopy.picker}</label>
                <ShopifyStudioSelect id="package-preview-select" value={previewPlan} onChange={(event) => setPreviewPlan(Number(event.target.value))}>
                  {plans.map((item, index) => <option key={item.name} value={index}>{item.name} · ${item.price.toLocaleString()} USD</option>)}
                </ShopifyStudioSelect>
              </div>}
            <div className="flex gap-2">
              <Button
                className="h-11 w-11 shrink-0 p-0 md:w-auto md:px-3"
                type="button"
                variant={mobile ? "outline" : "default"}
                aria-pressed={!mobile}
                aria-label={copy.ui.desktop}
                title={copy.ui.desktop}
                onClick={() => setMobile(false)}
              >
                <Monitor aria-hidden="true" />
                <span className="hidden md:inline">{copy.ui.desktop}</span>
              </Button>
              <Button
                className="h-11 w-11 shrink-0 p-0 md:w-auto md:px-3"
                type="button"
                variant={mobile ? "default" : "outline"}
                aria-pressed={mobile}
                aria-label={copy.ui.mobile}
                title={copy.ui.mobile}
                onClick={() => setMobile(true)}
              >
                <Smartphone aria-hidden="true" />
                <span className="hidden md:inline">{copy.ui.mobile}</span>
              </Button>
            </div>
            </div>
            {previewPlan !== null && <div className="mb-4 rounded-xl bg-mix-primary/5 border border-mix-primary/15 p-4 text-sm" role="status">
              <p className="font-semibold text-heading">{packageExplorerCopy.previewing}: {plans[previewPlan].name} · ${plans[previewPlan].price.toLocaleString()} USD</p>
              <p className="mt-1 text-paragraph">{started ? `${packageExplorerCopy.selected}: ${selected.name} · $${selected.price.toLocaleString()} USD.` : packageExplorerCopy.noSelection} {packageExplorerCopy.previewOnly}</p>
            </div>}
            {previewPlan === null && <p className="mb-4 text-sm text-paragraph">{wizard.example}</p>}
            {previewPlan !== null && <ShopifyDeliveryEstimate packageName={plans[referencePreviewPlan].name} className="mb-4" />}
            <ShopifyStudioPreview
              compactScope={previewPlan === null}
              expanded
              key={`${previewTemplate ?? template}-${referencePreviewPlan}`}
              copy={copy}
              plan={referencePreviewPlan}
              packageName={plans[referencePreviewPlan].name}
              scopeMode={previewPlan === null ? "reference" : "package"}
              values={previewValues}
              images={
                previewTemplate !== null && !imageUrls.current.length
                  ? browsing.images
                  : images
              }
              logo={logo}
              layout={previewTemplate !== null ? browsing.layout : layout}
              referenceId={browsing.id}
              palette={previewTemplate !== null ? browsing.palette : palette}
              mobile={mobile}
            />
            <details className="mt-4 p-4 rounded-lg bg-muted text-sm">
              <summary className="min-h-11 content-center cursor-pointer font-semibold">
                {templateCopy.previewDetails}
              </summary>
              <p className="mt-3">{templateCopy.modalScope}</p>
              <p className="mt-2">
                {previewPlan !== null ? `${plans[previewPlan].name} · $${plans[previewPlan].price.toLocaleString()} · ${plans[previewPlan].features.join(" · ")}` : wizard.example}
              </p>
            </details>
          </div>
          </div>
          <div className="shrink-0 border-t border-border bg-background p-2 md:p-3 grid grid-cols-2 md:grid-cols-3 items-center gap-2 shadow-lg">
            <Button
              className="col-span-2 md:col-span-1 md:justify-self-start min-w-0 min-h-11 h-auto max-w-full whitespace-normal px-3 py-2"
              type="button"
              onClick={() => {
                previewCloseDestination.current = "customize";
                if (previewPlan !== null) {
                  const nextPlan = previewPlan;
                  previewCloseDestination.current = directionReady ? "customize" : "gallery";
                  setExpanded(false);
                  setPreviewPlan(null);
                  selectPackage(nextPlan);
                  openPackages();
                  return;
                }
                if (previewTemplate === null) {
                  setExpanded(false); setGalleryOpen(false); setDirectionReady(true); go(step === 0 ? 0 : 2);
                } else requestDesignAction({kind: "template", index: previewTemplate});
              }}
            >
              {previewPlan !== null ? `${started && previewPlan === plan ? packageExplorerCopy.chooseSelected : packageExplorerCopy.choose} ${plans[previewPlan].name}` : wizard.previewAction}
            </Button>
            <Button
              className="col-start-2 row-start-2 md:col-start-3 md:row-start-1 justify-self-end min-w-0 min-h-11 h-auto max-w-full whitespace-normal px-3 py-2"
              variant="outline"
              type="button"
              onClick={() => {
                if (previewPlan !== null) {
                  previewCloseDestination.current = null;
                  setExpanded(false);
                  setPreviewPlan(null);
                  return;
                }
                previewCloseDestination.current = "gallery";
                setExpanded(false);
                setPreviewTemplate(null);
                setGalleryOpen(true);
                requestAnimationFrame(() =>
                  document
                    .getElementById("studio-reference-library")
                    ?.scrollIntoView({ block: "start", behavior: studioScrollBehavior() }),
                );
              }}
            >
              {previewPlan !== null ? packageExplorerCopy.back : templateCopy.return}
            </Button>
            <button type="button" onClick={() => { setExpanded(false); requestAnimationFrame(OpenLiveChat); }} className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 justify-self-center inline-flex min-h-11 items-center justify-center gap-2 rounded px-2 text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><MessageCircle size={17} aria-hidden="true" />{wizard.chatAction}</button>
          </div>
        </DialogContent>
      </Dialog>
      <ShopifyThemeUpgrade plans={plans} currentIndex={plan} pending={pendingTheme} onConfirm={confirmThemeUpgrade} onCancel={() => { setPendingTheme(null); setUpgradeNotice(packageUpgradeCopy.unchanged); }} />
      {directionReady && !galleryOpen && step === 0 && (
        <div className="lg:hidden sticky bottom-3 mx-4 mt-5 z-20 bg-mix-background/95 p-2 rounded-xl border border-border shadow-lg">
          <Button type="button" variant="outline" className="w-full min-h-12 h-auto whitespace-normal" onClick={() => openReferencePreview(undefined, true)}><Maximize2 size={17}/>{salesJourneyCopy.mobilePreview}</Button>
        </div>
      )}
    </section>
  );
}
