import React, { FC, ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { StatusMessage } from '../status-message/status-message';
import { Parallax } from '../parallax/parallax';

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const statusMessage = useSelector((state: RootState) => state.page.statusMessage);

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setMouseCoords({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main className="main">
        {children}
      </main>
      {statusMessage !== null && <StatusMessage message={statusMessage} />}
      <Parallax mouseX={mouseCoords.x} mouseY={mouseCoords.y} />
      <Footer />
    </div>
  );
};
