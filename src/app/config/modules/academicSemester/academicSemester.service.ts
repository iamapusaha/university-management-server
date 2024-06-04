import AcademicSemester from "./academicSemester.model";
import { TAcademicSemester } from "./academicSemesterInterface";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  const result = await AcademicSemester.create(payLoad);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
