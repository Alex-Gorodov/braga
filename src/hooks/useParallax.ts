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

//   const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
//     const gamma = event.gamma || 0;
//     const beta = event.beta || 0;
//     console.log(`Gamma: ${gamma}, Beta: ${beta}`);
//     setCoords({ x: gamma, y: beta });
//   };

//   useEffect(() => {
//     if (isMobile) {
//       window.addEventListener('deviceorientation', handleDeviceOrientation);
//       window.addEventListener('scroll', handleScroll);
//     } else {
//       window.addEventListener('mousemove', handleMouseMove);
//     }

//     return () => {
//       if (isMobile) {
//         window.removeEventListener('deviceorientation', handleDeviceOrientation);
//         window.removeEventListener('scroll', handleScroll);
//       } else {
//         window.removeEventListener('mousemove', handleMouseMove);
//       }
//     };
//   }, [isMobile]);

//   return coords;
// };


import { useState, useEffect } from "react";
import { useIsMobile } from "./useSizes";

export const useParallax = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (event: MouseEvent) => {
    setCoords({ x: event.clientX, y: event.clientY });
    console.log(`Mouse Move - X: ${event.clientX}, Y: ${event.clientY}`);
  };

  const handleScroll = () => {
    setCoords({ x: window.scrollX, y: window.scrollY });
    console.log(`Scroll - X: ${window.scrollX}, Y: ${window.scrollY}`);
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    const gamma = event.gamma || 0;
    const beta = event.beta || 0;
    console.log(`Device Orientation - Gamma: ${gamma}, Beta: ${beta}`);
    setCoords({ x: gamma, y: beta });
  };

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
      window.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  return coords;
};
