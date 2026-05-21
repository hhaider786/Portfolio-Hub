export type Product = {
  id: number;
  name: string;
  category: "Women" | "Men" | "Accessories";
  price: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  image: string;
  hoverImage: string;
  badge?: "New" | "Sale" | "Bestseller";
};

export const products: Product[] = [
  {
    id: 1,
    name: "Silk Wrap Midi Dress",
    category: "Women",
    price: 285,
    colors: ["black", "ivory", "sage"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    badge: "New",
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    category: "Women",
    price: 420,
    colors: ["camel", "black", "grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Wide Leg Linen Trousers",
    category: "Women",
    price: 195,
    originalPrice: 260,
    colors: ["ecru", "navy", "terracotta"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Oversized Cotton Shirt",
    category: "Men",
    price: 145,
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    badge: "New",
  },
  {
    id: 5,
    name: "Slim Chino Trousers",
    category: "Men",
    price: 175,
    colors: ["khaki", "navy", "olive"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
  },
  {
    id: 6,
    name: "Merino Knit Sweater",
    category: "Men",
    price: 220,
    originalPrice: 295,
    colors: ["oat", "charcoal", "burgundy"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1584670747417-594a9412feba?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
    badge: "Sale",
  },
  {
    id: 7,
    name: "Leather Tote Bag",
    category: "Accessories",
    price: 340,
    colors: ["tan", "black", "cognac"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590739293931-a04bfb6d6a1a?w=600&q=80",
    badge: "Bestseller",
  },
  {
    id: 8,
    name: "Gold Hoop Earrings",
    category: "Accessories",
    price: 85,
    colors: ["gold"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
    badge: "New",
  },
  {
    id: 9,
    name: "Cashmere Scarf",
    category: "Accessories",
    price: 160,
    originalPrice: 210,
    colors: ["camel", "grey", "blush"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1601925228876-a3de87857c87?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80",
    badge: "Sale",
  },
];

export const categories = [
  {
    name: "Women",
    tagline: "New Season",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80",
  },
  {
    name: "Men",
    tagline: "Refined Essentials",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=700&q=80",
  },
  {
    name: "Accessories",
    tagline: "The Details",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80",
  },
  {
    name: "Sale",
    tagline: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80",
  },
];
