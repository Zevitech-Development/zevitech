"use client";

import { useCallback, useEffect, useId, useRef, useState, CSSProperties } from "react";
import Image from "./shopify-preview-image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Maximize2,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import ShopifyCommerceStudio from "./shopify-commerce-studio";
import ShopifyStudioSelect from "./shopify-studio-select";
import ShopifyStorefrontSections from "./shopify-storefront-sections";
import ShopifyServicePreview from "./shopify-service-preview";
import { ShopifyStudioPreviewProps } from "@/interfaces/shopify-studio-interface";
import {
  templateCopy,
  studioTemplates,
  studioColourPalettes,
} from "@/content/landing/shopify-studio-templates";
import { shopifyPreviewEnhancements as detail } from "@/content/landing/shopify-preview-enhancements";
import { studioPlans } from "@/content/landing/shopify-studio-content";
import {
  packagePreviewProfiles,
  packagePreviewCapabilities,
  packageStorefrontProfiles,
  packageStorefrontCopy as storefrontCopy,
  packagePreviewCopy as scopeCopy,
} from "@/content/landing/shopify-package-preview-content";
import type { PackagePreviewCapabilities, PackagePreviewDemo, PreviewDemoFeature } from "@/interfaces/shopify-package-preview-interface";
import { shopifyCategoryLabel } from "@/content/landing/shopify-business-categories";
import { cn } from "@/lib/utils";
import { canUseThemeLayout, getThemeMinimumPackage, getThemeTierByPackage } from "@/lib/shopify-theme-access";
import { themeUpgradeCopy } from "@/content/landing/shopify-theme-upgrade-content";
import ShopifyPremiumPreview from "@/elements/business/shopify/shopify-premium-preview";
import ShopifyClotyaHome from "./shopify-clotya-home";
import ShopifyEcolifeHome from "./shopify-ecolife-home";
import ShopifyBeautyHome from "./shopify-beauty-home";
import ShopifyHomeLivingHome from "./shopify-home-living-home";
import ShopifyTechHome from "./shopify-tech-home";
import ShopifyLookbookHome from "./shopify-lookbook-home";
import ShopifyBundleHome from "./shopify-bundle-home";
import ShopifyConfiguratorHome from "./shopify-configurator-home";
import ShopifyConciergeHome from "./shopify-concierge-home";
import { getCategorySignatureProducts } from "@/content/landing/shopify-category-signature-content";
import { signatureCatalog } from "@/content/landing/shopify-signature-catalog";
import type { ShopifySignatureTheme } from "@/interfaces/shopify-signature-storefront-interface";
import ShopifyReferenceHome from "./shopify-reference-home";
import { addDemoCartItem, demoCartSubtotal, type DemoCartItem } from "@/lib/shopify-demo-cart";
import { getReferenceArtwork } from "@/content/landing/shopify-reference-artwork";
import { getShopifyShowcase } from "@/content/landing/shopify-showcase-content";

const signatureHomes = { clotya: ShopifyClotyaHome, ecolife: ShopifyEcolifeHome, beauty: ShopifyBeautyHome, living: ShopifyHomeLivingHome, tech: ShopifyTechHome, lookbook: ShopifyLookbookHome, bundle: ShopifyBundleHome, configurator: ShopifyConfiguratorHome, concierge: ShopifyConciergeHome };
import { signaturePreviewCopy } from "@/content/landing/shopify-signature-preview-content";

const REFERENCE_CAPABILITIES: PackagePreviewCapabilities = {
  cart: "full",
  search: true,
  reviews: true,
  journal: true,
  currency: true,
  newsletter: true,
  filters: true,
  account: true,
  custom: true,
};

export default function ShopifyStudioPreview({
  copy,
  plan,
  values,
  images,
  logo,
  layout: requestedLayout,
  palette,
  mobile,
  expanded = false,
  scopeMode = "reference",
  packageName,
  compactScope = false,
  referenceId,
}: ShopifyStudioPreviewProps) {
  const p = copy.preview;
  const requestedPackage = packageName || studioPlans[plan]?.name || studioPlans[0].name;
  const planName = Object.prototype.hasOwnProperty.call(packagePreviewCapabilities, requestedPackage)
    ? requestedPackage as keyof typeof packagePreviewCapabilities
    : "Beginner";
  const themeFallback = scopeMode === "package" && !canUseThemeLayout(planName, requestedLayout);
  const allowedLayouts = getThemeTierByPackage(planName)!.layouts;
  const layout = themeFallback ? allowedLayouts[allowedLayouts.length - 1] : requestedLayout;
  const premiumLayout = layout >= 6 && layout <= 9;
  const categoryReference = studioTemplates.find(reference => reference.id === referenceId);
  const categoryContext = referenceId?.endsWith("-signature") ? categoryReference?.category : undefined;
  const signature = !themeFallback
    ? (categoryReference?.layout === layout ? categoryReference.signatureTheme : undefined) ?? (Object.keys(signatureCatalog) as (keyof typeof signatureCatalog)[]).find(key => signatureCatalog[key].id === referenceId && signatureCatalog[key].layout === layout) ?? null
    : null;
  const signatureDefinition = signature && signature in signatureCatalog ? signatureCatalog[signature as keyof typeof signatureCatalog] : null;
  const artwork = !themeFallback ? getReferenceArtwork(referenceId) : undefined;
  const signatureProducts = artwork?.products ?? (categoryContext && categoryReference
    ? getCategorySignatureProducts(categoryReference)
    : signatureDefinition?.products);
  const SignatureHome = signature ? signatureHomes[signature] : null;
  const capabilities = scopeMode === "package"
    ? packagePreviewCapabilities[planName]
    : REFERENCE_CAPABILITIES;
  const profile = packagePreviewProfiles[planName];
  const storefrontProfile = packageStorefrontProfiles[planName];
  const hasCart = capabilities.cart !== "none";
  const isMiniCart = capabilities.cart === "mini";
  const previewId = useId();
  const focusPreviewOnNavigate = useRef(false);
  const pendingDemo = useRef<PreviewDemoFeature | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const currencySelect = useRef<HTMLSelectElement>(null);
  const filterControl = useRef<HTMLSelectElement>(null);
  const reviewsSection = useRef<HTMLElement>(null);
  const newsletterSection = useRef<HTMLElement>(null);
  const customSection = useRef<HTMLElement>(null);
  const miniCartPanel = useRef<HTMLElement>(null);
  const miniCartTrigger = useRef<HTMLElement | null>(null);
  const validColour = (value: string, fallback: string) =>
    /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
  const defaultColours = studioColourPalettes[0];
  const colours = (artwork && palette === categoryReference?.palette ? artwork.palette : studioColourPalettes[palette]) || {
    accent: validColour(values.customAccent, defaultColours.accent),
    ink: validColour(values.customInk, defaultColours.ink),
    surface: validColour(values.customSurface, defaultColours.surface),
    soft: validColour(values.customSoft, defaultColours.soft),
  };
  const rgb = colours.accent
    .slice(1)
    .match(/.{2}/g)!
    .map((c) => {
      const n = parseInt(c, 16) / 255;
      return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    });
  const buttonInk =
    rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179
      ? "black"
      : "white";
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<DemoCartItem[]>([]);
  const [productSize, setProductSize] = useState("M");
  const [saved, setSaved] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("all");
  const [sort, setSort] = useState("featured");
  const [currency, setCurrency] = useState("USD");
  const [joined, setJoined] = useState(false);
  const [added, setAdded] = useState(false);
  const [fullImage, setFullImage] = useState(true);
  const [story, setStory] = useState<number | null>(null);
  const [activeDemo, setActiveDemo] = useState<PreviewDemoFeature | null>(null);
  const [demoVisit, setDemoVisit] = useState(0);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState("all");
  const viewport = useRef<HTMLDivElement>(null);
  const sourceImages = images.length ? images : ["/store-studio/sample-1.svg"];
  const productName = values.product || copy.defaults.product;
  const brand = values.brand || (referenceId === "atelier-commerce-studio" ? "ATELIER" : undefined) || (categoryContext ? categoryReference?.name.split(/ Signature| Lookbook| Bundle Builder| Configurator| Concierge/)[0] : signatureDefinition?.brand) || copy.defaults.brand;
  const price = Number.isFinite(Number(values.price))
    ? Math.max(0, Number(values.price))
    : 0;
  const catalog = signatureProducts ? signatureProducts.map((item, id) => ({
    ...item,
    id,
    src: images[id]?.startsWith("blob:") ? images[id] : item.src,
    name: id === 0 && productName !== signatureProducts[0].name && (!artwork || productName !== categoryReference?.product) ? productName : item.name,
    price: id === 0 && values.price && (!artwork || values.price !== categoryReference?.price) ? price : item.price,
  })) : sourceImages.map((src, id) => ({
    id,
    src,
    name:
      id === 0
        ? productName
        : `${detail.sampleItem} ${String(id + 1).padStart(2, "0")}`,
    collection:
      templateCopy.collectionNames[id % templateCopy.collectionNames.length],
    price,
    description: p.description,
  }));
  const product = catalog[selectedProduct] || catalog[0];
  const catalogIdentity = JSON.stringify([sourceImages, productName, price, referenceId]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = demoCartSubtotal(cart, catalog);
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value * (currency === "EUR" ? 0.92 : 1));

  useEffect(() => {
    setPage("home");
    setCurrency("USD");
    setSearch("");
    setCollection("all");
    setCollectionFilter("all");
    setSort("featured");
    setCart([]);
    setSaved([]);
    setSelectedProduct(0);
    setQuantity(1);
    setProductSize("M");
    setFullImage(true);
    setAdded(false);
    setStory(null);
    setJoined(false);
    setMiniCartOpen(false);
    setActiveDemo(null);
    pendingDemo.current = null;
    focusPreviewOnNavigate.current = false;
    miniCartTrigger.current = null;
  }, [planName, scopeMode, catalogIdentity]);

  useEffect(() => {
    if (focusPreviewOnNavigate.current) {
      viewport.current?.focus({ preventScroll: true });
      focusPreviewOnNavigate.current = false;
    }
    viewport.current?.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
    if (pendingDemo.current) {
      const targets: Partial<Record<PreviewDemoFeature, HTMLElement | null>> = {
        search: searchInput.current,
        currency: currencySelect.current,
        reviews: reviewsSection.current,
        newsletter: newsletterSection.current,
        filters: filterControl.current,
        custom: customSection.current,
        cart: isMiniCart ? miniCartPanel.current : viewport.current,
      };
      const target = targets[pendingDemo.current] || viewport.current;
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "nearest", behavior: "instant" as ScrollBehavior });
      pendingDemo.current = null;
    }
  }, [page, selectedProduct, demoVisit, miniCartOpen, isMiniCart]);

  const navigate = (next: string) => {
    if (!pendingDemo.current) setActiveDemo(null);
    if (next === "cart" && isMiniCart) {
      miniCartTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setMiniCartOpen(true);
      pendingDemo.current = "cart";
      setDemoVisit((visit) => visit + 1);
      return;
    }
    setMiniCartOpen(false);
    focusPreviewOnNavigate.current = !!viewport.current?.contains(document.activeElement);
    setPage(next);
    setAdded(false);
    if (expanded && !pendingDemo.current) {
      requestAnimationFrame(() =>
        viewport.current?.parentElement?.scrollIntoView({
          block: "start",
          behavior: "instant" as ScrollBehavior,
        }),
      );
    }
  };
  const selectProduct = (id: number) => {
    setSelectedProduct(id);
    setQuantity(1);
    setProductSize("M");
    setFullImage(true);
    navigate("product");
  };
  const openCollection = (name = "all") => {
    setCollection(name);
    setCollectionFilter("all");
    setSearch("");
    navigate("shop");
  };
  const closeMiniCart = useCallback(() => {
    setMiniCartOpen(false);
    setActiveDemo(null);
    miniCartTrigger.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    if (!miniCartOpen) return;
    const handleMiniCartEscape = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        !(event.target instanceof Node) ||
        !miniCartPanel.current?.contains(event.target)
      ) return;
      // Handle the nested cart before the parent dialog's document capture listener.
      event.preventDefault();
      event.stopPropagation();
      closeMiniCart();
    };
    window.addEventListener("keydown", handleMiniCartEscape, true);
    return () => window.removeEventListener("keydown", handleMiniCartEscape, true);
  }, [miniCartOpen, closeMiniCart]);
  const openDemo = (demo: PreviewDemoFeature) => {
    setActiveDemo(demo);
    pendingDemo.current = demo;
    if (demo === "cart" && !cart.length) {
      setCart([{ product: 0, quantity: 1 }]);
    }
    if (demo === "search" || demo === "filters") {
      openCollection();
    } else if (demo === "reviews") {
      selectProduct(0);
    } else if (demo === "journal" || demo === "account" || demo === "cart") {
      navigate(demo);
    } else {
      navigate("home");
    }
    setDemoVisit((visit) => visit + 1);
  };
  const toggleSaved = (id: number) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const addProductToBag = (productId: number, amount = 1, variant = "", unitPrice?: number) => {
    if (!hasCart || !catalog.some(item => item.id === productId)) return;
    setCart(current => addDemoCartItem(current, { product: productId, quantity: amount, variant, unitPrice }));
  };
  const addToBag = () => {
    addProductToBag(product.id, quantity, (signature === "clotya" && (!categoryContext || categoryContext === "Fashion")) ? productSize : "");
    setAdded(true);
    if (isMiniCart) navigate("cart");
  };
  const setCartQuantity = (id: number, amount: number, variant = "") =>
    setCart((current) =>
      amount < 1
        ? current.filter((item) => item.product !== id || (item.variant || "") !== variant)
        : current.map((item) =>
            item.product === id && (item.variant || "") === variant
              ? { ...item, quantity: Math.min(99, amount) }
              : item,
          ),
    );
  const focus =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const cta = cn(
    "min-h-11 min-w-0 max-w-full rounded-full px-4 py-3 text-sm text-center break-words [&>svg]:shrink-0 font-semibold bg-primary text-primary-foreground inline-flex gap-2 items-center justify-center motion-safe:transition-opacity hover:opacity-90",
    focus,
  );
  const quiet = cn(
    "min-h-11 min-w-0 max-w-full inline-flex gap-2 items-center justify-center rounded-full px-4 py-2 text-sm text-center break-words [&>svg]:shrink-0 border border-border bg-background text-heading",
    focus,
  );
  const section = "p-[clamp(1.25rem,4.8cqw,3rem)]";
  const tabs = [
    ["home", p.home],
    ["shop", p.shop],
    ["product", p.product],
    ...(hasCart ? [["cart", isMiniCart ? scopeCopy.miniCartTitle : p.cart]] : []),
    ...(capabilities.journal ? [["journal", p.journal]] : []),
    ...(capabilities.account ? [["account", p.account]] : []),
  ];
  const photo = (src: string, alt: string, className = "") => (
    <Image
      src={src}
      alt={alt}
      width={900}
      height={1000}
      unoptimized
      className={cn("w-full h-full object-cover", className)}
    />
  );
  const filtered = catalog
    .filter(
      (item) =>
        (collection === "all" ||
          (collection === "saved"
            ? saved.includes(item.id)
            : item.collection === collection)) &&
        (collectionFilter === "all" || item.collection === collectionFilter) &&
        `${item.name} ${item.collection}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name-asc"
        ? a.name.localeCompare(b.name)
        : sort === "name-desc"
          ? b.name.localeCompare(a.name)
          : sort === "price-asc"
            ? a.price - b.price
            : sort === "price-desc"
              ? b.price - a.price
              : a.id - b.id,
    );
  const products = (items = catalog) => (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10.5rem),1fr))] gap-x-4 gap-y-7">
      {items.map((item) => (
        <article key={item.id} className="min-w-0 group">
          <div className="relative rounded-xl overflow-hidden bg-muted">
            <button
              type="button"
              onClick={() => selectProduct(item.id)}
              className={cn("block aspect-[4/5] w-full overflow-hidden", focus)}
              aria-label={`${detail.viewProduct}: ${item.name}`}
            >
              {photo(
                item.src,
                item.name,
                "motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]",
              )}
            </button>
            <span className="absolute left-3 top-3 rounded-full bg-background px-2.5 py-1.5 text-[10px] font-semibold tracking-widest pointer-events-none">
              {String(item.id + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => toggleSaved(item.id)}
              aria-label={`${saved.includes(item.id) ? detail.unsave : detail.save}: ${item.name}`}
              aria-pressed={saved.includes(item.id)}
              className={cn(
                "absolute right-2 top-2 size-11 rounded-full bg-background text-heading flex items-center justify-center",
                focus,
              )}
            >
              <Heart
                size={17}
                aria-hidden="true"
                className={cn(
                  saved.includes(item.id) && "fill-current text-primary",
                )}
              />
            </button>
          </div>
          <button
            type="button"
            onClick={() => selectProduct(item.id)}
            className={cn("w-full min-h-11 text-left rounded mt-2", focus)}
          >
            <span className="flex justify-between items-start gap-2 font-semibold text-sm">
              <span className="break-words min-w-0">{item.name}</span>
              <ArrowUpRight
                size={16}
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="text-xs block mt-1 opacity-70">
              {item.collection}
            </span>
          </button>
          <p className="mt-1 text-sm">
            {formatPrice(item.price)}{" "}
            <span className="text-[11px] opacity-60">
              · {detail.samplePrice}
            </span>
          </p>
        </article>
      ))}
    </div>
  );
  const heroCopy = (
    <div
      className={cn(
        "min-w-0",
        [1, 5].includes(layout) && "max-w-xl mx-auto text-center",
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5">
        {detail.edition}
      </p>
      <h3
        className={cn(
          "font-heading break-words leading-[1.02] studio-hero-title",
        )}
      >
        {values.headline || copy.defaults.headline}
      </h3>
      <p className="my-5 text-sm leading-relaxed opacity-80 break-words max-w-lg">
        {values.brief}
      </p>
      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          [1, 5].includes(layout) && "justify-center",
        )}
      >
        <button type="button" className={cta} onClick={() => openCollection()}>
          {p.collection}
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        {layout !== 5 && (
          <button
            type="button"
            className="min-h-11 text-sm underline underline-offset-4 rounded px-1 focus-visible:outline focus-visible:outline-2"
            onClick={() => selectProduct(0)}
          >
            {detail.viewProduct}
          </button>
        )}
      </div>
    </div>
  );
  const heroImage = (
    <div
      className={cn(
        "relative overflow-hidden bg-muted w-full",
        layout === 2
          ? "aspect-square rounded-full studio-product-depth"
          : "aspect-[4/5] rounded-t-[8rem] rounded-b-xl",
        layout === 1 && "aspect-[16/9] rounded-2xl max-h-[420px]",
      )}
    >
      {photo(catalog[0].src, productName)}
      {layout !== 2 && (
        <div className="absolute bottom-3 inset-x-3 bg-background rounded-lg px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] tracking-widest opacity-60">
              {detail.selected}
            </p>
            <p className="text-sm font-semibold truncate">{productName}</p>
          </div>
          <button
            type="button"
            aria-label={detail.viewProduct}
            onClick={() => selectProduct(0)}
            className={cn(
              "size-11 shrink-0 rounded-full border border-border flex items-center justify-center",
              focus,
            )}
          >
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
  const demoButton = (demo: PackagePreviewDemo) => (
    <button
      key={demo.id}
      type="button"
      onClick={() => openDemo(demo.id)}
      aria-controls={`${previewId}-viewport`}
      aria-pressed={activeDemo === demo.id}
      className={cn(
        "min-h-11 rounded-xl border p-3 text-left motion-safe:transition-colors",
        focus,
        activeDemo === demo.id
          ? "border-primary bg-mix-primary/5"
          : "border-border bg-background hover:border-mix-primary/50",
      )}
    >
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-heading">
        {demo.label}
        <ArrowRight size={15} className="shrink-0 text-primary" aria-hidden="true" />
      </span>
      <span className="mt-1 block text-xs leading-relaxed text-paragraph">
        {demo.benefit}
      </span>
    </button>
  );

  const dedicatedHome = ["clotya", "ecolife", "beauty", "living", "tech"].includes(categoryReference?.signatureTheme ?? "");
  const showcase = !themeFallback && !dedicatedHome && categoryReference?.layout === layout ? (getShopifyShowcase(referenceId) || artwork) : null;


  if (values.businessType === "services") return <ShopifyServicePreview plan={plan} packageName={planName} values={values} images={images} logo={logo} mobile={mobile} layout={layout} palette={palette} signatureTheme={categoryContext ? signature ?? undefined : undefined} />;

  if (referenceId === "atelier-commerce-studio" && !themeFallback && page === "home") {
    return <div className={cn("w-full min-w-0 mx-auto", mobile && "max-w-sm")}>
      <ShopifyCommerceStudio brand={values.brand || "ATELIER"} cartCount={cartCount}
        products={catalog.map(item => ({ ...item, priceLabel: formatPrice(item.price) }))}
        onBrowse={openCollection} onProduct={selectProduct}
        onAddToBag={(id, purchase) => addProductToBag(id, purchase?.quantity, purchase?.variant, purchase?.unitPrice)}
        onViewBag={() => navigate("cart")} />
    </div>;
  }

  return (
    <div className={cn("w-full min-w-0 space-y-4 mx-auto", mobile && "max-w-sm")}>
      {!compactScope && scopeMode === "reference" && (
        <div className="rounded-xl border border-border bg-secondary-background px-4 py-3 text-heading">
          <p className="text-xs font-semibold">{scopeCopy.referenceTitle}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-paragraph">{scopeCopy.referenceNote}</p>
        </div>
      )}
      {!compactScope && scopeMode === "package" && (
        <details open className="rounded-2xl border border-border bg-secondary-background px-4 py-2 text-heading">
          <summary className="min-h-11 cursor-pointer list-none rounded-lg py-2 focus-visible:ring-2 focus-visible:ring-primary">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">{planName} · {scopeCopy.demoLabel}<ChevronDown size={16} aria-hidden="true" /></span>
            <span className="mt-1 block text-xs text-paragraph">{profile.designTitle}</span>
          </summary>
          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-5">
            <div>
              <p className="text-xs font-semibold text-paragraph">{scopeCopy.designLabel}</p>
              <h4 className="font-heading text-xl mt-1">{profile.designTitle}</h4>
              <p className="mt-2 text-xs leading-relaxed text-paragraph">{profile.designBody}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-paragraph">{scopeCopy.deliveryLabel}</p>
              <ul className="mt-2 grid gap-1.5">
                {profile.delivery.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed"><Check size={14} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              {profile.delivery.length > 4 && (
                <details className="mt-2">
                  <summary className={cn("min-h-11 flex items-center gap-2 cursor-pointer text-xs underline underline-offset-4 rounded", focus)}>{scopeCopy.delivery}<ChevronDown size={14} aria-hidden="true" /></summary>
                  <ul className="grid gap-1.5 pb-2">
                    {profile.delivery.slice(4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs leading-relaxed"><Check size={14} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </details>
              )}
              <p className="mt-2 text-[11px] leading-relaxed text-paragraph">{scopeCopy.deliveryNote}</p>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4">
            <p className="mb-3 text-xs font-semibold">{scopeCopy.demoLabel}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-2">{profile.demos.slice(0, 3).map(demoButton)}</div>
            {profile.demos.length > 3 && (
              <details className="mt-2">
                <summary className={cn("min-h-11 flex items-center gap-2 cursor-pointer text-xs font-semibold rounded", focus)}>{scopeCopy.moreDemos}<ChevronDown size={14} aria-hidden="true" /></summary>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-2">{profile.demos.slice(3).map(demoButton)}</div>
              </details>
            )}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-paragraph">{scopeCopy.sampleNote}</p>
          {activeDemo && (
            <p role="status" className="mt-2 text-xs font-semibold text-primary">{scopeCopy.demoStatus}: {profile.demos.find((demo) => demo.id === activeDemo)?.label}</p>
          )}
        </details>
      )}
    <div
      style={
        {
          "--primary": colours.accent,
          "--primary-foreground": buttonInk,
          "--background": colours.surface,
          "--secondary-background": colours.soft,
          "--foreground": colours.ink,
          "--heading": colours.ink,
          "--paragraph": colours.ink,
          "--secondary": colours.ink,
          "--secondary-foreground": colours.surface,
          "--muted": colours.soft,
          "--muted-foreground": colours.ink,
          "--border":
            "color-mix(in srgb, var(--heading) 14%, var(--background))",
          "--ring": colours.accent,
        } as CSSProperties
      }
      className={cn(
        artwork && referenceId !== "atelier-commerce-studio" && "studio-artwork-store",
        "studio-storeframe bg-background text-heading rounded-2xl border border-border overflow-hidden mx-auto shadow-xl w-full min-w-0 [overflow-wrap:anywhere]",
        mobile && "max-w-sm",
      )}
    >
      {!compactScope && scopeMode === "package" && <p className="border-b border-border bg-secondary-background px-4 py-3 text-[11px] leading-relaxed">{scopeCopy.illustrativeNote}</p>}
      <div className={cn("text-center text-[10px] font-semibold tracking-[0.18em] px-4 text-primary-foreground bg-primary", signature ? "py-2" : "py-3")}>
        {categoryContext ? `EXPLORE ${categoryContext.toUpperCase()}` : signatureDefinition?.announcement || p.welcome}
      </div>
      <header className={cn("px-[clamp(1rem,4cqw,2.5rem)] border-b border-border flex flex-wrap justify-between gap-3 items-center", signature ? "py-2.5" : "py-4")}>
        <button
          type="button"
          onClick={() => navigate("home")}
          className={cn(
            "font-heading text-2xl min-w-0 break-words min-h-11 text-left",
            signature ? "flex-1 [@container_studio_(min-width:640px)]:flex-none [@container_studio_(min-width:640px)]:whitespace-nowrap" : "flex-1",
            focus,
          )}
        >
          {logo ? (
            <Image
              src={logo}
              width={120}
              height={45}
              alt={brand}
              unoptimized
              className="h-auto w-auto max-h-12 max-w-full object-contain object-left"
            />
          ) : (
            brand
          )}
        </button>
        {signature && (
          <form
            role="search"
            aria-label={signaturePreviewCopy.search}
            onSubmit={event => { event.preventDefault(); setCollection("all"); setCollectionFilter("all"); navigate("shop"); }}
            className="order-3 flex w-full min-w-0 items-center rounded border border-border bg-secondary-background px-2 [@container_studio_(min-width:640px)]:order-none [@container_studio_(min-width:640px)]:w-auto [@container_studio_(min-width:640px)]:flex-[2]"
          >
            <label htmlFor={`${previewId}-header-search`} className="sr-only">{signaturePreviewCopy.search}</label>
            <input
              id={`${previewId}-header-search`}
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder={signaturePreviewCopy.searchPlaceholder}
              className={cn("min-h-11 w-full min-w-0 rounded-full bg-transparent px-2 text-sm", focus)}
            />
            <button type="submit" aria-label={signaturePreviewCopy.search} className={cn("flex size-11 shrink-0 items-center justify-center rounded-full", focus)}><Search size={18} aria-hidden="true" /></button>
          </form>
        )}
        <div className="flex gap-2 shrink-0">
          {signature && capabilities.account && (
            <button type="button" aria-label={signaturePreviewCopy.account} onClick={() => navigate("account")} className={cn("size-11 rounded-full flex items-center justify-center", focus)}>
              <UserRound size={18} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            aria-label={`${detail.saved} (${saved.length})`}
            onClick={() => openCollection("saved")}
            className={cn(
              "size-11 rounded-full flex items-center justify-center relative",
              focus,
            )}
          >
            <Heart size={18} aria-hidden="true" />
            {saved.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground rounded-full min-w-5 h-5 text-[10px] flex items-center justify-center">
                {saved.length}
              </span>
            )}
          </button>
          {hasCart && (
            <button
              type="button"
              aria-label={`${p.cart} (${cartCount})`}
              onClick={() => navigate("cart")}
              className={cn(
                "min-w-11 min-h-11 rounded-full flex gap-2 items-center justify-center",
                focus,
              )}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              <span className="text-xs">{cartCount}</span>
            </button>
          )}
        </div>
      </header>
      {themeFallback && <p className="border-b border-border bg-muted px-4 py-3 text-xs text-paragraph">{themeUpgradeCopy.previewAdapted.replace("{package}", planName).replace("{required}", getThemeMinimumPackage(requestedLayout))}</p>}
      <nav
        aria-label={detail.navigationLabel}
        className="flex flex-wrap items-center gap-x-1 px-3 border-b border-border"
      >
        {tabs.map(([key, label]) => (
          <button
            type="button"
            key={key}
            aria-current={page === key || (key === "cart" && miniCartOpen) ? "page" : undefined}
            onClick={() => navigate(key)}
            className={cn(
              "px-3 min-h-11 text-xs border-b-2",
              focus,
              page === key || (key === "cart" && miniCartOpen)
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-paragraph",
            )}
          >
            {label}
            {key === "cart" && cartCount > 0 ? ` (${cartCount})` : ""}
          </button>
        ))}
        {signature && Array.from(new Set(catalog.map(item => item.collection))).slice(0, 5).map(name => (
          <button type="button" key={name} onClick={() => openCollection(name)} className={cn("hidden min-h-11 px-2 text-xs [@container_studio_(min-width:740px)]:block", focus)}>{name}</button>
        ))}
        {capabilities.currency && (
          <ShopifyStudioSelect
            ref={currencySelect}
            aria-label={detail.currencyLabel}
            wrapperClassName="ml-auto w-28"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>USD</option>
            <option>EUR</option>
          </ShopifyStudioSelect>
        )}
      </nav>
      <div
        id={`${previewId}-viewport`}
        ref={viewport}
        role="region"
        aria-label={`${detail.viewportLabel}: ${tabs.find(([key]) => key === page)?.[1] || p.home}`}
        tabIndex={expanded ? -1 : 0}
        className={cn(
          "relative min-h-[430px] min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
          !expanded && "max-h-[720px] overflow-y-auto overscroll-contain",
        )}
      >
        {page === "home" && (
          <>
            {SignatureHome ? (
              <SignatureHome
                artworkMode={!!artwork}
                heroSrc={artwork?.hero}
                categoryContext={categoryContext && shopifyCategoryLabel(categoryContext)}
                products={catalog.map(item => ({ ...item, priceLabel: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price) }))}
                headline={artwork?.headline && values.headline === categoryReference?.headline ? artwork.headline : values.headline}
                brief={artwork?.brief && values.brief === categoryReference?.brief ? artwork.brief : values.brief}
                onBrowse={openCollection}
                onProduct={selectProduct}
                onAddToBag={(signature === "clotya" && (!categoryContext || categoryContext === "Fashion")) ? selectProduct : (id, purchase) => addProductToBag(id, purchase?.quantity, purchase?.variant, purchase?.unitPrice)}
                onViewBag={() => navigate("cart")}
                onJournal={() => navigate("journal")}
              />
            ) : showcase && categoryReference && layout < 6 ? (
              <ShopifyReferenceHome heroSrc={artwork?.hero} products={catalog.map(item => ({ ...item, priceLabel: formatPrice(item.price) }))}
                layout={layout} headline={values.headline || categoryReference.headline} brief={values.brief || categoryReference.brief}
                categoryContext={categoryReference.category} onBrowse={openCollection} onProduct={selectProduct}
                onAddToBag={id => addProductToBag(id)} onViewBag={() => navigate("cart")} onJournal={() => navigate("journal")} />
            ) : layout === 6 || layout === 7 || layout === 8 || layout === 9 ? (
              <ShopifyPremiumPreview
                layout={layout}
                headline={values.headline || copy.defaults.headline}
                brief={values.brief}
                productName={productName}
                images={sourceImages}
                products={catalog.map(item => ({ ...item, priceLabel: formatPrice(item.price) }))}
                onBrowse={openCollection}
                onProduct={(id = 0) => selectProduct(id)}
                onAddToBag={hasCart ? addProductToBag : undefined}
                onViewBag={hasCart ? () => navigate("cart") : undefined}
              />
            ) : layout === 3 ? (
              <div className="grid relative min-h-[560px] bg-muted">
                <div className="col-start-1 row-start-1 absolute inset-0">
                  {photo(catalog[0].src, productName)}
                </div>
                <div
                  className={cn(
                    "col-start-1 row-start-1 relative self-end z-10",
                    section,
                  )}
                >
                  <div className="bg-background text-heading rounded-xl p-[clamp(1.25rem,4cqw,2.5rem)] max-w-md shadow-lg">
                    {heroCopy}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "gap-8 items-center",
                  section,
                  !mobile && [0, 2, 4].includes(layout)
                    ? "studio-two-column grid"
                    : "flex flex-col",
                  layout === 2
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-secondary-background",
                  layout === 5 && "py-12",
                )}
              >
                <div
                  className={cn(
                    "min-w-0 w-full",
                    layout === 4 &&
                      "order-2 rounded-2xl bg-background text-heading p-6",
                  )}
                >
                  {heroCopy}
                </div>
                {layout !== 5 && (
                  <div
                    className={cn(
                      "w-full min-w-0",
                      layout === 2 && "py-6 px-3",
                      layout === 4 && "order-1",
                    )}
                  >
                    {heroImage}
                  </div>
                )}
                {layout === 2 && (
                  <p className="col-span-full text-[10px] tracking-[0.2em] opacity-60 w-full border-t border-current pt-5">
                    {detail.issue}
                  </p>
                )}
              </div>
            )}
            {!premiumLayout && !SignatureHome && !showcase && (
              <ShopifyStorefrontSections
                key={`${planName}-${catalogIdentity}`}
                mode={storefrontProfile.layout}
                brand={brand}
                brief={values.brief}
                products={catalog.map(item => ({ ...item, priceLabel: formatPrice(item.price) }))}
                mobile={mobile}
                onCollection={openCollection}
                onProduct={selectProduct}
                onAddProduct={hasCart ? (id) => {
                  addProductToBag(id);
                  if (isMiniCart) navigate("cart");
                } : undefined}
              />
            )}
            {capabilities.journal && !showcase && !SignatureHome && (
              <section className={cn("bg-secondary-background", section)}>
                <p className="text-[10px] tracking-widest text-primary mb-3">
                  {detail.journalEyebrow}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <h4 className="font-heading text-3xl max-w-sm">
                    {detail.journalTitle}
                  </h4>
                  <button
                    type="button"
                    className={quiet}
                    onClick={() => navigate("journal")}
                  >
                    {p.journalTitle}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </section>
            )}
            {capabilities.newsletter && !(showcase && !SignatureHome && layout < 6) && (
              <section ref={newsletterSection} tabIndex={-1} className={cn("border-t border-border text-center rounded", section, (signature === "clotya" && (!categoryContext || categoryContext === "Fashion")) && "bg-secondary text-secondary-foreground", signature === "ecolife" && "bg-secondary-background", focus)}>
                <p className="text-[10px] tracking-widest text-primary mb-3">
                  {detail.newsletterTag}
                </p>
                <h4 className="text-2xl font-heading">{categoryContext ? "New ideas, delivered." : signatureDefinition?.newsletter || p.newsletter}</h4>
                <p className="text-sm opacity-75 py-4">{signature ? signaturePreviewCopy.newsletterBody : p.newsletterBody}</p>
                <form
                  className="mx-auto flex max-w-lg flex-wrap items-end justify-center gap-3"
                  onSubmit={event => { event.preventDefault(); setJoined(true); }}
                >
                  <label className="min-w-0 flex-1 basis-48 text-left text-xs">
                    <span className="mb-2 block">{storefrontCopy.newsletterLabel}</span>
                    <input type="email" required autoComplete="off" placeholder={storefrontCopy.newsletterPlaceholder} className={cn("min-h-12 w-full rounded-full border border-border bg-background px-4 py-3 text-base text-heading", focus)} />
                  </label>
                  <button type="submit" className={cn(cta, "min-h-12")}>
                    {joined ? <Check size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
                    {p.newsletterButton}
                  </button>
                </form>
                {joined && (
                  <p role="status" className="text-xs mt-3">
                    {p.newsletterNote}
                  </p>
                )}
              </section>
            )}
            {capabilities.custom && !signature && (
              <section ref={customSection} tabIndex={-1} className={cn("m-5 border border-dashed border-primary rounded-xl p-6", focus)}>
                <p className="text-xs text-primary mb-3">{scopeCopy.plannedTitle}</p>
                <h4 className="font-heading text-xl">{scopeCopy.customFormTitle}</h4>
                <p className="text-sm opacity-75 mt-2">{scopeCopy.customFormBody}</p>
                <p className="text-xs opacity-70 mt-3">{scopeCopy.customFormNote}</p>
              </section>
            )}
          </>
        )}
        {page === "shop" && (
          <div className={section}>
            <p className="text-[10px] tracking-[0.2em] text-primary mb-3">
              {detail.edition}
            </p>
            <h3 className="font-heading text-[clamp(2rem,5cqw,3.5rem)] leading-tight">
              {collection === "saved"
                ? detail.saved
                : collection === "all"
                  ? p.featured
                  : collection}
            </h3>
            <p className="text-sm opacity-75 leading-relaxed mt-4 mb-6">
              {detail.collectionIntro}
            </p>
            <div
              className="flex flex-wrap gap-2 mb-5"
              role="group"
              aria-label={templateCopy.collections}
            >
              {[
                ["all", detail.all],
                ...Array.from(
                  new Set(catalog.map((item) => item.collection)),
                ).map((name) => [name, name]),
                ["saved", detail.saved],
              ].map(([key, label]) => (
                <button
                  type="button"
                  key={key}
                  aria-pressed={collection === key}
                  onClick={() => setCollection(key)}
                  className={cn(
                    "rounded-full min-h-11 px-4 py-2 text-xs border",
                    focus,
                    collection === key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border",
                  )}
                >
                  {label}
                  {key === "saved" ? ` (${saved.length})` : ""}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-3 border-y border-border py-4 mb-6">
              {capabilities.filters && (
                <label className="text-xs flex-1 min-w-[min(100%,12rem)]">
                  <span className="block mb-2 font-semibold">{scopeCopy.filterLabel}</span>
                  <ShopifyStudioSelect
                    ref={filterControl}
                    value={collectionFilter}
                    onChange={(event) => setCollectionFilter(event.target.value)}
                  >
                    <option value="all">{detail.all}</option>
                    {Array.from(new Set(catalog.map((item) => item.collection))).map((name) => <option key={name} value={name}>{name}</option>)}
                  </ShopifyStudioSelect>
                  <span className="block mt-2 text-[11px] leading-relaxed opacity-70">{scopeCopy.filterBody}</span>
                </label>
              )}
              {capabilities.search && (
                <div className="block flex-1 min-w-[min(100%,12rem)] text-xs">
                  <label htmlFor={`${previewId}-search`} className="block mb-2">{detail.searchLabel}</label>
                  <div className="flex items-center gap-2 rounded-lg border border-border px-3">
                    <Search size={16} className="shrink-0" aria-hidden="true" />
                    <input
                      ref={searchInput}
                      id={`${previewId}-search`}
                      type="search"
                      aria-label={detail.searchLabel}
                      placeholder={detail.searchPlaceholder}
                      className={cn(
                        "w-full min-w-0 py-3 bg-transparent text-base rounded",
                        focus,
                      )}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <button
                        type="button"
                        aria-label={templateCopy.clear}
                        onClick={() => setSearch("")}
                        className={cn("size-11 shrink-0 rounded", focus)}
                      >
                        <X size={16} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <label className="text-xs flex-1 min-w-[min(100%,10rem)]">
                <span className="block mb-2">{detail.sortLabel}</span>
                <ShopifyStudioSelect
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {detail.sortOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </ShopifyStudioSelect>
              </label>
            </div>
            <p className="text-xs opacity-60 mb-5" aria-live="polite">
              {filtered.length}{" "}
              {filtered.length === 1 ? detail.piece : detail.pieces} ·{" "}
              {copy.ui.sample}
            </p>
            {filtered.length ? (
              products(filtered)
            ) : (
              <div className="border border-dashed border-border rounded-xl p-8 text-center">
                <Heart
                  size={24}
                  className="mx-auto mb-4 text-primary"
                  aria-hidden="true"
                />
                <h4 className="font-heading text-2xl">{detail.emptyTitle}</h4>
                <p className="text-sm opacity-70 mt-3 mb-5">
                  {collection === "saved" && !search
                    ? detail.emptySaved
                    : p.noResults}
                </p>
                <button
                  type="button"
                  className={quiet}
                  onClick={() => openCollection()}
                >
                  {detail.clear}
                </button>
              </div>
            )}
            <p className="text-xs opacity-60 mt-6 leading-relaxed">
              {detail.sampleNote}
            </p>
          </div>
        )}
        {page === "product" && (
          <div className={section}>
            <button
              type="button"
              className={cn(
                "min-h-11 text-xs inline-flex items-center gap-2 rounded mb-4",
                focus,
              )}
              onClick={() => navigate("shop")}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {detail.backToCollection}
            </button>
            <div
              className={cn(
                "grid gap-7 items-start",
                !mobile && "studio-two-column",
              )}
            >
              <div className="min-w-0">
                <div className="relative aspect-[4/5] bg-muted rounded-xl overflow-hidden">
                  {photo(
                    product.src,
                    product.name,
                    fullImage ? "object-contain" : "",
                  )}
                  <button
                    type="button"
                    onClick={() => setFullImage((current) => !current)}
                    aria-pressed={fullImage}
                    className={cn(
                      "absolute bottom-3 inset-x-3 rounded-full min-h-11 bg-background text-heading px-3 py-2 text-xs inline-flex items-center justify-center gap-2",
                      focus,
                    )}
                  >
                    <Maximize2 size={14} aria-hidden="true" />
                    {fullImage ? detail.cropImage : detail.fullImage}
                  </button>
                </div>
                {catalog.length > 1 && (
                  <div className="mt-4">
                    <p className="text-xs mb-3">{detail.differentPiece}</p>
                    <div className="flex flex-wrap gap-2">
                      {catalog.map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          aria-label={`${detail.viewProduct}: ${item.name}`}
                          aria-pressed={product.id === item.id}
                          onClick={() => selectProduct(item.id)}
                          className={cn(
                            "size-16 rounded-lg overflow-hidden border-2",
                            focus,
                            product.id === item.id
                              ? "border-primary"
                              : "border-transparent opacity-60 hover:opacity-100",
                          )}
                        >
                          {photo(item.src, item.name)}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-60 mt-3">
                      {detail.imageNote}
                    </p>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.16em] text-primary mb-3">
                  {detail.sampleLabel}
                </p>
                <p className="text-xs opacity-60 mb-2">{product.collection}</p>
                <h3 className="font-heading text-[clamp(1.875rem,4.2cqw,3rem)] leading-tight break-words">
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-2 items-baseline my-4">
                  <p className="text-2xl font-heading">
                    {formatPrice(product.price)}
                  </p>
                  <span className="text-xs opacity-60">
                    {detail.samplePrice}
                  </span>
                </div>
                <p className="text-sm leading-relaxed opacity-75 mb-6">
                  {product.description}
                </p>
                {(signature === "clotya" && (!categoryContext || categoryContext === "Fashion")) && (
                  <fieldset className="mb-6">
                    <legend className="mb-3 text-sm font-semibold">{signaturePreviewCopy.size}</legend>
                    <div className="flex flex-wrap gap-2">
                      {signaturePreviewCopy.sizes.map(size => (
                        <button key={size} type="button" aria-pressed={productSize === size} onClick={() => { setProductSize(size); setAdded(false); }} className={cn("min-h-11 min-w-11 rounded-lg border px-3 py-2 text-sm", focus, productSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background")}>{size}</button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs opacity-70">{signaturePreviewCopy.sampleSize}</p>
                  </fieldset>
                )}
                <div className="border-y border-border py-5 flex flex-wrap justify-between items-end gap-4">
                  <div>
                    <p className="text-xs mb-2">{templateCopy.quantity}</p>
                    <div
                      className="inline-flex items-center border border-border rounded-full"
                      role="group"
                      aria-label={templateCopy.quantity}
                    >
                      <button
                        type="button"
                        aria-label={detail.decrease}
                        disabled={quantity <= 1}
                        onClick={() => {
                          setQuantity((q) => q - 1);
                          setAdded(false);
                        }}
                        className={cn(
                          "size-11 flex items-center justify-center rounded-full disabled:opacity-30",
                          focus,
                        )}
                      >
                        <Minus size={15} aria-hidden="true" />
                      </button>
                      <span
                        className="min-w-8 text-center text-sm"
                        aria-live="polite"
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={detail.increase}
                        disabled={quantity >= 99}
                        onClick={() => {
                          setQuantity((q) => q + 1);
                          setAdded(false);
                        }}
                        className={cn(
                          "size-11 flex items-center justify-center rounded-full disabled:opacity-30",
                          focus,
                        )}
                      >
                        <Plus size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-60 mb-2">
                      {detail.lineTotal}
                    </p>
                    <p className="text-lg font-semibold pb-2">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {hasCart && (
                    <button
                      type="button"
                      className={cn(cta, "flex-1 basis-32")}
                      onClick={addToBag}
                    >
                      <ShoppingBag size={17} aria-hidden="true" />
                      {p.add}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleSaved(product.id)}
                    aria-label={
                      saved.includes(product.id) ? detail.unsave : detail.save
                    }
                    aria-pressed={saved.includes(product.id)}
                    className={cn(quiet, hasCart ? "shrink-0" : "w-full")}
                  >
                    <Heart
                      size={18}
                      aria-hidden="true"
                      className={cn(
                        saved.includes(product.id) &&
                          "fill-current text-primary",
                      )}
                    />
                    {!hasCart &&
                      (saved.includes(product.id)
                        ? detail.savedNote
                        : detail.save)}
                  </button>
                </div>
                {added && (
                  <div
                    role="status"
                    className="bg-secondary-background rounded-xl p-4 mt-3"
                  >
                    <p className="text-sm flex gap-2 items-center">
                      <Check size={16} aria-hidden="true" />
                      {detail.added}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("cart")}
                      className={cn(
                        "text-sm font-semibold underline underline-offset-4 min-h-11",
                        focus,
                      )}
                    >
                      {detail.viewBag} ({cartCount})
                    </button>
                  </div>
                )}
                <p className="text-[11px] text-center opacity-60 leading-relaxed mt-3">
                  {detail.noPurchase}
                </p>
                <div className="mt-6">
                  {[
                    ...detail.details,
                    {
                      title: templateCopy.shippingTitle,
                      body: templateCopy.shippingBody,
                    },
                  ].map((item) => (
                    <details
                      key={item.title}
                      className="border-b border-border py-2"
                    >
                      <summary
                        className={cn(
                          "text-sm font-semibold cursor-pointer list-none min-h-11 flex items-center justify-between gap-3",
                          focus,
                        )}
                      >
                        {item.title}
                        <ChevronDown
                          size={15}
                          aria-hidden="true"
                          className="shrink-0"
                        />
                      </summary>
                      <p className="text-xs leading-relaxed opacity-70 pb-4">
                        {item.body}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
            <section className="bg-secondary-background rounded-xl mt-8 p-[clamp(1.25rem,4cqw,2.5rem)]">
              <p className="text-[10px] tracking-widest text-primary mb-3">
                {detail.edition}
              </p>
              <h4 className="font-heading text-3xl">{detail.detailsTitle}</h4>
              <p className="text-sm leading-relaxed opacity-75 mt-4 max-w-2xl">
                {detail.detailsBody}
              </p>
            </section>
            {storefrontProfile.recommendations && catalog.length > 1 && (
              <section data-storefront-section="related-products" className="mt-8 border-t border-border pt-7">
                <p className="mb-2 text-[10px] tracking-[0.18em] text-primary">{storefrontCopy.recommendationsEyebrow}</p>
                <h4 className="mb-5 font-heading text-[clamp(1.65rem,4cqw,2.5rem)]">{storefrontCopy.recommendationsTitle}</h4>
                {products(catalog.filter(item => item.id !== product.id))}
                <p className="mt-4 text-xs leading-relaxed opacity-70">{storefrontCopy.recommendationsNote}</p>
              </section>
            )}
            {capabilities.reviews && (
              <section ref={reviewsSection} tabIndex={-1} className={cn("mt-7 border-t border-border pt-6 rounded", focus)}>
                <h4 className="font-heading text-xl">{p.reviews}</h4>
                <p className="text-sm opacity-70 mt-2">{p.reviewSample}</p>
              </section>
            )}
          </div>
        )}
        {page === "cart" && hasCart && !isMiniCart && (
          <div className={section}>
            <p className="text-[10px] tracking-[0.18em] text-primary mb-3">
              {detail.sampleLabel}
            </p>
            <h3 className="font-heading text-4xl">
              {capabilities.cart === "custom" ? scopeCopy.customCartTitle : scopeCopy.fullCartTitle} ({cartCount})
            </h3>
            <p className="text-sm opacity-75 mt-4 mb-7">{detail.bagIntro}</p>
            {cart.length ? (
              <div
                className={cn(
                  "grid gap-7 items-start",
                  !mobile && "studio-two-column",
                )}
              >
                <div className="min-w-0">
                  {cart.map((item) => {
                    const entry = catalog[item.product];
                    if (!entry) return null;
                    return (
                      <div
                        key={`${item.product}-${item.variant || ""}`}
                        className="flex flex-wrap gap-3 py-5 border-b border-border first:pt-0"
                      >
                        <button
                          type="button"
                          onClick={() => selectProduct(entry.id)}
                          className={cn(
                            "w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-muted",
                            focus,
                          )}
                          aria-label={`${detail.viewProduct}: ${entry.name}`}
                        >
                          {photo(entry.src, entry.name)}
                        </button>
                        <div className="min-w-[min(100%,10rem)] flex-1">
                          <p className="text-sm font-semibold break-words">
                            {entry.name}{item.variant && <span className="mt-1 block text-xs font-normal opacity-70">{item.variant}</span>}
                          </p>
                          <p className="text-xs opacity-70 my-2">
                            {formatPrice((item.unitPrice ?? entry.price) * item.quantity)}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center border border-border rounded-full">
                              <button
                                type="button"
                                aria-label={`${detail.decrease}: ${entry.name}${item.variant ? ` (${item.variant})` : ""}`}
                                onClick={() =>
                                  setCartQuantity(
                                    item.product,
                                    item.quantity - 1,
                                    item.variant,
                                  )
                                }
                                className={cn(
                                  "size-11 flex items-center justify-center rounded-full",
                                  focus,
                                )}
                              >
                                <Minus size={14} aria-hidden="true" />
                              </button>
                              <span aria-live="polite" className="min-w-5 text-xs text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`${detail.increase}: ${entry.name}${item.variant ? ` (${item.variant})` : ""}`}
                                disabled={item.quantity >= 99}
                                onClick={() =>
                                  setCartQuantity(
                                    item.product,
                                    item.quantity + 1,
                                    item.variant,
                                  )
                                }
                                className={cn(
                                  "size-11 flex items-center justify-center rounded-full disabled:opacity-30",
                                  focus,
                                )}
                              >
                                <Plus size={14} aria-hidden="true" />
                              </button>
                            </div>
                            <button
                              type="button"
                              className={cn(
                                "text-xs underline min-h-11 rounded",
                                focus,
                              )}
                              aria-label={`${p.remove}: ${entry.name}${item.variant ? ` (${item.variant})` : ""}`}
                              onClick={() => setCartQuantity(item.product, 0, item.variant)}
                            >
                              {p.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <aside className="min-w-0 bg-secondary-background rounded-xl p-4 md:p-5">
                  <h4 className="font-heading text-2xl mb-5">
                    {detail.orderSummary}
                  </h4>
                  <dl className="text-xs space-y-4">
                    <div className="flex justify-between gap-3">
                      <dt>{p.total}</dt>
                      <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>{detail.delivery}</dt>
                      <dd className="text-right opacity-60">
                        {detail.deliveryValue}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>{detail.taxes}</dt>
                      <dd className="text-right opacity-60">
                        {detail.taxesValue}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-xs leading-relaxed border-t border-border mt-5 pt-5 opacity-70">
                    {p.checkoutNote}
                  </p>
                  <button
                    type="button"
                    className={cn(cta, "mt-5 w-full")}
                    onClick={() => openCollection()}
                  >
                    {detail.continueShopping}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </aside>
              </div>
            ) : (
              <div className="rounded-xl bg-secondary-background text-center py-12 px-5">
                <ShoppingBag
                  size={32}
                  className="mx-auto text-primary mb-5"
                  aria-hidden="true"
                />
                <p className="font-heading text-2xl">{p.empty}</p>
                <p className="text-xs opacity-60 mt-3 mb-6">{p.checkoutNote}</p>
                <button
                  type="button"
                  className={cta}
                  onClick={() => openCollection()}
                >
                  {detail.continueShopping}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
        {page === "journal" && capabilities.journal && (
          <div className={section}>
            <p className="text-[10px] tracking-widest text-primary mb-3">
              {detail.journalEyebrow}
            </p>
            <h3 className="font-heading text-4xl leading-tight">
              {detail.journalTitle}
            </h3>
            <p className="text-sm opacity-75 leading-relaxed mt-4 mb-7">
              {detail.journalIntro}
            </p>
            {story !== null ? (
              <article>
                <button
                  type="button"
                  className={quiet}
                  onClick={() => setStory(null)}
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  {detail.closeStory}
                </button>
                <div className="aspect-[16/9] rounded-xl overflow-hidden my-5">
                  {photo(
                    catalog[story % catalog.length].src,
                    detail.journalStories[story].title,
                  )}
                </div>
                <p className="text-[10px] tracking-widest text-primary">
                  {copy.ui.sample}
                </p>
                <h4 className="font-heading text-3xl mt-3 mb-4">
                  {detail.journalStories[story].title}
                </h4>
                <p className="text-sm leading-relaxed opacity-75">
                  {detail.journalStories[story].body}
                </p>
                <p className="text-sm leading-relaxed opacity-75 mt-4">
                  {p.journalBody}
                </p>
              </article>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-5">
                {detail.journalStories.map((item, i) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setStory(i)}
                    className={cn(
                      "text-left rounded-xl overflow-hidden border border-border group",
                      focus,
                    )}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      {photo(
                        catalog[i % catalog.length].src,
                        item.title,
                        "motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]",
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] tracking-widest text-primary mb-3">
                        {item.category}
                      </p>
                      <h4 className="font-heading text-2xl">{item.title}</h4>
                      <span className="text-xs inline-flex items-center gap-2 mt-5">
                        {detail.readStory}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {page === "account" && capabilities.account && (
          <div className={section}>
            <p className="text-[10px] tracking-widest text-primary mb-3">
              {detail.sampleLabel}
            </p>
            <h3 className="font-heading text-3xl">{p.accountTitle}</h3>
            <p className="text-sm opacity-75 mt-4 mb-7">{p.accountBody}</p>
            {[p.orders, p.addresses, p.saved].map((item, i) => (
              <details
                key={item}
                className="border border-border rounded-xl p-4 mb-3"
              >
                <summary
                  className={cn(
                    "cursor-pointer min-h-11 flex items-center justify-between gap-3 list-none font-semibold text-sm",
                    focus,
                  )}
                >
                  {item}
                  <ChevronDown size={16} aria-hidden="true" />
                </summary>
                <p className="text-sm opacity-70 leading-relaxed pt-3 pb-2">
                  {detail.accountPanels[i]}
                </p>
                {i === 2 && (
                  <button
                    type="button"
                    className={quiet}
                    onClick={() => openCollection("saved")}
                  >
                    {detail.saved} ({saved.length})
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                )}
              </details>
            ))}
            <p className="text-xs opacity-60 mt-5">{detail.accountEmpty}</p>
          </div>
        )}
        {isMiniCart && miniCartOpen && (
          <aside
            ref={miniCartPanel}
            tabIndex={-1}
            aria-label={scopeCopy.miniCartTitle}
            className={cn("absolute top-3 inset-x-3 z-20 ml-auto max-w-sm max-h-[min(70vh,35rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-background p-5 shadow-xl", focus)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-widest text-primary">{detail.sampleLabel}</p>
                <h3 className="font-heading text-2xl mt-2">{scopeCopy.miniCartTitle} ({cartCount})</h3>
              </div>
              <button type="button" onClick={closeMiniCart} aria-label={scopeCopy.closeMiniCart} className={cn("size-11 shrink-0 flex items-center justify-center rounded-full border border-border", focus)}><X size={16} aria-hidden="true" /></button>
            </div>
            <p className="text-xs leading-relaxed opacity-75 mt-3 mb-4">{scopeCopy.miniCartBody}</p>
            {cart.length ? (
              <>
                {cart.map((item) => {
                  const entry = catalog[item.product];
                  if (!entry) return null;
                  return (
                    <div key={`${item.product}-${item.variant || ""}`} className="flex gap-3 border-t border-border py-4">
                      <button type="button" onClick={() => selectProduct(entry.id)} aria-label={`${detail.viewProduct}: ${entry.name}`} className={cn("h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted", focus)}>{photo(entry.src, entry.name)}</button>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{entry.name}{item.variant && <span className="block text-xs font-normal">{item.variant}</span>}</p>
                        <p className="text-xs mt-1">{formatPrice((item.unitPrice ?? entry.price) * item.quantity)}</p>
                        <div className="mt-2 inline-flex items-center rounded-full border border-border">
                          <button type="button" onClick={() => setCartQuantity(item.product, item.quantity - 1, item.variant)} aria-label={`${detail.decrease}: ${entry.name}${item.variant ? ` (${item.variant})` : ""}`} className={cn("size-11 rounded-full flex items-center justify-center", focus)}><Minus size={14} aria-hidden="true" /></button>
                          <span aria-live="polite" className="min-w-5 text-center text-xs">{item.quantity}</span>
                          <button type="button" onClick={() => setCartQuantity(item.product, item.quantity + 1, item.variant)} disabled={item.quantity >= 99} aria-label={`${detail.increase}: ${entry.name}${item.variant ? ` (${item.variant})` : ""}`} className={cn("size-11 rounded-full flex items-center justify-center disabled:opacity-30", focus)}><Plus size={14} aria-hidden="true" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <dl className="flex justify-between gap-3 border-t border-border pt-4 text-sm"><dt>{p.total}</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></dl>
              </>
            ) : <p className="py-5 text-sm">{p.empty}</p>}
            <p className="mt-4 text-[11px] leading-relaxed opacity-70">{p.checkoutNote}</p>
            <button type="button" onClick={closeMiniCart} className={cn(quiet, "mt-4 w-full")}>{detail.continueShopping}<ArrowRight size={15} aria-hidden="true" /></button>
          </aside>
        )}
      </div>
      {capabilities.currency && currency === "EUR" && (
        <p className="px-5 py-3 text-xs opacity-70 border-t border-border">
          {p.currencyNote}
        </p>
      )}
      {signature ? (
        <footer className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border px-[clamp(1rem,4cqw,2.5rem)] py-7 [@container_studio_(min-width:640px)]:grid-cols-4">
          <div className="col-span-2 [@container_studio_(min-width:640px)]:col-span-1">
            <p className="font-heading text-2xl">{brand}</p>
            <p className="mt-2 text-xs leading-relaxed opacity-70">{categoryContext ? categoryReference?.brief : signatureDefinition?.intro}</p>
          </div>
          <div><p className="mb-2 text-xs font-semibold">{signaturePreviewCopy.shop}</p>{Array.from(new Set(catalog.map(item => item.collection))).slice(0, 4).map(name => <button key={name} type="button" className={cn("block min-h-11 text-xs", focus)} onClick={() => openCollection(name)}>{name}</button>)}</div>
          <div><p className="mb-2 text-xs font-semibold">{signaturePreviewCopy.discover}</p><button type="button" className={cn("block min-h-11 text-xs", focus)} onClick={() => openCollection()}>{p.featured}</button><button type="button" className={cn("block min-h-11 text-xs", focus)} onClick={() => navigate("journal")}>{detail.journalTitle}</button></div>
          <div><p className="mb-2 text-xs font-semibold">{signaturePreviewCopy.help}</p>{capabilities.account && <button type="button" className={cn("block min-h-11 text-xs", focus)} onClick={() => navigate("account")}>{signaturePreviewCopy.account}</button>}<button type="button" className={cn("block min-h-11 text-xs", focus)} onClick={() => navigate("cart")}>{p.cart} ({cartCount})</button><button type="button" className={cn("block min-h-11 text-xs", focus)} onClick={() => openCollection("saved")}>{detail.saved}</button></div>
          <p className="col-span-2 border-t border-border pt-4 text-[10px] tracking-widest opacity-60 [@container_studio_(min-width:640px)]:col-span-4">{detail.sampleLabel}</p>
        </footer>
      ) : <footer className="px-5 py-5 border-t border-border bg-secondary-background flex flex-wrap items-center justify-between gap-3">
        <span className="font-heading text-lg break-words max-w-full">
          {brand}
        </span>
        <span className="text-[10px] tracking-widest">
          {detail.sampleLabel}
        </span>
      </footer>}
    </div>
    </div>
  );
}
