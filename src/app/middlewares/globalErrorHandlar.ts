import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error.interface";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
const globalErrorHandlar: ErrorRequestHandler = (err, req, res, next) => {
  //setting default value
  let statusCode = 500;
  let message = "somethings went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "somethings went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simfiledError = handleZodError(err);
    message = simfiledError?.message;
    statusCode = simfiledError?.statusCode;
    errorSources = simfiledError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simfiledError = handleValidationError(err);
    message = simfiledError?.message;
    statusCode = simfiledError?.statusCode;
    errorSources = simfiledError?.errorSources;
  } else if (err?.name === "CastError") {
    const simfiledError = handleCastError(err);
    message = simfiledError?.message;
    statusCode = simfiledError?.statusCode;
    errorSources = simfiledError?.errorSources;
  } else if (err?.code === 11000) {
    const simfiledError = handleDuplicateError(err);
    message = simfiledError?.message;
    statusCode = simfiledError?.statusCode;
    errorSources = simfiledError?.errorSources;
  } else if (err instanceof AppError) {
    message = err?.message;
    statusCode = err?.statusCode;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandlar;
