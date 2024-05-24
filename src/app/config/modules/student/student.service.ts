import { Student } from "./student.interface";
import StudentModel from "./student.model";

const createStudentIntoDB = async (student: Student) => {
  const result = StudentModel.create(student);
  return result;
};

export const studentServices = {
  createStudentIntoDB,
};
