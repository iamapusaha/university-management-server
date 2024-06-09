import { mongo } from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessage = err?.errorResponse.errmsg;

  const regex = /{ name: "([^"]+)" }/;
  const match = errorMessage.match(regex);
  let duplicateValue;
  if (match && match[1]) {
    duplicateValue = match[1];
  } else {
    duplicateValue = "your insert value is duplicated!";
  }

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${duplicateValue} is alrady exists!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid Id!",
    errorSources,
  };
};

export default handleDuplicateError;
