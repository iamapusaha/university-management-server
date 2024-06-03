import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const getStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "student data are fetched successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "student data is fetched successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteSingleStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
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
