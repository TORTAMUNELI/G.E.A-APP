const { Rol, Usuario, Tarea } = require("../models")

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

//Verificar si la actividad existe
const actividadExiste = async (id = '') => {
    const existeActividad = await Tarea.findById(id);
    if (!existeActividad) {
        throw new Error('La actividad no existe');
    }
}

//Exportar funciones
module.exports = {
    esRolValido,
    emailExiste,
    actividadExiste
}