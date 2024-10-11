import { createContext, Dispatch, ReactNode, useState } from "react";
import { usePersistentLogin } from "../hooks/usePersistentLogin";
import { User } from "../helpers/types";

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextType = {
  user: Omit<User, "password"> | null;
  setUser: Dispatch<React.SetStateAction<Omit<User, "password"> | null>>;
  isLogged: boolean;
  setIsLogged: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const { user, setUser, loading } = usePersistentLogin();

  // useEffect(() => {
  //   const userInfoJSON = window.localStorage.getItem("loggedUserInfo");

  //   if (userInfoJSON) {
  //     const userData = JSON.parse(userInfoJSON);
  //     setUser(userData);
  //     setIsLogged(true);
  //   }
  //   setLoading(false);
  // }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
