import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const LETTER_SPEED = 18; // ms per char for title
const TYPE_SPEED = 10; // ms per char for description
const CTA_FADE = 200; // ms for CTA to appear
const CTA_PULSE = 500; // ms for underline extend + retract
const CARD_GAP = 5; // ms between cards

function calcCardDuration(card: CardData) {
  const titleDur = card.title.length * LETTER_SPEED + 400; // + last letter fade
  const descDur = card.description.length * TYPE_SPEED;
  const ctaDur = CTA_FADE + CTA_PULSE;
  return titleDur + descDur + ctaDur;
}

// Icon SVGs inline
const icons = {
  advisory: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"/>
      <circle cx="128" cy="128" r="96" opacity="0.2"/>
      <circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
    </svg>
  ),
  training: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"/>
      <circle cx="128" cy="140" r="40" opacity="0.2"/>
      <circle cx="128" cy="140" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M196,116a59.8,59.8,0,0,1,48,24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M12,140a59.8,59.8,0,0,1,48-24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M70.4,216a72.1,72.1,0,0,1,115.2,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M60,116A32,32,0,1,1,91.4,78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M164.6,78A32,32,0,1,1,196,116" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
    </svg>
  ),
  fractional: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"/>
      <rect x="32" y="72" width="192" height="144" rx="8" opacity="0.2"/>
      <rect x="32" y="72" width="192" height="144" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M168,72V56a16,16,0,0,0-16-16H104A16,16,0,0,0,88,56V72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <line x1="32" y1="144" x2="224" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
    </svg>
  ),
};

const cards: CardData[] = [
  {
    title: 'AI Advisory for Leaders',
    description: 'One-to-one sessions for leaders who need clarity on AI. You bring your situation \u2014 you leave with a plan you can act on.',
    href: '/services/ai-advisory-for-leaders',
    icon: icons.advisory,
  },
  {
    title: 'AI Training for Teams',
    description: "Hands-on workshops built around your team\u2019s actual work. People learn by doing with the tools they\u2019ll use tomorrow.",
    href: '/services/ai-training-for-teams',
    icon: icons.training,
  },
  {
    title: 'Fractional Exec Support',
    description: 'Senior AI go-to-market leadership without a full-time hire. Strategy, product direction, and execution for companies scaling AI.',
    href: '/services/fractional-exec-support',
    icon: icons.fractional,
  },
];

type CardPhase = 'waiting' | 'icon' | 'title' | 'description' | 'cta' | 'pulse' | 'done';

const cardStyle: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--card-radius)',
  padding: 'var(--card-padding)',
  height: '100%',
  overflow: 'visible',
  boxShadow: '0 1px 3px rgba(20,28,116,0.04), 0 4px 20px rgba(20,28,116,0.07)',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
};

function AnimatedCard({
  card,
  phase,
  onComplete,
}: {
  card: CardData;
  phase: CardPhase;
  onComplete: () => void;
}) {
  const [typedChars, setTypedChars] = useState(0);
  const [descChars, setDescChars] = useState(0);
  const [pulseState, setPulseState] = useState<'idle' | 'extend' | 'retract' | 'done'>('idle');

  // Reset internal state when phase regresses (viewport re-entry)
  useEffect(() => {
    if (phase === 'waiting') {
      setTypedChars(0);
      setDescChars(0);
      setPulseState('idle');
    }
  }, [phase]);

  // Title letter stagger via interval
  useEffect(() => {
    if (phase !== 'title') return;
    setTypedChars(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedChars(i);
      if (i >= card.title.length) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 400);
      }
    }, LETTER_SPEED);
    return () => clearInterval(interval);
  }, [phase, card.title.length]);

  // Description typewriter
  useEffect(() => {
    if (phase !== 'description') return;
    setDescChars(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDescChars(i);
      if (i >= card.description.length) {
        clearInterval(interval);
        onComplete();
      }
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, [phase, card.description.length]);

  // CTA pulse
  useEffect(() => {
    if (phase !== 'cta') return;
    const t1 = setTimeout(() => setPulseState('extend'), CTA_FADE);
    const t2 = setTimeout(() => setPulseState('retract'), CTA_FADE + 400);
    const t3 = setTimeout(() => {
      setPulseState('done');
      onComplete();
    }, CTA_FADE + CTA_PULSE);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  const showIcon = phase !== 'waiting';
  const showTitle = phase === 'title' || phase === 'description' || phase === 'cta' || phase === 'pulse' || phase === 'done';
  const showDesc = phase === 'description' || phase === 'cta' || phase === 'pulse' || phase === 'done';
  const showCta = phase === 'cta' || phase === 'pulse' || phase === 'done';

  const underlineWidth =
    pulseState === 'extend' ? 'calc(100% + 10px)' :
    pulseState === 'retract' || pulseState === 'done' ? '0' :
    phase === 'done' ? '0' : '0';

  return (
    <a
      href={card.href}
      style={cardStyle}
      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Icon */}
      <motion.div
        className="mb-6 relative flex items-center justify-center text-primary"
        style={{ width: 48, height: 48, borderRadius: 12 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showIcon ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease }}
      >
        <div className="absolute inset-0 rounded-[12px]" style={{ background: 'var(--secondary)', border: '1.5px solid var(--primary)' }} />
        <div className="relative z-10">{card.icon}</div>
      </motion.div>

      {/* Title — letter by letter */}
      <h3
        className="font-serif mb-3"
        style={{
          fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
          lineHeight: 'var(--lh-subhead)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--foreground)',
          minHeight: '1.5em',
        }}
      >
        {showTitle
          ? card.title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={i < typedChars || phase !== 'title'
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
                }
                transition={{ duration: 0.3, ease }}
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))
          : '\u00A0'}
      </h3>

      {/* Description — typewriter */}
      <p
        className="text-body mb-5 flex-1"
        style={{
          color: 'var(--secondary-foreground)',
          minHeight: '4em',
        }}
      >
        {showDesc
          ? phase === 'description'
            ? card.description.slice(0, descChars)
            : card.description
          : '\u00A0'}
        {phase === 'description' && descChars < card.description.length && (
          <span className="inline-block w-[2px] h-[1em] bg-primary align-middle" style={{ animation: 'blink 0.6s step-end infinite' }} />
        )}
      </p>

      {/* CTA */}
      <div className="mt-auto">
        <motion.span
          className="btn-alive btn-alive--sm text-primary"
          initial={{ opacity: 0 }}
          animate={showCta ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          style={{ position: 'relative' }}
        >
          Learn more
          {/* Manual underline for pulse animation */}
          <span
            style={{
              position: 'absolute',
              bottom: -1,
              left: 0,
              width: underlineWidth,
              height: 8,
              background: 'currentColor',
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, calc(100% - 14px) 3px, 0 3px)',
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </motion.span>
      </div>
    </a>
  );
}

export default function OfferingCardsIsland() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [activeCard, setActiveCard] = useState(-1);
  const [phases, setPhases] = useState<CardPhase[]>(['waiting', 'waiting', 'waiting']);

  // Reset when leaving viewport
  useEffect(() => {
    if (!inView) {
      setActiveCard(-1);
      setPhases(['waiting', 'waiting', 'waiting']);
    }
  }, [inView]);

  // Start first card when in view
  useEffect(() => {
    if (inView && activeCard === -1 && !reducedMotion) {
      const timer = setTimeout(() => {
        setActiveCard(0);
        setPhases(['icon', 'waiting', 'waiting']);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, activeCard, reducedMotion]);

  // Advance phases within a card
  const advancePhase = (cardIdx: number) => {
    setPhases(prev => {
      const next = [...prev];
      const current = next[cardIdx];
      if (current === 'icon') {
        // Icon shown, start title after brief pause
        setTimeout(() => {
          setPhases(p => {
            const n = [...p];
            n[cardIdx] = 'title';
            return n;
          });
        }, 300);
        return prev; // don't update yet
      }
      if (current === 'title') next[cardIdx] = 'description';
      else if (current === 'description') next[cardIdx] = 'cta';
      else if (current === 'cta') {
        next[cardIdx] = 'done';
        // Start next card after gap
        if (cardIdx < 2) {
          setTimeout(() => {
            setActiveCard(cardIdx + 1);
            setPhases(p => {
              const n = [...p];
              n[cardIdx + 1] = 'icon';
              return n;
            });
          }, CARD_GAP);
        }
      }
      return next;
    });
  };

  // Auto-advance from icon phase
  useEffect(() => {
    if (activeCard >= 0 && phases[activeCard] === 'icon') {
      const timer = setTimeout(() => {
        setPhases(prev => {
          const next = [...prev];
          next[activeCard] = 'title';
          return next;
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeCard, phases]);

  if (reducedMotion) {
    return (
      <div ref={ref} className="grid grid-cols-3 gap-[1.25rem] md:max-lg:grid-cols-2 max-md:grid-cols-1">
        {cards.map((card, i) => (
          <a key={i} href={card.href} style={cardStyle}
      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <div className="mb-6 relative flex items-center justify-center text-primary" style={{ width: 48, height: 48, borderRadius: 12 }}>
              <div className="absolute inset-0 rounded-[12px]" style={{ background: 'var(--secondary)', border: '1.5px solid var(--primary)' }} />
              <div className="relative z-10">{card.icon}</div>
            </div>
            <h3 className="font-serif mb-3" style={{ fontSize: 'var(--text-subhead)', lineHeight: 'var(--lh-subhead)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--foreground)' }}>{card.title}</h3>
            <p className="text-body mb-5 flex-1" style={{ color: 'var(--secondary-foreground)' }}>{card.description}</p>
            <div className="mt-auto"><span className="btn-alive btn-alive--sm text-primary">Learn more</span></div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="grid grid-cols-3 gap-[1.25rem] md:max-lg:grid-cols-2 max-md:grid-cols-1">
      {cards.map((card, i) => (
        <AnimatedCard
          key={i}
          card={card}
          phase={phases[i]}
          onComplete={() => advancePhase(i)}
        />
      ))}
    </div>
  );
}
