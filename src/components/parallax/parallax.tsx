import React, { useEffect, useState } from 'react';

type ParallaxProps = {
  mouseX: number;
  mouseY: number;
}

export const Parallax: React.FC<ParallaxProps> = ({ mouseX, mouseY }) => {
  const [smoothMouseX, setSmoothMouseX] = useState(mouseX);
  const [smoothMouseY, setSmoothMouseY] = useState(mouseY);

  useEffect(() => {
    const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;
    let animationFrameId: number;

    const updateSmoothMouseCoords = () => {
      setSmoothMouseX((prev) => lerp(prev, mouseX, 0.1));
      setSmoothMouseY((prev) => lerp(prev, mouseY, 0.1));
      animationFrameId = requestAnimationFrame(updateSmoothMouseCoords);
    };

    updateSmoothMouseCoords();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mouseX, mouseY]);

  return (
    <div className="parallax">
      <span className="parallax__element parallax__element--1"
        style={{
          top: `calc(16%)`,
          left: `calc(24%)`,
          transform: `translate3d(${smoothMouseX * 0.2}px, ${smoothMouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--2"
        style={{
          top: `calc(42%)`,
          left: `calc(66%)`,
          transform: `translate3d(${smoothMouseX * 0.2}px, ${smoothMouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--3"
        style={{
          top: `calc(-16%)`,
          left: `calc(-16%)`,
          transform: `translate3d(${smoothMouseX * 0.2}px, ${smoothMouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--4"
        style={{
          top: `calc(46%)`,
          left: `calc(64%)`,
          transform: `translate3d(${smoothMouseX * 0.2}px, ${smoothMouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
    </div>
  );
};
