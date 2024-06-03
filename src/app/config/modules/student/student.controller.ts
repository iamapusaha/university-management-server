import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";

const getStudentData = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student data are fetched successfully!",
    data: result,
  });
});

const getSingleStudentData = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student create succesfully",
    data: result,
  });
});
const deleteSingleStudentData = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student data is delete successfully!",
    data: result,
  });
});

export const studentController = {
  getStudentData,
  getSingleStudentData,
  deleteSingleStudentData,
};
