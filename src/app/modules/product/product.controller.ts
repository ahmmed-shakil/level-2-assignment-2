import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { product } = req.body;

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(product);

    const result = await productServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchParam } = req.query;
    const result = await productServices.getProductsFromDB(
      searchParam as string | undefined,
    );
    res.status(200).json({
      success: true,
      message: searchParam
        ? `Products matching search term '${searchParam}' fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductFromDBById(productId);

    // Send error response is product is not found
    if (!result) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const { product: productData } = req.body;

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await productServices.updateProductAndSaveToDB(
      productId,
      zodParsedData,
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
