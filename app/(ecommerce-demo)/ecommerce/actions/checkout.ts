"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  validate,
  checkoutSchema,
  type ActionResult,
} from "@/lib/actions/validation";
import { rateLimit, getClientKey } from "@/lib/actions/rateLimit";
import { logSubmission } from "@/lib/actions/mockEmail";

type CheckoutData = {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

export async function placeOrder(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const h = await headers();
  const limit = rateLimit(`ecommerce-checkout:${getClientKey(h)}`, 3, 60_000);
  if (!limit.ok) return { status: "error", message: `Too many attempts. Try again in ${limit.retryAfter}s.` };

  const raw = Object.fromEntries(formData.entries());
  const result = validate<CheckoutData>(raw, checkoutSchema);
  if (!result.ok) return { status: "error", errors: result.errors };

  const orderId = `MA-${Date.now().toString(36).toUpperCase()}`;
  await logSubmission("ecommerce-checkout", { orderId, ...result.data, cart: raw.cart });

  redirect(`/ecommerce/checkout/success?order=${orderId}`);
}
