import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, categories } from "@/data/products";
import Navigation from "@/components/ecommerce/Navigation";
import Footer from "@/components/ecommerce/Footer";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import BackToPortfolio from "@/components/BackToPortfolio";
import { CategoryHero } from "./CategoryHero";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.name} — Maison`,
    description: `Shop our ${cat.name.toLowerCase()} edit. ${cat.tagline}.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items =
    cat.slug === "sale"
      ? products.filter((p) => p.badge === "Sale" || p.originalPrice)
      : products.filter((p) => p.category.toLowerCase() === cat.slug);

  return (
    <>
      <BackToPortfolio dark={false} />
      <Navigation />
      <CartDrawer />
      <main id="main" className="pt-24 pb-20 bg-white">
        <CategoryHero cat={cat} items={items} />
      </main>
      <Footer />
    </>
  );
}
