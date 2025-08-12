import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("...");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus("Subscribed. See you at launch."); setEmail(""); }
      else setStatus("Error. Try again.");
    } catch {
      setStatus("Network error.");
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        className="w-full bg-black border border-white/20 focus:border-cyan-400 text-white px-4 py-3 rounded outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-[12px] uppercase tracking-[0.25em] px-4 py-3 rounded"
      >
        Join
      </button>
      {status && <div className="text-xs text-white/60 self-center min-w-[9ch]">{status}</div>}
    </form>
  );
}