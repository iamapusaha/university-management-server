import { Router } from "express";

import academicFacultyValidation from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterController } from "../academicSemester/academicSemester.controller";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidation),
  academicFacultyController.createAcademicFaculty
);

router.get(
  "/get-all-academic-faculty",
  academicSemesterController.getAllAcademicSemesterData
);

router.get(
  "/get-single-academic-faculty",
  academicSemesterController.getSingleAcademicSemesterData
);
router.patch(
  "/update-academic-faculty",
  validateRequest(academicFacultyValidation),
  academicSemesterController.updateAcademicSemester
);

export const academicFacultyRouters = router;
