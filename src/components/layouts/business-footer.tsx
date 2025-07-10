import React from "react";

function BusinessFooter() {
  return (
    <footer className="py-8 bg-secondary-background">
      <div className="layout-standard flex flex-col gap-2">
        <h1 className="text-center text-sm text-muted-foreground font-semibold">
          Copyright © 2025 Zevitech All Rights Reserved.
        </h1>
        <p className="text-center md:text-sm text-xs text-muted-foreground">
          Zevitech is an independent company that provides design and
          development services for e-commerce solutions. We are not affiliated,
          associated, authorized, endorsed by, or in any way officially
          connected with Shopify Inc., or any of its subsidiaries or affiliates.
          The name &quot;Shopify&quot; as well as related names, marks, emblems, and
          images are registered trademarks of their respective owners.
        </p>
      </div>
    </footer>
  );
}

export default BusinessFooter;
