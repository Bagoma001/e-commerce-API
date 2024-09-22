import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import productRouter from "./routes/productRouter.js";
import AppError from "./util/AppError.js";

export const app = express();

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  const message = `Unable to find ${req.originalUrl} on this server`;

  return next(AppError(message, 404));
});

app.use((err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.status = err.status || "error");

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
});
