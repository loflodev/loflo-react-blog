export type Role = "admin" | "suscriber";

export interface Authentication {
  password: string;
  salt: string;
  sessionToken: string;
}

export interface User {
  username: string;
  email: string;
  authentication: Authentication;
  role: Role;
}
export interface Post {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  cover?: string;
  view?: number;
  createAt?: Date;
  updateAt?: Date;
}
