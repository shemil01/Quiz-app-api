import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import { AuthRequest } from "../types/AuthRequest";


dotenv.config();

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      sessionId: string; 
    };

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "User not found or token is invalid" });
      return;
    }

    req.userId = user._id.toString(); 
    req.sessionId = decoded.sessionId;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
