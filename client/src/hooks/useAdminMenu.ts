import { useContext } from "react";
import HeaderContext from "../context/HeaderProvider";
import AuthContext from "../context/AuthProvider";

const useAdminMenu = () => {
  const { handleClick, toggle, showRegistration } = useContext(HeaderContext);
  const { auth, isLogged, setIsLogged } = useContext(AuthContext);
  return { auth, isLogged, toggle, showRegistration, handleClick, setIsLogged };
};

export default useAdminMenu;
