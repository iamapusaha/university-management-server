import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("university server is running on the highway!");
});

export default app;
