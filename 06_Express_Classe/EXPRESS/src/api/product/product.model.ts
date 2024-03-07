import { Product } from "./product.entity";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<Product>({
  name: String,
  description: String,
  netPrice: Number,
  weight: Number,
  discount: Number,
});

productSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  },
});

export const ProductModel = mongoose.model<Product>("Product", productSchema);
//                                                  ^^^^^^^^^
// questo nome scritto in minuscolo e al 'plurale' è il nome della collection all'interno di Mongo
