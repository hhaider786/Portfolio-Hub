export type Product = {
  id: number;
  slug: string;
  name: string;
  category: "Women" | "Men" | "Accessories";
  price: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  image: string;
  hoverImage: string;
  badge?: "New" | "Sale" | "Bestseller";
  description: string;
  materials: string[];
  rating: number;
  reviewCount: number;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "silk-wrap-midi-dress",
    name: "Silk Wrap Midi Dress",
    category: "Women",
    price: 285,
    colors: ["black", "ivory", "sage"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80",
    badge: "New",
    description:
      "A fluid silk midi cut from 100% mulberry silk. The bias-cut skirt drapes effortlessly while the wrap bodice flatters every silhouette. A timeless piece for season after season.",
    materials: ["100% Mulberry Silk", "Lined", "Dry clean only", "Made in Italy"],
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: 2,
    slug: "tailored-wool-blazer",
    name: "Tailored Wool Blazer",
    category: "Women",
    price: 420,
    colors: ["camel", "black", "grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80",
    badge: "Bestseller",
    description:
      "Structured Italian wool, hand-finished horn buttons, and a half-canvas construction. Tailored for a sharp shoulder and a generous, flattering line through the body.",
    materials: ["95% Wool, 5% Cashmere", "Bemberg lining", "Horn buttons", "Made in Italy"],
    rating: 4.8,
    reviewCount: 308,
  },
  {
    id: 3,
    slug: "wide-leg-linen-trousers",
    name: "Wide Leg Linen Trousers",
    category: "Women",
    price: 195,
    originalPrice: 260,
    colors: ["ecru", "navy", "terracotta"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
    badge: "Sale",
    description:
      "Pure Belgian linen with a relaxed wide leg and a fixed waistband. Pre-washed for softness, designed to wear and crease beautifully.",
    materials: ["100% European Linen", "Pre-washed", "Side pockets", "Machine washable"],
    rating: 4.7,
    reviewCount: 96,
  },
  {
    id: 4,
    slug: "oversized-cotton-shirt",
    name: "Oversized Cotton Shirt",
    category: "Men",
    price: 145,
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    badge: "New",
    description:
      "A relaxed oxford in heavyweight Japanese cotton. Drop shoulder, mother-of-pearl buttons, and a soft, broken-in feel from the first wear.",
    materials: ["100% Japanese Cotton", "Mother-of-pearl buttons", "Garment-dyed", "Made in Portugal"],
    rating: 4.6,
    reviewCount: 184,
  },
  {
    id: 5,
    slug: "slim-chino-trousers",
    name: "Slim Chino Trousers",
    category: "Men",
    price: 175,
    colors: ["khaki", "navy", "olive"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=900&q=80",
    description:
      "Slim through the leg with just enough stretch for movement. A versatile mid-rise trouser cut from compact cotton twill.",
    materials: ["98% Cotton, 2% Elastane", "Compact twill", "Slim fit", "Machine washable"],
    rating: 4.5,
    reviewCount: 211,
  },
  {
    id: 6,
    slug: "merino-knit-sweater",
    name: "Merino Knit Sweater",
    category: "Men",
    price: 220,
    originalPrice: 295,
    colors: ["oat", "charcoal", "burgundy"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1584670747417-594a9412feba?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=900&q=80",
    badge: "Sale",
    description:
      "Fine-gauge merino with a crew neckline and ribbed cuffs. Lightweight enough for layering but built to outlast the season.",
    materials: ["100% Extra-fine Merino", "Crew neck", "Hand wash cold", "Made in Scotland"],
    rating: 4.9,
    reviewCount: 167,
  },
  {
    id: 7,
    slug: "leather-tote-bag",
    name: "Leather Tote Bag",
    category: "Accessories",
    price: 340,
    colors: ["tan", "black", "cognac"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590739293931-a04bfb6d6a1a?w=900&q=80",
    badge: "Bestseller",
    description:
      "Full-grain Tuscan leather, hand-stitched seams, and a magnetic closure. Sized to fit a laptop, a notebook, and everything in between.",
    materials: ["Full-grain Italian leather", "Cotton-canvas lining", "Magnetic closure", "Made in Florence"],
    rating: 5.0,
    reviewCount: 423,
  },
  {
    id: 8,
    slug: "gold-hoop-earrings",
    name: "Gold Hoop Earrings",
    category: "Accessories",
    price: 85,
    colors: ["gold"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=80",
    badge: "New",
    description:
      "Classic 14k-gold-plated hoops with a high-polish finish. Lightweight and hypoallergenic — the everyday earring you'll never take off.",
    materials: ["14k Gold-plated brass", "Hypoallergenic", "Hinged closure", "Made in France"],
    rating: 4.8,
    reviewCount: 532,
  },
  {
    id: 9,
    slug: "cashmere-scarf",
    name: "Cashmere Scarf",
    category: "Accessories",
    price: 160,
    originalPrice: 210,
    colors: ["camel", "grey", "blush"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1601925228876-a3de87857c87?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&q=80",
    badge: "Sale",
    description:
      "Pure Mongolian cashmere, woven on a traditional shuttle loom. Generously sized to wrap, drape, or knot.",
    materials: ["100% Mongolian Cashmere", "200 × 60 cm", "Dry clean only", "Made in Scotland"],
    rating: 4.9,
    reviewCount: 278,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const p = getProductBySlug(slug);
  if (!p) return [];
  return products.filter((x) => x.category === p.category && x.slug !== slug).slice(0, limit);
}

export const categories = [
  { name: "Women", tagline: "New Season", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80", slug: "women" },
  { name: "Men", tagline: "Refined Essentials", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&q=80", slug: "men" },
  { name: "Accessories", tagline: "The Details", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80", slug: "accessories" },
  { name: "Sale", tagline: "Up to 40% Off", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80", slug: "sale" },
];
