import { Schema, model } from "mongoose";
import validator from "validator";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

// Define UserName Schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    maxlength: [10, "first name can't more than 10 characters"],
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not in a capitalize format!",
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    maxlength: [10, "last name can't more than 10 characters"],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not a valid lastName",
    // },
  },
});

// Define Guardian Schema
const guardianSchema = new Schema<Guardian>({
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
const localGuardianSchema = new Schema<LocalGuardian>({
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
const studentSchema = new Schema<Student>({
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
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE} is valid email!",
    // },
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

// Create and export the Student model
const StudentModel = model<Student>("Student", studentSchema);
export default StudentModel;
