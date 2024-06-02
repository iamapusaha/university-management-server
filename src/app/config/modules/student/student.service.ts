import { TStudent } from "./student.interface";
import Student from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User is already exists!");
  }
  const result = Student.create(studentData); //build in static method

  // const student = new Student(studentData); //buildin instance method
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User is already exists!");
  // }
  // const result = await student.save();
  return result;
};
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
