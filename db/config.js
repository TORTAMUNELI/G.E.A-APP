const mongoose = require('mongoose');

//URL para conectarse al cluster de mongo
const URL_DB = process.env.MONGODB_CNN;

//Conectar a la base de datos
const dbConnection = async () => {
    try {
        await mongoose.connect(URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

//Exportar conexión
module.exports = {
    dbConnection
}