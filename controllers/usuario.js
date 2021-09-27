const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario, Rol } = require('../models/');

const usuariosGet = async (req = request, res = response) => {
    const id = req.params.id;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        return res.json({
            msg: `No existe el usuario con id ${id}`
        });
    }

    res.json({
        usuario
    });
}

const usuariosPost = async (req = request, res = response) => {
    const img = process.env.IMG_PERFIL_DEFECTO;
    const { nombre, correo, contrasenia, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contrasenia, rol, img });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.contrasenia = bcrypt.hashSync(contrasenia, salt);

    //Guardar en BBDD
    await usuario.save();
    res.status(201).json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost
}