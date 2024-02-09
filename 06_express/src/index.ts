// const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const cart = [
	{
        name: 'ssd',
        netPrice: 95,
        weight: 100,
        discount: 5,
        quantity: 2
	},
	{
        name: 'motherboard',
        netPrice: 270,
        weight: 900,
        discount: 0,
        quantity: 10
	},
	{
        name: 'ram',
        netPrice: 120,
        weight: 60,
        discount: 10,
        quantity: 2
	},
	{
        name: 'processor',
        netPrice: 400,
        weight: 130,
        discount: 0,
        quantity: 1
	},
	{
        name: 'power supply',
        netPrice: 130,
        weight: 1400,
        discount: 15,
        quantity: 1
	},
	{
        name: 'cpu cooler',
        netPrice: 170,
        weight: 1000,
        discount: 23,
        quantity:1
	},
	{
        name: 'gpu',
        netPrice: 1600,
        weight: 2500,
        discount: 0,
        quantity: 1
	},
	{
        name: 'case',
        netPrice: 130,
        weight: 3500,
        discount: 30,
        quantity: 1
	}
];
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res, next) => {
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(404);
    res.send('Hello World');

});

app.get('/ciao', (req, res, next) => {
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(404);
    res.send('Ciao Mondo');

});

app.get('/cart-items', (req, res)=> {
    res.json(cart);
});

// http.createServer(app).listen(3000);
app.listen(3000);

// http.createServer((req, res) =>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// }).listen(3000);
