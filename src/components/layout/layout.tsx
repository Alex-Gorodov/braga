import { FC, ReactNode } from "react";
import { Header } from "../header/header";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className="page-container">
      <Header/>
      {children}
    </div>
  )
}
