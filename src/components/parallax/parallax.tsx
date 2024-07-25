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
          top: `calc(${isMobile ? '100px' : '200px'})`,
          left: `calc(${isMobile ? '24px' : '440px'})`,
          transform: `translate3d(${isMobile ? '' : '-'}${mouseX * 0.12}px, ${isMobile ? '' : '-'}${mouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--2"
        style={{
          top: `calc(${isMobile ? '100px' : '500px'})`,
          right: `calc(${isMobile ? '100px' : '400px'})`,
          transform: `translate3d(-${mouseX * 0.1}px, -${mouseY * 0.1}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--3"
        style={{
          top: `calc(${isMobile ? '-12px' : '-16px'})`,
          left: `calc(${isMobile ? '-550px' : '-150px'})`,
          transform: `translate3d(${isMobile ? '' : '-'}${mouseX * 0.1}px, ${isMobile ? '' : '-'}${mouseY * 0.1}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--4"
        style={{
          top: `calc(${isMobile ? '200px' : '600px'})`,
          right: `calc(${isMobile ? '100px' : '400px'})`,
          transform: `translate3d(-${mouseX * 0.12}px, -${mouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
    </div>
  );
};
