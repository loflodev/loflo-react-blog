import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../db/user";
import { rateLimit } from "express-rate-limit";
import { createLogger, format, transports } from "winston";
import { User } from "helpers/types";
import { AUTH_COOKIE_NAME, MAX_REQUESTS, WINDOW_MS } from "../helpers/constants";

// Logger configuration
const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

// Rate limiter
const limiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
  message: "Too many requests from this IP, please try again later.",
});

// Extended Request interface to include identity
interface AuthenticatedRequest extends Request {
  identity?: User; // Replace 'any' with your user type
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies[AUTH_COOKIE_NAME];

    console.log(sessionToken);

    if (!sessionToken) {
      logger.warn("Authentication failed: No session token provided");
      return res.status(401).json({ error: "Authentication required" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      logger.warn("Authentication failed: Invalid session token");
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    req.identity = existingUser;

    // Refresh the session cookie
    res.cookie("LOFLODEV-AUTH", sessionToken, {
      httpOnly: true, // restrict accessibility only in server side
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set expire in  7 days
      path: "/",
      domain: "localhost", // Ensure the cookie is available for all paths
    });

    return next();
  } catch (error) {
    logger.error("Authentication error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const isAuthenticated = [limiter, auth];
