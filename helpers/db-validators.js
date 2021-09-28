const { Rol, Usuario } = require("../models")

//Validar si el rol existe en la BBDD
const esRolValido = async (rol = '') => {
    //Buscar rol en la base de datos
    const existeRol = await Rol.findOne({ rol });

    if (!existeRol) {
        throw new Error('Rol inválido');
    }
}

//Validdar si el email se encuentra en la base de datos
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error('El email ya existe');
    }
}

//Exportar funciones
module.exports = {
    esRolValido,
    emailExiste
}