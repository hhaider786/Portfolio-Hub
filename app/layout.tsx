import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  DM_Sans,
  Lato,
  Syne,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter-var", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne-var", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const playfair = Playfair_Display({ variable: "--font-playfair-var", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], style: ["normal", "italic"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant-var", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans-var", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato-var", subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Muhammad Haider Mustafa — Portfolio",
  description: "Software Engineer specialising in full-stack development, AI, and cybersecurity. Based in Hobart, Australia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${playfair.variable} ${cormorant.variable} ${dmSans.variable} ${lato.variable}`}
    >
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
