import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";

export default function BookExtras() {
  // Grid items 
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
          "A hearing‑impaired community discarded by the system. They find purpose working the land—quiet strength at the edge of a loud, automated world.",
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
          "Bill Carter is Ian’s close associate. A former Navy Seabee, he likes his coffee in a his seasoned (unwashed) mug",
      },
      // {
      //   key: "atomic-ink",
      //   title: "Atomic Ink",
      //   image: "/atomicink.png",
      //   alt: "Atomic Ink artwork",
      //   description:
      //     "The sound of a world on the edge—lyrics by human hands, arrangement by machine. A creative question: progress, or a warning?",
      //   audio: "/Rise of Jacob Jones.mp3", // optional preview
      // },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleOpen = (item) => {
    setActive(item);
    setOpen(true);
  };

  return (
    <div className="px-4">
      {/* Header */}
      <section className="max-w-6xl mx-auto pt-16 pb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-mono uppercase tracking-[0.25em] text-white">
          Book Extras
        </h1>
        <p className="text-white/70 mt-3 max-w-2xl mx-auto">
          Concept art and artifacts that expand the world of
          <em> The Gathering</em>. Hover for titles. Click to read more.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ExtrasCard key={item.key} item={item} onOpen={() => handleOpen(item)} />
          ))}
        </div>
      </section>

      {/* Modal */}
      {open && active && (
        <ExtrasModal item={active} onClose={() => setOpen(false)} />)
      }
    </div>
  );
}

function ExtrasCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      <img
        src={item.image}
        alt={item.alt || item.title}
        loading="lazy"
        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {/* Hover title overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-4">
          <div className="text-white/90 font-mono uppercase tracking-[0.2em] text-sm">
            {item.title}
          </div>
        </div>
      </div>
    </button>
  );
}

function ExtrasModal({ item, onClose }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  const panelRef = useRef(null);
  const [topPx, setTopPx] = useState(0);

  // Lock scroll while modal open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Measure and center the panel within the viewport regardless of page scroll
  useLayoutEffect(() => {
    const recalc = () => {
      const el = panelRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      // 16px safe margin from top/bottom; clamp so it never goes out of frame
      const top = Math.max(16, Math.round((vh - h) / 2));
      setTopPx(top);
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    if (panelRef.current) ro.observe(panelRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
      ro.disconnect();
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    el.paused ? el.play() : el.pause();
  };

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Viewport-centered panel; JS computes exact top to keep it fully in-frame */}
      <div
        ref={panelRef}
        className="fixed left-1/2 -translate-x-1/2 w-[min(92vw,64rem)] max-h-[85svh] rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl overflow-hidden"
        style={{ top: topPx }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-10 w-10 grid place-items-center rounded-full bg-black/60 hover:bg-black/70 text-white/90 hover:text-white transition"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z" />
          </svg>
        </button>

        {/* Two-column layout filling the panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left: image, centered & contained */}
          <div className="flex items-center justify-center bg-white/5 min-h-[220px]">
            <img
              src={item.image}
              alt={item.alt || item.title}
              className="max-h-[70svh] md:max-h-[75svh] w-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Right: content (independently scrollable if needed) */}
          <div className="p-6 flex flex-col gap-3 overflow-y-auto">
            <h3 className="text-white font-mono uppercase tracking-[0.2em] text-sm">{item.title}</h3>
            <p className="text-white/80 leading-relaxed">{item.description}</p>

            {item.audio && (
              <div className="mt-2">
                <audio ref={audioRef} src={item.audio} preload="metadata" className="hidden" />
                <button
                  type="button"
                  onClick={toggle}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#ffce00] text-black px-3 py-2 text-sm hover:brightness-95"
                >
                  {playing ? (
                    <>
                      <span className="flex gap-[2px] items-end">
                        <span className="w-1 h-3 bg-black animate-[bounce_1s_infinite]" />
                        <span className="w-1 h-5 bg-black animate-[bounce_1.2s_infinite]" />
                        <span className="w-1 h-4 bg-black animate-[bounce_0.8s_infinite]" />
                      </span>
                      Pause Preview
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play Preview
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="mt-4 text-xs text-white/40 tracking-widest">ARTIFACT • PREVIEW</div>
          </div>
        </div>
      </div>
    </div>
  );
}