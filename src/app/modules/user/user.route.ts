import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createUser
);

export const userRouters = router;
