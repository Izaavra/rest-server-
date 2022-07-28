const { response } = require("express");
const {User, Product} = require('./../models')

const returnModel = async (collection, id) => {

    return new Promise ( async (resolve, reject) => {
        let model;

        switch(collection){
            case 'users':
                model = await User.findById(id);
                if (!model){
                    return reject(`no existe user con el id: ${id}`);
                }
                resolve(model);
            break;
            case 'products':
                model = await Product.findById(id);
                if (!model){
                    return reject(`no existe product con el id: ${id}`);
                }
                resolve(model);
            break;  
            default: return reject('500');
        }
    });
}

module.exports = {returnModel}