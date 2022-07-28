const {response} = require("express");
const User = require('../models/user');
const bcrypt = require('bcryptjs');


const userGet = async (req, res = response) => {
    
    const {limit = 5, from = 0} = req.query;
    const query = {state:true};
    
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(from) 
        .limit(limit)
    ]);

    res.json({
        total,
        users
    });
}


const userPut = async (req, res) => {
    
    const {id} = req.params;
    const {_id ,password, google, email, ...resto} = req.body;

    // TODO VALIDAR CONTRA DB
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);      
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
}

const userPost = async (req, res = response) => {
    
    const {name, email, password, role}  = req.body;
    const user = new User({name, email, password, role});
    
    // Verificar correo existe
    

    // encriptar la contraseña (hash)
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);  
    // guardar en DB

    await user.save();  

    res.json({
        msg: 'post API, controlador',
        user        
    })
}

const userPath = (req, res) => {
    res.json({
        msg: 'patch API, controlador'
    })
}

const userDelete = async (req, res) => {
    
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {state:false});
    // const autenticatedUser = req.user;

    res.json({
        user
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPath,
}