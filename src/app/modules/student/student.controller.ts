import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getStudentData = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentFromDB(req.query);

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

const updateStudentData: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentFromDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student data is updated successfully!",
    data: result,
  });
});

export const studentController = {
  getStudentData,
  getSingleStudentData,
  deleteSingleStudentData,
  updateStudentData,
};
