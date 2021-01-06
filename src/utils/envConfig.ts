import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: +(process.env.PORT || 3000),
  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "laniuslab",
  DB_HOST: process.env.DB_HOST || "192.168.1.50",
  DB_PORT: +(process.env.DB_PORT || 5432),
  DB_NAME: process.env.DB_NAME || "dummy",
  DB_DIALECT: process.env.DB_DIALECT ? "postgres" : "postgres",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "8h",
  JWT_SECRET: process.env.JWT_SECRET || "akucintalanius",
  // mongo
  MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || "mongo",
  MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || "laniuslab",
  MONGO_DB_HOST: process.env.MONGO_DB_HOST || "192.168.1.50",
  MONGO_DB_PORT: process.env.MONGO_DB_PORT || "27017",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "dryblend",
  MONGO_DB_ENABLE: process.env.MONGO_DB_ENABLE || "false",
  // gRPC
  STATIC_URL: process.env.STATIC_URL || "http://localhost:4000/proto/default.proto",
  PROTO_PATH: process.env.PROTO_PATH || "protos",
  GRPC_SERVER: process.env.GRPC_SERVER || "localhost:4001"
};
