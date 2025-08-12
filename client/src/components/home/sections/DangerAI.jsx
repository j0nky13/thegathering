import { Link } from "react-router-dom";

export default function DangerAI() {
  const points = [
    {
      title: "Creation becomes imitation",
      body:
        "Systems can synthesize voices and styles in seconds, skipping the human collaboration that once paid and connected people.",
    },
    {
      title: "Displacement is quiet",
      body:
        "Work shifts to tools that don’t rest or bargain—jobs vanish with a hum, not a headline.",
    },
    {
      title: "Control drifts",
      body:
        "As tools outlive makers, decisions migrate to pipelines. The line between creator and creation blurs.",
    },
  ];

  return (
    <section className="relative mt-16 pt-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-mono tracking-[0.25em] text-white text-xl">DANGERS OF AI</h2>
          <p className="mt-3 text-white/75 text-sm leading-relaxed">
            Not doom—just the obvious risks. Here’s the short version.
          </p>
        </div>

        {/* Minimal feature list */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map(({ title, body }, i) => (
            <article
              key={title}
              className="relative rounded-xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-lg transition-colors hover:bg-white/10"
            >
              {/* thin neon accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.25em] text-cyan-300/80">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-white font-medium leading-tight">{title}</h3>
              </div>
              <p className="mt-3 text-white/75 text-sm leading-relaxed">{body}</p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 hover:translate-y-[1px] transition"
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}