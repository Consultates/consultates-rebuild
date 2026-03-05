import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

interface CountUpStatProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

/**
 * Animated stat that counts up from 0 to target on viewport entry.
 * Respects reduced motion — shows final value immediately.
 */
export function CountUpStat({
  target,
  suffix = '',
  label,
  duration = 600,
}: CountUpStatProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(reducedMotion ? target : 0);

  // IntersectionObserver for viewport detection (once)
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate on viewport entry
  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(motionValue, target, {
      duration: duration / 1000,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [inView, reducedMotion, motionValue, target, duration]);

  // Subscribe to rounded value for display
  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(target);
      return;
    }
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [rounded, reducedMotion, target]);

  return (
    <div ref={ref}>
      <p className="text-stats text-primary">
        {displayValue}
        {suffix}
      </p>
      <p className="text-body text-foreground mt-2">{label}</p>
    </div>
  );
}
