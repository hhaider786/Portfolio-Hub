"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/(ecommerce-demo)/ecommerce/actions/checkout";
import { useCart } from "@/context/CartContext";
import type { ActionResult, FieldError } from "@/lib/actions/validation";

const initial: ActionResult = { status: "idle" };

function fieldError(state: ActionResult, field: string): string | undefined {
  if (state.status !== "error") return;
  return state.errors?.find((e: FieldError) => e.field === field)?.message;
}

export function CheckoutForm() {
  const { items, totalPrice, hydrated } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initial);

  if (hydrated && items.length === 0) {
    return (
      <div className="bg-white border border-[#f0f0f0] p-10 text-center">
        <p className="text-[#666] mb-6">Your bag is empty. Add a few pieces first.</p>
        <a href="/ecommerce" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-[#111] text-white">Browse the edit</a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid lg:grid-cols-[1fr_320px] gap-10 items-start" noValidate>
      <input type="hidden" name="cart" value={JSON.stringify(items)} />
      <div className="bg-white border border-[#f0f0f0] p-6 space-y-5">
        <h2 className="text-[0.7rem] tracking-[0.2em] uppercase text-[#111]">Shipping details</h2>

        {[
          { id: "name", label: "Full name", type: "text", autoComplete: "name" },
          { id: "email", label: "Email", type: "email", autoComplete: "email" },
          { id: "address", label: "Street address", type: "text", autoComplete: "street-address" },
        ].map((f) => {
          const err = fieldError(state, f.id);
          return (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#111] mb-1.5">{f.label}</label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                autoComplete={f.autoComplete}
                aria-invalid={!!err}
                className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]"
              />
              {err && <p role="alert" className="text-red-500 text-xs mt-1">{err}</p>}
            </div>
          );
        })}

        <div className="grid grid-cols-2 gap-5">
          {[
            { id: "city", label: "City", autoComplete: "address-level2" },
            { id: "postcode", label: "Postcode", autoComplete: "postal-code" },
          ].map((f) => {
            const err = fieldError(state, f.id);
            return (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#111] mb-1.5">{f.label}</label>
                <input
                  id={f.id}
                  name={f.id}
                  type="text"
                  autoComplete={f.autoComplete}
                  aria-invalid={!!err}
                  className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]"
                />
                {err && <p role="alert" className="text-red-500 text-xs mt-1">{err}</p>}
              </div>
            );
          })}
        </div>

        <div>
          <label htmlFor="country" className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#111] mb-1.5">Country</label>
          <select
            id="country"
            name="country"
            defaultValue="United Kingdom"
            autoComplete="country-name"
            className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]"
          >
            {["United Kingdom", "France", "Germany", "Italy", "Spain", "Netherlands", "United States", "Australia"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {state.status === "error" && state.message && <p role="alert" className="text-red-500 text-sm">{state.message}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[#111] text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors disabled:opacity-60"
        >
          {pending ? "Placing order…" : "Place order"}
        </button>
        <p className="text-[0.65rem] text-[#666] text-center">Demo checkout — no payment is taken.</p>
      </div>

      <aside className="bg-white border border-[#f0f0f0] p-6 lg:sticky lg:top-28">
        <h2 className="text-[0.7rem] tracking-[0.2em] uppercase text-[#111] mb-4">Order summary</h2>
        <ul className="space-y-3 mb-5 max-h-72 overflow-y-auto">
          {items.map((i) => (
            <li key={`${i.id}-${i.size}`} className="flex justify-between text-sm text-[#444]">
              <span className="truncate pr-2">{i.name} <span className="text-[#888]">× {i.quantity}</span></span>
              <span>£{(i.price * i.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 text-sm text-[#444] border-t border-[#f0f0f0] pt-4">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>£{totalPrice.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{totalPrice >= 100 ? "Free" : "£8.00"}</dd></div>
        </dl>
      </aside>
    </form>
  );
}
