export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="text-2xl tracking-[0.12em] text-[#111] mb-3" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
            MAISON
          </p>
          <p className="text-[#888] text-sm leading-relaxed">
            Curated fashion for the modern wardrobe. Quality, elegance, and sustainability — since 2018.
          </p>
        </div>
        {[
          { title: "Shop", links: ["Women", "Men", "Accessories", "New In", "Sale"] },
          { title: "Help", links: ["Shipping & Returns", "Size Guide", "Contact Us", "FAQ", "Track Order"] },
          { title: "Company", links: ["About Maison", "Sustainability", "Press", "Careers", "Stores"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#111] font-medium mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#888] text-sm hover:text-[#111] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[#aaa] text-xs">© 2025 Maison. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-[#aaa] text-xs hover:text-[#111] transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
