import { Link } from "react-router-dom";

export default function AtomicInk() {
  return (
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4">
      {/* Header */}
      <section className="text-center pt-16 pb-8">
        <h1 className="text-2xl md:text-3xl font-mono uppercase tracking-[0.25em] text-white">
          Atomic Ink
        </h1>
        <p className="text-white/70 mt-3 text-sm">The Ghost in the Machine</p>
      </section>

      {/* Body */}
      <section className="space-y-5 text-white/80 leading-relaxed">
        <p>
          In the dim glow of my study, surrounded by paper and my iPad filled with
          verses, I birthed a monster—or so it seemed in hindsight.
        </p>
        <p>
          <span className="text-white/90">Atomic Ink (AI)</span> wasn't born from the sweat of jam sessions or the raw
          energy of late-night rehearsals. No, this band was my digital Frankenstein,
          stitched together by artificial intelligence. I fed the AI my lyrics—words torn
          from the depths of my soul, laced with the ache of lost loves and the fire of
          unspoken rebellions. I dialed in parameters: a dash of punk grit, a swirl of
          electronic haze, tempos that pulsed like a racing heart. And just like that, the
          machine conjured it all—the melodies, the harmonies, even the voices of phantom
          singers crooning my truths into the void.
        </p>
        <p>
          It felt so simple, so innocuous. A harmless experiment, right? Click a few
          buttons, upload a file, and watch creation unfold without the mess of human
          collaboration. But as the first track echoed through my speakers, a chill settled
          in my bones. Was this progress, or something far more sinister?
        </p>
        <p>
          I used to share my lyrics with flesh-and-blood musicians—guitarists with
          calloused fingers, vocalists whose throats carried the scars of a thousand gigs.
          Arguing over chord progressions, laughing through botched takes, forging songs
          from the alchemy of our shared humanity. Those collaborations weren't just work;
          they were lifelines, connections that sparked creativity and sustained
          livelihoods. Now, with AI at my fingertips, those opportunities evaporated like
          mist in the morning sun. My old collaborators? They faded into silence, their
          talents sidelined by code that never tires, never doubts, never demands a fair
          share.
        </p>
        <p>
          And if this shadow creeps beyond music? We've already glimpsed it in the
          flickering screens of Hollywood, where algorithms script blockbusters and digital
          actors steal the spotlight from the dreamers who once chased stardom under the
          klieg lights. Entertainment is just the prelude.
        </p>
        <p>
          Imagine the ripple spreading to the everyday grind—the 9-to-5 warriors clocking
          in at offices, warehouses, and call centers. What happens when robots march into
          the service industry, their metallic arms flipping burgers, stocking shelves, or
          greeting customers with unblinking efficiency?
        </p>
        <p>
          Picture it: machines that don't unionize, don't call in sick with the flu or a
          broken heart. No personal days for doctor's appointments, no strikes for better
          wages. They toil without complaint, not from dawn till dusk, but eternally—24
          hours a day, seven days a week, in a relentless rhythm that mocks our fragile
          human limits. Jobs vanish not with a bang, but with the quiet hum of servers and
          the whir of servos.
        </p>
        <p>
          Tomorrow teeters on a knife's edge. It could be a utopia of boundless innovation,
          where AI liberates us from drudgery to pursue passions we never dreamed
          possible. Or it could be a dystopia, a wasteland where the soul of work is
          stripped away, leaving millions adrift in obsolescence.
        </p>
        <p>
          The choice is ours—or is it? As the lines between creator and creation blur, I
          wonder if we've already handed the reins to forces we can no longer control. In
          the end, <span className="text-white/90">Atomic Ink</span> might not just be a band; it could be the
          harbinger of our unraveling.
        </p>
      </section>

      {/* Subtle CTA / Divider */}
      <section className="text-center my-14 pt-10 border-t border-white/10">
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Link
            to="/extras"
            className="w-full sm:w-40 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 transition"
          >
            See Extras
          </Link>
          <Link
            to="/store"
            className="w-full sm:w-40 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:bg-white/10 transition"
          >
            Visit Store
          </Link>
        </div>
      </section>

      {/* Spotify Sections Side by Side */}
      <section className="my-14 pt-10 border-t border-white/10">
        <h2 className="text-xl font-mono uppercase tracking-[0.2em] text-white mb-6 text-center">
          Listen on Spotify
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1">
            <h3 className="text-center text-white/70 mb-2 font-mono uppercase tracking-[0.15em] text-sm">
              Atomic Ink
            </h3>
            <iframe
              src="https://open.spotify.com/embed/album/4f8cEdSmtzl1ac0Dq7QmLs?si=la1gkJSXQbCyevjMguYU2g"
              width="100%"
              height="380"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full rounded-lg shadow-lg"
            ></iframe>
          </div>
          <div className="flex-1">
            <h3 className="text-center text-white/70 mb-2 font-mono uppercase tracking-[0.15em] text-sm">
              Soundtrack
            </h3>
            <iframe
              src="https://open.spotify.com/embed/playlist/5xaUrWkND9wKp9r39fQj4e"
              width="100%"
              height="380"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}