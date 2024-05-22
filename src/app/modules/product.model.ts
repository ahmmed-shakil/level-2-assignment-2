import mongoose, { Schema, model } from "mongoose";
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from "./product/product.interface";

// Define the schema for product variants
const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, "Product variant type is required"],
  },
  value: {
    type: String,
    required: [true, "Product variant value is required"],
  },
});

// Define the schema for product inventory
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "Product inventory quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Product stock information is required"],
    default: true,
  },
});

// Define the schema for products
const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: [true, "Product Name is required"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minlength: [10, "Product description should have at least 10 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Product category is required"],
  },
  tags: {
    type: [String],
    required: [true, "Product tags are missing"],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Product variant is required"],
    _id: false,
  },
  inventory: {
    type: inventorySchema,
    required: [true, "Product inventory is required"],
    _id: false,
  },
});

// Custom static method to check if product already exists
productSchema.statics.isProductExists = async function (name: string) {
  const existingProduct = await Product.findOne({ name: name?.trim() });
  return existingProduct;
};

productSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const queryConditions = this.getQuery();
    const docToUpdate = await mongoose
      .model("Product")
      .findOne(queryConditions);

    if (!docToUpdate) {
      return next(new Error("Document does not exist"));
    }

    next();
  } catch (error: unknown) {
    next(error as { message: string; name: string });
  }
});

export const Product = model<TProduct>("Product", productSchema);
