export type InputValidationType = {
  message: string;
  isValid: boolean;
  input: string;
};

export type UserCredential = {
  email: string;
  password: string;
};

export type Role = "admin" | "suscriber";

export interface UserProfile {
  username: string;
  authentication: UserCredential;
}

export type userPublicProfileType = {
  username: string
  email: UserCredential["email"];
  role: Role;
}

export const emailChecker = (input: string): InputValidationType => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = regex.test(input);
  return {
    message: valid ? "" : "Email is incorrect",
    isValid: valid ? true : false,
    input: valid ? input.toLowerCase() : "",
  };
};

export const passwordChercker = (
  password: string,
  confirmPassword: string
): InputValidationType => {
  const regex = /\s/;
  const valid = regex.test(password);
  const match = password === confirmPassword;

  if (valid) {
    return {
      message: "Incorrect Password",
      isValid: false,
      input: "",
    };
  } else if (!match) {
    return {
      message: "Password didn't match",
      isValid: false,
      input: "",
    };
  } else {
    return {
      message: "",
      isValid: true,
      input: password,
    };
  }
};
