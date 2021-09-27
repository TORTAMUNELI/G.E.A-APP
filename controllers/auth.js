const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/');
const { Usuario } = require('../models');

const login = async (req = request, res = response) => {
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
        console.log(usuario.contrasenia === contrasenia);
        const validPassword = bcrypt.compareSync(contrasenia, usuario.contrasenia);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - Contraseña incorrecta'
            });
        }

        //Genrar JSON Web Token
        const token = await generarJWT(usuario.id);

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

module.exports = {
    login
}