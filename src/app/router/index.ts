import { Router } from "express";
import { studentRouters } from "../modules/student/student.route";
import { userRouters } from "../modules/user/user.route";
import { semesterRouters } from "../modules/academicSemester/academicSemester.router";
import { academicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRouters } from "../modules/academicDepartment/academicDepart.router";

const router = Router();
const moduleRoutes = [
  {
    path: "/students",
    route: studentRouters,
  },
  {
    path: "/users",
    route: userRouters,
  },
  {
    path: "/academic-semester",
    route: semesterRouters,
  },
  {
    path: "/academic-faculties",
    route: academicFacultyRouters,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRouters,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
