const { response, request } = require('express');
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

//Exportar funciones
module.exports = {
    login
}