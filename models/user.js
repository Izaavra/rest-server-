const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ this.google === false, 'La contraseña es requerida.' ]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});



UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject();
                        //Con el triple punto (...) inndico que quiero que el resto de argumentos se guarden en 'user'
    user.uid = _id;
    return user;
}


module.exports = model('User', UserSchema);