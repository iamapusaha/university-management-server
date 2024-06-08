import { Schema, model } from "mongoose";

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import { boolean, string } from "zod";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, "ID is required"], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
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
      type: Date,
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
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local Guardian is required"],
      trim: true,
    },
    profileImg: { type: String, trim: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "academicDepartment",
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "academicSemester",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExistingStudent = await Student.findOne(query);
  if (!isExistingStudent) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Not found any Student bt the id!"
    );
    next();
  }
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create and export the Student model
const Student = model<TStudent, StudentModel>("Student", studentSchema);
export default Student;
