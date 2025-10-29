"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface OrderSummaryProps {
  category: string;
  categoryName: string;
  selectedPackage: {
    plan: string;
    price: number | string;
    description: string;
    features: string[];
    badge?: string;
  };
}

export function OrderSummary({
  categoryName,
  selectedPackage,
}: OrderSummaryProps) {
  const displayPrice =
    typeof selectedPackage.price === "number" ? selectedPackage.price : 0;
  const isCustomQuote = typeof selectedPackage.price === "string";

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm text-primary font-medium uppercase tracking-wide">
                {categoryName}
              </p>
              <h3 className="font-bold text-foreground text-lg mt-1">
                {selectedPackage.plan}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {selectedPackage.description}
              </p>
            </div>
            {selectedPackage.badge && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 shrink-0"
              >
                {selectedPackage.badge}
              </Badge>
            )}
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-2">
            {selectedPackage.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
            {selectedPackage.features.length > 4 && (
              <p className="text-xs text-muted-foreground italic">
                +{selectedPackage.features.length - 4} more features
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            Total Amount
          </span>
          <span className="text-2xl font-bold text-primary">
            {isCustomQuote ? "Custom Quote" : `$${displayPrice}`}
          </span>
        </div>

        {isCustomQuote && (
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Contact us for a personalized quote based on your specific
            requirements
          </p>
        )}
      </CardContent>
    </Card>
  );
}
