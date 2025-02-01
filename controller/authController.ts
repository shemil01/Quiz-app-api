import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    await user.save();

    res.json({ token });

};
