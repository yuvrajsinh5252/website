import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

type DoodleIconLinkProps = {
  href: string;
  icon: IconType;
  /** Doubles as the tooltip text and the accessible name. */
  label: string;
  color?: 'red' | 'blue' | 'yellow' | 'green';
  className?: string;
  /** Shows the comic-style tooltip on hover; aria-label is always set. */
  tooltip?: boolean;
};

export const DoodleIconLink: React.FC<DoodleIconLinkProps> = ({
  href,
  icon: Icon,
  label,
  color = 'red',
  className = '',
  tooltip = false
}) => {
  // mailto: and http(s) links must stay plain anchors; only in-app paths use the router.
  const isInternal = href.startsWith('/');

  const colorMap = {
    red: "var(--c-red)",
    blue: "var(--c-blue)",
    yellow: "var(--c-yellow)",
    green: "var(--c-green)",
  };

  const shared = {
    className: `doodle-icon-circle ${tooltip ? 'has-tooltip' : ''} ${className}`,
    "data-tooltip": label,
    "aria-label": label,
    style: { '--hover-color': colorMap[color] } as React.CSSProperties,
  };

  if (isInternal) {
    return (
      <Link to={href} {...shared}>
        <Icon aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      {...shared}
    >
      <Icon aria-hidden="true" />
    </a>
  );
};
