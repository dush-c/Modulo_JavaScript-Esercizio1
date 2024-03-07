import mongoose from "mongoose";

export interface CartItem {
  id?: string;
  quantity: number;
  product: string | mongoose.Types.ObjectId;
}
