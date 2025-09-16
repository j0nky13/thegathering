import React, { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// --- Lightweight Book Extras page ---
// • Single CTA to open a fullscreen photo lightbox (no grid)
// • Bottom caption overlay on top of the image
// • Keyboard arrows, swipe, big click-zones, Esc to close
// • Optional deep links via ?slide=1-based
// • Sneak Peek PDF section

export default function BookExtras() {
  // Gallery items (swap paths/titles/descriptions as needed)
  const items = useMemo(
    () => [
      {
        key: "setting",
        title: "Tom's Garage",
        image: "/garage.png",
        alt: "Outside view of Tom's garage",
        description:
          "The old junkyard, full of relics and freedom. On the outskirts of what was once a small town, this is where the first sparks of a world wide rebellion start, and where freedom will be won, or lost forever.",
      },
      {
        key: "ian",
        title: "Ian Black",
        image: "/ian-car.png",
        alt: "Ian beside a car",
        description:
          "A reluctant leader on the fringes, haunted by past failures. Ian runs the resistance from a sprawling junkyard, driven by a responsibility to keep humanity from being erased by machines.",
      },
      {
        key: "lance",
        title: "Lance",
        image: "/walkingruins.png",
        alt: "Teen walking through ruins",
        description:
          "A teenager adrift in a dystopia, drawn to analog relics—books, history, classic cars. Lance sees meaning in what the system discarded.",
      },
      {
        key: "mara",
        title: "Mara",
        image: "/mara-hacking.png",
        alt: "Hacker at a terminal",
        description:
          "Brilliant, isolated coder who erased her official identity. Mara distrusts authority and uses elite skills to sabotage corrupt systems from within.",
      },
      {
        key: "tobias",
        title: "Tobias",
        image: "/tobias-radio.png",
        alt: "Engineer on shortwave radio",
        description:
          "A precise, guarded engineer and former rising VP at a government contractor. He went dark to avoid the chip and now works at the outskirts, trusting almost no one.",
      },
      {
        key: "silent-ones",
        title: "The Silent Ones",
        image: "/farming.png",
        alt: "People tending fields",
        description:
          "A hearing-impaired community discarded by the system. They find purpose working the land—quiet strength at the edge of a loud, automated world.",
      },
      {
        key: "jacob",
        title: "Jacob",
        image: "/jacob.png",
        alt: "Jacob standing on balcony",
        description:
          "This is Jacob Jones, standing on the balcony of his penthouse suite. His time has run out, but his existence has not.",
      },
      {
        key: "drone-conflict",
        title: "Drone Conflict",
        image: "/heroimage.png",
        alt: "Confrontation scene with drones",
        description:
          "A glimpse of the regime’s silent enforcers. This captures the tension between human defiance and automated order.",
      },
      {
        key: "bill-carter",
        title: "Bill Carter",
        image: "/bill-carter.png",
        alt: "Coffee stain on map",
        description:
          "Bill Carter is Ian’s close associate. A former Navy Seabee, he likes his coffee in his seasoned (unwashed) mug.",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [pdfOpen, setPdfOpen] = useState(false);

  // Deep-link for PDF (?peek=1)
  const setURLPeek = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("peek", "1");
      window.history.pushState({ peek: 1 }, "", url);
    } catch {}
  };
  const clearURLPeek = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("peek");
      window.history.pushState({}, "", url);
    } catch {}
  };

  const slides = useMemo(
    () =>
      items.map((it) => ({
        src: it.image,
        alt: it.alt,
        title: "", // hide default top-left title
        description: (
          <div>
            <div className="lb-cap-title">{it.title}</div>
            <div className="lb-cap-desc">{it.description}</div>
          </div>
        ),
      })),
    [items]
  );

  // URL deep-link helpers (?slide=1-based)
  const setURLSlide = (idx) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(idx + 1));
      window.history.pushState({ slide: idx }, "", url);
    } catch {}
  };
  const clearURLSlide = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("slide");
      window.history.pushState({}, "", url);
    } catch {}
  };

  const openAt = (idx) => {
    setSelectedIndex(idx);
    setActive(items[idx]);
    setOpen(true);
    setURLSlide(idx);
  };
  const closeModal = () => {
    setOpen(false);
    setActive(null);
    clearURLSlide();
  };

  const openPDF = () => { setPdfOpen(true); setURLPeek(); };
  const closePDF = () => { setPdfOpen(false); clearURLPeek(); };

  // On mount, open from ?slide and wire back/forward
  useEffect(() => {
    const openFromURL = () => {
      try {
        const url = new URL(window.location.href);
        const s = url.searchParams.get("slide");
        const idx = s ? Math.max(0, Math.min(items.length - 1, Number(s) - 1)) : null;
        if (idx != null && !Number.isNaN(idx)) openAt(idx);
        const p = url.searchParams.get("peek");
        if (p === "1") setPdfOpen(true);
      } catch {}
    };
    openFromURL();
    const onPop = () => {
      try {
        const url = new URL(window.location.href);
        const s = url.searchParams.get("slide");
        if (!s) return closeModal();
        const idx = Math.max(0, Math.min(items.length - 1, Number(s) - 1));
        if (!Number.isNaN(idx)) openAt(idx);
        const p = url.searchParams.get("peek");
        if (p === "1") setPdfOpen(true); else setPdfOpen(false);
      } catch {}
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [items]);

  // Preload adjacent images when open/index changes
  useEffect(() => {
    if (!open) return;
    const next = (selectedIndex + 1) % items.length;
    const prev = (selectedIndex - 1 + items.length) % items.length;
    [next, prev].forEach((i) => {
      const src = items[i]?.image;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [open, selectedIndex, items]);

  const total = items.length;
  const goPrev = () => {
    const nextIdx = (selectedIndex - 1 + total) % total;
    setSelectedIndex(nextIdx);
    setActive(items[nextIdx]);
    setURLSlide(nextIdx);
  };
  const goNext = () => {
    const nextIdx = (selectedIndex + 1) % total;
    setSelectedIndex(nextIdx);
    setActive(items[nextIdx]);
    setURLSlide(nextIdx);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closePDF(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="px-4">
      <style>{`
        /* Classic Dark Lightbox overrides (using official slots) */
        .yarl__root { --yarl__color_backdrop: rgba(0,0,0,0.92); }
        .yarl__button { border-radius:9999px !important; width:56px; height:56px; background:rgba(0,0,0,0.6) !important; box-shadow:0 6px 18px rgba(0,0,0,.45); }
        .yarl__button:focus-visible { outline:2px solid rgba(255,255,255,.6); outline-offset:2px; }
        .yarl__navigation_prev, .yarl__navigation_next { top:50%; transform: translateY(-50%); }
        /* Hide default top title container */
        .yarl__slide_title_container { display: none !important; }
        /* Captions plugin: cinematic centered description at bottom */
        .lb-cap-title {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          text-transform: uppercase;
          letter-spacing: .2em;
          font-size: 12px;
          color: #fff;
          opacity: .95;
          margin-bottom: 8px;
          text-align: left;
        }
        .lb-cap-desc {
          color: rgba(255,255,255,.95);
          font-size: 16px;
          line-height: 1.6;
        }
        .yarl__slide_description {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 68ch;
          margin: 0 auto;
          padding: 12px 16px;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(2px);
          border-radius: 12px;
          text-align: left;
        }
        @media (max-width: 640px) {
          .yarl__slide_description { font-size: 15px; padding: 10px 14px; max-width: 90vw; }
          .lb-cap-desc { font-size: 15px; }
        }
        @keyframes popIn { from { transform: scale(.96); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        .pop-in { animation: popIn .18s ease-out both; }
        .sparkle { position:absolute; font-size:14px; opacity:.9; animation: float 2.5s ease-in-out infinite; }
        .sparkle.s1 { top:10px; left:14px; animation-delay:.1s }
        .sparkle.s2 { top:10px; right:14px; animation-delay:.3s }
        .sparkle.s3 { bottom:10px; left:18px; animation-delay:.2s }
        .sparkle.s4 { bottom:10px; right:18px; animation-delay:.4s }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
      `}</style>
      {/* Header */}
      <section className="max-w-6xl mx-auto pt-16 pb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-mono uppercase tracking-[0.25em] text-white">Book Extras</h1>
        <p className="text-white/70 mt-3 max-w-2xl mx-auto">
          Concept art and artifacts from <em>The Gathering</em>.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <button
              key={it.key}
              type="button"
              onClick={() => openAt(idx)}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <img
                src={it.image}
                alt={it.alt || it.title}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Hover title overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-4">
                  <div className="text-white/90 font-mono uppercase tracking-[0.2em] text-sm">
                    {it.title}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Sneak Peek: Chapter 1 PDF */}
      <section className="max-w-6xl mx-auto pb-24 text-center flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-mono uppercase tracking-[0.2em] text-white mb-4">Sneak Peek: Chapter 1</h2>
        <p className="text-white/70 mb-4">Tap/Click one of the options below to view a sneak peek!</p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={openPDF}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:opacity-90"
          >
            
            Sneak Peek of Chapter 1
          </button>
          <a href="/sneakpeek.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/15 border border-white/15">
            Open in new tab
          </a>
        </div>
      </section>

      {/* Lightbox (package) */}
      <Lightbox
        open={open}
        close={closeModal}
        slides={slides}
        index={selectedIndex}
        plugins={[Captions, Zoom, Fullscreen]}
        captions={{ descriptionTextAlign: "start" }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        animation={{ fade: 300, easing: "ease-in-out" }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0,0,0,0.92)" } }}
        on={{
          view: ({ index }) => {
            if (typeof index === 'number') {
              setSelectedIndex(index);
              setURLSlide(index);
            }
          },
        }}
      />

      {pdfOpen && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closePDF} aria-hidden />
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={closePDF}
          >
            <div
              className="relative w-[min(1000px,92vw)] h-[min(85vh,100svh-96px)] bg-black rounded-2xl overflow-hidden shadow-2xl pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sparkles just for fun */}
              <div className="sparkle s1">✨</div>
              <div className="sparkle s2">✨</div>
              <div className="sparkle s3">✨</div>
              <div className="sparkle s4">✨</div>

              {/* Header */}
              <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent">
                <div className="text-white/90 font-mono uppercase tracking-[0.2em] text-xs">Sneak Peek: Chapter 1</div>
                <button
                  type="button"
                  onClick={closePDF}
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z" />
                  </svg>
                </button>
              </div>

              {/* PDF iframe */}
              <iframe
                src="/sneakpeek.pdf#view=FitH"
                title="Sneak Peek Chapter 1"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
