import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );
    // const result = await
    res.status(200).json({
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
