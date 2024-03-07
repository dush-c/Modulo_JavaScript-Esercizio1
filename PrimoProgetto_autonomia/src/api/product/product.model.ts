import mongoose, { Schema } from "mongoose";
import { Product as iProduct } from "./product.entity";

const iProductSchema = new Schema<iProduct>({
  id: String,
  name: String,
  description: String,
  netPrice: Number,
  weight: Number,
  discount: Number,
});

export const ProductModel = mongoose.model<iProduct>("Product", iProductSchema);
