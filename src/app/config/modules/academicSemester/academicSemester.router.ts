import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";

const router = Router();

router.post(
  "/create-academic-semester",
  academicSemesterController.createAcademicSemester
);

const semesterRouters = router;
