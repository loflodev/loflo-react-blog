import { useContext, useEffect, useState } from "react";
import { HeaderProvider } from "../../context/HeaderProvider";
import NavBar from "./NavBar";
import AuthContext from "../../context/AuthProvider";

const Header = () => {
  const {setAuth, setIsLogged} = useContext(AuthContext);
  const [fet, setFet] = useState<boolean>(false);

  useEffect(() => {
    const userInfoJSON = window.localStorage.getItem("loggedUserInfo");

    if (userInfoJSON) {
      const userData = JSON.parse(userInfoJSON);
      setAuth(userData);
      setIsLogged(true);
      setFet(true);
    }
  }, [setAuth, setIsLogged]);

  useEffect(() => {
    console.log("montando");
    if (fet) {
      console.log("load..")
      window.location.reload();
    }
  }, [fet]);


  return (
    <HeaderProvider>
      <NavBar />
    </HeaderProvider>
  );
};

export default Header;
