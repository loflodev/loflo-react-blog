export type Role = "admin" | "suscriber";

export type ErrorMessage =
  | "Email is incorrect"
  | "Incorrect password"
  | "Password did not match"
  | "username is too short"
  | "Password is too short"
  | "Incorrect email or password"
  | "An error occurred during sign in"
  | undefined;

export type InputValidationType = {
  message: ErrorMessage;
  isValid: boolean;
  input: string;
};

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

export type IconsType = "css" | "js" | "react" | "tailwind" | "vue" ;

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: IconsType;
  tags?: string[];
  cover?: string;
  view?: string;
  createAt: string;
  updateAt: string;
}
