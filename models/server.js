const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
            usuarios: '/usuarios',
            rol: '/rol',
        };

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middleWares();

        //Rutas de la aplicación
        this.routes();

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    middleWares() {
        //Directorio público
        this.app.use(express.static('public'));

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.rol, require('../routes/rol'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;