import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../lib/animations';

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'We talk',
    description: 'Tell me where you are and what you\'re trying to figure out. No preparation needed.',
  },
  {
    number: '02',
    title: 'You get a plan',
    description: 'Specific to your business, your team, and your goals. Not a template.',
  },
  {
    number: '03',
    title: 'We do the work together',
    description: 'Advisory, training, or hands-on leadership. One accountable team, start to finish.',
  },
];

const TIDYCAL_URL = 'https://tidycal.com/garyctate/15-minute-meeting';

// Timing (ms)
const LINE_DURATION = 800;
const CIRCLE_FILL_AT = [270, 540, 800]; // when each circle fills (during line draw)
const CONTENT_DELAY = 200; // delay after circle fill before content reveals
const CTA_DELAY = 400; // delay after last content before CTA appears

export function HowItWorksIsland() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [lineProgress, setLineProgress] = useState(0); // 0 = hidden, 1 = full
  const [filledCircles, setFilledCircles] = useState<boolean[]>([false, false, false]);
  const [revealedContent, setRevealedContent] = useState<boolean[]>([false, false, false]);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Viewport detection — same pattern as StrokeDrawStats
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollSection = containerRef.current.closest('.scroll-section');

    if (scrollSection) {
      const checkActive = () => scrollSection.hasAttribute('data-active');
      if (checkActive()) setIsActive(true);

      const mutObs = new MutationObserver(() => {
        const nowActive = checkActive();
        setIsActive(nowActive);
        if (!nowActive) {
          setLineProgress(0);
          setFilledCircles([false, false, false]);
          setRevealedContent([false, false, false]);
          setCtaVisible(false);
        }
      });
      mutObs.observe(scrollSection, { attributes: true, attributeFilter: ['data-active'] });

      const intObs = new IntersectionObserver(
        ([entry]) => {
          setIsActive(entry.isIntersecting);
          if (!entry.isIntersecting) {
            setLineProgress(0);
            setFilledCircles([false, false, false]);
            setRevealedContent([false, false, false]);
            setCtaVisible(false);
          }
        },
        { threshold: 0.15 },
      );
      intObs.observe(containerRef.current);

      return () => { mutObs.disconnect(); intObs.disconnect(); };
    }

    const el = containerRef.current;
    const intObs = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setLineProgress(0);
          setFilledCircles([false, false, false]);
          setRevealedContent([false, false, false]);
          setCtaVisible(false);
        }
      },
      { threshold: 0.15 },
    );
    intObs.observe(el);
    return () => intObs.disconnect();
  }, []);

  // Animation sequence
  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion) {
      setLineProgress(1);
      setFilledCircles([true, true, true]);
      setRevealedContent([true, true, true]);
      setCtaVisible(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Line draw
    timers.push(setTimeout(() => setLineProgress(1), 50));

    // Circle fills at specific points during line draw
    CIRCLE_FILL_AT.forEach((time, i) => {
      timers.push(setTimeout(() => {
        setFilledCircles(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, time));

      // Content reveals after circle fill
      timers.push(setTimeout(() => {
        setRevealedContent(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, time + CONTENT_DELAY));
    });

    // CTA after last content
    timers.push(setTimeout(() => setCtaVisible(true), CIRCLE_FILL_AT[2] + CONTENT_DELAY + CTA_DELAY));

    return () => timers.forEach(clearTimeout);
  }, [isActive, reducedMotion]);

  const circleBase: React.CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    border: '2px solid var(--border)',
    color: 'var(--foreground)',
    backgroundColor: 'transparent',
    transition: reducedMotion ? 'none' : 'all 400ms var(--ease-out)',
    position: 'relative' as const,
    zIndex: 2,
    flexShrink: 0,
  };

  const circleFilledStyle: React.CSSProperties = {
    backgroundColor: 'var(--primary)',
    borderColor: 'var(--primary)',
    color: 'var(--primary-foreground)',
    transform: 'scale(1)',
  };

  return (
    <div
      ref={containerRef}
      style={{ padding: 0 }}
    >
      {/* Desktop: horizontal 3-column with connecting line */}
      <div className="hidden md:block">
        <div style={{ position: 'relative' }}>
          {/* Connecting line — absolute, between circle centers */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 'calc(16.667% + 0px)',
              right: 'calc(16.667% + 0px)',
              height: 2,
              zIndex: 1,
            }}
          >
            <div
              style={{
                height: '100%',
                width: lineProgress === 1 ? '100%' : '0%',
                background: 'linear-gradient(90deg, var(--border), var(--primary), var(--border))',
                transition: reducedMotion ? 'none' : `width ${LINE_DURATION}ms var(--ease-out)`,
              }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-3 gap-8">
            {STEPS.map((step, i) => {
              const filled = filledCircles[i];
              const revealed = revealedContent[i];

              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  {/* Circle with pulse animation */}
                  <div
                    style={{
                      ...circleBase,
                      ...(filled ? circleFilledStyle : {}),
                      animation: filled && !reducedMotion ? 'hiw-pulse 500ms var(--ease-out)' : 'none',
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.125rem',
                      color: 'var(--foreground)',
                      marginTop: '1.25rem',
                      marginBottom: '0.5rem',
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateY(0)' : 'translateY(12px)',
                      transition: reducedMotion ? 'none' : 'opacity 400ms ease-out, transform 400ms ease-out',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-body)',
                      lineHeight: 'var(--lh-body)',
                      color: 'var(--muted-foreground)',
                      maxWidth: 280,
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateY(0)' : 'translateY(12px)',
                      transition: reducedMotion ? 'none' : 'opacity 400ms ease-out 100ms, transform 400ms ease-out 100ms',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: vertical single-column */}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-10">
          {STEPS.map((step, i) => {
            const filled = filledCircles[i];
            const revealed = revealedContent[i];

            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div
                  style={{
                    ...circleBase,
                    ...(filled ? circleFilledStyle : {}),
                    animation: filled && !reducedMotion ? 'hiw-pulse 500ms var(--ease-out)' : 'none',
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    color: 'var(--foreground)',
                    marginTop: '1.25rem',
                    marginBottom: '0.5rem',
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0)' : 'translateY(12px)',
                    transition: reducedMotion ? 'none' : 'opacity 400ms ease-out, transform 400ms ease-out',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--lh-body)',
                    color: 'var(--muted-foreground)',
                    maxWidth: 280,
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0)' : 'translateY(12px)',
                    transition: reducedMotion ? 'none' : 'opacity 400ms ease-out 100ms, transform 400ms ease-out 100ms',
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div
        className="text-center"
        style={{
          marginTop: 'clamp(2rem, 4vw, 3rem)',
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: reducedMotion ? 'none' : 'opacity 400ms ease-out, transform 400ms ease-out',
        }}
      >
        <a
          href={TIDYCAL_URL}
          className="btn-alive"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Free Call
        </a>
      </div>

      {/* Pulse keyframes */}
      <style>{`
        @keyframes hiw-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
