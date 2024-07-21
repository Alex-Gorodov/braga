import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { StatusMessage } from '../status-message/status-message';

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const statusMessage = useSelector((state: RootState) => state.page.statusMessage);

  return (
    <div className="page-container">
      <Header />
      <main className="main">
        {children}
      </main>
      {statusMessage !== null && <StatusMessage message={statusMessage} />}
      <Footer />
    </div>
  );
};
