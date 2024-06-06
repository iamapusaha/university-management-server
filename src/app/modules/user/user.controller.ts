import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is create successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
