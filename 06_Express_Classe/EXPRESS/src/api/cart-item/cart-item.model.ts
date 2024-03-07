import mongoose from "mongoose";
import { CartItem } from "./cart-item.entity";
import { ProductModel } from "../product/product.model";

const cartItemSchema = new mongoose.Schema<CartItem>({
  quantity: Number,
  product: { type: mongoose.Schema.Types.ObjectId },
});

export const cartItemModel = mongoose.model<CartItem>(
  "CartItem",
  cartItemSchema
);
