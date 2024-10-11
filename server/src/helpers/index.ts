import crypto from "crypto";

const SECRET = "LOFLODEV-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest();
};

export const emailValidation = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const passworValidation = (password: string) => {
  return password.length >= 8;
};
