

import React from "react";

export default function PullQuote({ children }) {
  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <blockquote className="text-xl md:text-2xl font-mono text-white/90 tracking-wide italic">
        “{children}”
      </blockquote>
    </div>
  );
}