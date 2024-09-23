export type Role = "admin" | "suscriber";

export type ErrorMessage =
  | "Email is incorrect"
  | "Incorrect password"
  | "Password did not match"
  | "username is too short"
  | "Password is too short"
  | "Incorrect email or password"
  | undefined;

export type InputValidationType = {
  message: ErrorMessage;
  isValid: boolean;
  input: string;
};

export interface User {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface Post {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  cover?: string;
  view?: string;
  createAt: string;
  updateAt: string;
}
