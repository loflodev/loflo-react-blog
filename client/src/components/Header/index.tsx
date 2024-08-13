import { HeaderProvider } from "../../context/HeaderProvider";
import NavBar from "./NavBar";

const Header = () => {

  return (
    <HeaderProvider>
      <NavBar />
    </HeaderProvider>
  );
};

export default Header;
