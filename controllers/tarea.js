const { request, response } = require('express');
const { Tarea } = require('../models/');

/**
 *
 * Obtiene todas las tareas de un usuario
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const tareasGetByUser = async (req = request, res = response) => {
    //Recuperar el id del usuario de la petición
    const id = req.usuarioAuth._id;

    //Query de búsqueda
    const query = {
        id_usuario: id,
        estado: true
    }

    //Buscar las tareas usando el query
    const tareas = await Tarea.find(query);

    res.json({
        tareas
    });
}

/**
 *
 * Obtener una tarea validando que esta es del usuario que realiza la petición
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const tareaGet = async (req = request, res = response) => {
    //Recuperar el id de usuario
    const idUsuario = req.usuarioAuth._id;

    //Recuperar el id de la tarea
    const idTarea = req.params.id;

    //Buscar la tarea en la colección
    const tarea = await Tarea.findById(idTarea);

    if (!tarea || tarea.id_usuario.toString() !== idUsuario.toString() || !tarea.estado) {
        return res.status(404).json({
            msg: 'No se encontro esta tarea'
        });
    }

    res.json({ tarea });
}

/**
 *
 * Obtener una tarea validando que esta es del usuario que realiza la petición
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const tareaPost = async (req = request, res = response) => {
    //Obtener datos del body
    const { titulo, fecha_inicio, fecha_final } = req.body;
    const id_usuario = req.usuarioAuth._id;

    let { descripcion } = req.body;
    if (!descripcion) {
        descripcion = '';
    }
    //Crear la tarea
    const tarea = new Tarea({ titulo, descripcion, fecha_inicio, fecha_final, id_usuario });

    //Guardar la tarea
    await tarea.save();

    //Enviar la tarea guardada
    res.json({
        tarea
    });
}

/**
 *
 * Actualizar una tarea en base a lo que se encuentra en el body
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const tareaPut = async (req = request, res = response) => {
    //Obtener datos del body excluyendo estado e id_usuario que no se pueden modificar
    const { estado, id_usuario, ...tarea } = req.body;

    //Obtener el id
    const { id } = req.params;

    //Buscar la tarea en la colección
    const tareaB = await Tarea.findById(id);

    if (tareaB.id_usuario.toString() !== req.usuarioAuth._id.toString()) {
        return res.status(401).json({
            msg: 'No tienes permisos sobre esta actividad'
        });
    }

    //Buscar tarea en la colección y actualizar
    const antiguo = await Tarea.findByIdAndUpdate(id, tarea);

    res.json({
        antiguo
    });
}

/**
 *
 * Borrar una tarea con un id
 *
 * @param {*} req Es la petición html con todo lo que lleva por dentro (Body, Headers, etc...)
 * @param {*} res Contiene la respuesta que se le va a enviar al usuario
 */
const tareaDelete = async (req = request, res = response) => {
    //Obtener el id
    const { id } = req.params;

    //Buscar la tarea en la colección
    const tareaB = await Tarea.findById(id);

    if (tareaB.id_usuario.toString() !== req.usuarioAuth._id.toString()) {
        return res.status(401).json({
            msg: 'No tienes permisos sobre esta actividad'
        });
    }

    //Buscar la tarea y cambiar su estado a falso
    const borrado = await Tarea.findByIdAndUpdate(id, { estado: false });

    res.json({
        borrado
    });
}

const tareaGetGif = async (req = request, res = response) => {

    const url = `https://api.giphy.com/v1/gifs/random?api_key=56EdCEwnWBUblemnPPTKrzGFFS7q5SFL`;
    const resp = await fetch(url);

    const { data } = await resp.json();

    res.json({
        id: data.id,
        title: data.title,
        url: data.images?.downsized_medium.url
    });
}

module.exports = {
    tareasGetByUser,
    tareaGet,
    tareaPut,
    tareaDelete,
    tareaPost,
    tareaGetGif
}