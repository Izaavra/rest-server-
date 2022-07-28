const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');

class Server {
    
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            authPath:       '/api/auth',
            categoriesPath: '/api/categories',
            usersPath:      '/api/users',
            productos:      '/api/products',
            searchs:        '/api/searchs',
            uploads:        '/api/uploads',
        }
        
        // DB Conection
        this.conectarDB();

        // Middlewares
        this.middlewares();
        
        // Rutas de aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        
        // PARSEO Y LECTURA
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

        // File Upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    routes(){

        this.app.use(this.paths.authPath,       require('../routes/auth.routes'));
        this.app.use(this.paths.categoriesPath, require('../routes/categories.routes'));
        this.app.use(this.paths.usersPath,      require('../routes/user.routes'));
        this.app.use(this.paths.productos,      require('../routes/products.routes'));
        this.app.use(this.paths.searchs,        require('../routes/searchs.routes'));
        this.app.use(this.paths.uploads,        require('../routes/uploads.routes'));
        
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;