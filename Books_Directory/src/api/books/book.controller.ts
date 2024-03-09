import { NextFunction, Request, Response } from "express";
import bookService from "./book.service";
import { NotFoundError } from "../../errors/not-found";
export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await bookService.find(req.query);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const detail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const item = await bookService.getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};
