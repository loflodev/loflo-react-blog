import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import { authentication, random } from "../helpers/index";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(401);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash.toString()) {
      return res.sendStatus(403);
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    ).toString();

    await user.save();

    res.cookie("access_token", user.authentication.sessionToken, {
      httpOnly: true, // restrict accessibily only in server side
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    const { username, email: userEmail } = user;

    return res
      .status(200)
      .json({ username: username, email: userEmail })
      .end()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await createUser({
      email,
      password,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json().end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const admin = async (req: express.Request, res: express.Response) => {
  // const userToken = req.cookies["user"];

  try {
    // res.render("/admin");
    console.log("admin");
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const logout = (req: express.Request, res: express.Response) => {
  res.clearCookie("access_token").json({ message: "Logout successful" });
};
