import { CartProvider } from "@/context/CartContext";

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ecommerce-root">
      <CartProvider>{children}</CartProvider>
    </div>
  );
}
