import express from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();

router.get("/", studentController.getStudentData);
router.get("/:studentId", studentController.getSingleStudentData);
router.delete("/:studentId", studentController.deleteSingleStudentData);
router.patch(
  "/:studentId",
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateStudentData
);

export const studentRouters = router;
