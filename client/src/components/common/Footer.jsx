import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [quickOpenMobile, setQuickOpenMobile] = useState(false);
  const [quickOpenDesktop, setQuickOpenDesktop] = useState(false);
  return (
    <footer className="bg-[#0d0d0d] text-gray-400 px-4 py-10">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:justify-center md:gap-8">
        {/* Brand */}
        <Link
          to="/"
          className="font-mono tracking-[0.25em] text-white text-sm md:text-base text-center"
        >
          THE GATHERING
        </Link>

        {/* Quick Links — mobile (collapsible) */}
        <div className="w-full md:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/10 rounded-lg px-3 py-2 mx-auto"
            aria-expanded={quickOpenMobile}
            aria-controls="footer-quicklinks-mobile"
            onClick={() => setQuickOpenMobile((v) => !v)}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Quick Links</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`h-4 w-4 transition-transform ${quickOpenMobile ? "rotate-180" : "rotate-0"}`}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            id="footer-quicklinks-mobile"
            className={`mx-auto max-w-fit transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${quickOpenMobile ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
          >
            <nav className="flex flex-col items-center text-center gap-2">
              <Link to="/about" onClick={() => setQuickOpenMobile(false)} className="px-3 py-2 rounded hover:bg-white/10 transition">About</Link>
              <Link to="/atomicink" onClick={() => setQuickOpenMobile(false)} className="px-3 py-2 rounded hover:bg-white/10 transition">Atomic Ink</Link>
              <Link to="/bookextras" onClick={() => setQuickOpenMobile(false)} className="px-3 py-2 rounded hover:bg-white/10 transition">Book Extras</Link>
              <Link to="/store" onClick={() => setQuickOpenMobile(false)} className="px-3 py-2 rounded hover:bg-white/10 transition">Store</Link>
              <Link to="/contact" onClick={() => setQuickOpenMobile(false)} className="px-3 py-2 rounded hover:bg-white/10 transition">Contact</Link>
              <a href="#subscribe" onClick={() => setQuickOpenMobile(false)} className="px-3 py-2 rounded hover:bg-white/10 transition">Subscribe</a>
            </nav>
          </div>
        </div>

        {/* Quick Links — desktop (popover) */}
        <div className="hidden md:block relative">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/10 rounded-lg px-3 py-2"
            aria-expanded={quickOpenDesktop}
            aria-haspopup="true"
            onClick={() => setQuickOpenDesktop((v) => !v)}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Quick Links</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`h-4 w-4 transition-transform ${quickOpenDesktop ? "rotate-180" : "rotate-0"}`}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {quickOpenDesktop && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-xl border border-white/10 bg-[#0f0f0f] shadow-xl p-2 z-10">
              <nav className="flex flex-col text-center">
                <Link to="/about" onClick={() => setQuickOpenDesktop(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">About</Link>
                <Link to="/atomicink" onClick={() => setQuickOpenDesktop(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Atomic Ink</Link>
                <Link to="/bookextras" onClick={() => setQuickOpenDesktop(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Book Extras</Link>
                <Link to="/store" onClick={() => setQuickOpenDesktop(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Store</Link>
                <Link to="/contact" onClick={() => setQuickOpenDesktop(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Contact</Link>
                <a href="#subscribe" onClick={() => setQuickOpenDesktop(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Subscribe</a>
              </nav>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-white/60 text-center">
            © {new Date().getFullYear()} The Gathering • Published by{" "}
            <a href="#" className="underline decoration-dotted hover:text-white">Camber Media</a>
          </p>
        </div>
      </div>
    </footer>
  );
}