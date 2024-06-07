import { RequestHandler } from "express";
import { academicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartment } from "./academicDepartment.model";
import catchAsync from "../../utils/catchAsync";

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const departmentData = req.body;
    const result =
      await academicDepartmentServices.createAcademicDepartment(departmentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Departrment is create successfully",
      data: result,
    });
  }
);

const getAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicDepartmentServices.getAcademicDepartment();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department date are retrived successfully",
      data: result,
    });
  }
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentServices.getSingleAcademicDepartment(
        departmentId
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department date is retrived successfully",
      data: result,
    });
  }
);

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentServices.updateAcademicDepartment(
      departmentId,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department date is updated successfully",
      data: result,
    });
  }
);

export const academicDepartController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
