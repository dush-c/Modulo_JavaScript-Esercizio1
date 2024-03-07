import { Product } from "./product.entity";
import { ProductModel } from "./product.model";

export class ProductService {
  async find(query: any): Promise<Product[]> {
    const q: any = {};

    if (query.name) {
      q.name = { $regex: new RegExp(`${query.name}`, "i") };
    }
    // ^ prima di ${query.name} significa che il name deve essere all'inizio della stringa del nome

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

    const results = await ProductModel.find(q);
    return results;
  }

  async getById(id: string): Promise<Product | null> {
    return ProductModel.findById(id);
  }
}

export default new ProductService();
