import axios from "../api/axios";
import { UserCredential, UserProfile } from "../helpers";

export const login = async (login: UserCredential) => {
  try {
    const response = await axios.post("/auth/login", login);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const register = async (user: UserProfile) => {
  const { username, authentication } = user;
  try {
    const response = await axios.post("/auth/register", {
      email: authentication.email,
      password: authentication.password,
      username: username,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
