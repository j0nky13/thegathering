import React, { useRef, useState, useEffect } from "react";

export default function BookExtras() {
  // Fill this with real assets (png/jpg/gif). Paths assume /public.
  const items = [
    {
      title: "The Rise of Jacob Jones",
      blurb:
        "An audio vignette outlining the opening chapter.",
      image: "/atomicink.png",
      alt: "The Rise of Jacob Jones audio preview cover",
      audio: "/Rise of Jacob Jones.mp3",
    },
    {
      title: "The Silent Ones",
      blurb:
        "Everybody has to pitch in, if you don't- you don't stay.",
      image: "/farming.png",
      alt: "The Silent Ones",
    },
    {
      title: "Walking ruins",
      blurb:
        "Walking through a town alone",
      image: "/walkingruins.png",
      alt: "Walking the ruins",
    },
    {
      title: "Capital Fight",
      blurb:
        "Fighting the Drones.",
      image: "/heroimage.png",
      alt: "Drones and water",
    },
    {
      title: "Atomic Ink",
      blurb:
        "The sound of a world on the edge. Lyrics by human hands, arrangement by machine.",
      image: "/atomicink.png",
      alt: "Cover art for an AI era",
    },
  ];

  return (
    <div className="px-4">
      {/* Header */}
      <section className="max-w-6xl mx-auto pt-16 pb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-mono uppercase tracking-[0.25em] text-white">
          Book Extras
        </h1>
        <p className="text-white/70 mt-3 max-w-2xl mx-auto">
          Concept art, GIF loops, and artifacts that expand the world of
          <em> The Gathering</em>.
        </p>
      </section>

      {/* Alternating rows */}
      <section className="max-w-6xl mx-auto pb-24 space-y-16">
        {items.map((item, i) => (
          <ExtrasRow key={item.title} {...item} reverse={i % 2 === 1} />
        ))}
      </section>
    </div>
  );
}

function ExtrasRow({ title, blurb, image, alt, audio, reverse = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState([4, 10, 7]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
    } else {
      el.pause();
    }
  };

  // Animate "synth lines" while playing
  useEffect(() => {
    if (!isPlaying) return;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const id = setInterval(() => {
      setBars([rand(4, 14), rand(3, 12), rand(5, 16)]);
    }, 180);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Wire up audio events
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <article
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* Text column */}
      <div>
        <h2 className="text-lg font-mono uppercase tracking-[0.2em] text-white">
          {title}
        </h2>
        <p className="text-white/75 mt-3 leading-relaxed">{blurb}</p>

        {audio && (
          <div className="mt-4">
            {/* Hidden native element drives playback */}
            <audio ref={audioRef} src={audio} preload="metadata" className="hidden" />

            {/* Compact player */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 shadow-sm">
              <button
                type="button"
                onClick={togglePlay}
                className="h-8 w-8 rounded-full bg-[#ffce00] text-black grid place-items-center hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#ffce00]/60"
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
                    <rect x="5" y="4" width="5" height="16" rx="1" />
                    <rect x="14" y="4" width="5" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Synth lines */}
              <div className="flex items-end gap-1 h-4 w-8">
                <div
                  className="w-[3px] bg-[#ffce00] rounded-full transition-[height] duration-150"
                  style={{ height: `${bars[0]}px` }}
                />
                <div
                  className="w-[3px] bg-[#ffce00] rounded-full transition-[height] duration-150"
                  style={{ height: `${bars[1]}px` }}
                />
                <div
                  className="w-[3px] bg-[#ffce00] rounded-full transition-[height] duration-150"
                  style={{ height: `${bars[2]}px` }}
                />
              </div>

              <div className="text-xs text-white/70 truncate max-w-[14rem]">{title}</div>
            </div>

            <div className="text-xs text-white/50 mt-2">Audio: {title}</div>
          </div>
        )}

        {/* Optional tiny meta row (remove if you don’t want it) */}
        <div className="mt-4 text-xs text-white/40 tracking-widest">
          ARTIFACT • PREVIEW
        </div>
      </div>

      {/* Media column */}
      <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5">
        {/* Media */}
        <img
          src={image}
          alt={alt || title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Subtle overlay + caption on hover (desktop) */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white/90 text-sm">{audio ? "Tap to play preview" : (alt || title)}</div>
        </div>
      </div>
    </article>
  );
}