import { useEffect } from 'react';
import mojs from '@mojs/core'

export default function MagicLink(
  {
    children,
    href
  }: {
    children: React.ReactNode,
    href: string
  }
) {
  const shapes = ['line'];
  const colors = ['#2FB5F3', '#FF0A47', '#FF0AC2', '#47FF0A'];

  useEffect(() => {
    const shootLines = (e: MouseEvent, link: HTMLElement) => {
      const itemDim = link.getBoundingClientRect();
      const itemSize = {
        x: itemDim.right - itemDim.left,
        y: itemDim.bottom - itemDim.top,
      };

      const chosenC = Math.floor(Math.random() * colors.length);
      const chosenS = Math.floor(Math.random() * shapes.length);

      const burst = new mojs.Burst({
        left: itemDim.left + itemSize.x / 2,
        top: itemDim.top + itemSize.y / 2,
        radiusX: itemSize.x,
        radiusY: itemSize.y,
        count: 10,

        children: {
          shape: shapes[chosenS],
          radius: 10,
          scale: { 0.8: 1 },
          fill: 'none',
          points: 7,
          stroke: colors[chosenC],
          strokeDasharray: '100%',
          strokeDashoffset: { '-100%': '100%' },
          duration: 350,
          delay: 100,
          easing: 'quad.out',
          isShowEnd: false,
        },
      });

      burst.play();
    };

    const links = document.querySelectorAll<HTMLAnchorElement>('.magic');

    links.forEach((link) => {
      link.addEventListener('mouseenter', (e) => shootLines(e as MouseEvent, link));
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', (e) => shootLines(e as MouseEvent, link));
      });
    };
  }, [colors, shapes]);

  return (
    <span className="mx-auto text-center md:w-3/4">
      <a href={href} target='_blank' className="magic relative inline-block hover:text-black">
        {children}
        <span className="absolute inset-0 top-0 transition-all duration-100 ease-[cubic-bezier(0.000,0.590,1.000,0.260)] z-[-1]">
        </span>
      </a>
    </span>
  )
}
