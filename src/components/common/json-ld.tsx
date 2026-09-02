import React from "react";

interface JsonLdProps {
  /** One schema object or an array of schema objects. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders structured data as a <script type="application/ld+json"> tag.
 * Server component — safe to place anywhere in a page tree.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
