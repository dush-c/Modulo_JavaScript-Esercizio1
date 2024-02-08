const fs = require('fs');

function getUser(id, cb){
    
    fs.readFile(`./${id}.txt`, {encoding: 'utf-8'}, (err, user) => {
        if(err){
            cb(new Error('user not found'));
        }else{
            cb(null, user);
        }
    });

}


getUser('a1', (err, user) => {
    //esegui qualcosa
});