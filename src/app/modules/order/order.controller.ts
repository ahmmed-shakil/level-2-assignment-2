import { NextFunction, Request, Response } from "express";
import { orderServices } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order } = req.body;
    const result = await orderServices.createOrder(order);
    res.status(200).json({
      success: "true",
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const retrieveOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;
    const result = await orderServices.retreiveOrders(
      email as string | undefined
    );
    res.status(200).json({
      success: "true",
      message: email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderControllers = {
  createOrder,
  retrieveOrders,
};
