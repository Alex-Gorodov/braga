import { useEffect, useState } from 'react';

export function Video(): JSX.Element {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="section section--video">
      <div className="video">
        <video autoPlay muted loop style={{ width: `${windowWidth - 80}px`}}>
          <source src="https://bluebeard.qodeinteractive.com/wp-content/uploads/2023/01/main-home-video-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
