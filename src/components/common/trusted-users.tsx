import React from "react";
import Image from "next/image";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { CountUp } from "../partials/count-up";

interface TrustedUsersProps {
  avatars: string[];
  rating?: number;
  totalUsersText?: number;
  caption?: string;
  className?: string;
  starColorClass?: string;
  ringColors?: string[];
  captionClassName?: string;
}

export const TrustedUsers: React.FC<TrustedUsersProps> = ({
  avatars,
  rating = 5,
  totalUsersText = 1000,
  caption = "Trusted by",
  className = "",
  starColorClass = "text-yellow-400",
  ringColors = [],
  captionClassName = "text-white",
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center gap-6 bg-transparent
          text-foreground py-10 px-4`,
        className
      )}
    >
      <div className="flex -space-x-4">
        {avatars.map((src, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full overflow-hidden ring-1 ring-offset-2 ring-offset-black ${
              ringColors[i] || "ring-blue-900"
            }`}
          >
            <Image
              src={src}
              alt={`Avatar ${i + 1}`}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-1">
        <div className={cn("flex gap-1", starColorClass)}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} fill="currentColor" className="w-4 h-4" />
          ))}
        </div>
        <span
          className={cn("text-xs md:text-md font-medium", captionClassName)}
        >
          {caption}
          <CountUp
            value={totalUsersText}
            duration={2}
            separator=","
            className="ml-1 text-lg"
            suffix="+"
            colorScheme="gradient"
          />
          users
        </span>
      </div>
    </div>
  );
};
