const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const validarJWT = async (req = request, res = response, next) => {
    //Obtener el token del header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        //Conseguir el id del usuario a partir del token de acceso
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);


        //Buscar el usuario
        const usuarioAuth = await Usuario.findById(uid);

        //Verificar que exista en la base de datos
        if (!usuarioAuth) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }

        //Verificar el estado del usuario
        if (!usuarioAuth.estado) {
            return res.status().json({
                msg: 'No hay token en la petición'
            });
        }

        //Guardar el usuario en la petición HTTP
        req.usuarioAuth = usuarioAuth;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}