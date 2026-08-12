import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

type DoodleIconLinkProps = {
  href: string;
  icon: IconType;
  tooltip?: string;
  color?: 'red' | 'blue' | 'yellow' | 'green';
  className?: string;
};

export const DoodleIconLink: React.FC<DoodleIconLinkProps> = ({ 
  href, 
  icon: Icon, 
  tooltip,
  color = 'red',
  className = ''
}) => {
  const isExternal = href.startsWith('http');
  const Component = isExternal ? 'a' : Link;
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  const colorMap = {
    red: "var(--c-red)",
    blue: "var(--c-blue)",
    yellow: "var(--c-yellow)",
    green: "var(--c-green)",
  };

  return (
    <Component 
      href={href}
      target={target}
      rel={rel}
      className={`doodle-icon-circle ${tooltip ? 'has-tooltip' : ''} ${className}`}
      data-tooltip={tooltip}
      aria-label={tooltip || 'Link'}
      style={{ '--hover-color': colorMap[color] } as React.CSSProperties}
    >
      <Icon />
    </Component>
  );
};
