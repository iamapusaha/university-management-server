import { Router } from "express";

import academicFacultyValidation from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidation),
  academicFacultyController.createAcademicFaculty
);
