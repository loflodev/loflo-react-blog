import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { HeaderProvider } from "../context/HeaderProvider";

const Layout = () => {
  return (
    <>
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
