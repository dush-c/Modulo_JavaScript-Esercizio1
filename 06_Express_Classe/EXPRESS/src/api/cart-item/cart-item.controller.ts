import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from "./cart-item.service";
import { CartItem } from "./cart-item.entity";
import mongoose from "mongoose";
import { cartItemModel } from "./cart-item.model";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const result = await cartItemService.find(req.query);
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

  const exist = await cartItemService.exist(productId);

  if (!exist) {
    console.log("ciao");

    const newItemdata = {
      quantity,
      product: productId,
    };

    const newItem = cartItemModel.create(newItemdata);
    res.json(newItem);
  }
  res.send(400);
  return;
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
  const filter = { product: productId };
  const update = { quantity };
  const result = await cartItemModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  // const result = await cartItemService.updateQuantity(productExist, quantity);
  res.json(result);
};

// export const remove = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};
