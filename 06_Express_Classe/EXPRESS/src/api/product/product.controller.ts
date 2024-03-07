import { NextFunction, Request, Response } from "express";
import productSrv from "./product.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  //   const { search }: { search?: string } = req.query;
  const result = await productSrv.find(req.query);
  res.json(result);
};

export const detail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(req.params);
  const { id } = req.params;
  const item = await productSrv.getById(id);
  if (!item) {
    res.status(404);
    res.send("product not found");
    return;
  }
  res.json({});
};
