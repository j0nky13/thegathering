// src/components/common/Modal.jsx
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ open, onClose, title = "Coming soon!", children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[91] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-mono tracking-[0.2em] text-sm">{title}</h3>
                <button onClick={onClose} className="text-white/80 hover:text-white p-2 -m-2 rounded hover:bg-white/10" aria-label="Close">
                  ✕
                </button>
              </div>
              <div className="mt-4 text-white/80 text-sm">
                {children ?? "Store opens at launch. Check back soon."}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}