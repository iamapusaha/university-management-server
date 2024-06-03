import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const getStudentData: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student data are fetched successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudentData: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student create succesfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteSingleStudentData: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student data is delete successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const studentController = {
  getStudentData,
  getSingleStudentData,
  deleteSingleStudentData,
};
