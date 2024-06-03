import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student is create successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
