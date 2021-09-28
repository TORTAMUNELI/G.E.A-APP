const { request, response } = require('express');
const { Rol } = require('../models');

/**
 *
 * Obtiene todos los roles que estén en la colección de rols
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const rolesGet = async (req = request, res = response) => {
    //Se traen todos los datos que se encuentren en la colección rols
    const roles = await Rol.find({});

    //Enviar todos los roles obtenidos
    res.json({
        roles
    });
}

module.exports = {
    rolesGet
}