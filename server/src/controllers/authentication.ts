import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import {
  authentication,
  emailValidation,
  passworValidation,
  random,
} from "../helpers/index";
import { ALLOWED_ROLES, AUTH_COOKIE_NAME } from "../helpers/constants";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Email and password are required" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash.toString()) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    ).toString();

    await user.save();

    res.cookie("LOFLODEV-AUTH", user.authentication.sessionToken, {
      httpOnly: true, // restrict accessibility only in server side
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set expire in  7 days
      path: "/",
      domain: "localhost", // Ensure the cookie is available for all paths
    });

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ error: "Internal server" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, role } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: "Email, password, and username are required" });
    }

    if (!emailValidation(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!passworValidation(password)) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ error: "User already exist" });
    }

    const salt = random();

    const userRole = ALLOWED_ROLES.includes(role) ? role : "suscriber";

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      role: userRole,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
};

export const logout = (req: express.Request, res: express.Response) => {
  try {
    res
      .clearCookie("LOFLODEV-AUTH", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const checkAuth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies[AUTH_COOKIE_NAME];

    if (!sessionToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await getUserBySessionToken(sessionToken);

    

    if (!user) {
      return res.status(401).json({ error: "Invalid session" });
    }


    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
