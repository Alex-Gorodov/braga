import { useState, useEffect } from "react";
import { useIsMobile } from "./useSizes";

export const useParallax = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (event: MouseEvent) => {
    setCoords({ x: event.clientX, y: event.clientY });
  };

  const handleScroll = () => {
    setCoords({ x: window.scrollX, y: window.scrollY });
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    setCoords({ x: touch.clientX, y: touch.clientY });
  };

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('scroll', handleScroll);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('scroll', handleScroll);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);
  return coords;
}
