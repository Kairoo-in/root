'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-16" />;
  }

  const isDark = (theme ?? resolvedTheme) === 'dark';

  return (
    <Switch
      size="lg"
      color="secondary"
      isSelected={isDark}
      onValueChange={(selected) => setTheme(selected ? 'dark' : 'light')}
      thumbIcon={({ isSelected }) =>
        isSelected ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />
      }
      className="theme-toggle"
    >
      <span className="sr-only">Toggle theme</span>
    </Switch>
  );
}

