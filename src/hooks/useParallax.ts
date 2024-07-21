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

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  return coords;
};
