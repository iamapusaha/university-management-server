import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartValidation } from "./academicDepartment.validation";
import { academicDepartController } from "./academicDepartment.controller";

const router = Router();
router.post(
  "/create-department",
  validateRequest(
    academicDepartValidation.createAcademicDepartmentValidationSchema
  ),
  academicDepartController.createAcademicDepartment
);

router.get("/", academicDepartController.getAcademicDepartment);

router.get(
  "/:departmentId",
  academicDepartController.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validateRequest(
    academicDepartValidation.UpdateAcademicDepartmentValidationSchema
  ),
  academicDepartController.updateAcademicDepartment
);

export const academicDepartmentRouters = router;

//this file only for academic department router
