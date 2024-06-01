import { Schema, model } from "mongoose";
import validator from "validator";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

// Define UserName Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    maxlength: [10, "first name can't more than 10 characters"],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    maxlength: [10, "last name can't more than 10 characters"],
    trim: true,
  },
});

// Define Guardian Schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father Name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is required"],
    trim: true,
  },
  motherName: { type: String, required: [true, "Mother Name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is required"],
    trim: true,
  },
});

// Define LocalGuardian Schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local Guardian Name is required"] },
  occupation: {
    type: String,
    required: [true, "Local Guardian Occupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian Contact No is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local Guardian Address is required"],
    trim: true,
  },
});

// Define Student Schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  name: { type: userNameSchema, required: [true, "Name is required"] },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of Birth is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Contact No is required"],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact No is required"],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not a valid blood group!",
    },
    required: [true, "Blood Group is required"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required"],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required"],
    trim: true,
  },
  guardian: { type: guardianSchema, required: [true, "Guardian is required"] },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian is required"],
    trim: true,
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    enum: {
      values: ["active", "blocked"],
      message: "{VALUE} is not a valid data status!",
    },
    required: [true, "Status is required"],
    default: "active",
    trim: true,
  },
});
// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// Create and export the Student model
const Student = model<TStudent, StudentModel>("Student", studentSchema);
export default Student;
