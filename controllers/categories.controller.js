const {response} = require("express");
const User = require("../models/user");
const Categorie = require("../models/categorie");


// get categories paginado - total - populate
const getCategories = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state:true};
    
    const total = await Promise.all([
        Categorie.countDocuments(query)
    ]);

    const categories = await Promise.all([
        Categorie.find(query)
            .populate('user', 'name')
                .skip(from) 
                .limit(limit)
    ]);

    res.json({
        total,
        categories
    });
};

// get categorie by id populate
const getCatById = async (req, res = response) => {
    
    const {id} = req.params;

    try{
        const categorie = await Categorie.findById(id).populate('user', 'name');
        
        if(!categorie){
            return res.status(400).json({
                msg: 'no se encontro la categoria'
            });
        }

        res.json({
            msg: 'categoria:',
            categorie,
        });
        
    } catch(err){
        console.log(err);
        res.json({
            msg: 'error'
        });
    }
}

const addCategorie = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    try{
        
        const categorieDB = await Categorie.findOne({name});

        if(categorieDB){
            return res.status(400).json({
                msg: 'categorie existente'
            });
        }

        // generar data a guardar
        const data = {
            name,
            user: req.user._id
        }

        const categorie = await new Categorie(data);
        await categorie.save();


        res.status(201).json({
            categorie
        });
        
    } catch(err){
        console.log(err);
        res.json({
            msg: 'error'
        });
    }
}

// actualizar categorie
const updateCategorie = async (req, res = response) => {
    
    const {id} = req.params;
    const {state, user, ... data} = req.body;

    try {
        
        const categorie = await Categorie.findById(id);

        if(!categorie){
            return res.status(400).json({
                msg: 'no se encontro la categoria'
            });
        }

        data.name = data.name.toUpperCase();
        data.user = req.user._id;
        
        const categorieDB = await Categorie.findByIdAndUpdate(id, data, {new: true});
        
        res.json({
            categorieDB
        });

    } catch(err){
        console.log(err);
        res.json({
            msg: 'err'
        });
    }
    
}

// borrar categorie - state: false
const deleteCategorie = async (req, res = response) => {
    
    const {id} = req.params;

    try{
        const categorieDB = await Categorie.findByIdAndUpdate(id, {state:false}, {new: true});

        res.status(200).json({
            msg: 'categoria eliminada',
            categorieDB
        });

    } catch(err){
        console.log(err);
        res.json({
            msg: 'err'
        });
    }
}

module.exports = {
    getCategories,
    getCatById,
    addCategorie,
    updateCategorie,
    deleteCategorie,
}