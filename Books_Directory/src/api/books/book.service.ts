import { Book } from "./book.entity";
import { BookModel } from "./book.model";

export class BookService {
  async find(query: any): Promise<Book[]> {
    const q: any = {};

    console.log(query.title);
    if (query.title) {
      q.title = { $regex: new RegExp(`${query.title}`, "i") };
    }
    // ^ prima di ${query.title} significa che il name deve essere all'inizio della stringa del nome
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      q.netPrice = {};
    }

    if (query.minPrice) {
      q.netPrice["$gte"] = query.minPrice;
      //        ^^^^^^^
      // greater then equals
    }
    if (query.maxPrice) {
      q.netPrice["$lte"] = query.maxPrice;
      //        ^^^^^^^^
      //lower then equals
    }

    const result = await BookModel.find(q);
    return result;
  }

  async getById(id: any) {
    const result = await BookModel.findById(id);
    return result;
  }
}

export default new BookService();
