const jwt = require('jsonwebtoken');

//Generar JSON Web Token a partir de un id de mongo y una clave secreta
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    });
}

module.exports = {
    generarJWT
}