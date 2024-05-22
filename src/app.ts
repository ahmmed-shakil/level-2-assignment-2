import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
import { orderRoutes } from "./app/modules/order/order.route";
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Not found route handling
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export interface CustomError {
  message?: string;
  name?: string;
  issues?: {
    message: string;
    path: string[];
  }[];
}

// Error handling middleware
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const errorMessage = err.message || "Something went wrong!";
  res.status(500).json({
    success: false,
    message:
      err?.name === "ZodError"
        ? `Validation Error: ${err?.issues?.map((issue: { message: string; path: string[] }) => (issue?.message === "Required" ? `${issue?.path} ${issue?.message}` : issue.message)).join(", ")}`
        : errorMessage,
  });
  next();
});
export default app;
