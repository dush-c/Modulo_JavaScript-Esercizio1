import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser, { json } from "body-parser";
import fs from "fs";
import { Cart_Item } from "./api/cart-item/cart-item.entity";
const products = require("../products.json");
import { detail, list } from "./api/product/product.controller";
import { cartDetail, cartList } from "./api/cart-item/cart-item.controller";

let cart_items: Cart_Item[] = [];
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.json());

app.get("/index", (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.send("Hello World");
});

app.get("/product", list);

app.get("/product/:id", detail);

app.get("/cart-items", cartList);

app.get("/cart-items/:id", cartDetail);

app.post(
  "/cart-items/add/:id",
  (req: Request, res: Response, next: NextFunction) => {
    //con questa chiamata voglio andare ad inserire un oggetto nel mio carrello,
    //prendendolo però dalla lista di prodotti disponibili
    //prima di inserirlo però vado a controllare che non sia gia presente al suo interno
    let result = products.find((obj: Cart_Item) => {
      return obj.id === req.params.id;
    });
    //ora mi devo assicurare che l'oggetto che vado ad inserire non sia gia presente all'interno del mio carrello
    //se dovesse esserlo, vado ad aggiungere un nuovo parametro 'quantity'
    const existingItemIndex = cart_items.findIndex(
      (item) => item.id === req.params.id
    );
    //result contiene il prodotto corrispondente all'id
    if (result) {
      if (existingItemIndex !== -1) {
        cart_items[existingItemIndex].quantity += 1;
      } else {
        // Se il prodotto non è nel carrello, aggiungilo con quantità 1
        // const newItem: CartItem = { ...result, quantity: 1 };
        const newItem = { ...result, quantity: 1 };
        /*
      { ...result }: Questo utilizza lo spread operator (...)
       per copiare tutte le proprietà dell'oggetto result nell'oggetto nuovo.
        In altre parole, stai creando una copia di tutte le proprietà del prodotto.
      */
        cart_items.push(newItem);
      }
      fs.writeFileSync("./cart-items.json", JSON.stringify(cart_items), {
        encoding: "utf-8",
      });
      res.send({ result });
    } else {
      res.status(404).json({ error: "prodotto non trovato" });
    }
  }
);

app.delete(
  "/cart-items/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const indexToRemove = cart_items.findIndex(
      (item) => item.id === req.params.id
    );

    if (indexToRemove !== -1) {
      //se l'indice esiste devo andare ad eliminarlo
      const removedItem = cart_items.splice(indexToRemove, 1)[0];
      /**
       * Il metodo splice viene utilizzato per rimuovere elementi da un array.
       *  Nel tuo caso, indexToRemove è l'indice dell'elemento che vuoi rimuovere,
       *  e 1 indica quanti elementi rimuovere a partire da quell'indice.
       * Quindi, cart_items.splice(indexToRemove, 1) rimuove un singolo elemento
       *  dall'array cart_items all'indice specificato.
       */
      fs.writeFileSync("./cart-items.json", JSON.stringify(cart_items), {
        encoding: "utf-8",
      });

      res.json(removedItem); // Invia l'oggetto rimosso come risposta
    } else {
      res.status(404).json({ error: "Prodotto non trovato nel carrello" });
    }
  }
);

app.put(
  "/cart-items/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const quantity = req.body;
    console.log(id, quantity);
    //controllo che l'id inserito sia presente nel mio carrello
    const indexToUpdate = cart_items.findIndex((item) => item.id === id);

    if (indexToUpdate !== -1) {
      //se l'indice esiste aggiorno la quantità
      cart_items[indexToUpdate].quantity = quantity;
      fs.writeFileSync("./cart-items.json", JSON.stringify(cart_items), {
        encoding: "utf-8",
      });

      res.json(cart_items[indexToUpdate]);
    } else {
      res.status(404).json({ error: "Prodotto non trovato nel carrello" });
    }
    // res.send(res);
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
