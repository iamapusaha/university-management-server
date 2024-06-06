import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";

import { AcademicSemesterServices } from "./academicSemester.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

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

const getAllAcademicSemesterData: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemesterDataFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester data fetched successfully",
      data: result,
    });
  }
);
const getSingleAcademicSemesterData: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterDataFromDB(
        semesterId
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester single data fetched successfully",
      data: result,
    });
  }
);
const updateAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterById(
      semesterId,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester is retrived successfully",
      data: result,
    });
  }
);
export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesterData,
  getSingleAcademicSemesterData,
  updateAcademicSemester,
};
