const {response} = require('express');
const {ObjectId} = require('mongoose').Types
const {User, Categorie, Product} = require('../models');

const allowCollections = [
    'users',
    'categories',
    'products',
    // 'roles'
];



const searchUsers = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term); //BOOLEAN
    
    if (isMongoId){
        
        const user = await User.findById(term);

        return res.status(200).json({
            results: (user) ? [user] : []
        })
    } 
    
    const regex = new RegExp(term, 'i');

    const [users, conteo] = await Promise.all([
        User.find({
            $or: [{name: regex}, {email: regex}],
            $and: [{state: true}],
        }),
        User.find({
            $or: [{name: regex}, {email: regex}],
            $and: [{state: true}]
        }).count(),
    ])
    
    return res.json({
        count:   (conteo)  ?  [conteo] : [],
        results: (users)   ?  [users]  : [],
    });

}

const searchCategories = async (term = '', res = response) => {
    
    const isMongoId = ObjectId.isValid(term); //BOOLEAN
    
    if (isMongoId){
        const categoria = await Categorie.findById(term);

        return res.status(200).json({
            results: (categoria) ? [categoria] : []
        })
    } 
    
    const regex = new RegExp(term, 'i');

    const [categories, conteo] = await Promise.all([
        Categorie.find({state: true, name: regex}),
        Categorie.find({state: true, name: regex}).count(),
    ])

    return res.json({
        count:   (conteo)     ? [conteo]     : [],
        results: (categories) ? [categories] : [],
    });


}


const searchProducts = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term); //BOOLEAN
    
    if (isMongoId){
        
        const product = await Product.findById(term).populate('categorie', 'name');

        return res.status(200).json({
            results: (product) ? [product] : []
        })
    } 

    const regex = new RegExp(term, 'i');

    const [products, conteo] = await Promise.all([
        Product.find({state: true, name: regex}).populate('categorie', 'name'),
        Product.find({state: true, name: regex}).count(),
    ])

    return res.json({
        count:   (conteo)   ? [conteo]   : [],
        results: (products) ? [products] : [],
    });


}

const search = async (req, res = response) => {

    const {collection, term} = req.params;
    
    try{

        if(!allowCollections.includes(collection)){
            return res.status(400).json({
                msj: `La coleccion buscada: ${collection}, no existe`
            });
        }

        switch(collection) {
            case 'users':
                await searchUsers(term, res);
            break;
            case'categories':
                await searchCategories(term, res)
            break;
            case 'products':
                await searchProducts(term, res);
            break;
            default:
                return res.status(500).json({
                    msg: 'search lost',
                    msg: 'falta implementacion'
                })
        }

        // res.json({
            // msg: 'msg',
            // collection,
            // term
        // });

    } catch(err){
        console.log(err);
        return res.status(400).json({
            msj: 'err'
        })
    }
}

module.exports = {
    search
}