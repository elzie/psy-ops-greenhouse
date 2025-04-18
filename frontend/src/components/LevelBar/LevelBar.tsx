import React from 'react';

export default function FillLevelBar({ level }) {
  const maxBars = 20;
  const filledBars = Math.round((level / 100) * maxBars);

  return (
    <div className="bg-black p-4 rounded-md w-full max-w-xl border border-cyan-400 shadow-lg relative">
      <div className="absolute -top-5 left-3 text-cyan-300 text-xs font-mono tracking-widest">FILL LEVEL:</div>
      <div className="flex gap-1 mt-3 p-1 border border-cyan-400 rounded-sm bg-gradient-to-br from-cyan-900 to-black">
        {Array.from({ length: maxBars }, (_, i) => (
          <div
            key={i}
            className={`h-6 w-full border-l border-r border-cyan-300 ${i < filledBars ? 'bg-cyan-300' : 'bg-transparent'} transform -skew-x-12`}
          ></div>
        ))}
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></div>
    </div>
  );
}