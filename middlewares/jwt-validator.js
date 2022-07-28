const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async(req = request, res = response , next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: `No hay token en la peticion`
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: `token no valido - user doens exist db`
            })
        }

        // verificar user = true
        if(!user.state){
            return res.status(401).json({
                msg: `token no valido - state false`
            })
        }

        req.user = user;

        next();
        
    }catch(err){
        console.log(err);
        res.status(401).json({
            msg: `token no valido`
        });
    }
}

module.exports={
    jwtValidator
}