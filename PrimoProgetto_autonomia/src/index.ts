// const http = require('http');
// const express = require('express');
import express, {Request, Response, NextFunction} from 'express';
// const cors = require('cors');
import cors from 'cors';
// const morgan = require('morgan');
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { fakerIT as faker } from '@faker-js/faker';
import { writeFileSync, readFileSync } from 'fs';

function generateRaondomProduct(){
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        netPrice: parseFloat(faker.commerce.price()),
        weight: faker.number.int({min: 50, max: 20000}),
        discount: faker.number.float({min:0, max: 1, precision:0.01})
    }
}

function generateProducts(num: number){
    const data = Array.from({length: num}, () => generateRaondomProduct());
    writeFileSync('./products.json', JSON.stringify(data), {encoding: 'utf-8'});
}
// const tmp = generateRaondomProduct();
// generateProducts(10);

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/index', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send('Hello World');
});

app.get('/product', (req, res, next) => {
    // console.log(req.query);
    // console.log(req.body);
    //legge il file .json ma lo stampa come testo, voglio renderlo leggibile
    res.json(readFileSync('./products.json', 'utf-8'));
});

app.get("/cart-items/:id", (req, res, next) => {
    console.log(req.query);
    console.log(req.body);
	console.log(req.params.id);
    res.json(readFileSync('./products.json', 'utf-8'));

});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});