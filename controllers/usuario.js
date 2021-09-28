const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../models/');

/**
 *
 * Obtiene un usuario dado un id que se pasa en la petición como parámetro (/usuarios/{id})
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const usuariosGet = async (req = request, res = response) => {
    //Obtener el id
    const id = req.params.id;

    //Encontrar un usuario con el id, si no encuentra ninguno usuario va a ser null
    const usuario = await Usuario.findById(id);

    //Retornar un mensaje en caso de que no exista el usuario
    if (!usuario) {
        return res.json({
            msg: `No existe el usuario con id ${id}`
        });
    }

    //Retornar los datos del usuario
    res.json({
        usuario
    });
}

/**
 *
 * Se crea un usuario con datos enviados en el body de la petición
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const usuariosPost = async (req = request, res = response) => {
    //URL imagen por defecto, la imagen se guarda en cloudinary
    const img = process.env.IMG_PERFIL_DEFECTO;

    //Obtener datos del body
    const { nombre, correo, contrasenia, rol } = req.body;

    //Crear un usuario con los datos
    const usuario = new Usuario({ nombre, correo, contrasenia, rol, img });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.contrasenia = bcrypt.hashSync(contrasenia, salt);

    //Guardar en BBDD
    await usuario.save();

    //Enviar el usuario guardado
    res.status(201).json({
        usuario
    });
}

//Exportar funciones
module.exports = {
    usuariosGet,
    usuariosPost
}