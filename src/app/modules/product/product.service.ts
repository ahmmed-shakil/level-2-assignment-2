import { Product } from "../product.model";
import { TProduct } from "./product.interface";

// Creating a new product in the database
const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData?.name)) {
    throw new Error("Product already exists");
  }
  const result = await Product.create(productData);
  return result;
};
const getProductsFromDB = async (searchTerm: string | undefined) => {
  // If no search parameter is provided, retrieve all products
  if (!searchTerm) {
    return await Product.find();
  }

  // Regular expression to perform case-insensitive search
  const regex = new RegExp(searchTerm.trim(), "i");

  // Find products matching the search parameter in name, description or category fields
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  });

  if (!result?.length) {
    throw new Error("No product found");
  }

  return result;
};

// Find and return a product with ID
const getProductFromDBById = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

// Find product by ID and update
const updateProductAndSaveToDB = async (
  productId: string,
  productData: TProduct
) => {
  if (await Product.isProductExists(productData?.name)) {
    throw new Error("Product already exists");
  }
  const result = await Product.findOneAndUpdate(
    { _id: productId },
    productData,
    { new: true }
  );
  return result;
};

// Find and delete product with ID
const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findOneAndDelete({ _id: productId });
  if (result) {
    return null;
  } else {
    throw new Error("Product not found");
  }
};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDBById,
  updateProductAndSaveToDB,
  deleteProductFromDB,
};
