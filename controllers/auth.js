const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/');
const { Usuario } = require('../models');

/**
 *
 * Verifica el login de un usuario, retorna un mensaje de error si la autenticación falla y retorna
 * un usuario y un JSON Web Token en caso de que se logre autenticar el usuario.
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const login = async (req = request, res = response) => {
    //Se obtiene el correo y la contraseña del body de la petición
    const { correo, contrasenia } = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - Correo no existente'
            });
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status().json({
                msg: 'Usuario/Contraseña no son correctos - Usuario no activo'
            });
        }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync(contrasenia, usuario.contrasenia);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - Contraseña incorrecta'
            });
        }

        //Genrar JSON Web Token
        const token = await generarJWT(usuario.id);

        //Enviar usuario y JSON Web Token
        res.json({
            usuario,
            token
        });
    } catch (err) {
        console.log(err);
        res.status().json({
            msg: 'Hable con el administrador'
        })
    }
}

const validarEstadoJWT = async (req = request, res = response) => {
    //Obtener el token del header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        console.log(token);

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

        res.json({
            estado: true
        });

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

//Exportar funciones
module.exports = {
    login,
    validarEstadoJWT
}