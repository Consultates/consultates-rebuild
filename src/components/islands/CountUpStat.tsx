import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

interface CountUpStatProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

/**
 * Animated stat that counts up from 0 to target.
 * Uses MutationObserver on parent .scroll-section for GSAP desktop detection,
 * with IntersectionObserver fallback for mobile (no GSAP).
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
  const [triggered, setTriggered] = useState(false);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(reducedMotion ? target : 0);

  // Strategy 1: MutationObserver on parent .scroll-section for desktop GSAP
  // Strategy 2: IntersectionObserver as fallback for mobile (no GSAP)
  useEffect(() => {
    if (!ref.current || triggered) return;

    // Find the parent .scroll-section (GSAP-controlled container)
    const scrollSection = ref.current.closest('.scroll-section');

    // If inside a scroll-section, watch for data-active attribute
    if (scrollSection) {
      // Check if already active (first section gets data-active immediately)
      if (scrollSection.hasAttribute('data-active')) {
        setTriggered(true);
        return;
      }

      const mutObs = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-active' &&
            scrollSection.hasAttribute('data-active')
          ) {
            setTriggered(true);
            mutObs.disconnect();
            return;
          }
        }
      });

      mutObs.observe(scrollSection, { attributes: true, attributeFilter: ['data-active'] });

      // Also add IntersectionObserver as fallback (mobile where GSAP doesn't run)
      const intObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTriggered(true);
            intObs.disconnect();
            mutObs.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      intObs.observe(ref.current);

      return () => {
        mutObs.disconnect();
        intObs.disconnect();
      };
    }

    // No scroll-section parent — pure IntersectionObserver
    const intObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          intObs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    intObs.observe(ref.current);
    return () => intObs.disconnect();
  }, [triggered]);

  // Animate on trigger
  useEffect(() => {
    if (!triggered || reducedMotion) return;
    const controls = animate(motionValue, target, {
      duration: duration / 1000,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [triggered, reducedMotion, motionValue, target, duration]);

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
