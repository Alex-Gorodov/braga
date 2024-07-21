import React from 'react';
import { useIsMobile } from '../../hooks/useSizes';

type ParallaxProps = {
  mouseX: number;
  mouseY: number;
}

export const Parallax: React.FC<ParallaxProps> = ({ mouseX, mouseY }) => {
  const isMobile = useIsMobile()
  return (
    <div className="parallax">
      <span className="parallax__element parallax__element--1"
        style={{
          top: `calc(${isMobile ? '20%' : '19%'})`,
          // left: `calc(14%)`,
          left: `calc(${isMobile ? '14%' : '10%'})`,

          transform: `translate3d(${mouseX * 0.4}px, ${mouseY * 0.18}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--2"
        style={{
          top: `calc(${isMobile ? '32%' : '37%'})`,
          left: `calc(${isMobile ? '60%' : '63%'})`,
          transform: `translate3d(${mouseX * 0.32}px, ${mouseY * 0.27}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--3"
        style={{
          top: `calc(${isMobile ? '-12%' : '-16%'})`,
          left: `calc(${isMobile ? '-136%' : '-16%'})`,
          transform: `translate3d(${mouseX * 0.27}px, ${mouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--4"
        style={{
          top: `calc(46%)`,
          left: `calc(64%)`,
          transform: `translate3d(${mouseX * 0.24}px, ${mouseY * 0.21}px, 0) skewX(-40deg)`,
        }}>
      </span>
    </div>
  );
};
