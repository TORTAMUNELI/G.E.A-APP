const cors = require('cors');
const express = require('express');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios: '/usuarios'
        };

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middleWares();

        //Rutas de la aplicación
        this.routes();
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;