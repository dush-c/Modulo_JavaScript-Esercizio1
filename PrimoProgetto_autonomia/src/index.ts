// const http = require('http');
// const express = require('express');
import express, { Request, Response, NextFunction, response } from "express";
// const cors = require('cors');
import cors from "cors";
// const morgan = require('morgan');
import morgan from "morgan";
import bodyParser, { json } from "body-parser";
import { fakerIT as faker } from "@faker-js/faker";
// import { writeFileSync, readFileSync } from 'fs';
import fs from "fs";

function generateRaondomProduct() {
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    netPrice: parseFloat(faker.commerce.price()),
    weight: faker.number.int({ min: 50, max: 20000 }),
    discount: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
  };
}

function generateProducts(num: number) {
  const data = Array.from({ length: num }, () => generateRaondomProduct());
  fs.writeFileSync("./products.json", JSON.stringify(data), {
    encoding: "utf-8",
  });
}
// const tmp = generateRaondomProduct();
// generateProducts(10);

const products = require("../products.json");
// let cart_items = require("../cart-items.json");
let cart_items = [{}];
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

// let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.get("/main.html", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

// app.post("/cart-items", urlencodedParser, function (req, res) {
//   // Prepare output in JSON format
//   let response = {
//     id: req.body.id,
//     name: req.body.name,
//     description: req.body.description,
//     netPrice: req.body.netPrice,
//     weight: req.body.weight,
//     discount: req.body.discount,
//   };
//   //così vado ad aggiungere un nuovo elemento creandolo da 0, voglio fare in modo di
//   //poterlo scegliere dalla lista di item all'interno del mio "database"
//   cart_items.push(response);
//   fs.writeFileSync("./cart-items.json", JSON.stringify(response), {
//     encoding: "utf-8",
//   });
//   res.end(JSON.stringify(response));
// });

app.get("/index", (req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.send("Hello World");
});

app.get("/product", (req, res, next) => {
  //questa chiamata restituisce la lista di tutti i prodotti
  res.json(products);
});

app.get("/product/:id", (req, res, next) => {
  //questa chiamata deve restituire solamente il prodotto con quel determinato id
  const result = products.find((obj: any) => {
    return obj.id === req.params.id;
  });
  res.json(result);
});

app.post("/cart-items/add/:id", (req, res) => {
  //con questa chiamata voglio andare ad inserire un oggetto nel mio carrello,
  //prendendolo però dalla lista di prodotti disponibili

  //prima di inserire devo andare a controllare se il prodotto che voglio inserire
  //non sia già presente.
  //se è presente vado a modificarne la quantità
  //altrimenti lo inserisco normalmente
  let result = products.find((obj: any) => {
    return obj.id === req.params.id;
  });
  console.log(result);
  console.log(cart_items);
  //result contiene il prodotto corrispondente all'id
  cart_items.push(result);
  fs.writeFileSync("./cart-items.json", JSON.stringify(response), {
    encoding: "utf-8",
  });
  res.end(JSON.stringify(result));
});

app.get("/cart-items", (req, res, next) => {
  //questa chiamata restituisce la lista degli elementi che abbiamo inserito nel carrello
  res.json(cart_items);
});

app.get("/cart-items/:id", (req, res, next) => {
  //torna un singolo elemento del carrello
  const result = cart_items.find((obj: any) => {
    return obj.id === req.params.id;
  });
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
