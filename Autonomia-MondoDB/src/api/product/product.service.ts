import products from "../../../products.json";
import { Product } from "./product.entity";

export class ProductService {
  async find(search?: string): Promise<Product[]> {
    let result = products;

    if (search) {
      result = products.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    return result;
  }

  async getById(id: string): Promise<Product | undefined> {
    return products.find((item) => {
      return item.id === id;
    });
  }
}

export default new ProductService();
