import { Product } from "../product/product.entity";
import productService from "../product/product.service";
import { CartItem } from "./cart-item.identity";

const Cart: CartItem[] = [];

export class CartItemService {
  async list() {
    const promise = Cart.map((item) => {
      return productService.getById(item.product).then((product) => {
        return {
          ...item,
          product,
        };
      });
    });

    return Promise.all(promise);
  }

  async add(item: CartItem) {
    const existing = Cart.find((element) => element.product === item.product);

    if (existing) {
      existing.quantity += item.quantity;
      return existing;
    }

    const toAdd = {
      id: `${Cart.length}`,
      ...item,
    };
    Cart.push(toAdd);
    // console.log(toAdd);

    return this.getById(toAdd.id);
  }
  async find(search?: string) {
    let result = Cart;
    if (search) {
      result = Cart.filter((item) => {
        return item.id
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });
    }
    return result;
  }
  async updateQuantity(product: Product, quantity) {
    // console.log(Cart.findIndex((item) => item.product === product.id));
    const indexToUpdate = Cart.findIndex((item) => item.product === product.id);
    Cart[indexToUpdate].quantity = quantity;

    const result = await productService.getById(Cart[indexToUpdate].product);

    return { ...Cart[indexToUpdate], product };
  }

  async getById(id: string) {
    const item = Cart.find((element) => element.id === id);
    if (!item) {
      return null;
    }
    const product = await productService.getById(item.product);
    return {
      ...item,
      product,
    };
  }
}
export default new CartItemService();
