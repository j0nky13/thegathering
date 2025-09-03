import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center">
        <h1
          className={`text-6xl md:text-8xl font-bold tracking-widest ${
            glitch ? "text-red-600" : "text-white"
          } transition-colors duration-200`}
        >
          404
        </h1>
        <p className="mt-4 text-lg text-white/70 italic">
          The system found nothing here...
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md border border-white/20 px-6 py-3 text-white/90 hover:bg-white/10 hover:text-white transition"
        >
          Return to Safety
        </a>
      </div>
    </main>
  );
}