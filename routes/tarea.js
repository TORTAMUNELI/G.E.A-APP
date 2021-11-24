const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarJWT,
    validarCampos } = require('../middlewares/');

const {
    actividadExiste } = require('../helpers/');

const {
    tareasGetByUser,
    tareaGet,
    tareaPut,
    tareaDelete,
    tareaPost,
    tareaGetGif } = require('../controllers/tarea');

//Organiza las rutas que van a el path de tarea
const router = Router();

/**
 *
 * Obtener todas las tareas de un usuario usando el jwt
 * Verifica:
 * 1. JWT
 *
 * Luego pasa al tareasGetByUser (Se encuentra en los controllers)
 */
router.get('/',
    [
        validarJWT,
    ], tareasGetByUser);

/**
 * Obtiene una tarea con el id que se pasa como parámetro
 * 1. JWT
 * 2. Verifica que el id sea de Mongo
 *
 * Luego pasa al tareaGet (Se encuentra en los controllers)
 */
router.get('/focus/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], tareaGet);

/**
 * Crea una tarea con los datos que se pasan en el body
 * Verifica:
 * 1. JWT
 * 2. Que tenga título
 * 3. Fechas
 *
 * Luego pasa al tareaPost (Se encuentra en los controllers)
 */
router.post('/', [
    validarJWT,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('fecha_inicio', 'La fecha de inicio no se encuentra').not().isEmpty(),
    check('fecha_inicio', 'La fecha de inicio es incorrecta').isISO8601(),
    check('fecha_inicio', 'La fecha final no se encuentra').not().isEmpty(),
    check('fecha_final', 'La fecha final es incorrecta').isISO8601(),
    validarCampos
], tareaPost);


/**
 * Actualiza con los datos del body una tarea buscandola por el id que se pasa como parámetro
 * Verifica:
 * 1. JWT
 * 2. Que el id sea de mongo
 * 3. Que la tarea exista
 *
 * Luego pasa al tareaPut (Se encuentra en los controllers)
 */
router.put('/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom((id) => actividadExiste(id)),
    validarCampos
], tareaPut);

/**
 * Borra una tarea por id
 * Verifica:
 * 1. JWT
 * 2. Que el id sea de mongo
 * 3. Que la tarea exista
 *
 * Luego pasa al tareaDelete (Se encuentra en los controllers)
 */
router.delete('/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom((id) => actividadExiste(id)),
    validarCampos
], tareaDelete);

router.get('/gif', [], tareaGetGif);

module.exports = router;