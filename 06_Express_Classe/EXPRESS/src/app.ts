import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import PRODUCTS from "../product.json";
import { detail, list } from "./api/product/product.controller";
import {
  list as cartitemlist,
  add,
  updateQuantity,
} from "./api/cart-item/cart-item.controller";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app._router.use(morgan("tiny"));
app.use(bodyParser.json());

app.get("/product", list);

app.get("/product", detail);

app.post("/cart-item", add);

app.get("/cart-item", cartitemlist);

//TODO: mettere la scelta dell'id del prodotto all'interno del url non come body
//app.patch("/cart-item/:id", updateQuantity)
app.patch("/cart-item", updateQuantity);

interface CartItem {
  name: String;
  netPrice: Number;
  weight: Number;
  discount: Number;
  quantity: Number;
}

const cart: CartItem[] = [
  {
    name: "ssd",
    netPrice: 95,
    weight: 100,
    discount: 5,
    quantity: 2,
  },
  {
    name: "motherboard",
    netPrice: 270,
    weight: 900,
    discount: 0,
    quantity: 1,
  },
  {
    name: "ram",
    netPrice: 120,
    weight: 60,
    discount: 10,
    quantity: 2,
  },
  {
    name: "processor",
    netPrice: 400,
    weight: 130,
    discount: 0,
    quantity: 1,
  },
  {
    name: "power supply",
    netPrice: 130,
    weight: 1400,
    discount: 15,
    quantity: 1,
  },
  {
    name: "cpu cooler",
    netPrice: 170,
    weight: 1000,
    discount: 23,
    quantity: 1,
  },
  {
    name: "gpu",
    netPrice: 1600,
    weight: 2500,
    discount: 0,
    quantity: 1,
  },
  {
    name: "case",
    netPrice: 130,
    weight: 3500,
    discount: 30,
    quantity: 1,
  },
];

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log("my middleware");
  //res.send("non puoi accedere");

  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log("second middlewARE");

  next();
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.send("hello world");
});

app.get("/ciao", (req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.send("hello world ciao ");
});

app.post("/ciao", (req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.send("post ciao ");
});

app.get("/products", list);

app.get("/products/:id", detail);

app.get("/cart-items", (req: Request, res: Response) => {
  console.log("handler");
  res.json(cart);
});

export default app;
