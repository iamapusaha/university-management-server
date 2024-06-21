/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import Student from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // {email: {$regex: query.searchTerm ,$options: "i"}}

  const queryObj = { ...query };
  console.log("base query:", query);
  const studentSearchAbleFields = ["email", "name.firstName", "presentAddress"];
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchFindQuery = Student.find({
    $or: studentSearchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //Filtering
  const excluderFields = ["searchTerm", "sort", "limite", "page", "fields"];
  excluderFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchFindQuery
    .find(queryObj)
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");

  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limite = 1;
  let skip = 0;

  if (query.limite) {
    limite = Number(query.limite);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limite;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limiteQuery = paginateQuery.limit(limite);

  //frield filtering
  let fields = "-_v";

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldsLimiteQuery = await limiteQuery.select(fields);

  return fieldsLimiteQuery;
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

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
