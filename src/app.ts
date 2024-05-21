import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
import { orderRoutes } from "./app/modules/order/order.route";
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
