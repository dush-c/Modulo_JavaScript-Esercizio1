import mongoose, { ObjectId } from "mongoose";
import { Product } from "../product/product.entity";
import productService from "../product/product.service";
import { CartItem } from "./cart-item.entity";
import { cartItemModel } from "./cart-item.model";

export class CartItemService {
  // async add(item: string) {
  //   const newCartItem = new cartItemModel({ quantity: 1, product: item });
  //   await newCartItem.save();
  //   const existing = Cart.find((element) => element.product === item.product);
  //   if (existing) {
  //     existing.quantity += item.quantity;
  //     return existing;
  //   }
  //   const toAdd = {
  //     id: `${Cart.length}`,
  //     ...item,
  //   };
  //   Cart.push(toAdd);
  //   // console.log(toAdd);
  //   return this.getById(toAdd.id);
  // }
  async find(query?: any) {
    const q: any = {};
    if (query.name) {
      q.name = { $regex: new RegExp(`${query.name}`, "i") };
    }
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      q.netPrice = {};
    }

    if (query.minPrice) {
      q.netPrice["$gte"] = query.minPrice;
    }
    if (query.maxPrice) {
      q.netPrice["$lte"] = query.maxPrice;
    }

    const results = await cartItemModel.find(q);
    return results;
  }
  // async updateQuantity(product: Product, quantity) {
  //   // console.log(Cart.findIndex((item) => item.product === product.id));
  //   const indexToUpdate = Cart.findIndex((item) => item.product === product.id);
  //   Cart[indexToUpdate].quantity = quantity;

  //   const result = await productService.getById(Cart[indexToUpdate].product);

  //   return { ...Cart[indexToUpdate], product };
  // }

  // async getById(id: string) {
  //   const item = Cart.find((element) => element.id === id);
  //   if (!item) {
  //     return null;
  //   }
  //   const product = await productService.getById(item.product);
  //   return {
  //     ...item,
  //     product,
  //   };
  // }
}
export default new CartItemService();
