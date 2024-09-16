import express from "express";
import { getAllProducts } from "../Controllers/productController.js";

const router = express.Router();

export default router;

router.route("/").get(getAllProducts).post();
router.route("/:product").get().patch().delete();
