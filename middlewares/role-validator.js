const {response} = require('express');

const adminValidator = async (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: `Se quiere verificar el role sin validar el token anteriormente`
        });
    }

    const {role, name} = req.user; 

    if (role!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es admin`
        });
    }
    next();
}


const roleAllow = (...roles) => {
    return (req, res = response, next) => {
        
        if(!req.user){
            return res.status(500).json({
                msg: `Se quiere verificar el role sin validar el token anteriormente`
            });
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }
}

module.exports={
    adminValidator,
    roleAllow
}