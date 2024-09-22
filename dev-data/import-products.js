import fs from "fs";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Product from "../model/productModel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful"));

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);


const createProducts = asyncHandler(async () => {
  await Product.create(products);
  console.log("Data loaded successfully");

  process.exit();
});

const deleteData = asyncHandler(async () => {
  await Product.deleteMany();
  console.log("Data successfully deleted!");

  process.exit();
});
if (process.argv[2] === "--import") {
  createProducts();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
