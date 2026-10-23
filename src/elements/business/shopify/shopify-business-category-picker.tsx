"use client";

import { useId } from "react";
import ShopifyStudioSelect from "./shopify-studio-select";
import {
  getShopifyBusinessCategoryOptions,
  SHOPIFY_CUSTOM_CATEGORY,
  shopifyBusinessCategoryCopy as copy,
  shopifyBusinessTypeOptions,
} from "@/content/landing/shopify-business-categories";
import type { ShopifyBusinessCategoryPickerProps } from "@/interfaces/shopify-business-category-interface";
import { cn } from "@/lib/utils";

export default function ShopifyBusinessCategoryPicker({
  businessType,
  category,
  customCategory,
  onChange,
}: ShopifyBusinessCategoryPickerProps) {
  const pickerId = useId();
  const categories = getShopifyBusinessCategoryOptions(businessType);
  const selectedCategory = categories.includes(category) ? category : categories[0];
  const custom = selectedCategory === SHOPIFY_CUSTOM_CATEGORY;

  return (
    <div className="mb-6 space-y-5">
      <fieldset>
        <legend className="mb-3 font-medium text-heading">{copy.businessTypeLabel}</legend>
        <div className="grid gap-3 md:grid-cols-2">
          {shopifyBusinessTypeOptions.filter(option => option.value !== "both").map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex min-h-20 cursor-pointer items-start gap-3 rounded-xl border-2 p-4 animation-standard focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
                businessType === option.value
                  ? "border-primary bg-mix-primary/5"
                  : "border-border bg-background hover:border-primary",
              )}
            >
              <input
                type="radio"
                name={`${pickerId}-business-type`}
                value={option.value}
                checked={businessType === option.value}
                onChange={() => {
                  const nextCategories = getShopifyBusinessCategoryOptions(option.value);
                  onChange(
                    option.value,
                    nextCategories.includes(category) ? category : nextCategories[0],
                    customCategory,
                  );
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
              />
              <span className="min-w-0">
                <span className="block font-semibold text-heading">{option.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-paragraph">{option.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid items-start gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${pickerId}-category`} className="mb-2 block text-sm font-medium text-heading">
            {copy.categoryLabel}
          </label>
          <ShopifyStudioSelect
            id={`${pickerId}-category`}
            value={selectedCategory}
            aria-describedby={`${pickerId}-category-hint`}
            onChange={(event) => onChange(businessType, event.target.value, customCategory)}
          >
            {categories.map((option) => <option key={option} value={option}>{option}</option>)}
          </ShopifyStudioSelect>
          <p id={`${pickerId}-category-hint`} className="mt-2 text-xs leading-relaxed text-paragraph">
            {custom ? copy.customReferenceHint : copy.categoryHint}
          </p>
        </div>
        {custom && (
          <div>
            <label htmlFor={`${pickerId}-custom-category`} className="mb-2 block text-sm font-medium text-heading">
              {copy.customLabel}
            </label>
            <input
              id={`${pickerId}-custom-category`}
              type="text"
              value={customCategory}
              maxLength={80}
              required
              placeholder={copy.customPlaceholder}
              aria-describedby={`${pickerId}-custom-hint`}
              onChange={(event) => onChange(businessType, category, event.target.value.slice(0, 80))}
              className="min-h-12 w-full rounded-xl border border-border bg-background px-3 py-3 text-base text-heading shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            <p id={`${pickerId}-custom-hint`} className="mt-2 text-xs leading-relaxed text-paragraph">{copy.customHint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
