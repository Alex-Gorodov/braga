import React from 'react';

type ParallaxProps = {
  mouseX: number;
  mouseY: number;
}

export const Parallax: React.FC<ParallaxProps> = ({ mouseX, mouseY }) => {
  return (
    <div className="parallax">
    <span className="parallax__element parallax__element--1"
      style={{
        top: `calc(16%)`,
        left: `calc(14%)`,
        transform: `translate3d(${mouseX * 0.12}px, ${mouseY * 0.32}px, 0) skewX(-40deg)`,
      }}>
    </span>
      <span className="parallax__element parallax__element--2"
        style={{
          top: `calc(42%)`,
          left: `calc(66%)`,
          transform: `translate3d(${mouseX * 0.32}px, ${mouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--3"
        style={{
          top: `calc(-16%)`,
          left: `calc(-16%)`,
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
