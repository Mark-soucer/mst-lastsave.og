'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      
      const currentScroll = window.scrollY;
      setProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[3px] w-full pointer-events-none bg-transparent"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-[#D50000] to-[#FF1A1A] shadow-[0_0_12px_rgba(213,0,0,0.6)] will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}
