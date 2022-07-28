const jwt = require('jsonwebtoken');


const jwtGenerate = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){    
                console.log(err);
                reject('Token isnt generated')
            } else {
                resolve(token);
            }
        });

    })

}


module.exports = {jwtGenerate};