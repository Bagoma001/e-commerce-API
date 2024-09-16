import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/productRouter.js";

export const app = express();

dotenv.config({ path: "./config.env" });

app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: fail,
    message: `Unable to find ${req.originalUrl} on this server`,
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
});
