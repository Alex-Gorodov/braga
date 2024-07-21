// import { Helmet } from "react-helmet-async";
// import { Layout } from "../../components/layout/layout";
// import { Hero } from "../../components/hero/hero";
// import { Video } from "../../components/video/video";
// import { SwiperClassics } from "../../components/swiper-classics/swiper-classics";
// import { SignUp } from "../../components/subscribe/subscribe";
// import { useEffect, useState } from "react";
// import { Parallax } from "../../components/parallax/parallax";
// import { useIsMobile } from "../../hooks/useSizes";

// export function HomePage(): JSX.Element {
//   const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

//   const isMobile = useIsMobile();

//   const handleMouseMove = (event: MouseEvent) => {
//     setMouseCoords({ x: event.clientX, y: event.clientY });
//   };
//   // useEffect(() => {
//   //   document.addEventListener(isMobile ? 'mousemove' : 'scroll', handleMouseMove);
//   //   return () => {
//   //     document.removeEventListener(isMobile ? 'mousemove' : 'scroll', handleMouseMove);
//   //   };
//   // }, []);

//   const handleScroll = () => {
//     setMouseCoords({ x: window.scrollX, y: window.scrollY });
//   };

//   const handleTouchMove = (event: TouchEvent) => {
//     const touch = event.touches[0];
//     setMouseCoords({ x: touch.clientX, y: touch.clientY });
//   };

//   useEffect(() => {
//     if (isMobile) {
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('scroll', handleScroll);
//     } else {
//       document.addEventListener('mousemove', handleMouseMove);
//     }

//     return () => {
//       if (isMobile) {
//         document.removeEventListener('touchmove', handleTouchMove);
//         document.removeEventListener('scroll', handleScroll);
//       } else {
//         document.removeEventListener('mousemove', handleMouseMove);
//       }
//     };
//   }, []);

//   return (
//     <Layout>
//       <Helmet>
//         <title>Braga | Home</title>
//       </Helmet>
//       <Hero/>
//       <Video/>
//       <SwiperClassics/>
//       <SignUp/>
//       <Parallax mouseX={mouseCoords.x} mouseY={mouseCoords.y} />
//     </Layout>
//   );
// }

import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Hero } from "../../components/hero/hero";
import { Video } from "../../components/video/video";
import { SwiperClassics } from "../../components/swiper-classics/swiper-classics";
import { SignUp } from "../../components/subscribe/subscribe";
import { useEffect, useState } from "react";
import { Parallax } from "../../components/parallax/parallax";
import { useIsMobile } from "../../hooks/useSizes";
import { useParallax } from "../../hooks/useParallax";

export function HomePage(): JSX.Element {

  const parallax = useParallax()

  return (
    <Layout>
      <Helmet>
        <title>Braga | Home</title>
      </Helmet>
      <Hero />
      <Video />
      <SwiperClassics />
      <SignUp />
    </Layout>
  );
}
