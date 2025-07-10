import React from "react";
import Image from "next/image";

import { ReviewCardInterface } from "@/interfaces/partials-interface";

import { Card, CardContent, CardHeader } from "../ui/card";

import TrustpilotRatingIcon from "../../../public/icons/trustpilot-ratting-icon.svg";
import { cn } from "@/lib/utils";

function ReviewsCard({
  ProfilePicture,
  ClientName,
  ReviewDate,
  ReviewsQuote,
  className,
}: ReviewCardInterface) {
  return (
    <Card className={cn("border-border p-4 h-full", className)}>
      <CardHeader className="flex items-start flex-row justify-between p-0">
        <div className="flex items-center gap-4">
          <Image
            src={ProfilePicture}
            alt="Our Reviews"
            className="w-12 h-12 rounded-full"
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-heading font-bold">{ClientName}</h1>
            <Image
              src={TrustpilotRatingIcon}
              alt="Our Reviews"
              className="w-[100px]"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-semibold">
          {ReviewDate}
        </p>
      </CardHeader>
      <CardContent className="!p-0 !pt-6">{ReviewsQuote}</CardContent>
    </Card>
  );
}

export default ReviewsCard;
