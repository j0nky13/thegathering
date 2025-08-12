import React from "react";

const AuthorNote = () => (
  <section className="mt-16 pt-12 border-t border-white/10">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="font-mono tracking-[0.25em] text-white text-lg">BOOK EXTRAS</h2>
      <p className="text-white/70 mt-3 text-sm leading-relaxed max-w-3xl mx-auto">
        Concept art, unreleased pages, and artifacts that expand the world of <em>The Gathering</em>.
      </p>
      <a
        href="/bookextras"
        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 transition mt-6"
      >
        View Extras
      </a>
    </div>
  </section>
);

export default AuthorNote;