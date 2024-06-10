import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/router";
import notFound from "./app/middlewares/notFound";
import globalErrorHandlar from "./app/middlewares/globalErrorHandlar";
import { promise } from "zod";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

const test = (req: Request, res: Response) => {
  res.send("university server is running on the highway!");
};

app.get("/", test);
app.use(globalErrorHandlar);
//not found route
app.use(notFound);

export default app;
