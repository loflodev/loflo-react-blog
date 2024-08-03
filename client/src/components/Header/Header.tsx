import { createContext, useState } from "react";
import NavBar from "./NavBar";
import Login from "./Login";
type HeaderProps = {
  toggle: boolean;
  handleClick: () => void;
};
const HeaderContext = createContext<HeaderProps>({
  toggle: false,
  handleClick() {},
});

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <HeaderContext.Provider value={{ toggle, handleClick }}>
      <NavBar />
      <Login />
    </HeaderContext.Provider>
  );
};

export { HeaderContext, Header };
