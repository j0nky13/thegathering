import { motion } from "framer-motion";

// Usage: <Hero imageSrc="/heroimage.png" />
export default function Hero({ imageSrc = "/heroimage.png", objectPosition = "center" }) {
  return (
    <section className="relative isolate min-h-[90vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
        {/* Extra bottom fade for smoother transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-[#0a0a0a] pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0.6), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] mix-blend-screen"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative px-4 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="font-mono text-[12px] tracking-[0.35em] text-white/80 uppercase"
        >
          COMING SOON:
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-2 font-mono text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] text-white"
        >
          THE <span className="text-cyan-300">GATHERING</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-5 text-white/80 italic"
        >
          “when a man has nothing to lose, he hits the fatal button.”
        </motion.p>

        <motion.a
          href="#subscribe"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="inline-block mt-8 font-mono text-[12px] uppercase tracking-[0.25em] text-black bg-[#ffce00] px-5 py-3 rounded-xl border border-black/10 shadow-sm hover:shadow-md hover:translate-y-[1px] transition"
        >
          Join the fight
        </motion.a>
      </div>
    </section>
  );
}
