import React, { useEffect, useState } from 'react';
import './style.css';
export default function FillLevelBar({ data }) {
  if (!data || !data.inputs || data.inputs.length === 0) {
    return <div>Indlæser data...</div>;
  }

  const value = data.inputs[0];
  const totalSegments = 20;
  const targetFilled = Math.round((value / 1000) * totalSegments);
  const [filledSegments, setFilledSegments] = useState(targetFilled);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilledSegments((prev) => {
        if (prev === targetFilled) {
          clearInterval(interval);
          return prev;
        }
        return prev < targetFilled ? prev + 1 : prev - 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [targetFilled]);

  return (
<div className="p-4 rounded-md bar-container">
  <div className="flex gap-[4px]">
    {Array.from({ length: totalSegments -1 }, (_, i) => (
      <div
      key={i}
      className={`
        w-4 h-6 skew-x-[-45deg] 
        border 
        ${i < filledSegments 
          ? 'bg-[#057CC2] border-[#057CC2]' 
          : 'bg-[#112134] border-[#057CC2]'}
        transition-all duration-300
      `}
    ></div>
    ))}
  </div>
</div>
  );
}
