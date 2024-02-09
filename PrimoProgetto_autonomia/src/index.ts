// const http = require('http');
// const express = require('express');
import express, {Request, Response, NextFunction} from 'express';
// const cors = require('cors');
import cors from 'cors';
// const morgan = require('morgan');
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.get('/index', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});