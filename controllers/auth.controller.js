const { response, json } = require('express');
const bcrypjs = require('bcryptjs');
const User = require('../models/user');
const { jwtGenerate } = require('../helpers/jwt-generate');
const { googleVerify } = require('../helpers/google-verified');


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try{
        // verificar email

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                msg: 'El usuario/password no son validos - email'
            });
        }

        //user activo en DB

        if(!user.state){
            return res.status(400).json({
                msg: 'El usuario/password no son validos - state:false'
            });
        }

        // verficar contraseña

        const validPw = bcrypjs.compareSync(password, user.password);
        if(!validPw){
            return res.status(400).json({
                msg: 'El usuario/password no son validos - password'
            });
        }

        // generar el JWT

        const token = await jwtGenerate(user.id);


        res.json({
            user,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: `algo salio mal`
        })
    }
}

const googleSingIN = async (req, res=response) => {

    const {id_token} = req.body;

    try{

        const {email, name, img} = await googleVerify(id_token);
        
        let user = await User.findOne({email});

        if(!user){
            // crear
            const data = {
                name,
                email,
                img,
                google: true,
            };

            user = new User(data);
            await user.save();
            console.log('entro al if !user')
        }

        // Si el usuario en DB => status = false

        if(!user.state){
            return res.status(401).json({
                msg: 'hable con el admin, user blocked'
            });
        }

        const token = await jwtGenerate(user.id);

        const noovo = process.env.URL;

        res.json({
            msg: 'todo ok',
            token,
            user,
            noovo,
        })

    }catch(err){
        res.status(400).json({
            ok: false,
            msg: 'token cant be verified'
        })
    }

}

module.exports = {
    login,
    googleSingIN
};