import mongoose, { startSession } from "mongoose";
import Student from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //for delete student data(Transaction-01)
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deletedStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "failed to deleted new student!"
      );
    }
    //for user student data(Transaction-02)
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "failed to deleted new student!"
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
