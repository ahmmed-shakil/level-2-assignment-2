import { Schema, model } from "mongoose";
import { TOrder } from "./order/order.interface";

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

export const Order = model<TOrder>("Order", orderSchema);
