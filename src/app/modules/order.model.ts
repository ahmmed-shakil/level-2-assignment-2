import { Schema, model } from "mongoose";
import { TOrder } from "./order/order.interface";
import { Product } from "./product.model";
// Define the schema for orders
const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required to create order"],
  },
  productId: {
    type: String,
    required: [true, "Product Id is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

// Pre save hook to check inventory before creating order
orderSchema.pre("save", async function (next) {
  try {
    const product = await Product.findById({ _id: this.productId });

    // Check if the product exists
    if (!product) {
      return next(new Error("Product not found"));
    }

    // Check if there is sufficient inventory
    if (product.inventory.quantity < this.quantity) {
      return next(new Error("Insufficient quantity available in inventory"));
    }

    next();
  } catch (error: unknown) {
    next(error as { message: string; name: string });
  }
});

// Post-save hook to update inventory
orderSchema.post("save", async function (order) {
  try {
    const product = await Product.findById(order.productId);

    // Check if the product exists
    if (!product) {
      throw new Error("Product not found!");
    }

    const decrementQuantity = -order.quantity;

    // Calculate new quantity
    const newQuantity = product.inventory.quantity + decrementQuantity;
    const inStock = newQuantity > 0;

    // Update the product inventory quantity and instock status using $inc
    await Product.findByIdAndUpdate(order.productId, {
      $inc: { "inventory.quantity": decrementQuantity },
      $set: { "inventory.inStock": inStock },
    });
  } catch (error) {
    throw new Error("Failed to update inventory");
  }
});

export const Order = model<TOrder>("Order", orderSchema);
