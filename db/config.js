const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('base de datos online');

    }catch(error){
        console.log(error);
        throw new Error('error a la hora de inicar el proceso en DB');
    }

}



module.exports={
    dbConnection,
};