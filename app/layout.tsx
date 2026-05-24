import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/lib/a11y/SkipLink";
import { LiveRegionProvider } from "@/lib/a11y/LiveRegion";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { personSchema, websiteSchema } from "@/lib/seo/schemas";

const SITE_URL = "https://haider-mustafa.example.com";

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});
const syne = Syne({
  variable: "--font-syne-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = buildMetadata({
  title: "Muhammad Haider Mustafa — Software Engineer",
  description:
    "Portfolio of Muhammad Haider Mustafa — Software Engineer specialising in full-stack web development, AI, and cybersecurity. Available for freelance & graduate opportunities.",
  siteName: "Haider Mustafa — Portfolio",
  url: SITE_URL,
  ogImage: `${SITE_URL}/opengraph-image`,
  titleTemplate: "%s — Haider Mustafa",
  keywords: ["software engineer", "full-stack developer", "Next.js", "React", "TypeScript", "Tasmania", "Hobart", "AI", "cybersecurity"],
  themeColor: "#08080f",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="antialiased overflow-x-clip">
        <SkipLink />
        <LiveRegionProvider>{children}</LiveRegionProvider>
        <JsonLd
          data={[
            websiteSchema({
              name: "Haider Mustafa — Portfolio",
              url: SITE_URL,
              description: "Full-stack web development portfolio.",
            }),
            personSchema({
              name: "Muhammad Haider Mustafa",
              jobTitle: "Software Engineer",
              url: SITE_URL,
              email: "haidermustafa2012@gmail.com",
              description: "Full-stack engineer specialising in Next.js, AI, and cybersecurity. Based in Hobart, Tasmania.",
              knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "ASP.NET Core", "Java Spring Boot", "Python", "FastAPI", "Docker", "AWS"],
              sameAs: [
                "https://github.com/hhaider786",
                "https://www.linkedin.com/in/muhammad-haider-mustafa-03104b196/",
              ],
            }),
          ]}
        />
      </body>
    </html>
  );
}
