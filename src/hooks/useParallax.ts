// import { useState, useEffect } from "react";
// import { useIsMobile } from "./useSizes";

// export const useParallax = () => {
//   const [coords, setCoords] = useState({ x: 0, y: 0 });
//   const isMobile = useIsMobile();

//   const handleMouseMove = (event: MouseEvent) => {
//     setCoords({ x: event.clientX, y: event.clientY });
//   };

//   const handleScroll = () => {
//     setCoords({ x: window.scrollX, y: window.scrollY });
//   };

//   useEffect(() => {
//     if (isMobile) {
//       document.addEventListener('scroll', handleScroll);
//     } else {
//       document.addEventListener('mousemove', handleMouseMove);
//     }

//     return () => {
//       if (isMobile) {
//         document.removeEventListener('scroll', handleScroll);
//       } else {
//         document.removeEventListener('mousemove', handleMouseMove);
//       }
//     };
//   }, [isMobile]);
//   return coords;
// }

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

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    // Gamma - наклон вокруг оси X (из стороны в сторону)
    // Beta - наклон вокруг оси Y (вперед-назад)
    setCoords({ x: coords.x + (event.gamma || 0), y: coords.y + (event.beta || 0) });
  };

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
      window.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleDeviceOrientation, isMobile]);

  return coords;
};
