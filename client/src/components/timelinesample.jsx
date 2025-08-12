// Homepage block: Dangers of AI — redesigned split layout with sticky intro + timeline cards
import { Link } from "react-router-dom";

export default function DangerAI() {
  const points = [
    {
      title: "Creation to Replacement",
      tag: "Atomic Ink",
      body:
        "A solo pipeline can mimic a full band—melodies, voices, the works—sidestepping the messy, vital collaboration that pays real people.",
    },
    {
      title: "The Quiet Displacement",
      tag: "24/7 Machines",
      body:
        "Beyond music: scripts, faces, and service work shift to systems that don’t get sick, strike, or sleep—jobs vanish with a hum, not a bang.",
    },
    {
      title: "Utopia or Dystopia?",
      tag: "Knife’s Edge",
      body:
        "Liberation from drudgery or mass obsolescence? As tools outlive makers, control drifts—and the line between creator and creation blurs.",
    },
  ];

  return (
    <section className="relative mt-16 pt-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-4">
        {/* Left: Sticky intro panel */}
        <aside className="md:col-span-2 md:sticky md:top-24 self-start">
          <h2 className="font-mono tracking-[0.25em] text-white text-xl">
            DANGERS OF AI
          </h2>
          <p className="mt-3 text-white/75 text-sm leading-relaxed">
            A glimpse from <em>Ghost in the Machine</em>: when code stands in for crews and
            collaborators, the cost isn’t just style—it’s livelihoods.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 max-w-xs">
            <Badge label="Signal Rot" />
            <Badge label="Custodians" />
            <Badge label="The Line" />
          </div>
        </aside>

        {/* Right: Vertical timeline cards */}
        <div className="md:col-span-3 relative">
          {/* timeline rail */}
          <div aria-hidden className="hidden md:block absolute left-3 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-6">
            {points.map((p, i) => (
              <TimelineCard key={p.title} index={i + 1} {...p} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 hover:translate-y-[1px] transition"
            >
              Read more
            </Link>
          </div>

          {/* Footnote */}
          <p className="mt-4 text-center text-xs text-white/50">
            Full breakdown lives on the About page.
          </p>
        </div>
      </div>
    </section>
  );
}

function Badge({ label }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-white/70 border border-white/10 bg-white/5 rounded px-2 py-1 text-center">
      {label}
    </span>
  );
}

function TimelineCard({ index, title, tag, body }) {
  return (
    <div className="relative pl-10">
      {/* node */}
      <div className="hidden md:block absolute left-0 top-5 h-3 w-3 rounded-full bg-cyan-400/80 shadow-[0_0_0_3px_rgba(0,255,255,0.1)]" />
      {/* card */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">{title}</h3>
          <span className="text-[10px] uppercase tracking-widest text-white/60 border border-white/10 bg-[#0a0a0a] rounded px-2 py-0.5">
            {tag}
          </span>
        </div>
        <p className="mt-2 text-white/75 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}