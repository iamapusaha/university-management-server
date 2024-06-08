import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
const globalErrorHandlar = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "somethings went wrong!";

  return res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};

export default globalErrorHandlar;
