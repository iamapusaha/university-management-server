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

const getSingleAcademicSemesterDataFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateAcademicSemesterById = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("invalid semester code");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterDataFromDB,
  getSingleAcademicSemesterDataFromDB,
  updateAcademicSemesterById,
};
