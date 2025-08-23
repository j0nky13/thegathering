import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Usage: <Hero imageSrc="/heroimage.png" />
export default function Hero({ imageSrc = "/heroimage.png", objectPosition = "center", videoSrc = "/CTAVideo.mp4" }) {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
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

        <motion.img
          src="/logo4.svg"
          alt="The Gathering Logo"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mx-auto mt-4 max-w-[95%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[85%] xl:max-w-[80%]"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-5 text-white/80 italic"
        >
          “In a world governed by silence and submission, obedience is not a choice—it’s
embedded in the mind.”
        </motion.p>

        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="inline-block mt-8 font-mono text-[12px] uppercase tracking-[0.25em] text-black bg-[#ffce00] px-5 py-3 rounded-xl border border-black/10 shadow-sm hover:shadow-md hover:translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffce00]"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="hero-video-modal"
        >
         Sneak Peek
        </motion.button>
      </div>
      {open &&
        createPortal(
          (
            <div
              id="hero-video-modal"
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[9999] flex items-center justify-center"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />

              {/* Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-[92vw] max-w-4xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden border border-white/10"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close video"
                >
                  ✕
                </button>

                {/* Video */}
                <video
                  src={videoSrc}
                  className="h-full w-full"
                  controls
                  autoPlay
                  playsInline
                />
              </motion.div>
            </div>
          ),
          document.body
        )}
    </section>
  );
}
