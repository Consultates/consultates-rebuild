import { useState, useEffect } from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');

    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.dispatchEvent(new CustomEvent('theme-changed', { detail: next ? 'dark' : 'light' }));
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors duration-150 text-foreground cursor-pointer"
    >
      {isDark ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
    </button>
  );
}
