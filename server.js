import mongoose from "mongoose";
import { app } from "./app.js";

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
});

const server = app.listen(port, () => {
  console.log("server is live");
});
