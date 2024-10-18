import axios from "../api/axios";
import { User } from "../helpers/types";

type Credential = {
  username?: User["username"];
  email: User["email"];
  password: User["password"];
};

export const login = async (credential: Credential) => {
  try {
    const response = await axios.post("/auth/login", credential);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (credential: Credential) => {
  const { username, email, password } = credential;
  try {
    const response = await axios.post("/auth/register", {
      email: email,
      password: password,
      username: username ? username : email,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(`/user/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const checkAuth = async () => {
  try {
    const { data } = await axios.get("/auth/check-auth");
    return data;
  } catch (error) {
    console.error(error);
  }
};
