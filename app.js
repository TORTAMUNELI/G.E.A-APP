/**
 * Aquí es donde se va a subir el servidor y se configura dotenv que es un framework para las variables de entorno
 */

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

//Se sube el servidor
server.listen();