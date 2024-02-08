//import fs from 'fs';
const { rejects } = require('assert');
const fs = require('fs');
const { resourceUsage } = require('process');

function promisesFs(filePath, options){
    return new Promise((resolve, rejects)=> {
        fs.readFile(filePath, options, (err, result)=> {
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        });
    });
}
promisesFs('./text1.txt', {encoding: 'utf-8'})
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(rejects);
    })
//lettura dei file in modo Sincrono
// const content1 = fs.readFileSync('./text1.txt', {encoding: 'utf-8'});
// console.log(content1);

//lettura dei file in modo Asincrono. 
//Asincorno è diverso dal Multi threading
// fs.readFile('./text1.txt', {encoding: 'utf-8'}, (err, content1) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(content1);
// });

// // const content2 = fs.readFileSync('./text2.txt', {encoding: 'utf-8'});
// // console.log(content2);
// fs.readFile('./text2.txt', {encoding: 'utf-8'}, (err, content2) => {
//     console.log(content2);
// });