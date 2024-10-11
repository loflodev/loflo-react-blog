export type Roles = "admin" | "suscriber";

export type AllowedRoles = Roles[]

export interface Authentication {
  password: string;
  salt: string;
  sessionToken: string;
}

export interface User {
  username: string;
  email: string;
  authentication: Authentication;
  role: Roles;
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
