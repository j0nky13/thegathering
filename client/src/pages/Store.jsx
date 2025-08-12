import { motion } from "framer-motion";

export default function Store() {
  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="font-mono tracking-[0.25em] text-2xl sm:text-3xl text-white">
          STORE
        </h1>
        <p className="text-white/70 mt-3">
          Books, signed editions, and future merch. Coming online soon.
        </p>
      </div>

      {/* Vendor buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <a
          href="#"
          className="rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          onClick={(e) => e.preventDefault()}
        >
          Buy Now (soon)
        </a>
        <a
          href="#"
          className="rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          onClick={(e) => e.preventDefault()}
        >
          See at other vendors
        </a>
        {/* When ready: replace # with Amazon/B&N/IndieBound links */}
      </div>

      {/* Products grid (placeholder, modular-ready) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Hardcover", price: "$—", tag: "Coming soon" },
          { title: "Paperback", price: "$—", tag: "Coming soon" },
          { title: "eBook", price: "$—", tag: "Coming soon" },
          { title: "Poster (A2)", price: "$—", tag: "Planned" },
          { title: "Sticker Pack", price: "$—", tag: "Planned" },
          { title: "T-Shirt", price: "$—", tag: "Planned" },
        ].map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-5 shadow-lg"
          >
            <img
              src="https://placehold.co/600x360/0f0f0f/9ca3af?text=COMING%20SOON"
              alt={`${p.title} placeholder`}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="flex items-center justify-between">
              <h3 className="font-mono tracking-[0.15em] text-white">{p.title}</h3>
              <span className="text-xs text-white/60">{p.tag}</span>
            </div>
            <div className="mt-2 text-white/80">{p.price}</div>
            <button
              disabled
              className="mt-4 w-full rounded bg-cyan-500/80 text-black py-2 text-sm disabled:opacity-60"
              title="Not available yet"
            >
              Add to cart (soon)
            </button>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <p className="mt-10 text-center text-xs text-white/50">
        Want to be notified when the store goes live?{" "}
        <a href="#subscribe" className="underline decoration-dotted hover:text-white">
          Join the list
        </a>
      </p>
    </section>
  );
}
