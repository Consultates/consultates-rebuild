import { useState, useEffect, type ComponentType } from 'react';
import type { IconProps } from '@phosphor-icons/react';

interface IconWrapperProps {
  icon: ComponentType<IconProps>;
  size?: number;
  className?: string;
  [key: string]: unknown;
}

export default function IconWrapper({
  icon: Icon,
  size = 20,
  className,
  ...rest
}: IconWrapperProps) {
  const [duotoneOpacity, setDuotoneOpacity] = useState(0.45);

  useEffect(() => {
    const updateOpacity = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setDuotoneOpacity(isDark ? 0.35 : 0.45);
    };

    updateOpacity();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          updateOpacity();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <Icon
      weight="duotone"
      color="currentColor"
      size={size}
      className={className}
      style={{ '--ph-duotone-opacity': duotoneOpacity } as React.CSSProperties}
      {...rest}
    />
  );
}
