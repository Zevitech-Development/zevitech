/** Sample storefront cart only. Never used to price a Zevitech checkout. */
export interface DemoCartItem { product: number; quantity: number; variant?: string; unitPrice?: number }
export function addDemoCartItem(cart: DemoCartItem[], item: DemoCartItem): DemoCartItem[] {
  if (!Number.isInteger(item.quantity) || item.quantity < 1 || (item.unitPrice !== undefined && (!Number.isFinite(item.unitPrice) || item.unitPrice < 0))) return cart;
  const variant = item.variant || "";
  const index = cart.findIndex(line => line.product === item.product && (line.variant || "") === variant);
  if (index < 0) return [...cart, { ...item, quantity: Math.min(99, item.quantity), variant }];
  return cart.map((line, i) => i === index ? { ...line, quantity: Math.min(99, line.quantity + item.quantity), unitPrice: item.unitPrice ?? line.unitPrice } : line);
}
export function demoCartSubtotal(cart: DemoCartItem[], catalog: { price: number }[]) {
  return cart.reduce((sum, line) => sum + Math.round((line.unitPrice ?? catalog[line.product]?.price ?? 0) * 100) * line.quantity, 0) / 100;
}
