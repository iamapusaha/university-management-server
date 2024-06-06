import { Router } from "express";

import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterController } from "../academicSemester/academicSemester.controller";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  academicFacultyController.createAcademicFaculty
);

router.get(
  "/get-all-academic-faculty",
  academicSemesterController.getAllAcademicSemesterData
);

router.get(
  "/get-single-academic-faculty/:facultyId",
  academicSemesterController.getSingleAcademicSemesterData
);
router.patch(
  "/update-academic-faculty/:facultyId",
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicSemesterController.updateAcademicSemester
);

export const academicFacultyRouters = router;
