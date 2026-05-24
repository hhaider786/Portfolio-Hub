import { LiveRegionProvider } from "@/lib/a11y/LiveRegion";
import { CartProvider } from "@/context/CartContext";
import { JsonLd } from "@/lib/seo/JsonLd";
import { websiteSchema } from "@/lib/seo/schemas";

const DEMO_URL = "https://haider-mustafa.example.com/ecommerce";

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ecommerce-root">
      <LiveRegionProvider>
        <CartProvider>{children}</CartProvider>
      </LiveRegionProvider>
      <JsonLd
        id="ld-ecommerce"
        data={websiteSchema({
          name: "Maison — Fashion & Lifestyle (demo)",
          url: DEMO_URL,
          description: "Demo of a curated fashion ecommerce site by Haider Mustafa.",
        })}
      />
    </div>
  );
}
