import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CardData {
  stat: string;
  title: string;
  description: string;
}

const cards: CardData[] = [
  {
    stat: '20 years',
    title: '20 years building technology',
    description:
      'Military electronics and cryptography in the Royal Air Force. Telecoms and internet infrastructure. 8 years at Juniper Networks in Silicon Valley. 5 years leading systems engineering at Cyan. He built the systems AI runs on.',
  },
  {
    stat: '15 years',
    title: '15 years selling it',
    description:
      'Systems engineer to VP Sales to CRO. Cybersecurity, AI, SaaS, enterprise networking. Built sales organisations from zero across 16 countries. Sat across from C-suite buyers in enterprise procurement cycles for over a decade.',
  },
  {
    stat: 'Now',
    title: 'Now builds with AI agents daily',
    description:
      'Ships production applications with Claude Code, Codex, and Gemini CLI. Designs agentic workflows. Trains executive cohorts through FlexOS. Guest lecturer and monthly briefing host for Lead with AI PRO. The training works because he built the thing he\u2019s teaching.',
  },
];

const cardStyle: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderTop: '3px solid var(--primary)',
  borderRadius: 'var(--card-radius)',
  padding: 'var(--card-padding)',
  boxShadow: 'var(--card-shadow)',
  transition: 'box-shadow 0.2s, border-color 0.2s',
};

const cardHoverStyle: React.CSSProperties = {
  boxShadow: 'var(--card-shadow-hover)',
  borderColor: 'var(--primary)',
};

function AuthorityCard({
  card,
  delay,
  reducedMotion,
}: {
  card: CardData;
  delay: number;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const style = hovered
    ? { ...cardStyle, ...cardHoverStyle }
    : cardStyle;

  if (reducedMotion) {
    return (
      <div
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p
          className="font-serif text-primary"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}
        >
          {card.stat}
        </p>
        <h3 className="text-sub text-foreground">{card.title}</h3>
        <p className="text-body text-muted-foreground mt-3">{card.description}</p>
      </div>
    );
  }

  return (
    <motion.div
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <p
        className="font-serif text-primary"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}
      >
        {card.stat}
      </p>
      <h3 className="text-sub text-foreground">{card.title}</h3>
      <p className="text-body text-muted-foreground mt-3">{card.description}</p>
    </motion.div>
  );
}

export default function AuthorityCardsIsland() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-[1.25rem]">
      {cards.map((card, i) => (
        <AuthorityCard
          key={i}
          card={card}
          delay={i * 0.12}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
