import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  auth:
    | { username: string; email: string; _id: string; role: string }
    | undefined;
  setAuth: Dispatch<
    React.SetStateAction<
      | {
          username: string;
          email: string;
          _id: string;
          role: string;
        }
      | undefined
    >
  >;
  isLogged: boolean;
  setIsLogged: Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: () => {},
  isLogged: false,
  setIsLogged: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [auth, setAuth] = useState<
    { username: string; email: string; _id: string; role: string } | undefined
  >();

  useEffect(() => {
    const userInfoJSON = window.localStorage.getItem("loggedUserInfo");

    if (userInfoJSON) {
      const userData = JSON.parse(userInfoJSON);
      setAuth(userData);
      setIsLogged(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
