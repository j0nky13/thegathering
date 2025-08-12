import SubscribeForm from "../forms/SubscribeForm";

export default function SubscribeBlock() {
  return (
    <section id="subscribe" className="px-4 py-16">
      <div className="max-w-md mx-auto">
        <h3 className="font-mono tracking-[0.25em] text-sm text-white/80 mb-3">
          JOIN THE LIST
        </h3>
        <SubscribeForm />
        <p className="text-xs text-white/50 mt-2">
          No spam. One email at launch.
        </p>
      </div>
    </section>
  );
}