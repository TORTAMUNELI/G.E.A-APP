const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuariosGet,
    usuariosPost
} = require('../controllers/usuario');

const {
    emailExiste, esRolValido
} = require('../helpers');

const {
    validarCampos
} = require('../middlewares/');

//Organiza las rutas que va a el path de rol
const router = Router();

/**
 * Obtener un usuario dado un id que se pasa como parámetro
 * Verifica:
 * 1. Que el id sea de tipo Mongo
 *
 * Luego pasa a la función de usuariosGet (Se encuentra en los controllers)
 */
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], usuariosGet);

/**
 * Crear un usuario a partir de la información que se pasa en el body
 * Verifica:
 * 1. Que exista un nombre
 * 2. Que la contraseña tenga mínimo 8 caracteres y máximo 16
 * 3. Que este el correo y que sea de tipo Email
 * 4. Que el correo no exista en la base de datos
 * 5. Que el id del rol sea de tipo Mongo
 * 6. Que el rol exista en la base de datos
 *
 * Luego pasa a la función de usuariosPost (Se encuentra en los controllers)
 */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasenia', 'La contraseña debe contener más de 8 caracteres y menos de 16').isLength({ min: 8 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom((correo) => emailExiste(correo)),
    check('rol').isMongoId(),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
], usuariosPost);

module.exports = router;