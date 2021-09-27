const { Rol, Usuario } = require("../models")

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error('Rol inválido');
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error('El email ya existe');
    }
}
module.exports = {
    esRolValido,
    emailExiste
}