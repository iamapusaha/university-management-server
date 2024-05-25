import Joi from "joi";

// Define UserName Schema
const userNameSchema = Joi.object({
  firstName: Joi.string().max(10).trim().required().messages({
    "string.base": "First Name should be a type of string",
    "string.empty": "First Name is required",
    "string.max": "First Name can't be more than 10 characters",
    "any.required": "First Name is required",
  }),
  middleName: Joi.string().trim().allow(""),
  lastName: Joi.string().max(10).trim().required().messages({
    "string.base": "Last Name should be a type of string",
    "string.empty": "Last Name is required",
    "string.max": "Last Name can't be more than 10 characters",
    "any.required": "Last Name is required",
  }),
});

// Define Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.base": "Father Name should be a type of string",
    "string.empty": "Father Name is required",
    "any.required": "Father Name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    "string.base": "Father Occupation should be a type of string",
    "string.empty": "Father Occupation is required",
    "any.required": "Father Occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    "string.base": "Father Contact No should be a type of string",
    "string.empty": "Father Contact No is required",
    "any.required": "Father Contact No is required",
  }),
  motherName: Joi.string().required().messages({
    "string.base": "Mother Name should be a type of string",
    "string.empty": "Mother Name is required",
    "any.required": "Mother Name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    "string.base": "Mother Occupation should be a type of string",
    "string.empty": "Mother Occupation is required",
    "any.required": "Mother Occupation is required",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    "string.base": "Mother Contact No should be a type of string",
    "string.empty": "Mother Contact No is required",
    "any.required": "Mother Contact No is required",
  }),
});

// Define LocalGuardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Local Guardian Name should be a type of string",
    "string.empty": "Local Guardian Name is required",
    "any.required": "Local Guardian Name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    "string.base": "Local Guardian Occupation should be a type of string",
    "string.empty": "Local Guardian Occupation is required",
    "any.required": "Local Guardian Occupation is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    "string.base": "Local Guardian Contact No should be a type of string",
    "string.empty": "Local Guardian Contact No is required",
    "any.required": "Local Guardian Contact No is required",
  }),
  address: Joi.string().trim().required().messages({
    "string.base": "Local Guardian Address should be a type of string",
    "string.empty": "Local Guardian Address is required",
    "any.required": "Local Guardian Address is required",
  }),
});

// Define Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID should be a type of string",
    "string.empty": "ID is required",
    "any.required": "ID is required",
  }),
  name: userNameSchema.required().messages({
    "any.required": "Name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "{#label} is not a valid gender",
    "any.required": "Gender is required",
  }),
  dateOfBirth: Joi.string().trim().required().messages({
    "string.base": "Date of Birth should be a type of string",
    "string.empty": "Date of Birth is required",
    "any.required": "Date of Birth is required",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.base": "Email should be a type of string",
    "string.email": "{#label} is not a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    "string.base": "Contact No should be a type of string",
    "string.empty": "Contact No is required",
    "any.required": "Contact No is required",
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    "string.base": "Emergency Contact No should be a type of string",
    "string.empty": "Emergency Contact No is required",
    "any.required": "Emergency Contact No is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.only": "{#label} is not a valid blood group",
      "any.required": "Blood Group is required",
    }),
  presentAddress: Joi.string().trim().required().messages({
    "string.base": "Present Address should be a type of string",
    "string.empty": "Present Address is required",
    "any.required": "Present Address is required",
  }),
  permanentAddress: Joi.string().trim().required().messages({
    "string.base": "Permanent Address should be a type of string",
    "string.empty": "Permanent Address is required",
    "any.required": "Permanent Address is required",
  }),
  guardian: guardianSchema.required().messages({
    "any.required": "Guardian is required",
  }),
  localGuardian: localGuardianSchema.required().messages({
    "any.required": "Local Guardian is required",
  }),
  profileImg: Joi.string().trim().allow(""),
  isActive: Joi.string().valid("active", "blocked").required().messages({
    "any.only": "{#label} is not a valid data status",
    "any.required": "Status is required",
  }),
});

export { studentValidationSchema };
