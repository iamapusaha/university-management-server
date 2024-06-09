import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.name,
        message: val.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "validation error!",
    errorSources,
  };
};

export default handleValidationError;
