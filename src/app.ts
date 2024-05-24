import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("university server is running!");
});

export default app;
