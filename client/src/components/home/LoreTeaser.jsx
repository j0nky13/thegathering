export default function LoreTeaser() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono tracking-[0.25em] text-xl text-white mb-4">MORE LORE</h2>
        <ul className="space-y-3 text-white/80">
          <li><span className="text-cyan-300">Signal Rot:</span> The slow corruption of knowledge in closed nets.</li>
          <li><span className="text-cyan-300">Custodians:</span> Archivists trained to lie to machines.</li>
          <li><span className="text-cyan-300">The Line:</span> A protocol that decides who remembers.</li>
        </ul>
      </div>
    </section>
  );
}