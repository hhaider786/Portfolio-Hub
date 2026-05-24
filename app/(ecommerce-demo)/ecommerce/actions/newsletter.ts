"use server";

import { headers } from "next/headers";
import {
  validate,
  newsletterSchema,
  type ActionResult,
} from "@/lib/actions/validation";
import { rateLimit, getClientKey } from "@/lib/actions/rateLimit";
import { logSubmission } from "@/lib/actions/mockEmail";

export async function subscribeNewsletter(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const h = await headers();
  const limit = rateLimit(`ecommerce-newsletter:${getClientKey(h)}`, 5, 60_000);
  if (!limit.ok) return { status: "error", message: `Too many requests. Try again in ${limit.retryAfter}s.` };

  const result = validate<{ email: string }>({ email: formData.get("email") }, newsletterSchema);
  if (!result.ok) return { status: "error", errors: result.errors };

  await logSubmission("ecommerce-newsletter", { email: result.data.email });
  return { status: "success", message: "Thank you — your discount code is on its way." };
}
