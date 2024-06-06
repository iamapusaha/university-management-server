import { Schema, model } from "mongoose";

const academicFaculySchema = new Schema<TAcademicFaculity>({
  name: {
    type: String,
    required: true,
  },
});

export const AcademicFaculty = model<TAcademicFaculity>(
  "academicyFaculity",
  academicFaculySchema
);
