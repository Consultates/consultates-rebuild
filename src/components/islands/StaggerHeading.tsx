import { motion } from 'framer-motion';
import { useReducedMotion, viewportConfig } from '../../lib/animations';

interface StaggerHeadingProps {
  /** Raw text with optional <em> tags, same format as HeroIsland headline */
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** em tag color override, defaults to #8B6CC7 */
  emColor?: string;
}

type Part = { type: 'text'; text: string; isEm: boolean } | { type: 'br' };

function parse(raw: string): Part[] {
  const parts: Part[] = [];
  const re = /<em>(.*?)<\/em>|<br\s*\/?>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) parts.push({ type: 'text', text: raw.slice(last, m.index), isEm: false });
    if (m[0].startsWith('<br')) parts.push({ type: 'br' });
    else parts.push({ type: 'text', text: m[1], isEm: true });
    last = m.index + m[0].length;
  }
  if (last < raw.length) parts.push({ type: 'text', text: raw.slice(last), isEm: false });
  return parts;
}

const ease = [0.25, 0.1, 0.25, 1];

/**
 * Letter-stagger heading matching the hero animation.
 * 30ms per character, 400ms fade per letter.
 * Triggers on viewport entry.
 */
export function StaggerHeading({ text, className, style, emColor = '#8B6CC7' }: StaggerHeadingProps) {
  const reducedMotion = useReducedMotion();
  const parts = parse(text);

  if (reducedMotion) {
    return (
      <h2 className={className} style={style}>
        {parts.map((p, i) => {
          if (p.type === 'br') return <br key={i} />;
          return p.isEm
            ? <em key={i} style={{ fontStyle: 'normal', color: emColor }}>{p.text}</em>
            : <span key={i}>{p.text}</span>;
        })}
      </h2>
    );
  }

  return (
    <motion.h2
      className={className}
      style={style}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      variants={{
        initial: {},
        animate: {
          transition: { staggerChildren: 0.03, delayChildren: 0.15 },
        },
      }}
    >
      {parts.map((part, pi) => {
        if (part.type === 'br') return <br key={pi} />;
        const chars = part.text.split('').map((char, ci) => (
          <motion.span
            key={`${pi}-${ci}`}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
            }}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ));
        return part.isEm
          ? <em key={pi} style={{ fontStyle: 'normal', color: emColor }}>{chars}</em>
          : <span key={pi}>{chars}</span>;
      })}
    </motion.h2>
  );
}
