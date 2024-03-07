import mongoose, { Schema } from "mongoose";
import { Cart_Item as iCartItem } from "./cart-item.entity";
import { ProductModel } from "../product/product.model";

const iCartItemSchema = new Schema<iCartItem>({
  id: String,
  product: ProductModel,
  quantity: Number,
});

export const CartItemModel = mongoose.model<iCartItem>(
  "Cart-Item",
  iCartItemSchema
);
