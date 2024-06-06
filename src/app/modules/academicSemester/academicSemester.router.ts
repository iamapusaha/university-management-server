import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";

import { academicValidate } from "./academicSemester.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(academicValidate.createAcademicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester
);
router.get(
  "/get-all-data",
  academicSemesterController.getAllAcademicSemesterData
);
router.get(
  "/get-single-data/:semesterId",
  academicSemesterController.getSingleAcademicSemesterData
);
router.patch(
  "/update-semester/:semesterId",
  validateRequest(academicValidate.updateAcademicSemesterValidationSchema),
  academicSemesterController.updateAcademicSemester
);

export const semesterRouters = router;
