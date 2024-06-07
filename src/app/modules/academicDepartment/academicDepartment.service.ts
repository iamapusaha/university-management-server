import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id });
  return result;
};
const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartment: createAcademicDepartmentIntoDB,
  getAcademicDepartment: getAcademicDepartmentFromDB,
  getSingleAcademicDepartment: getSingleAcademicDepartmentFromDB,
  updateAcademicDepartment: updateAcademicDepartmentFromDB,
};
