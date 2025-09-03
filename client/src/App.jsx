import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import About from './pages/About'
import AtomicInk from './pages/AtomicInk'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Store from './pages/Store'
import BookExtras from './pages/BookExtras'
import NotFound from './pages/NotFound'

// --- visual helpers ---
function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.035] mix-blend-screen"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
      }}
    />
  )
}

function GlitchWipe() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        background:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)',
      }}
    />
  )
}

function GlobalGlitchBurst() {
  return (
    <motion.div
      key="global-glitch-burst"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[999] pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[998] bg-cyan-500/10"
      />
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, -4, 3, 0], opacity: [0, 0.5, 0.5, 0] }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(0,255,255,0.25), transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, 3, -2, 0], opacity: [0, 0.35, 0.35, 0] }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(255,0,60,0.25), transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 4px)',
        }}
      />
    </motion.div>
  )
}

function GlobalGlitchPortal({ show }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>{show && <GlobalGlitchBurst />}</AnimatePresence>,
    document.body
  )
}

const pageVariants = {
  initial: { opacity: 0, filter: 'contrast(120%) saturate(120%)', skewX: 1, x: 10 },
  in:      { opacity: 1, filter: 'contrast(100%) saturate(100%)', skewX: 0, x: 0, transition: { duration: 0.35 } },
  out:     { opacity: 0, filter: 'contrast(140%) saturate(160%)', skewX: -1, x: -10, transition: { duration: 0.25 } },
}

// Wraps public pages with transition
function TransitionShell({ children }) {
  const location = useLocation()
  const [routeBurst, setRouteBurst] = useState(false)
  const firstLoadRef = useRef(true)

  // Fire the glitch before paint on route change
  useLayoutEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false
      return
    }
    setRouteBurst(true)
    const t = setTimeout(() => setRouteBurst(false), 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  // Scroll reset after navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <GlobalGlitchPortal show={routeBurst} />
      <NoiseOverlay />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="relative z-10 flex-1"
        >
          <GlitchWipe />
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function AppWrapper() {
  const location = useLocation()

  return (
    <TransitionShell>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/atomicink" element={<AtomicInk />} />
        <Route path="/store" element={<Store />} />
        <Route path="/bookextras" element={<BookExtras />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TransitionShell>
  )
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}