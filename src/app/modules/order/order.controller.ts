import { NextFunction, Request, Response } from "express";
import { orderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order } = req.body;

    // data validation using zod
    const zodParsedData = orderValidationSchema.parse(order);
    const result = await orderServices.createOrder(zodParsedData);
    res.status(200).json({
      success: "true",
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const retrieveOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.query;
    const result = await orderServices.retreiveOrders(
      email as string | undefined,
    );
    if (!result?.length) {
      throw new Error("Order not found");
    }
    res.status(200).json({
      success: "true",
      message: email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderControllers = {
  createOrder,
  retrieveOrders,
};
