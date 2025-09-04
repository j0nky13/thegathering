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
      {/* <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <a
          href="#"
          className="rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          onClick={(e) => e.preventDefault()}
        >
          Preorder (Amazon soon)
        </a>
        <a
          href="#"
          className="rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          onClick={(e) => e.preventDefault()}
        >
          See at other vendors
        </a> */}
        {/* When ready: replace # with Amazon/B&N/IndieBound links */}
      {/* </div> */}

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
            {p.preorder ? (
              <button
                disabled
                className="mt-auto w-full rounded bg-white/10 text-white py-2 text-sm disabled:opacity-60 border border-white/15"
                title="Pre-orders coming soon"
              >
                Pre-orders Coming Soon
              </button>
            ) : (
              <button
                disabled
                className="mt-auto w-full rounded bg-white/10 text-white py-2 text-sm disabled:opacity-60 border border-white/15"
                title="Not available yet"
              >
                Coming Soon
              </button>
            )}
          </motion.div>
          );
        })}
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
