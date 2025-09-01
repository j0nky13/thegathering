import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) setSubmitted(true);
      else console.error("Failed to send message");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <section className="px-4 mt-16 pt-12 border-t border-white/10 text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-mono tracking-[0.25em] text-lg uppercase">CONTACT</h1>
          <p className="text-white/70 mt-3 text-sm max-w-xl mx-auto">
            Signal us with questions, rights/press, or collaboration. One message. We reply.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Name */}
            <label className="block">
              <span className="block text-xs tracking-widest text-white/60 uppercase mb-2">Name</span>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-white/30"
                placeholder="Your Name"
                autoComplete="name"
              />
            </label>

            {/* Email */}
            <label className="block">
              <span className="block text-xs tracking-widest text-white/60 uppercase mb-2">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-white/30"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </label>

            {/* Message */}
            <label className="block">
              <span className="block text-xs tracking-widest text-white/60 uppercase mb-2">Message</span>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-white/30 resize-none"
                placeholder="Tell us what you’re looking for…"
              />
            </label>

            {/* Submit */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 hover:translate-y-[1px] transition"
              >
                Send Message
              </button>
            </div>
<br /><br />
           
          </form>
        ) : (
          <div className="mt-10 text-center">
            <div className="inline-block rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <p className="font-mono text-[12px] tracking-[0.25em] text-cyan-300">MESSAGE RECEIVED</p>
              <p className="mt-2 text-white/80">We’ll be in touch soon.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}