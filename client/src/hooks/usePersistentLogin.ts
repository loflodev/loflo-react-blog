import { checkAuth, login, logout } from "../services/authentication";
import axios from "../api/axios";
import { User } from "../helpers/types";
import { useCallback, useEffect, useState } from "react";

export const usePersistentLogin = () => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const fetchCheckAuth = useCallback(async () => {
    setLoading(true);

    try {
      const data = await checkAuth();

      setUser(data);
      setIsLogged(true);
    } catch (error) {
      setUser(null);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCheckAuth();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
          setIsLogged(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [fetchCheckAuth]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await login({
        email,
        password,
      });

      setUser(response?.data);
      setIsLogged(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const res = await logout();

      setUser(null);
      setIsLogged(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    isLogged,
    setIsLogged,
    fetchCheckAuth,
    signIn,
    signOut,
  };
};
