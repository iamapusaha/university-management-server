import { RequestHandler } from "express";

import { academicFacultyServices } from "./academicFaculty.service";
import httpStatus from "http-status";

import { AcademicFaculty } from "./academicFaculty.model";
import { TAcademicFaculty } from "./academicFaculty.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const facultyData = req.body;
    const result =
      await academicFacultyServices.createAcademicFacultyToDB(facultyData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty is create successfully",
      data: result,
    });
  }
);
const getAllAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicFacultyServices.getAcademicFacultyFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty data are retrived successfully",
      data: result,
    });
  }
);

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { facultyId } = req.params;
    const result =
      await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty data is retrived successfully",
      data: result,
    });
  }
);

const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await academicFacultyServices.updateAcademicFacultyFromDB(
      facultyId,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty data updated successfully",
      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
