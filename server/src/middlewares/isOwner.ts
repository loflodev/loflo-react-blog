import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

interface IsOwnerRequest extends Request {
  identity?: {
    _id: string;
  };
}

export const isOwner = async (
  req: IsOwnerRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id)
    const currentUserId = get(req, "identity._id") as string | undefined;
    console.log(currentUserId)

    if (!currentUserId) {
      res.status(401).json({ error: "Unauthorized: User not authenticated" });
      return;
    }

    if (currentUserId.toString() !== id) {
      res.status(403).json({ error: "Forbidden: User is not the owner" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error in isOwner middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
