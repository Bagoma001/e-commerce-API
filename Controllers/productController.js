import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
  });
});
