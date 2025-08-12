// Parent wrapper for homepage modular sections.
// We'll add real subcomponents next (in their own files) and drop them in where noted.

import DangerAI from "./sections/DangerAI";
import AuthorNote from "./sections/AuthorNote";

// Intended future imports (commented out for now to avoid build errors):
// import DangerAI from "./sections/DangerAI";
// import AuthorNote from "./sections/AuthorNote";
// import QuoteBlock from "./sections/QuoteBlock";

export default function HomeSections() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto space-y-20">
        {/**
         * SECTION 1 — Quote Block / Pull-quote (placeholder)
         * File to create next: src/components/home/sections/QuoteBlock.jsx
         */}
        <div className="rounded-2xl bg-[#0c0c0c] p-6 md:p-10 shadow-lg text-center">
          <blockquote className="text-white/90 text-xl md:text-2xl leading-relaxed glitch-text flicker-text">
            “A robot may not harm humanity, or, by inaction, allow humanity to come to harm.”
          </blockquote>
          <div className="mt-3 text-white/60 text-xs tracking-widest">— Zeroth Law of Robotics (Asimov)</div>
      </div>
      
      <DangerAI />
      
       <AuthorNote />
      </div>
    </section>
  );
}