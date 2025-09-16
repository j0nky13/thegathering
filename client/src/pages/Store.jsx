import { motion } from "framer-motion";

export default function Store() {
  const storeUrl = import.meta.env.VITE_STORE_URL || "https://store.example.com";

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="font-mono tracking-[0.25em] text-2xl sm:text-3xl text-white">
          STORE
        </h1>
        <p className="text-white/70 mt-3">
          A preview of books, signed editions, prints, and merch. Purchases happen on our external store.
        </p>
      </div>

      {/* External store CTA */}
      <div className="flex items-center justify-center mb-12">
        <a
          href={storeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white text-black px-4 py-2 text-sm hover:opacity-90 transition"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M14 3h7v7h-2V6.414l-8.293 8.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
          </svg>
          Visit Store
        </a>
      </div>

      {/* Products grid (placeholder, modular-ready) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Hard Cover Book", store: 26.95, tag: "Preorder", preorder: true },
          { title: "Soft Cover Book", store: 17.95, tag: "Preorder", preorder: true },
          { title: "E-Book", store: 9.95, tag: "Preorder", preorder: true },
          { title: "Signed Hard Cover Book", store: 29.95, tag: "Signed" },
          { title: "Special Edition Hard Cover (25 available)", store: 49.95, tag: "Limited" },
          { title: "Cover Photo (Signed) 12×18", store: 24.95, tag: "Print" },
          { title: "Cover Photo (Signed) 18×24", store: 34.95, tag: "Print" },
          { title: "T-Shirt", store: 19.95, tag: "Merch", preorder: false },
        ].map((p, i) => {
          const isPrint = p.title.toLowerCase().includes("cover photo");
          // Special edition cover image
          const imgSrc =
            p.title === "Special Edition Hard Cover (25 available)"
              ? "/special-edition.png"
              : p.title === "T-Shirt"
                ? "/t-shirt.jpeg"
                : isPrint
                  ? "/gathering-cover.jpg"
                  : "/bookcover.png";
          return (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-5 shadow-lg flex flex-col"
          >
            <div className="relative mb-4">
              <img
                src={imgSrc}
                alt={p.title}
                className={`w-full ${p.title === "Special Edition Hard Cover (25 available)" ? "h-44" : "h-48"} object-contain rounded mx-auto`}
              />
              {/* Badge */}
              <span
                className={[
                  "absolute top-2 left-2 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]",
                  p.tag === "Limited" ? "bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-200" :
                  p.tag === "Signed" ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-200" :
                  p.tag === "Preorder" ? "bg-cyan-500/15 border-cyan-400/30 text-cyan-200" :
                  "bg-white/10 border-white/20 text-white/80"
                ].join(" ")}
              >
                {p.tag}
              </span>
            </div>
            <div className="flex items-center justify-between min-h-[3.25rem]">
              <h3 className="font-mono tracking-[0.15em] text-white leading-snug">{p.title}</h3>
            </div>
            <div className="mt-2 mb-2">
              <div className="flex items-baseline gap-3">
                <span className="text-white font-semibold">${p.store.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-auto pt-3 text-xs text-white/50">
              Preview of what will be offered — checkout happens on our external store.
            </div>
          </motion.div>
          );
        })}
      </div>

      {/* Note */}
      <p className="mt-10 text-center text-xs text-white/50">
        The cart lives on our external store. Want an email when it goes live? {" "}
        <a href="#subscribe" className="underline decoration-dotted hover:text-white">Join the list</a>.
      </p>
    </section>
  );
}
