const fs = require('fs/promises');

async function mainFn(){
    try{
        const content1 = await fs.readFile('./text1.txt', {encoding: 'utf-8'});
        console.log(content1);
       let content2;
       try{
        content2 = await fs.readFile('./text2.txt', {encoding: 'utf-8'});
       }catch(err){
        content2 = 'default content';
       }
       console.log(content2);
    }catch(err){
        console.log('errori nella lettura dei file');
        throw err;
    }
}

mainFn()
    .catch(err => console.error('errore'));