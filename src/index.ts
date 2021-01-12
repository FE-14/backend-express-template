import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import App from "./app";
import dotEnv from "dotenv";
import modelInit from "./models";
import controllers from "./controllers";
import updateProto from "./utils/getProto";
import { ServerCredentials } from "@grpc/grpc-js";

dotEnv.config();

const { app, grpcServer, protoServices } = new App({
  controllers: controllers,
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(),
    morgan("combined")
    // middleware baru
  ],
  actions: [modelInit]
});

const PORT = +(process.env.PORT || 4000);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[LISTEN] 🚀🚀🚀  starting http://localhost:${PORT}/api/v1`);
  updateProto();
});

grpcServer.bindAsync(
  `0.0.0.0:${PORT + 1}`,
  ServerCredentials.createInsecure(),
  () => {
    grpcServer.start();
    console.log(`[LISTEN] 🚀🚀🚀 grpc localhost:${PORT + 1}`);
  }
);

/**
 * add export to run in test
 */
export { grpcServer, protoServices };
export default app;
