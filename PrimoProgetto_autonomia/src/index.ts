// const http = require('http');
// const express = require('express');
import express, { Request, Response, NextFunction } from "express";
// const cors = require('cors');
import cors from "cors";
// const morgan = require('morgan');
import morgan from "morgan";
import bodyParser, { json } from "body-parser";
// import { writeFileSync, readFileSync } from 'fs';
import fs from "fs";

const products = require("../products.json");
import { detail, list } from "./api/product/product.controller";

// let cart_items = require("../cart-items.json");
interface CartItem {
  id: string;
  name: string;
  description: string;
  netPrice: number;
  weight: number;
  discount: number;
  quantity: number;
}
let cart_items: CartItem[] = [];
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.json());

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("primo middleware");
//   // res.send("errore");
//   next();
// });

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("secondo middleware");

//   next();
// });

// let urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(express.static("public"));
// app.get("/main.html", function (req, res) {
//   res.sendFile(__dirname + "/" + "index.html");
// });

app.get("/index", (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.send("Hello World");
});

app.get("/product", list);

app.get("/product/:id", detail);

app.post(
  "/cart-items/add/:id",
  (req: Request, res: Response, next: NextFunction) => {
    //con questa chiamata voglio andare ad inserire un oggetto nel mio carrello,
    //prendendolo però dalla lista di prodotti disponibili
    //prima di inserirlo però vado a controllare che non sia gia presente al suo interno
    let result = products.find((obj: CartItem) => {
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

app.get("/cart-items", (req: Request, res: Response, next: NextFunction) => {
  //questa chiamata restituisce la lista degli elementi che abbiamo inserito nel carrello
  res.json(cart_items);
});

app.get(
  "/cart-items/:id",
  (req: Request, res: Response, next: NextFunction) => {
    //torna un singolo elemento del carrello
    const result = cart_items.find((obj: CartItem) => {
      return obj.id === req.params.id;
    });
    res.json(result);
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

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("/cart-items")
//     .then((response) => response.json)
//     .then((data) => {
//       populateCartItems(data);
//     })
//     .catch((error) => {
//       console.error("error fetching cart items data: ", error);
//     });
// });

// function populateCartItems(products) {
//   const productList = document.getElementById("cart-items-list");
//   if (productList) {
//     productList.innerHTML = "";
//     products.forEach((product) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `${product.name} - ${product.description}`;
//       productList.appendChild(listItem);
//     });
//   } else {
//     console.error("the cart is empty");
//   }
// }

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
