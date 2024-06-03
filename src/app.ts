import express, { Application, Request, Response } from "express";
import cors from "cors";
import { studentRouters } from "./app/config/modules/student/student.route";
import { userRouters } from "./app/config/modules/user/user.route";
import globalErrorHandlar from "./app/middlewares/globalErrorHandlar";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/v1/students", studentRouters);
app.use("/api/v1/users", userRouters);

//not found route
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("university server is running on the highway!");
});

app.use(globalErrorHandlar);

export default app;
