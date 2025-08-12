// src/components/home/BookPromo.jsx
import { Link } from "react-router-dom";

export default function BookPromo({
  coverSrc = "/gathering-cover.jpg",   // drop your cover into /public and name it cover.jpg (or pass a prop)
  title = "The Gathering",
  author = "W. K. Rader",
}) {
  return (
    <section className="px-4 pt-28 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Cover */}
        <div className="relative w-full max-w-xs mx-auto md:max-w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl">
          <img
            src={coverSrc}
            alt={`${title} book cover`}
            className="h-full w-full object-cover"
          />
          {/* subtle overlay/gloss */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Copy + CTAs */}
        <div>
          <h2 className="font-mono tracking-[0.25em] text-white text-xl sm:text-2xl">
            {title}
          </h2>
          <p className="text-white/60 mt-1 text-sm uppercase tracking-[0.2em]">
            {author}
          </p>

          <p className="text-white/80 mt-5 leading-relaxed">
            A post-AI apocalypse tale of control, memory, and the last human
            decisions that matter. Dive into corrupted archives, rogue machine
            factions, and the people trying to remember what’s true.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* <Link
              to="/store"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-cyan-400/90 text-black px-4 py-2 font-mono text-[12px] uppercase tracking-[0.25em] shadow-sm hover:shadow-md hover:translate-y-[1px] transition"
            >
              Buy now
            </Link> */}
            <a
              href="#subscribe"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[12px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 hover:translate-y-[1px] transition"
            >
              Join the fight
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}