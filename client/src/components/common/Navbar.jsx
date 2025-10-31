import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import clsx from "clsx";


// Simple glitch text wrapper
function GlitchText({ children }) {
  return (
    <span className="relative inline-block select-none group">
      {/* main */}
      <span className="relative z-10 transition-transform duration-100 group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]">
        {children}
      </span>
      {/* cyan ghost */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-100 group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-hover:opacity-70 text-cyan-400 pointer-events-none"
      >
        {children}
      </span>
      {/* red ghost */}
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
      {/* darken for contrast */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 bg-black/40"
      />
      {/* accent color overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.45 }}
        className="fixed inset-0 z-[998] bg-cyan-500/10"
      />
      {/* RGB jitter glows */}
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, -4, 3, 0], opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(0,255,255,0.25), transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, 3, -2, 0], opacity: [0, 0.25, 0.25, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(255,0,60,0.25), transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* scanlines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 4px)',
        }}
      />
    </motion.div>
  );
}

function GlitchBurstPortal({ show }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <AnimatePresence>{show && <GlitchBurst />}</AnimatePresence>,
    document.body
  );
}

function SubscribeModal({ open, onClose }) {
  if (typeof document === "undefined") return null;

  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit(e) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const body = JSON.stringify({ email });
      // Try /api first; if 404 (ingress prefix stripped), fall back to /subscribe
      const tryOnce = async (path) => fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      let res = await tryOnce("/api/subscribe");
      if (res.status === 404) res = await tryOnce("/subscribe");

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setStatus("success");
      setMessage("Thanks! You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.18 }}
            className="relative z-[1001] w-[92vw] max-w-md rounded-xl border border-white/10 bg-[#0e0e0f] p-5 text-white shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 rounded p-2 text-white/80 hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18"/></svg>
            </button>

            <h3 className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-white/90">
              Subcribe to updates
            </h3>
            <p className="mb-4 text-sm text-white/70">
              Get updates on preorders, extras, and release dates.
            </p>

            <form onSubmit={submit} className="space-y-3">
              <input
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={clsx(
                  "inline-flex w-full items-center justify-center rounded-md border border-white/20 bg-[#ffce00] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-black transition",
                  status === "loading" && "opacity-80 cursor-wait"
                )}
              >
                {status === "loading" ? "Subscribing.." : "Subscribe"}
              </button>
            </form>

            {message && (
              <p className={clsx("mt-3 text-sm", status === "success" ? "text-emerald-400" : "text-rose-400")}>{message}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [burst, setBurst] = useState(false);

  function openWithBurst() {
    setBurst(true);
    setTimeout(() => setMenuOpen(true), 120);
    setTimeout(() => setBurst(false), 500);
  }

  function closeWithBurst() {
    setBurst(true);
    setMenuOpen(false);
    setTimeout(() => setBurst(false), 500);
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "AI Radio", path: "/atomicink" },
    { name: "Extras", path: "/bookextras" },
    { name: "Store", path: "/store" },
  ];

  return (
    <nav className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur text-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-2 md:grid md:grid-cols-3 items-center flex space-x-4 backdrop-blur-sm rounded-lg px-4 py-2">

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 justify-center md:col-start-2">
          {navItems.map(({ name, path }) => {
            if (name === "AI Radio") {
              return (
                <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                    `font-mono text-xs uppercase tracking-[0.15em] whitespace-nowrap group transition inline-flex items-center justify-center border border-white/30 rounded-md px-2.5 py-1 hover:bg-white/10 transition ${
                      isActive
                        ? "text-cyan-300"
                        : "text-white/85"
                    }`
                  }
                >
                  <GlitchText>{name}</GlitchText>
                </NavLink>
              );
            }
            return (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `font-mono text-xs uppercase tracking-[0.25em] group transition inline-flex items-center justify-center border border-white/30 rounded-md px-3 py-1 hover:bg-white/10 transition ${
                    isActive
                      ? "text-cyan-300"
                      : "text-white/85"
                  }`
                }
              >
                <GlitchText>{name}</GlitchText>
              </NavLink>
            );
          })}
        </div>

        {/* <div className="hidden md:flex justify-end md:col-start-3">
          <button
            type="button"
            onClick={() => setSubscribeOpen(true)}
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-[#ffce00] text-black px-3 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:shadow-md hover:translate-y-[1px] hover:opacity-95 transition"
          >
            Subscribe
          </button>
        </div> */}

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded p-2 text-white focus:outline-none"
          aria-label="Toggle menu"
          onClick={openWithBurst}
        >
          <div className="space-y-1.5">
            <span className="block h-[2px] w-7 bg-white" />
            <span className="block h-[2px] w-7 bg-white" />
            <span className="block h-[2px] w-7 bg-white" />
          </div>
        </button>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black backdrop-blur z-40 md:hidden"
            onClick={closeWithBurst}
          />
        )}
      </AnimatePresence>

      <GlitchBurstPortal show={burst} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="drawer"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1, x: [0, -1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', times: [0, 0.85, 0.95, 1] }}
            className="fixed inset-0 h-screen w-screen z-50 md:hidden bg-[#0c0c0c]/95 border-r border-white/10 shadow-2xl"
          >
            {/* Drawer header */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center px-4 py-4 border-b border-white/10">
              <span aria-hidden className="opacity-0 select-none">.</span>
              <button
                onClick={closeWithBurst}
                className="absolute right-4 text-white/90 p-2 rounded hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Centered navigation */}
            <div className="h-full w-full flex flex-col items-center justify-center px-6 pt-16">
              <nav className="w-full max-w-md flex flex-col items-center gap-4">
                {navItems.map(({ name, path }) => (
                  <NavLink
                    key={name}
                    to={path}
                    onClick={closeWithBurst}
                    className={({ isActive }) =>
                      `w-full py-4 text-center font-mono text-base uppercase tracking-[0.25em] group border border-white/10 rounded hover:bg-white/5 transition ${
                        isActive ? 'text-cyan-300' : 'text-white/90 hover:text-white'
                      }`
                    }
                  >
                    <GlitchText>{name}</GlitchText>
                  </NavLink>
                ))}

                <button
                  type="button"
                  onClick={() => { setSubscribeOpen(true); closeWithBurst(); }}
                  className="mt-6 inline-flex justify-center w-full font-mono text-[12px] uppercase tracking-[0.25em] text-black bg-[#ffce00] px-4 py-3 rounded hover:opacity-90 transition"
                >
                  Subscribe
                </button>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </nav>
  );
}