"use server";

import { validate, reservationSchema } from "@/lib/actions/validation";
import type { ActionResult } from "@/lib/actions/validation";

export async function makeReservation(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const result = validate(raw, reservationSchema);

  if (!result.ok) {
    return { status: "error", errors: result.errors, message: "Please correct the errors above." };
  }

  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 600));

  return {
    status: "success",
    message: `Your table for ${result.data.partySize} is reserved on ${result.data.date} at ${result.data.time}. We'll send a confirmation to ${result.data.email}.`,
  };
}
