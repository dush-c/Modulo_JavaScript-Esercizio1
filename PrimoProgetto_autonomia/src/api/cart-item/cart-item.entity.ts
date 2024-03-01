import { Product } from "../product/product.entity";

export interface Cart_Item {
  id?: string;
  quantity: number;
  product: string | Product;
}
