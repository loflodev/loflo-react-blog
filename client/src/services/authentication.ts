import axios from "../api/axios";
import { LoginDetail } from "../helpers";

export const login = async (login: LoginDetail) => {
  try {
    const response = await axios.post("/auth/login", login);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
