import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function GlitchText({ children }) {
  return (
    <span className="relative inline-block select-none group">
      <span className="relative z-10 transition-transform duration-100 group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-100 group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-hover:opacity-70 text-cyan-400 pointer-events-none"
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-0 -translate-x-0 -translate-y-0 opacity-0 transition-all duration-100 group-hover:-translate-x-[2px] group-hover:translate-y-[1px] group-hover:opacity-70 text-[#ff003c] pointer-events-none"
      >
        {children}
      </span>
    </span>
  );
}

function GlitchBurst() {
  return (
    <motion.div
      key="glitch-burst"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[999] pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.45 }}
        className="fixed inset-0 z-[998] bg-cyan-500/10"
      />
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, -4, 3, 0], opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,255,255,0.25), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, 3, -2, 0], opacity: [0, 0.25, 0.25, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,0,60,0.25), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 4px)",
        }}
      />
    </motion.div>
  );
}

function GlitchBurstPortal({ show }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>{show && <GlitchBurst />}</AnimatePresence>,
    document.body
  );
}


export default function Hero({ imageSrc = "/heroimage.png", objectPosition = "center", videoSrc = "/CTAVideo.mp4" }) {
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [burst, setBurst] = useState(false);
  const modalRef = useRef(null);

  const handleNotify = () => {
    const anchor = document.getElementById('subscribe') || document.querySelector('[data-subscribe-anchor]');
    if (anchor && typeof anchor.scrollIntoView === 'function') {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setNotifyOpen(true);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;

    const focusable = modalRef.current?.querySelectorAll(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    first?.focus();

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open]);

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
        {/* <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="font-mono text-[12px] tracking-[0.35em] text-white/80 uppercase"
        >
          EBook Pre-Orders now open
        </motion.p> */}

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
          “When the call goes out, will you answer?”
        </motion.p>

        <motion.button
          onClick={() => {
            setBurst(true);
            setTimeout(() => setOpen(true), 120);
            setTimeout(() => setBurst(false), 500);
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="inline-block mt-8 font-mono text-[12px] uppercase tracking-[0.25em] text-black bg-[#ffce00] px-5 py-3 rounded-xl border border-black/10 shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffce00]"
        >
          Order Now
        </motion.button>
      </div>
      {open &&
        createPortal(
          (
            <div
              id="hero-purchase-modal"
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
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-[92vw] max-w-md bg-[#0b0b0b] rounded-xl shadow-2xl overflow-hidden border border-white/10 p-8 md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-[#ffce00] transition font-mono text-lg"
                  aria-label="Close"
                >
                  ✕
                </button>

                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/85 mb-4 text-center">
                  <GlitchText>Choose Your Store</GlitchText>
                </h3>

                <div className="space-y-3">

                  {[
                    {
                      name: "Amazon",
                      url: "https://www.amazon.com/Gathering-W-K-Rader/dp/B0FVSM5SS8",
                    },
                    {
                      name: "Barnes & Noble",
                      url: "https://www.barnesandnoble.com/w/the-gathering-w-k-rader/1148604748?ean=9798999082107",
                    },
                    {
                      name: "Books-A-Million",
                      url: "https://www.booksamillion.com/p/Gathering/W-K-Rader/9798999082107",
                    },
                    {
                      name: "Buy Direct (Signed Copy)",
                      url: "https://checkout.square.site/merchant/PNY7YGK2CAS3X/checkout/N4PYILSSH7Y2ASTC3W7QS5FN",
                    }
                  ].map((store) => (
                    <a
                      key={store.name}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.25em] group transition inline-flex items-center justify-center border border-white/30 rounded-md px-4 py-4 hover:bg-[#ffce00] hover:text-black text-white/90 w-full"
                    >
                      <GlitchText>{store.name}</GlitchText>
                    </a>
                  ))}

                </div>
              </motion.div>
            </div>
          ),
          document.body
        )}
      {notifyOpen &&
        createPortal(
          (
            <div
              id="notify-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="notify-title"
              className="fixed inset-0 z-[9999] flex items-center justify-center"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setNotifyOpen(false)}
              />

              {/* Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-[92vw] max-w-md bg-[#0b0b0b] rounded-xl shadow-2xl overflow-hidden border border-white/10 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setNotifyOpen(false)}
                  className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close subscribe"
                >
                  ✕
                </button>

                <h3 id="notify-title" className="text-white font-mono uppercase tracking-[0.2em] text-sm mb-3">Join the Waitlist</h3>
                <p className="text-white/70 text-sm mb-4">Get an email when <span className="text-white">The Gathering</span> goes live.</p>

                <form
                  onSubmit={async (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const email = (fd.get('email') || '').toString().trim();
  if (!email) return;

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'hero-modal' })
    });
    const data = await res.json();
    if (!data.ok) {
      alert('Subscription failed. Please try again.');
      return;
    }
    setNotifyOpen(false);
  } catch {
    alert('Network error.');
  }
}}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-white/30"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#ffce00] text-black py-3 font-mono text-[12px] uppercase tracking-[0.25em] hover:brightness-95"
                  >
                    Notify Me
                  </button>
                </form>

                <p className="mt-3 text-[11px] text-white/40">We’ll only email you about the launch. Unsubscribe anytime.</p>
              </motion.div>
            </div>
          ),
          document.body
        )}
      <GlitchBurstPortal show={burst} />
    </section>
  );
}

<style jsx global>{`
`}</style>
