import React from "react";

export function TechCorners() {
  return (
    <>
      {/* Corner crosshairs + */}
      <span className="absolute -top-1.5 -left-1.5 z-20 font-mono text-[10px] text-zinc-600 select-none font-bold transition-colors group-hover:text-white">+</span>
      <span className="absolute -top-1.5 -right-1.5 z-20 font-mono text-[10px] text-zinc-600 select-none font-bold transition-colors group-hover:text-white">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 z-20 font-mono text-[10px] text-zinc-600 select-none font-bold transition-colors group-hover:text-white">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 z-20 font-mono text-[10px] text-zinc-600 select-none font-bold transition-colors group-hover:text-white">+</span>
      
      {/* Corner edge accent ticks */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/20 transition-colors group-hover:border-white/60 pointer-events-none" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/20 transition-colors group-hover:border-white/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/20 transition-colors group-hover:border-white/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/20 transition-colors group-hover:border-white/60 pointer-events-none" />
    </>
  );
}

