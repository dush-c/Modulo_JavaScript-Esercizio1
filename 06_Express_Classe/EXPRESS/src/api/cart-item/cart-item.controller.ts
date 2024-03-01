import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from "./cart-item.service";
import { CartItem } from "./cart-item.identity";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const result = await cartItemService.list();
  res.json(result);
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;
  //   console.log(productId, quantity);
  //   console.log(req.body);

  const product = await productService.getById(productId);

  if (!product) {
    // console.log("not found");
    res.send(400);
    return;
  }

  const newItem: CartItem = {
    product: productId,
    quantity,
  };

  const saved = await cartItemService.add(newItem);

  res.send(saved);
};

export const updateQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, quantity } = req.body;
  const productExist = await productService.getById(productId);

  if (!productExist) {
    res.send(400);
    return;
  }
  //   console.log(productExist, quantity);
  const result = await cartItemService.updateQuantity(productExist, quantity);
  res.json(result);
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
