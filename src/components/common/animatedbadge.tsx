"use client";
import React from "react";

interface AnimatedBadgeProps {
  text: string;
  icon: React.ReactNode;
  borderColor?: string;
  className?: string;
}

export const AnimatedBadge = ({
  text,
  icon,
  borderColor = "from-sky-400 via-blue-500 to-sky-400",
  className = "",
}: AnimatedBadgeProps) => {
  return (
    <>
      {/* ✅ Keyframes */}
      <style jsx>{`
        @keyframes move-bg {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>

      <div
        className={`inline-flex w-fit p-[3px] rounded-full bg-gradient-to-r ${borderColor} bg-[length:200%_100%] animate-[move-bg_3s_linear_infinite] ${className}`}
      >
        <div className="flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white">
          {icon}
          <span>{text}</span>
        </div>
      </div>
    </>
  );
};
