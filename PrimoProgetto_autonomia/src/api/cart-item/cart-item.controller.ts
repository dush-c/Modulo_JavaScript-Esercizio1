import { NextFunction, Request, Response } from "express";
import cartItemSrv from "./cart-item.service";

export const cartDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const item = await cartItemSrv.getById(id);
  if (!item) {
    res.status(404);
    res.send("Item not found");
    return;
  }
  res.json(item);
};

export const cartList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search }: { search?: string } = req.query;
  const result = await cartItemSrv.find(search);
  res.json(result);
};
