import express from "express";
import {
  getFeaturedCategories,
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateSingleProduct,
  deleteSingleProduct,
} from "../Controllers/productController.js";

const router = express.Router();



router.get('/featured-categories', getFeaturedCategories, getAllProducts)
router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:productId")
  .get(getSingleProduct)
  .patch(updateSingleProduct)
  .delete(deleteSingleProduct);

  export default router;