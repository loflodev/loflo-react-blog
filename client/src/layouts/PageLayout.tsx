import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavigationBar from "../components/Header/NavigationBar";

const PageLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageLayout;
