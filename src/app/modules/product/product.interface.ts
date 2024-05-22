import { Model } from "mongoose";

// Product Variant
export type TVariant = {
  type: string;
  value: string;
};

// Product Inventory
export type TInventory = {
  quantity: number;
  inStock: boolean;
};

// Product Blueprint
export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Array<string>;
  variants: Array<TVariant>;
  inventory: TInventory;
};

// Stattic method
export interface ProductModel extends Model<TProduct> {
  isProductExists(name: string): Promise<TProduct | null>;
}
