import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../db/user";
import { rateLimit } from "express-rate-limit";
import { createLogger, format, transports } from "winston";
import { User } from "../helpers/types";

// Constants
const AUTH_COOKIE_NAME = 'LOFLODEV-AUTH';  // Updated to match login controller
const MAX_REQUESTS = 100;  // Max requests per window
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes

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
  identity?: User;
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies[AUTH_COOKIE_NAME];

    if (!sessionToken) {
      return res.status(403).json({ error: "Not authenticated" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json({ error: "Not authenticated" });
    }

    req.identity = existingUser;

    return next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(400).json({ error: "Authentication error" });
  }
};

// Combine rate limiting with authentication
export const isAuthenticated = [limiter, auth];
