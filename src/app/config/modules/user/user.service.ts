import config from "../..";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password not given then use default password
  userData.password = password || (config.default_password as string);
  //set a student role
  userData.role = "student";

  //manully genarated id
  userData.id = "20010007";

  //create user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    // ser id,_id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
