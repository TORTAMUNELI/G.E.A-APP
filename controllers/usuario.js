const { request, response } = require('express');
const { Usuario } = require('../models/');

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

module.exports = {
    usuariosGet
}