import mongoose from "mongoose";
import { Product } from "../product/product.entity";

export interface CartItem {
  id?: string;
  quantity: number;
  product: string | Product;
}
