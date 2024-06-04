import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { academicValidate } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(academicValidate.createAcademicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester
);

export const semesterRouters = router;
