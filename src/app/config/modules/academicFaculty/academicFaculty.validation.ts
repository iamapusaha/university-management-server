import { z } from "zod";

const academicFacultyValidation = z.object({
  name: z.string({
    invalid_type_error: "name must me string",
  }),
});

export default academicFacultyValidation;
