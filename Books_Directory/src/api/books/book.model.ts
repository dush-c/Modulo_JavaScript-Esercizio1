import mongoose, { mongo } from "mongoose";
import { Book } from "./book.entity";

const bookSchema = new mongoose.Schema<Book>({
  id: String,
  title: String,
  netPrice: Number,
  totalPages: Number,
  description: String,
});

bookSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const BookModel = mongoose.model<Book>("Book", bookSchema);
