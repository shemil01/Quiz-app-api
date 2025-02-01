import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, any>;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  console.error(`[Error] ${statusCode}: ${message}`);

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Unauthorized: Your token has expired. Please log in again.";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Unauthorized: Invalid token.";
  }

  if (err.code === 11000) {
    const keyName = Object.keys(err.keyValue || {})[0];
    statusCode = 400;
    message = `The provided ${keyName} already exists.`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, 
  });
};
