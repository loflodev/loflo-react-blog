export type InputValidationType = {
  message: string;
  isValid: boolean;
  input: string;
};

export type LoginDetail = {
  email: string;
  password: string;
}

export type Role = "admin" | "suscriber";

export interface User {
  firstName: string;
  lastName: string;
  authentication: LoginDetail;
  role: Role;
}

const emailChecker = (input: string): InputValidationType => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = regex.test(input);
  return {
    message: valid ? "" : "Email is incorrect",
    isValid: valid ? true : false,
    input: valid ? input.toLowerCase() : "",
  };
};

const passwordChercker = (input: string): InputValidationType => {
  const regex = /\s/;
  const valid = regex.test(input);
  return {
    message: !valid ? "" : "Incorrect Password",
    isValid: !valid ? true : false,
    input: !valid ? input : "",
  };
};

export { emailChecker, passwordChercker };
