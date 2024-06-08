import { Schema, model } from "mongoose";
import {
  TAcademicCode,
  TAcademicName,
  TAcademicSemester,
  TMonth,
} from "./academicSemesterInterface";
import {
  Months,
  AcademicSemesterCode,
  AcademicSemesterName,
} from "./academicSemester.const";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(409, "semester is alreadt exist!");
  }
  next();
});

AcademicSemesterSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<TAcademicSemester>;
  if (update.year && update.name) {
    const isSemesterExists = await AcademicSemester.findOne({
      year: update.year,
      name: update.name,
    });
    if (isSemesterExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Semester already exists!");
    }
  }
  next();
});

const AcademicSemester = model<TAcademicSemester>(
  "academicSemester",
  AcademicSemesterSchema
);
export default AcademicSemester;
