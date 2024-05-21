import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product/product.interface";

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

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [50, "Product description should have at least 50 characters"],
      maxlength: [
        300,
        "Product description can not be more than 300 characters",
      ],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Product category is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    tags: {
      type: [String],
      required: [true, "Product tags are missing"],
    },
    variants: {
      type: [variantSchema],
      required: [true, "Product variant is required"],
    },
    inventory: {
      type: inventorySchema,
      required: [true, "Product inventory is required"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<TProduct>("Product", productSchema);
