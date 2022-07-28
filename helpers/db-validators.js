const { collection } = require('../models/categorie');
const Categorie = require('../models/categorie');
const Product = require('../models/product');
const Role = require('../models/role');
const User = require('../models/user');


const roleValidator = async (role = '') =>{
    const rolExist = await Role.findOne({role});
    if(!rolExist){
        throw new Error(`El rol '${role}' no existe`);
    }
}


const emailValidator = async (email) =>{
    
    const emailExist = await User.findOne({email});
    
    if(emailExist){
        throw new Error(`El email: ${email} ya esta registrado`);
    }
}

const idValidator = async (id) =>{
    
    const idExist = await User.findById(id);
    
    if(!idExist){
        throw new Error(`El id: ${id} no existe`);
    }
}

const categorieValidator = async (id) => {
    const idExist = await Categorie.findById(id);
    
    if(!idExist){
        throw new Error(`El id: ${id} no existe`);
    }
}

const productValidator = async (id) => {
    const idExist = await Product.findById(id);
    
    if(!idExist){
        throw new Error(`El id: ${id} no existe`);
    }
}

const allowCollections = async (colectionInput = '', collections = []) => {
    const included = collections.includes(colectionInput);
    if(!included){
        throw new Error(`La coleccion: ${colectionInput} no existe`);
    }
    return true; 
}

module.exports={
    roleValidator,
    emailValidator,
    idValidator,
    categorieValidator,
    productValidator,
    allowCollections
}