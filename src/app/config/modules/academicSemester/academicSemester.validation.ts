import { string, z } from "zod";
import {
  Months,
  AcademicSemesterCode,
  AcademicSemesterName,
} from "./academicSemester.const";

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicValidate = {
  createAcademicSemesterValidationSchema,
};
