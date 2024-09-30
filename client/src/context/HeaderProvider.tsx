import { createContext, Dispatch, ReactNode, useState } from "react";

interface HeaderProviderProps {
  children: ReactNode;
}

type HeaderContextType = {
  toggle: boolean;
  setToggle: Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
  showRegistration: boolean;
  setShowRegistration: Dispatch<React.SetStateAction<boolean>>;
};

const HeaderContext = createContext<HeaderContextType>({
  toggle: false,
  setToggle: () => {},
  handleClick: () => {},
  showRegistration: false,
  setShowRegistration: () => {},
});

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);

  const handleClick = () => {
    console.log("llmando")
    setToggle(!toggle);
  };

  return (
    <HeaderContext.Provider
      value={{
        toggle,
        setToggle,
        handleClick,
        showRegistration,
        setShowRegistration,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;


