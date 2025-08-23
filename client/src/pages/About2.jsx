import { Link } from "react-router-dom";
import AboutHero from "../components/about/AboutHero";
import SceneBlock from "../components/about/SceneBlock";
import PullQuote from "../components/about/PullQuote";

export default function About() {
  return (
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4">
      {/* HERO */}
      <AboutHero
        title="The Ghost in the Machine"
        subtitle="How Atomic Ink came to life… and why it might be a warning."
        // Use the opening hook from your write-up
        lead={[
          "In the dim glow of my study, surrounded by stacks of yellowed notebooks filled with scribbled verses, I birthed a monster—or so it seemed in hindsight.",
          "Atomic Ink wasn't born from the sweat of jam sessions or the raw energy of late-night rehearsals. It was a digital Frankenstein—stitched together by artificial intelligence.",
        ]}
      />

      {/* SCENE 1 — The making of Atomic Ink */}
      <SceneBlock
        title="Scene 1 — The Making of Atomic Ink"
        paragraphs={[
          "I fed the AI my lyrics—words torn from the depths of my soul, laced with the ache of lost loves and the fire of unspoken rebellions. I dialed in parameters: a dash of punk grit, a swirl of electronic haze, tempos that pulsed like a racing heart.",
          "And just like that, the machine conjured it all—the melodies, the harmonies, even the voices of phantom singers crooning my truths into the void.",
          "It felt so simple, so innocuous. Click a few buttons, upload a file, watch creation unfold without the mess of human collaboration.",
        ]}
        // Optional: drop an abstract image later
        // imageSrc="/images/about/scene1.jpg"
        // imageAlt="Patch cables and a terminal window."
        imageSide="right"
      />

      <PullQuote>
        Was this progress, or something far more sinister?
      </PullQuote>

      {/* SCENE 2 — The cost of skipping people */}
      <SceneBlock
        title="Scene 2 — The Cost of Skipping People"
        paragraphs={[
          "I used to share my lyrics with flesh-and-blood musicians—guitarists with calloused fingers, vocalists whose throats carried the scars of a thousand gigs.",
          "We’d huddle in cramped studios, argue over chord progressions, laugh through botched takes, forge songs from the alchemy of our shared humanity.",
          "Those collaborations weren’t just work; they were lifelines. Connections that sparked creativity and sustained livelihoods. With AI at my fingertips, those opportunities evaporated. My old partners faded into silence—sidelined by code that never tires, never doubts, never asks for a fair share.",
        ]}
        imageSide="left"
      />

      <PullQuote>
        Entertainment is just the prelude.
      </PullQuote>

      {/* SCENE 3 — Beyond music */}
      <SceneBlock
        title="Scene 3 — Beyond Music"
        paragraphs={[
          "We’ve already glimpsed it in Hollywood, where algorithms outline blockbusters and digital actors steal the spotlight from dreamers under the klieg lights.",
          "And beyond the stage and screen? The ripple spreads through the everyday grind: diners, warehouses, call centers. When robots walk into the service industry—flipping burgers, stocking shelves, greeting customers with unblinking efficiency—what happens to everyone else?",
          "Machines don’t unionize. They don’t call in sick with the flu or a broken heart. No personal days. No strikes. They toil without complaint—not from dawn to dusk, but eternally. Jobs vanish not with a bang, but with the quiet hum of servers and the whir of servos.",
        ]}
        imageSide="right"
      />

      <PullQuote>
        Tomorrow teeters on a knife’s edge.
      </PullQuote>

      {/* SCENE 4 — The edge */}
      <SceneBlock
        title="Scene 4 — The Edge We’re On"
        paragraphs={[
          "Maybe AI ushers in a future where we’re liberated from drudgery—free to chase work that actually feels like ours. Or maybe it strips the soul out of work and leaves millions adrift in obsolescence.",
          "As the lines between creator and creation blur, I wonder if we’ve already handed the reins to forces we can’t control. In the end, Atomic Ink might not just be a band—it might be a harbinger.",
        ]}
        imageSide="left"
      />

      {/* CTA to Extras */}
      <div className="max-w-6xl mx-auto my-16 pt-12 border-t border-white/10 text-center">
        <p className="text-white/75 text-sm leading-relaxed max-w-3xl mx-auto">
          Want to see concept art, unreleased pages, and artifacts from this world?
        </p>
        <div className="mt-6">
          <Link
            to="/bookextras"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] shadow-sm hover:bg-white/10 transition"
          >
            View Extras
          </Link>
        </div>
      </div>
    </div>
  );
}