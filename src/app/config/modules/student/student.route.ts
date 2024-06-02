import express from "express";
import { studentController } from "./student.controller";
const router = express.Router();

router.get("/", studentController.getStudentData);
router.get("/:studentId", studentController.getSingleStudentData);
router.delete("/:studentId", studentController.deleteSingleStudentData);

export const studentRouters = router;
