import { useEffect, useState } from "react";
import { checkAuth } from "../services/authentication";
import axios from "../api/axios";
import { User } from "../helpers/types";

export const usePersistentLogin = () => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckAuth = async () => {
      try {
        const data = await checkAuth();

        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckAuth();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return { user, setUser, loading, setLoading };
};
