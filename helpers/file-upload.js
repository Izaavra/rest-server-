const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileUpload = async (file, allowExtensions, destiny = '') => {
    
    return new Promise ((resolve, reject) => {

        const {fileUp} = file;
        const nameFile = fileUp.name.split('.');
        const extension = nameFile[nameFile.length-1];

        if(!allowExtensions.includes(extension)){
            return reject(`extension: ${extension} no valida, Las extensiones permitidas son: ${allowExtensions}`);
        };

        const nameTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname, './../uploads/', destiny, nameTemp);
    
        fileUp.mv(uploadPath, (err) => {
            if (err){
                return reject(err);
            }
            resolve(nameTemp);
        });

    }); 
}

module.exports = {
    fileUpload
}