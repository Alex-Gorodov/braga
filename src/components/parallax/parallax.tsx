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
      <span className="parallax__element parallax__element--left-large"
        style={{
          top: `${isMobile ? '-12px' : '-16px'}`,
          left: `${isMobile ? '-550px' : '-150px'}`,
          transform: `translate3d(${isMobile ? '' : '-'}${mouseX * 0.1}px, ${isMobile ? '' : '-'}${mouseY * 0.1}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--left-small"
        style={{
          top: `${isMobile ? '100px' : '200px'}`,
          left: `${isMobile ? '84px' : '440px'}`,
          transform: `translate3d(${isMobile ? '' : '-'}${mouseX * 0.12}px, ${isMobile ? '' : '-'}${mouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--right-large"
        style={{
          top: `${isMobile ? '300px' : '500px'}`,
          right: `${isMobile ? '100px' : '200px'}`,
          transform: `translate3d(-${mouseX * 0.1}px, -${mouseY * 0.1}px, 0) skewX(-40deg)`,
        }}>
      </span>
      <span className="parallax__element parallax__element--right-small"
        style={{
          top: `${isMobile ? '400px' : '600px'}`,
          right: `${isMobile ? '100px' : '200px'}`,
          transform: `translate3d(-${mouseX * 0.12}px, -${mouseY * 0.12}px, 0) skewX(-40deg)`,
        }}>
      </span>
    </div>
  );
};
