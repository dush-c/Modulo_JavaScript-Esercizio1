import cart_items from "../../../cart-items.json";
import { Cart_Item } from "./cart-item.entity";

export class CartItemService {
  async getById(id: string): Promise<Cart_Item | undefined> {
    //torna un singolo elemento del carrello

    return cart_items.find((item) => {
      return item.id === id;
    });
  }
  async find(search?: string): Promise<Cart_Item[]> {
    let result = cart_items;

    if (search) {
      result = cart_items.filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });
    }
    return result;
  }
}

export default new CartItemService();
