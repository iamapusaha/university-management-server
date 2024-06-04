import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemesterInterface";
import { number } from "zod";

const months: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: ["Autum", "Summar", "Fall"],
    required: true,
  },
  code: {
    type: String,
    enum: ["01", "02", "03"],
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    enum: months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: months,
    required: true,
  },
});

const AcademicSemester = model<TAcademicSemester>(
  "academicSemester",
  AcademicSemesterSchema
);
export default AcademicSemester;
