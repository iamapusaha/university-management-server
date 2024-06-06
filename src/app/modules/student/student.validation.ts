import { z } from "zod";

// Custom trim function
const trimString = (str: string) => str.trim();

// Define UserName Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .max(20, { message: "First Name can't be more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    })
    .transform(trimString),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .transform(trimString),
});

// Define Guardian Schema
const guardianSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: "Father Name is required" })
    .transform(trimString),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father Occupation is required" })
    .transform(trimString),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father Contact No is required" })
    .transform(trimString),
  motherName: z
    .string()
    .min(1, { message: "Mother Name is required" })
    .transform(trimString),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother Occupation is required" })
    .transform(trimString),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother Contact No is required" })
    .transform(trimString),
});

// Define LocalGuardian Schema
const localGuardianSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Local Guardian Name is required" })
    .transform(trimString),
  occupation: z
    .string()
    .min(1, { message: "Local Guardian Occupation is required" })
    .transform(trimString),
  contactNo: z
    .string()
    .min(1, { message: "Local Guardian Contact No is required" })
    .transform(trimString),
  address: z
    .string()
    .min(1, { message: "Local Guardian Address is required" })
    .transform(trimString),
});

// Define Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: "Password can't be more than 20 characters" }),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(["male", "female", "other"], {
        message: "Gender is required",
      }),
      dateOfBirth: z.date().optional(),
      email: z
        .string()
        .email({ message: "Email is not valid" })
        .min(1, { message: "Email is required" })
        .transform(trimString),
      contactNo: z
        .string()
        .min(1, { message: "Contact No is required" })
        .transform(trimString),
      emergencyContactNo: z
        .string()
        .min(1, { message: "Emergency Contact No is required" })
        .transform(trimString),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Blood Group is required",
      }),
      presentAddress: z
        .string()
        .min(1, { message: "Present Address is required" })
        .transform(trimString),
      permanentAddress: z
        .string()
        .min(1, { message: "Permanent Address is required" })
        .transform(trimString),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
};
