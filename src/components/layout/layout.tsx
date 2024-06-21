import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className="page-container">
      <Header/>
      <main className="main">
        {children}
      </main>
      <Footer/>
    </div>
  )
}
