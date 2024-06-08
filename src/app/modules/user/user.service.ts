import mongoose from "mongoose";
import config from "../../config";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TAcademicSemester } from "../academicSemester/academicSemesterInterface";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { generateStudentId } from "./use.utils";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password not given then use default password
  userData.password = password || (config.default_password as string);
  //set a student role
  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //manully genarated id
    userData.id = await generateStudentId(admissionSemester!);

    //create user (Transaction-01)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create user!");
    }
    // set id,_id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    //create a student (Transaction-02)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create student!");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
};
