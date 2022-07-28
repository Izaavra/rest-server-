require('dotenv').config();
const Server = require('./models/server');
 
const main = async () => {

    const serverUp = new Server();

    serverUp.listen();

}

main();
