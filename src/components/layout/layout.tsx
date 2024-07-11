import { StatusMessage } from "../status-message/status-message";
import { RootState } from "../../store/root-reducer";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const statusMessage = useSelector((state: RootState) => state.page.statusMessage);

  return (
    <div className="page-container">
      <Header/>
      <main className="main">
        {children}
      </main>
      {
        statusMessage !== null &&
        <StatusMessage message={statusMessage}/>
      }
      <Footer/>
    </div>
  )
}
