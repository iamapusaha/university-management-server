import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("university server is running!");
});
app.listen(port, () => {
  console.log(`Example app listing on port ${port}`);
});
