const { request, response } = require('express');

const { Rol } = require('../models');

const esAdmin = async (req = request, res = response, next) => {
    //Verificar que el usuario este en la petición
    if (!req.usuarioAuth) {
        return res.status(500).json({
            msg: 'Verificar el rol sin token - Contacte al administrador'
        });
    }

    //Recuperar el id del rol y el nombre del usuario
    const { rol: rol_id, nombre } = req.usuarioAuth;

    //Buscar el rol en la colección
    const rol = await Rol.findById(rol_id);

    //Si el rol no existe o no es admin tira el error
    if (!rol || rol.nombre != 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} no es admin`
        });
    }

    next();
}

module.exports = {
    esAdmin
}