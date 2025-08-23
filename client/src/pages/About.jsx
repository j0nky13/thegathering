// src/pages/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4">
      {/* Header */}
      <section className="text-center pt-16 pb-8">
        <h1 className="text-2xl md:text-3xl font-mono uppercase tracking-[0.25em] text-white">
          About The Gathering
        </h1>
        <p className="text-white/70 mt-3 text-sm">
          A near-future tale of control, resistance, and timing.
        </p>
      </section>

      {/* Body */}
      <section className="space-y-5 text-white/80 leading-relaxed">
        <p>
          <span className="text-white/90">The Great War has ended.</span> Automated Intelligence brokered the peace, then took over with
          the promise of utopia. Now their world is controlled by an all-seeing AI. Their freedom
          hangs by a thread. Their only hope is each other.
        </p>

        <p>
          Jacob’s AI empire has turned the world into a machine, stripping humanity of its autonomy
          and bending it to his will. But in the shadows, a resistance is forming. Ordinary people,
          those not willing to have a chip implanted—are stepping up to fight for a future free from
          oppression. They are known by the chipped as <span className="italic">Annies</span>.
        </p>

        <p>
          Ian and his team have one shot to take down the AI. With a carefully coded application and
          an audacious plan, they’ll target the heart of Jacob’s control network. But success relies
          on perfect timing, and confusion is their only ally.
        </p>

        <p>
          As chaos engulfs the country, the resistance faces overwhelming odds. They must rely on
          courage, trust, and their unbreakable will to fight for a future free from tyranny. Every move
          is calculated, every action a gamble.
        </p>

        <p>
          But the clock is ticking, and the AI is always watching. If they fail to strike in perfect unison,
          Jacob will adapt, and humanity’s last chance at freedom will be lost forever.
        </p>

        <p>
          <span className="italic">The Gathering</span> is a gripping tale of rebellion, sacrifice, and the relentless human spirit. In a
          battle of man versus machine, will courage and ingenuity be enough to topple an empire—
          or will Jacob’s AI tighten its grip, extinguishing hope once and for all?
        </p>
          </section>
          <br />

      {/* Closing / CTA */}
          <section className="text-center my-14 pt-10 border-t border-white/10">
              <br />
        <blockquote className="text-white/90 text-lg md:text-xl italic">
          “When the call goes out, will you answer?”
        </blockquote>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Link
            to="/bookextras"
            className="w-full sm:w-40 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 transition"
          >
            Explore Book Extras
          </Link>
          <Link
            to="/store"
            className="w-full sm:w-40 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 transition"
          >
            Visit Store
          </Link>
        </div>
      </section>
    </div>
  );
}