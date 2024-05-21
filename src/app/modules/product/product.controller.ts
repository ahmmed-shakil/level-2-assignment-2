import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body;
    const result = await productServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchParam } = req.query;
    const result = await productServices.getProductsFromDB(
      searchParam as string | undefined
    );
    res.status(200).json({
      success: true,
      message: searchParam
        ? `Products matching search term '${searchParam}' fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductFromDBById(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const { product: productData } = req.body;
    const result = await productServices.updateProductAndSaveToDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    if (result?.deletedCount) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
