import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

interface Props {
  children: ReactNode;
}

const Layout = ({children}: Props) => {
  return (
      <>
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer/>
      </>
  );
};

export default Layout;
