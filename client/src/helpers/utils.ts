import { InputValidationType } from "./types";

export const emailChecker = (input: string): InputValidationType => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = regex.test(input);
  return {
    message: valid ? undefined : "Email is incorrect",
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
      message: "Incorrect password",
      isValid: false,
      input: "",
    };
  } else if (!match) {
    return {
      message: "Password did not match",
      isValid: false,
      input: "",
    };
  } else {
    return {
      message: undefined,
      isValid: true,
      input: password,
    };
  }
};
