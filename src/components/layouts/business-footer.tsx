// import React from "react";

// function BusinessFooter() {
//   return (
//     <footer className="py-8 bg-secondary-background">
//       <div className="layout-standard flex flex-col gap-2">
//         <h1 className="text-center text-sm text-muted-foreground font-semibold">
//           Copyright © 2025 Zevitech All Rights Reserved.
//         </h1>
//         <p className="text-center md:text-sm text-xs text-muted-foreground">
//           Zevitech is an independent company that provides design and
//           development services for e-commerce solutions. We are not affiliated,
//           associated, authorized, endorsed by, or in any way officially
//           connected with Shopify Inc., or any of its subsidiaries or affiliates.
//           The name &quot;Shopify&quot; as well as related names, marks, emblems, and
//           images are registered trademarks of their respective owners.
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default BusinessFooter;

"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function BusinessFooter() {
  const privacyPolicyContent = `Zevitech - Non-Refundable Policy

At Zevitech, we are committed to delivering quality digital services and ensuring client satisfaction. However, to maintain fairness and operational efficiency, we operate under the following Non-Refundable Policy:

Non-Refundable Services
All payments made for our services are non-refundable once the project has commenced. This applies regardless of the stage of completion, as resources, time, and expertise are allocated from the moment a client is onboarded.

Client Responsibilities
Certain project requirements, such as purchasing and registering a domain name, are the sole responsibility of the client unless otherwise agreed in writing.
If the client fails to fulfill these responsibilities in a timely manner, Zevitech is not liable for delays or disruptions in the project.
The inability to proceed with the project due to pending client actions (e.g., domain purchase) does not qualify for a refund.

Quality Concerns
We encourage clients to share feedback during the development process so adjustments can be made promptly. Dissatisfaction based on subjective preferences after work has been initiated or delivered does not warrant a refund.

Acceptance of Policy
By making payment to Zevitech, the client acknowledges and agrees to abide by this Non-Refundable Policy.

Zevitech
Your Digital Growth Partner`;

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
          The name &quot;Shopify&quot; as well as related names, marks, emblems,
          and images are registered trademarks of their respective owners.
        </p>
        <div className="text-center mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="text-xs text-primary hover:underline cursor-pointer">
                Non-Refundable Policy
              </span>
            </DialogTrigger>
            <DialogContent className="max-w-[320px] sm:max-w-[425px] md:max-w-2xl lg:max-w-3xl max-h-[80vh] rounded-lg overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Zevitech Privacy Policies</DialogTitle>
                <DialogDescription className="text-paragraph font-medium">
                  Please read our privacy policies carefully.
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm text-paragraph whitespace-pre-line p-4">
                {privacyPolicyContent}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}

export default BusinessFooter;
