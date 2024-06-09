import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error.interface";
const globalErrorHandlar: ErrorRequestHandler = (err, req, res, next) => {
  //setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || "somethings went wrong!";
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "somethings went wrong!",
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: "validation error!",
      errorSources,
    };
  };
  if (err instanceof ZodError) {
    const simfiledError = handleZodError(err);
    message = simfiledError?.message;
    statusCode = simfiledError?.statusCode;
    errorSources = simfiledError?.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

export default globalErrorHandlar;
