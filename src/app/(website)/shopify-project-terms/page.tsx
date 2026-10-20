import { Metadata } from "next";
import ShopifyProjectTermsPage from "@/containers/website/shopify-project-terms-page";
import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Shopify Project Terms | Zevitech",
  description: "Review the project scope, design references, third-party costs and existing non-refundable policy for Zevitech Shopify development.",
  path: "/shopify-project-terms",
});

export default function Page() {
  return <ShopifyProjectTermsPage />;
}
