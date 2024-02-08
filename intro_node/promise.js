const fs = require('fs/promises');

const filePromise = fs.readFile('./text1.txt', {encoding: 'utf-8'});

filePromise.then(content => {
    console.log(content);
})
.catch(err =>{
    console.error(err);
});
console.log(filePromise);