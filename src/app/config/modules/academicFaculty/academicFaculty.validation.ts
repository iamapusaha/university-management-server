import { z } from "zod";

const academicFacultyValidation = z.object({
  name: z.string({
    invalid_type_error: "Academic faculty must be a  string",
  }),
});

export default academicFacultyValidation;
