import { Product } from "../product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};
const getProductsFromDB = async (searchParam: string | undefined) => {
  if (!searchParam) {
    return await Product.find();
  }
  const regex = new RegExp(searchParam.trim(), "i");

  const result = await Product.find({
    $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
  });

  return result;
};

const getProductFromDBById = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

const updateProductAndSaveToDB = async (
  productId: string,
  productData: TProduct
) => {
  const result = await Product.findOneAndUpdate(
    { _id: productId },
    productData
  );
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDBById,
  updateProductAndSaveToDB,
  deleteProductFromDB,
};
