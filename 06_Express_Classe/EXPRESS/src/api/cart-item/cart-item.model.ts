import mongoose from "mongoose";
import { CartItem } from "./cart-item.entity";

const cartItemSchema = new mongoose.Schema<CartItem>({
  quantity: Number,
  product: { type: mongoose.Schema.Types.ObjectId },
});

cartItemSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  },
});

export const cartItemModel = mongoose.model<CartItem>(
  "CartItem",
  cartItemSchema
);
