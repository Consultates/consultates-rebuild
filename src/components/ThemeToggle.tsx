import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from '@phosphor-icons/react';

type ThemeMode = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setMode(stored);
    } else {
      setMode('system');
    }
  }, []);

  function applyTheme(newMode: ThemeMode) {
    setMode(newMode);
    localStorage.setItem('theme', newMode);

    const root = document.documentElement;

    if (newMode === 'dark') {
      root.classList.add('dark');
    } else if (newMode === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    window.dispatchEvent(new CustomEvent('theme-changed', { detail: newMode }));
  }

  function cycle() {
    const next: Record<ThemeMode, ThemeMode> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
    };
    applyTheme(next[mode]);
  }

  const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;

  return (
    <button
      onClick={cycle}
      aria-label="Toggle theme"
      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors duration-150 text-foreground cursor-pointer"
    >
      <Icon size={20} weight="duotone" />
    </button>
  );
}
