import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LucideFileChartColumnIncreasing } from "lucide-react";

export default function Store() {
  // Data (includes Coming Soon entries + Square links)
  const items = useMemo(
    () => [
      { key: "hardback", title: "Hardback", subtitle: "First edition hardback", href: "https://square.link/u/st5CKlyn", comingSoon: false, LucideFileChartColumnIncreasing, img: "/bookcover.png" },
      { key: "ebook", title: "eBook", subtitle: "Kindle", href: "https://www.amazon.com/dp/B0FT66B482", comingSoon: "Order Now", img: "/bookcover.png" },
      { key: "special", title: "Special Edition", subtitle: "Signed hard and soft cover", href: "https://square.link/u/st5CKlyn", comingSoon: false, img: "/special-edition.png" },
      { key: "posters", title: "Posters", subtitle: "Large-format prints", href: "https://square.link/u/wZc9j7Tv", img: "/gathering-cover.jpg" },
      { key: "shirts", title: "Shirts", subtitle: "Soft tees, bold art", href: "https://square.link/u/mirlyzq6", img: "/t-shirt.jpeg" },
      { key: "sticker-books", title: "Sticker Books", subtitle: "Collectible mini prints", href: "https://square.link/u/Mm34VSdg", img: "/Gathering-Circle.png" },
      { key: "softcover", title: "Soft Cover", subtitle: "First edition soft cover", href: "https://square.link/u/st5CKlyn", comingSoon: false, img: "/special-edition.png" },
    ],
    []
  );

  const len = items.length;

  // Responsive: desktop shows 3 per view, mobile 1 per view
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const setFromMQ = () => setVisible(mq.matches ? 3 : 1);
    setFromMQ();
    mq.addEventListener ? mq.addEventListener('change', setFromMQ) : mq.addListener(setFromMQ);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', setFromMQ) : mq.removeListener(setFromMQ);
    };
  }, []);

  // Active index points to the first visible item in the current page
  const [active, setActive] = useState(7);

  // Toast for coming soon
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1400);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Navigation (infinite by modulo)
  const step = visible; // 3 on desktop, 1 on mobile
  const prev = () => { setActive((i) => (i - step + len) % len); };
  const next = () => { setActive((i) => (i + step) % len); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { prev(); }
      if (e.key === 'ArrowRight') { next(); }
      if (e.key === 'Enter') openCenter();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [len, step, visible]);

  // Visible slice (always centered in layout)
  const view = Array.from({ length: visible }, (_, i) => items[(active + i) % len]);
  const centerIdxInView = Math.floor((visible - 1) / 2);
  const centerItem = view[centerIdxInView] || view[0];

  const openCenter = () => {
    const it = centerItem;
    if (!it || !it.href) return showToast('Coming soon');
    window.open(it.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto overflow-x-hidden">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="font-mono tracking-[0.25em] text-2xl sm:text-3xl text-white">STORE</h1>
        <p className="text-white/70 mt-3">Discover our editions and merchandise below.</p>
      </div>

      {/* Stage */}
      <div className="relative w-full overflow-hidden">
        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300"
        >
          <ChevronLeft className="h-10 w-10 sm:h-8 sm:w-8" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300"
        >
          <ChevronRight className="h-10 w-10 sm:h-8 sm:w-8" />
        </button>

        {/* Gradient edge hints */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0c0c0c] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0c0c0c] to-transparent" />

        {/* Centered row with slide/fade between pages */}
        <div className="mx-auto py-2 px-14 sm:px-12">
          <div className="flex items-stretch justify-center gap-6 sm:gap-8 will-change-transform">
            {view.map((item, i) => (
              <Card
                key={item.key}
                item={item}
                emphasized={i === centerIdxInView}
                onClick={() => (i === centerIdxInView ? openCenter() : null)}
                onSoon={showToast}
              />
            ))}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-[95] flex justify-center">
          <div className="text-xs px-3 py-2 rounded-lg bg-white/90 text-black shadow-md">{toast}</div>
        </div>
      )}
    </section>
  );
}

function Card({ item, emphasized, onClick, onSoon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-2xl overflow-hidden w-[260px] sm:w-[300px] md:w-[320px] h-[420px] sm:h-[480px] md:h-[520px] transform-gpu will-change-transform transition-transform duration-300 ${
  emphasized
    ? 'scale-[1.05] rotate-y-0 z-20'
    : 'scale-[0.92] -rotate-y-6'
} hover:scale-[1.0]`}
    >
      <div className="relative h-[260px] sm:h-[300px] md:h-[340px] bg-black will-change-contents contain-paint">
        <img
          src={item.img}
          alt={item.title}
          loading={emphasized ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={emphasized ? 'high' : 'low'}
          sizes="(min-width: 1024px) 320px, 300px"
          className={`absolute inset-0 object-contain ${(item.key === 'special' || item.key === 'signed-limited') ? 'w-[80%] h-[80%] m-auto' : 'w-full h-full'}`}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
      </div>
      <div className="p-4 h-[160px] sm:h-[180px] md:h-[180px] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-mono tracking-[0.18em] text-white text-sm uppercase">{item.title}</h3>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">Preview</span>
        </div>
        <p className="text-white/60 text-sm mt-1 line-clamp-2">{item.subtitle}</p>
        <div className="mt-auto flex flex-col gap-2">
          {item.comingSoon && (
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/70">
              {/* <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-300" />
              {item.comingSoon === "preorder" ? "Preorder now" : "Order Now"} */}
            </div>
          )}
          <div className={`transition-opacity duration-300 ${emphasized ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white text-black px-4 py-2 text-sm hover:opacity-90 transition shadow w-full"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M14 3h7v7h-2V6.414l-8.293 8.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                </svg>
                Shop {item.title}
              </a>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onSoon && onSoon('Coming soon'); }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-white px-4 py-2 text-sm hover:bg-white/15 transition shadow w-full"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
                </svg>
                {item.title}: Order Now
              </button>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
