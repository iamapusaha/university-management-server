import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listing on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
process.on("unhandledRejection", () => {
  console.log("🥵 unhandleRejection is detected,shutting down!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});
