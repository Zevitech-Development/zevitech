interface AiIconChipProps {
  name: string;
  size?: number;
}

const paths: Record<string, string> = {
  "check-circle":
    "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  calendar:
    "M3 4h18v18H3zM3 10h18M8 2v4M16 2v4M8 14h.01M12 14h.01M16 14h.01",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  refresh:
    "M3 2v6h6M21 12A9 9 0 0 0 6 5.3L3 8M21 22v-6h-6M3 12a9 9 0 0 0 15 6.7l3-2.7",
  message:
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  balance:
    "M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  globe:
    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z",
  chart: "M3 3v18h18M7 16V11M12 16V8M17 16v-3",
  mic: "M9 2a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0zM5 10a7 7 0 0 0 14 0M12 19v3",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  check: "M20 6 9 17l-5-5",
};

export default function AiTaskIcon({ name, size = 44 }: AiIconChipProps) {
  const d = paths[name] ?? paths["zap"];
  return (
    <div
      className="rounded-[13px] flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "var(--ai-grad)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.5}
        height={size * 0.5}
        stroke="#fff"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {d.split("M").filter(Boolean).map((seg, i) => (
          <path key={i} d={"M" + seg} />
        ))}
      </svg>
    </div>
  );
}
