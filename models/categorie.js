const {Schema, model} = require('mongoose');
// const User = require('./user')

const CategorieSchema = Schema({
    
    name: {
        type: String,
        required: [true, 'el nobmre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

CategorieSchema.methods.toJSON = function () {
    const {__v, state, ...data} = this.toObject();
                        //Con el triple punto (...) inndico que quiero que el resto de argumentos se guarden en 'data'
    
    return data;
}


module.exports = model('Categorie', CategorieSchema)