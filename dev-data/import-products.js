import fs from "fs";

const products = JSON.parse(
  fs.readFileSync("../dev-data/products.json", "utf-8")
);
