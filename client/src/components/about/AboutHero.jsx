import React from "react";

export default function AboutHero({ title, subtitle, lead }) {
  return (
    <section className="max-w-5xl mx-auto text-center pt-16 pb-12">
      <h1 className="text-3xl md:text-4xl font-mono uppercase tracking-[0.25em] text-white">
        {title}
      </h1>
      <p className="mt-3 text-white/60 text-sm uppercase tracking-[0.2em]">
        {subtitle}
      </p>
      <div className="mt-8 space-y-4">
        {lead.map((para, idx) => (
          <p
            key={idx}
            className="text-white/75 leading-relaxed max-w-3xl mx-auto text-base"
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}