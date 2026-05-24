import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import Navigation from "@/components/ecommerce/Navigation";
import Footer from "@/components/ecommerce/Footer";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import BackToPortfolio from "@/components/BackToPortfolio";
import { ProductDetail } from "./ProductDetail";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { JsonLd } from "@/lib/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/seo/schemas";

const SITE_URL = "https://haider-mustafa.example.com";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} — Maison`,
    description: p.description,
    openGraph: { title: p.name, description: p.description, images: [{ url: p.image }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 4);
  const url = `${SITE_URL}/ecommerce/products/${product.slug}`;

  return (
    <>
      <BackToPortfolio dark={false} />
      <Navigation />
      <CartDrawer />
      <main id="main" className="pt-24 pb-20 bg-white">
        <nav className="max-w-7xl mx-auto px-6 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">
            <li><Link href="/ecommerce" className="hover:text-[#111]">Home</Link></li>
            <li><ChevronRight size={11} aria-hidden /></li>
            <li><Link href={`/ecommerce/category/${product.category.toLowerCase()}`} className="hover:text-[#111]">{product.category}</Link></li>
            <li><ChevronRight size={11} aria-hidden /></li>
            <li aria-current="page" className="text-[#111] truncate max-w-[40vw]">{product.name}</li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-3">
            <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden">
              <ImageWithBlur src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[product.hoverImage, product.image].map((src, i) => (
                <div key={i} className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden">
                  <ImageWithBlur src={src} alt="" aria-hidden fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-light text-[#111] mb-3" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1" aria-label={`Rated ${product.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} aria-hidden fill={i < Math.round(product.rating) ? "#111" : "none"} className="text-[#111]" />
                ))}
                <span className="text-xs text-[#666] ml-1">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-2xl font-medium text-[#111]">£{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[#888] line-through">£{product.originalPrice}</span>
                  <span className="text-xs tracking-wider uppercase text-red-500">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-[#444] leading-relaxed mb-8">{product.description}</p>

            <ProductDetail product={product} />

            <ul className="mt-10 space-y-3 border-t border-[#f0f0f0] pt-6">
              <li className="flex items-center gap-3 text-sm text-[#444]"><Truck size={16} className="text-[#111]" aria-hidden /><span>Free shipping on orders over £100</span></li>
              <li className="flex items-center gap-3 text-sm text-[#444]"><RotateCcw size={16} className="text-[#111]" aria-hidden /><span>30-day returns, on us</span></li>
              <li className="flex items-center gap-3 text-sm text-[#444]"><ShieldCheck size={16} className="text-[#111]" aria-hidden /><span>Two-year quality guarantee</span></li>
            </ul>

            <div className="mt-8 border-t border-[#f0f0f0] pt-6">
              <h2 className="text-[0.7rem] tracking-[0.2em] uppercase text-[#111] mb-3">Materials & care</h2>
              <ul className="space-y-1.5 text-sm text-[#555]">
                {product.materials.map((m) => <li key={m}>· {m}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-24">
            <p className="section-label mb-2">You may also like</p>
            <h2 className="text-3xl font-light text-[#111] mb-8" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
              More from {product.category}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((r) => (
                <Link key={r.id} href={`/ecommerce/products/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-3">
                    <ImageWithBlur src={r.image} alt={r.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-sm text-[#111] mb-1" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1.05rem" }}>{r.name}</h3>
                  <p className="text-sm font-medium text-[#111]">£{r.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <JsonLd
        id={`ld-product-${product.slug}`}
        data={[
          productSchema({
            name: product.name,
            description: product.description,
            image: product.image,
            sku: `MAISON-${product.id}`,
            brand: "Maison",
            url,
            price: product.price,
            priceCurrency: "GBP",
            aggregateRating: { ratingValue: product.rating, reviewCount: product.reviewCount },
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/ecommerce` },
            { name: product.category, url: `${SITE_URL}/ecommerce/category/${product.category.toLowerCase()}` },
            { name: product.name, url },
          ]),
        ]}
      />
    </>
  );
}
