const { request, response } = require('express');
const { Rol } = require('../models');

const rolesGet = async (req = request, res = response) => {
    const roles = await Rol.find({});

    res.json({
        roles
    });
}

module.exports = {
    rolesGet
}