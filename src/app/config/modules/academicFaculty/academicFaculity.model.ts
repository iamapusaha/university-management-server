import { Schema, model } from "mongoose";

const academicFaculySchema = new Schema<TAcademicFaculty>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const AcademicFaculty = model<TAcademicFaculty>(
  "academicyFaculity",
  academicFaculySchema
);
