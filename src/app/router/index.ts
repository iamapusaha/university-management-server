import { Router } from "express";
import { studentRouters } from "../modules/student/student.route";
import { userRouters } from "../modules/user/user.route";
import { semesterRouters } from "../modules/academicSemester/academicSemester.router";
import { academicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
