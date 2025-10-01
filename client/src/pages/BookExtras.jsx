import React, { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// --- Lightweight Book Extras page ---
// • Fullscreen photo lightbox with captions
// • Optional deep links via ?slide=1-based
// • Sneak Peek section with PDF (new tab) + Audio (modal)

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
  const [audioInlineOpen, setAudioInlineOpen] = useState(false);

  const [shareToast, setShareToast] = useState(false);
  const hideToastRef = useRef(null);

  // --- Audio Prologue player state ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isSeeking, setIsSeeking] = useState(false);

  const formatTime = (secs) => {
    if (!Number.isFinite(secs)) return "0:00";
    const s = Math.max(0, Math.floor(secs));
    const m = Math.floor(s / 60);
    const r = String(s % 60).padStart(2, "0");
    return `${m}:${r}`;
  };

  const showShareToast = () => {
    setShareToast(true);
    clearTimeout(hideToastRef.current);
    hideToastRef.current = setTimeout(() => setShareToast(false), 1600);
  };

  const currentSlideUrl = (idx = selectedIndex) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(idx + 1));
      url.searchParams.delete("peek");
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const shareCurrent = async () => {
    const url = currentSlideUrl();
    const title = items[selectedIndex]?.title || "Photo";
    const text = `Check this out: ${title}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
    } catch (_) {
      // Fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(url);
      showShareToast();
    } catch (_) {
      window.prompt("Copy this link", url);
    }
  };

  // Wire up audio element events (attach when player is visible)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => { if (!isSeeking) setCurTime(a.currentTime || 0); };
    const onLoaded = () => setDuration(Number.isFinite(a.duration) ? a.duration : 0);
    const onDurationChange = () => setDuration(Number.isFinite(a.duration) ? a.duration : 0);
    const onEnded = () => setIsPlaying(false);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("durationchange", onDurationChange);
    a.addEventListener("ended", onEnded);

    // ensure volume is applied whenever it changes
    a.volume = volume;

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("durationchange", onDurationChange);
      a.removeEventListener("ended", onEnded);
    };
  }, [audioInlineOpen, isSeeking, volume]);

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
            <div className="lb-cap-row">
              <div className="lb-cap-title">{it.title}</div>
              <button
                type="button"
                className="lb-share-btn"
                onClick={shareCurrent}
                aria-label="Share this image"
                title="Share this image"
              >
                <svg viewBox="0 0 24 24" className="lb-share-ico" fill="currentColor" aria-hidden>
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.02-4.11c.54.5 1.25.81 2.07.81A2.99 2.99 0 0 0 21 5a3 3 0 1 0-5.91.7L8.07 9.81A3.02 3.02 0 0 0 6 9a3 3 0 1 0 0 6c.82 0 1.57-.31 2.13-.82l7.02 4.11c-.05.21-.08.43-.08.66a3 3 0 1 0 3-3.87z" />
                </svg>
                <span className="lb-share-label">Share</span>
              </button>
            </div>
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

  // ESC closes only the PDF modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        closePDF();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => clearTimeout(hideToastRef.current), []);

  // --- Audio controls ---
  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      try {
        await a.play();
        setIsPlaying(true);
      } catch {
        // autoplay blocked
      }
    }
  };

  const handleSeekMouseDown = () => setIsSeeking(true);
  const handleSeekMouseUp = (e) => {
    const a = audioRef.current; if (!a) return;
    const v = Number(e.target.value);
    a.currentTime = v;
    setCurTime(v);
    setIsSeeking(false);
  };
  const handleSeekChange = (e) => setCurTime(Number(e.target.value));

  const handleVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleSkip = (delta) => {
    const a = audioRef.current; if (!a) return;
    const dur = Number.isFinite(a.duration) ? a.duration : (duration || 0);
    const next = Math.max(0, Math.min((a.currentTime || 0) + delta, dur));
    a.currentTime = next;
    setCurTime(next);
  };

  const revealAndPlayInline = () => {
    if (audioInlineOpen) {
      try { if (audioRef.current) audioRef.current.pause(); } catch {}
      setIsPlaying(false);
      setAudioInlineOpen(false);
    } else {
      setAudioInlineOpen(true);
      // kick playback after render
      setTimeout(() => { togglePlay(); }, 120);
    }
  };

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
        .lb-cap-row { display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%; }
        .lb-share-btn { display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border-radius:9999px; background:#fff; color:#000; font-size:12px; line-height:1; box-shadow:0 6px 18px rgba(0,0,0,.3); border:1px solid rgba(255,255,255,.1); }
        .lb-share-btn:hover { opacity:.9 }
        .lb-share-ico { width:14px; height:14px; }
        @media (max-width: 480px) { .lb-share-label { display:none } }
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

      {/* Sneak Peek */}
      <section className="max-w-6xl mx-auto pb-24 text-center flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-mono uppercase tracking-[0.2em] text-white mb-4">Sneak Peek: Prologue</h2>
        <p className="text-white/70 mb-4">Choose how you'd like to preview:</p>
        <div className="w-full max-w-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="/sneakpeek.pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-base md:px-3 md:py-1.5 md:text-sm rounded-lg bg-white/10 text-white hover:bg-white/15 border border-white/15"
            >
              Text version
            </a>
            <button
              type="button"
              onClick={revealAndPlayInline}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-base md:px-3 md:py-1.5 md:text-sm rounded-lg bg-white/10 text-white hover:bg-white/15 border border-white/15"
              aria-expanded={audioInlineOpen}
              aria-controls="prologue-audio-inline"
            >
              {audioInlineOpen ? 'Hide audio' : 'Audio Version'}
            </button>
          </div>

          {audioInlineOpen && (
            <div id="prologue-audio-inline" className="mt-4">
              {/* Hidden native audio element */}
              <audio ref={audioRef} src="/prologue.mp3" preload="metadata" />

              {/* Compact inline player */}
              <div
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left shadow-lg"
                role="group"
                aria-label="Audio player: Prologue"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
                  if (e.code === 'ArrowRight') { handleSkip(5); }
                  if (e.code === 'ArrowLeft') { handleSkip(-5); }
                }}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="shrink-0 h-9 w-9 grid place-items-center rounded-full bg-white/90 text-black hover:bg-white"
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                        <path d="M7 6h3v12H7zM14 6h3v12h-3z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={Math.max(0, duration)}
                      step={0.1}
                      value={curTime}
                      onMouseDown={handleSeekMouseDown}
                      onTouchStart={handleSeekMouseDown}
                      onChange={handleSeekChange}
                      onMouseUp={handleSeekMouseUp}
                      onTouchEnd={handleSeekMouseUp}
                      aria-label="Seek"
                      className="w-full accent-white"
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] text-white/70">
                      <div>{formatTime(curTime)}</div>
                      <div>{formatTime(duration)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSkip(-10)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/15 border border-white/15 text-sm"
                  >
                    -10s
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSkip(10)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/15 border border-white/15 text-sm"
                  >
                    +10s
                  </button>

                  <div className="ml-auto flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/70" fill="currentColor" aria-hidden>
                      <path d="M4 9v6h4l5 5V4L8 9H4z" />
                    </svg>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume"
                      className="w-24 accent-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
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
            if (typeof index === "number") {
              setSelectedIndex(index);
              setURLSlide(index);
            }
          },
        }}
      />

      {shareToast && (
        <div className="fixed inset-x-0 bottom-6 z-[95] flex justify-center">
          <div className="text-xs px-3 py-2 rounded-lg bg-white/90 text-black shadow-md">
            Link copied ✓
          </div>
        </div>
      )}

      {/* PDF Modal */}
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
                <div className="text-white/90 font-mono uppercase tracking-[0.2em] text-xs">Sneak Peek: Prologue</div>
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
                title="Sneak Peek Prologue"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}