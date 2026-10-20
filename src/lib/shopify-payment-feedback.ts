/** Customer-safe messages for NMI's documented response codes.
 * https://docs.nmi.com/reference/response-codes
 * Never display the processor's raw response text.
 */
const declineMessages: Record<string, string> = {
  "200": "Your bank did not approve this payment. Contact your bank or use another card.",
  "201": "Your bank did not approve this payment. Contact your bank or use another card.",
  "202": "This card has insufficient available funds. Use another card or contact your bank.",
  "203": "This payment exceeds your card’s available limit. Use another card or contact your bank.",
  "204": "Your bank does not allow this transaction. Contact your bank or use another card.",
  "220": "Check your card and billing details, then try again.",
  "221": "This card could not be verified. Check the card number or use another card.",
  "222": "This card could not be verified. Check the card number or use another card.",
  "223": "This card has expired. Use a current card.",
  "224": "Check your card’s expiry date, then try again.",
  "225": "Check the security code on your card, then try again.",
  "240": "Contact your card issuer before trying this card again, or use another card.",
  "264": "Your bank has asked that this payment be retried later. Contact your bank or use another card.",
};
export function shopifyDeclineFeedback(code?: string): string {
  const message = (code && declineMessages[code]) || "Your payment was not approved. Contact your bank or use another card.";
  return `${message}${code && /^2\d{2}$/.test(code) ? ` Reference code: ${code}.` : ""}`;
}
export function shopifyCheckoutErrorFeedback(code: string): string | null {
  const messages: Record<string, string> = {
    TOO_MANY_REQUESTS: "Too many attempts. Please wait a few minutes before checking or trying again.",
    PAYMENT_RETRY_BLOCKED: "Further payment attempts are blocked for this checkout. Contact our team with your order reference.",
    INVALID_DETAILS: "Check the highlighted details and your billing information, then try again.",
    CHECKOUT_CANCELLED: "This checkout was cancelled. Update checkout to continue with your saved choices.",
    CHECKOUT_BRIEF_CHANGED: "Your project details changed. Update checkout before paying.",
    SCOPE_REVIEW_REQUIRED: "Your package no longer covers this design or scope. Review your package before paying.",
    CHECKOUT_MODE_CHANGED: "This checkout is no longer available. Contact our team with your order reference.",
    CHECKOUT_UNAVAILABLE: "Checkout is temporarily unavailable. Please try again shortly.",
    REQUEST_NOT_ALLOWED: "Open checkout on www.zevitech.com to continue securely.",
  };
  return messages[code] ?? null;
}
