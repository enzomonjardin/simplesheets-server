import mongoose from "mongoose";
import { Roarr } from "roarr";

const logger = Roarr.child({ package: "mongo" });

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://mongo:27017";

export const connectMongoDB = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      logger.info(`Connected to mongodb`);
    })
    .catch(error => {
      logger.error(`Failed to connect to mongodb: ${error.message}`);
    });
};
