import { createContext, ReactNode } from "react";
import { usePersistentLogin } from "../hooks/usePersistentLogin";
import { User } from "../helpers/types";

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextType = {
  user: Omit<User, "password"> | null;
  isLogged: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  loading: true,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, loading, isLogged } = usePersistentLogin();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
