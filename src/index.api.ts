import * as dotenv from "dotenv";
dotenv.config();
import { Roarr } from "roarr";
import { startExpressApp } from "./express/app";
import { connectMongoDB } from "./model";

const PORT = parseInt(process.env.PORT) || 4000;

const logger = Roarr.child({ package: "api" });

connectMongoDB();
startExpressApp({ port: PORT });

process.on("unhandledRejection", error => {
  throw error;
});

const handleSignalWithExit = (code: any): never => {
  logger.info(`Received signal: ${code}, exiting...`);
  process.exit(code);
};

process.on("SIGTERM", handleSignalWithExit);
