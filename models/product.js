const {Schema, model} = require('mongoose');
const Categorie = require('./categorie');
const User = require('./user');

const ProductSchema = Schema({
    
    name: {
        type: String,
        required: [true, 'el nobmre es obligatorio'],
        unique: true
    },
    // estado eliminado
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price:{
        type: Number,
        default: 0,
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    // sin stock, no disponible
    available: {
        type: Boolean,
        default: true
    },
    img: {type: String}
});


module.exports = model('Product', ProductSchema);