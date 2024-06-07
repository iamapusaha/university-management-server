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

router.get("/", academicFacultyController.getAllAcademicFaculty);

router.get("/:facultyId", academicFacultyController.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyController.updateAcademicFaculty
);

export const academicFacultyRouters = router;
