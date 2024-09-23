import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import ApiFeatures from "../util/ApiFeatures.js";
import AppError from "../util/AppError.js";

export const getFeaturedCategories = (req, res, next) => {
  req.query = {
    featured: {
      $in: [
        "sofas",
        "Bathroom Vanities",
        "bedroom",
        "office chairs",
        "living room set",
        "dining tables",
      ],
    },
  };
  req.query.fields = "imageCover,category";

  next();
};

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const query = ApiFeatures(Product.find(), req.query);

  const products = await query;

  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    return next(AppError("This product does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Product found successfully",
    data: {
      product,
    },
  });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const product = req.body;

  const newProduct = await Product.create(product);

  if (!newProduct) {
    return next(
      AppError("Something went wrong, Unable to create product", 500)
    );
  }

  res.status(201).json({
    status: "success",
    message: "Product has been created successfully",
    data: {
      newProduct,
    },
  });
});

export const updateSingleProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(AppError("An error occurred", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Product has been updated successfully",
    data: {
      product,
    },
  });
});

export const deleteSingleProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  res.status(204).json({
    status: "success",
    message: "Product has been deleted successfully",
    data: null,
  });
});
