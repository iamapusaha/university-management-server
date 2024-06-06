import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/router";
import notFound from "./app/middlewares/notFound";
import globalErrorHandlar from "./app/middlewares/globalErrorHandlar";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

//not found route
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("university server is running on the highway!");
});

app.use(globalErrorHandlar);

export default app;
