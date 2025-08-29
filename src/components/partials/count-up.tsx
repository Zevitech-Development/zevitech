import { cn } from "@/lib/utils";
import React from "react";
import ReactCountUp from "react-countup";

interface CountUpProps {
  value: number;
  duration?: number;
  separator?: string;
  className?: string;
  suffix?: string;
  colorScheme?: "gradient" | "default";
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 2,
  separator = ",",
  className,
  suffix = "",
  colorScheme = "default",
}) => {
  const gradientClass =
    colorScheme === "gradient"
      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
      : "";

  return (
    <ReactCountUp
      end={value}
      duration={duration}
      separator={separator}
      suffix={suffix}
      className={cn(gradientClass, className)}
    />
  );
};
