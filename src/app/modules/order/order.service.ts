import { Order } from "../order.model";
import { TOrder } from "./order.interface";

// Create a new order
const createOrder = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

// Retrieve orders
const retreiveOrders = async (email: string | undefined) => {
  // If email is not provided, return all orders
  if (!email) {
    return await Order.find();
  }

  // Filter products with email
  const result = await Order.find({ email });
  return result;
};

export const orderServices = {
  createOrder,
  retreiveOrders,
};
