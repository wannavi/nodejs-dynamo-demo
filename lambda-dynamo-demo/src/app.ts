import "dotenv/config";

import express from "express";
import morgan from "morgan";
import HelloRoute from "./routes/HelloRoute";
import ErrorHandler from "./handlers/ErrorHandler";

const env = process.env.NODE_ENV || "development";
const app = express();

if (env === "production") app.use(morgan("combined"));
else if (env === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", new HelloRoute().router);
app.use(new ErrorHandler().router);

export default app;
