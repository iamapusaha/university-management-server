import { Router } from "express";
import { studentRouters } from "../config/modules/student/student.route";
import { userRouters } from "../config/modules/user/user.route";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
