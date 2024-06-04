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
    type: Date,
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

const AcademicSemester = model<TAcademicSemester>(
  "academicSemester",
  AcademicSemesterSchema
);
export default AcademicSemester;
