import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CardData {
  label: string;
  title: string;
  description: string;
  href: string;
}

const LETTER_SPEED = 18;
const TYPE_SPEED = 10;
const CTA_FADE = 200;
const CTA_PULSE = 500;
const CARD_GAP = 5;

const cards: CardData[] = [
  {
    label: 'Advisory',
    title: 'Individual Advisory',
    description: 'Confidential, one-to-one sessions for business leaders and entrepreneurs who need to make sense of a fast-moving landscape. No sales pitch \u2014 just honest guidance from someone who\u2019s been building in this space every day.',
    href: '/services/ai-advisory-for-leaders',
  },
  {
    label: 'Training',
    title: 'Agentic Cohorts',
    description: 'Gary lectures on Lead with AI PRO, training cohorts of executives and solopreneurs to build with agentic tools. Not theory \u2014 participants work on real problems with real systems. They leave with something working, not a slide deck.',
    href: '/services/ai-training-for-teams',
  },
  {
    label: 'Fractional',
    title: 'Fractional CRO at SkyDeck AI',
    description: 'Senior go-to-market leadership without the full-time overhead. Strategy, product direction, and hands-on execution across GTM, sales, and customer success \u2014 embedded in the team, accountable for results.',
    href: '/services/fractional-exec-support',
  },
];

type CardPhase = 'waiting' | 'label' | 'title' | 'description' | 'cta' | 'pulse' | 'done';

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

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6875rem',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--primary)',
  marginBottom: '0.75rem',
  display: 'block',
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

  // Title letter stagger
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

  const showLabel = phase !== 'waiting';
  const showTitle = phase === 'title' || phase === 'description' || phase === 'cta' || phase === 'pulse' || phase === 'done';
  const showDesc = phase === 'description' || phase === 'cta' || phase === 'pulse' || phase === 'done';
  const showCta = phase === 'cta' || phase === 'pulse' || phase === 'done';

  const underlineWidth =
    pulseState === 'extend' ? 'calc(100% + 10px)' :
    pulseState === 'retract' || pulseState === 'done' ? '0' :
    '0';

  return (
    <a
      href={card.href}
      style={cardStyle}
      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Label */}
      <motion.span
        style={labelStyle}
        initial={{ opacity: 0, y: 8 }}
        animate={showLabel ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease }}
      >
        {card.label}
      </motion.span>

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

export default function UseCaseCardsIsland() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [activeCard, setActiveCard] = useState(-1);
  const [phases, setPhases] = useState<CardPhase[]>(['waiting', 'waiting', 'waiting']);

  useEffect(() => {
    if (!inView) {
      setActiveCard(-1);
      setPhases(['waiting', 'waiting', 'waiting']);
    }
  }, [inView]);

  useEffect(() => {
    if (inView && activeCard === -1 && !reducedMotion) {
      const timer = setTimeout(() => {
        setActiveCard(0);
        setPhases(['label', 'waiting', 'waiting']);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, activeCard, reducedMotion]);

  const advancePhase = (cardIdx: number) => {
    setPhases(prev => {
      const next = [...prev];
      const current = next[cardIdx];
      if (current === 'label') {
        setTimeout(() => {
          setPhases(p => {
            const n = [...p];
            n[cardIdx] = 'title';
            return n;
          });
        }, 300);
        return prev;
      }
      if (current === 'title') next[cardIdx] = 'description';
      else if (current === 'description') next[cardIdx] = 'cta';
      else if (current === 'cta') {
        next[cardIdx] = 'done';
        if (cardIdx < 2) {
          setTimeout(() => {
            setActiveCard(cardIdx + 1);
            setPhases(p => {
              const n = [...p];
              n[cardIdx + 1] = 'label';
              return n;
            });
          }, CARD_GAP);
        }
      }
      return next;
    });
  };

  useEffect(() => {
    if (activeCard >= 0 && phases[activeCard] === 'label') {
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
            <span style={labelStyle}>{card.label}</span>
            <h3 className="font-serif mb-3" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 'var(--lh-subhead)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--foreground)' }}>{card.title}</h3>
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
