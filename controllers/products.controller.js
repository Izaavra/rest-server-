const {response} = require("express");
const User = require("../models/user");
const Categorie = require("../models/categorie");
const Product = require("../models/product");

const newProduct = async (req, res = response) => {

    const name = req.body.name;
    
    try{
        
        const productDB = await Product.findOne({name});

        if(productDB){
            return res.status(400).json({
                msg: 'producto en existencia'
            });
        }

        const {state, user,... data} = req.body;

        data.user = req.user._id
        data.state = true
        // data.categorie = '62be21ad95c696241eae900c'

        // generar data a guardar

        const product = await new Product(data);
        await product.save();


        res.status(201).json({
            product
        });
        
    } catch(err){
        console.log(err);
        res.json({
            msg: 'error'
        });
    }

}

const getProduct = async (req, res = response) => {
    
    const query = {state:true};
    const {limit=5} = req.query;

    try{
        const [total ,products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .limit(limit)
                .populate('user', 'name')
                .populate('categorie', 'name')
        ]);
    
        res.status(200).json({
            total,
            products
        });

    } catch(err){
        console.log(err);
        res.json({
            msg: 'error'
        });
    }

}

const getProductById = async (req, res = response) => {
    const {id} = req.params;

    try{
        
        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('categorie', 'name');
        
        res.json({
            msg: 'producto:',
            product,
        });

    } catch(err){
        console.log(err);
        res.json({
            msg: 'error'
        });
    }
}

const updateProduct = async (req, res = response) => {
    
    const {id} = req.params;
    const {state, user, categorie, ... data} = req.body;

    try {
        
        const product = await Product.findById(id);

        if(!product){
            return res.status(400).json({
                msg: 'no se encontro la categoria'
            });
        }

        data.user = req.user._id;
        
        const productDB = await Product.findByIdAndUpdate(id, data, {new: true});
        
        res.status(200).json({
            productDB
        });

    } catch(err){
        console.log(err);
        res.json({
            msg: 'err'
        });
    }
    
}

const deleteProduct = async (req, res = response) => {
    
    const {id} = req.params;

    try{
        const productDB = await Product.findByIdAndUpdate(id, {state:false}, {new: true});

        res.status(200).json({
            msg: 'categoria eliminada',
            productDB
        });

    } catch(err){
        console.log(err);
        res.json({
            msg: 'err'
        });
    }    
}

module.exports = {
    getProduct,
    getProductById,
    newProduct,
    updateProduct,
    deleteProduct
}