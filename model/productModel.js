import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "A product must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    discount: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    category: String,
    slug: String,
    imageCover: {
      type: String,
      // required: [true, "A product must have a cover image"],
    },
    images: {
      type: [String],
      // required: [true, "A product must have images"],
    },
    quantity: Number,
    productInformation: [
      {
        type: {
          type: String,
        },
        Brand: String,
        color: String,
        size: String,
        style: String,
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual("discountPrice").get(function () {
  return this.price - this.price * (this.discount / 100);
});

productSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

const Product = mongoose.model("Product", productSchema);

export default Product;
