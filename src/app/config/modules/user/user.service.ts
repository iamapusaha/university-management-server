import config from "../..";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TAcademicSemester } from "../academicSemester/academicSemesterInterface";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { generateStudentId } from "./use.utils";
import { TUser } from "./user.interface";
import { User } from "./user.model";

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
  //manully genarated id
  userData.id = await generateStudentId(admissionSemester!);

  //create user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    // ser id,_id as user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
