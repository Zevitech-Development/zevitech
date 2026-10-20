import type {
  shopifyRestoredReviews,
  shopifyRestoredReviewsContent,
} from "@/content/landing/shopify-restored-reviews-content";

export interface ShopifyRestoredReviewsProps {
  content?: typeof shopifyRestoredReviewsContent;
  reviews?: typeof shopifyRestoredReviews;
}

export interface ShopifyRestoredReviewCardProps {
  review: (typeof shopifyRestoredReviews)[number];
}
