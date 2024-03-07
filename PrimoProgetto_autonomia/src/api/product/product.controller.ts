import { NextFunction, Request, Response } from "express";
import products from "../../../products.json";
import productSrv from "./product.service";
import { ProductModel } from "./product.model";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { search }: { search?: string } = req.query;
  console.log(search);
  const result = await productSrv.find(search);

  res.json(result);
};

export const detail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //questa chiamata deve restituire solamente il prodotto con quel determinato id
  const { id } = req.params;
  const item = await productSrv.getById(id);
  if (!item) {
    res.status(404);
    res.send("Product not found");
    return;
  }
  res.json(item);
};
