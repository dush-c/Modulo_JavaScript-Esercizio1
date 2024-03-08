import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from "./cart-item.service";
import { CartItem } from "./cart-item.entity";
import { NotFoundError } from "../../errors/not-found";
export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await cartItemService.list();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;
    //   console.log(productId, quantity);
    //   console.log(req.body);

    const product = await productService.getById(productId);

    if (!product) {
      // console.log("not found");
      throw new NotFoundError();
    }

    const newItem: CartItem = {
      product: productId,
      quantity,
    };

    const saved = await cartItemService.add(newItem);

    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    const updated = await cartItemService.update(id, { quantity });
  } catch (err) {
    next(err);
  }
};

// export const remove = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};
