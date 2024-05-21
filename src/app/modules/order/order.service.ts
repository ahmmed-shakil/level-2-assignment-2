import { Order } from "../order.model";
import { TOrder } from "./order.interface";

const createOrder = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const retreiveOrders = async (email: string | undefined) => {
  if (!email) {
    return await Order.find();
  }

  const result = await Order.find({ email });
  return result;
};

export const orderServices = {
  createOrder,
  retreiveOrders,
};
