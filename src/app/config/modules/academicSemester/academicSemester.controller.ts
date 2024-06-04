import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const academicData = req.body;
    const result =
      await AcademicSemesterServices.createAcademicSemesterIntoDB(academicData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester is create successfully",
      data: result,
    });
  }
);

export const academicSemesterController = {
  createAcademicSemester,
};
