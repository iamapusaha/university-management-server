import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic department must be string",
      required_error: "name is required!",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Faculty must be a string  id",
      required_error: "Faculty must be required!",
    }),
  }),
});
const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic department must be string",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Faculty must be a string  id",
      })
      .optional(),
  }),
});

export const academicDepartValidation = {
  createAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
};
