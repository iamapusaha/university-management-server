import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import AcademicSemester from "./academicSemester.model";
import { TAcademicSemester } from "./academicSemesterInterface";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error("invalid semester code!");
  }

  const result = await AcademicSemester.create(payLoad);
  return result;
};

const getAllAcademicSemesterDataFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterDataFromDB,
};
