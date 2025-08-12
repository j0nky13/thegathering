import React from "react";

export default function SceneBlock({
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  imageSide = "right",
}) {
  return (
    <section className="max-w-6xl mx-auto py-12 border-t border-white/10">
      <div
        className={`flex flex-col ${
          imageSrc ? "md:flex-row md:items-center" : ""
        } ${imageSide === "left" ? "md:flex-row-reverse" : ""} gap-8`}
      >
        <div className="flex-1">
          <h2 className="text-lg font-mono uppercase tracking-[0.2em] text-white mb-4">
            {title}
          </h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-white/75 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {imageSrc && (
          <div className="flex-1">
            <img
              src={imageSrc}
              alt={imageAlt || ""}
              className="w-full h-auto rounded-lg border border-white/10"
            />
          </div>
        )}
      </div>
    </section>
  );
}