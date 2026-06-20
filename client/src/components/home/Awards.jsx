// src/components/home/Awards.jsx

export default function Awards() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-white/50 uppercase tracking-[0.35em] text-xs mb-3">
            Recognition
          </p>

          <h2 className="text-white font-mono text-2xl md:text-3xl tracking-[0.2em]">
            AWARDS & PRAISE
          </h2>

          <div className="mt-5 h-px w-24 bg-white/10 mx-auto" />
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col items-center gap-12 lg:hidden">
          <div className="grid grid-cols-2 gap-8 items-center justify-items-center w-full max-w-3xl">
            <img
              src="/fictionaward.png"
              alt="Fiction Award"
              className="
                max-h-40
                w-auto
                object-contain
                opacity-90
                transition-all
                duration-300
                hover:opacity-100
                hover:scale-105
              "
            />

            <img
              src="/sciencefictionaward.webp"
              alt="Science Fiction Award"
              className="
                max-h-40
                w-auto
                object-contain
                opacity-90
                transition-all
                duration-300
                hover:opacity-100
                hover:scale-105
              "
            />
          </div>

          <img
            src="/recommended.JPG"
            alt="Recommended Award"
            className="
              max-h-48
              w-auto
              object-contain
              opacity-90
              transition-all
              duration-300
              hover:opacity-100
              hover:scale-105
            "
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-12 items-center justify-items-center">
          <img
            src="/fictionaward.png"
            alt="Fiction Award"
            className="
              max-h-44
              w-auto
              object-contain
              opacity-90
              transition-all
              duration-300
              hover:opacity-100
              hover:scale-105
            "
          />

          <img
            src="/recommended.JPG"
            alt="Recommended Award"
            className="
              max-h-52
              w-auto
              object-contain
              opacity-90
              transition-all
              duration-300
              hover:opacity-100
              hover:scale-105
            "
          />

          <img
            src="/sciencefictionaward.webp"
            alt="Science Fiction Award"
            className="
              max-h-44
              w-auto
              object-contain
              opacity-90
              transition-all
              duration-300
              hover:opacity-100
              hover:scale-105
            "
          />
        </div>
      </div>
    </section>
  );
}