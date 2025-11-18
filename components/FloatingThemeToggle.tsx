'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function FloatingThemeToggle() {
  const [visible, setVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isPinned) return;
      const threshold = Math.min(160, window.innerWidth * 0.1);
      setVisible(event.clientX >= window.innerWidth - threshold);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPinned]);

  return (
    <div
      className={`floating-toggle-wrapper ${visible ? 'floating-toggle-visible' : ''}`}
      onMouseEnter={() => setIsPinned(true)}
      onMouseLeave={() => setIsPinned(false)}
    >
      <div className="floating-toggle">
        <ThemeToggle />
        <p className="floating-toggle-label">Theme</p>
      </div>
    </div>
  );
}

