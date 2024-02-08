const http = require('http');
const express = require('express');

const app = express();

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

http.createServer(app).listen(3000);

// http.createServer((req, res) =>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// }).listen(3000);
