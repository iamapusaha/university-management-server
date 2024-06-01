import { TStudent } from "./student.interface";
import Student from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = StudentModel.create(student); //build in static method
  const student = new Student(studentData); //buildin instance method
  if (await student.isUserExists(studentData.id)) {
    throw new Error("User is already exists!");
  }
  const result = await student.save();
  return result;
};
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.find({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
