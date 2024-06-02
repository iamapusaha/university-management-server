import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

export const userController = {
  createUser,
};
