import React from "react";

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
            <audio
              controls
              preload="none"
              className="w-full max-w-md"
            >
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
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