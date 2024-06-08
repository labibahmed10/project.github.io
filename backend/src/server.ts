import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

async function connectServer() {
  try {
    await mongoose.connect(config.dbUrl as string);
    console.log("⚡ Database has connected successfully");

    app.listen(config.port, () => {
      console.log(`The port is connected to ${config.port} ⚓`);
    });
  } catch (error: unknown) {
    console.error(error);
  }
}

connectServer();
