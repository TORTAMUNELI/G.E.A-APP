const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/');

const { login } = require('../controllers/auth');

//Organiza las rutas que va a el path de auth
const router = Router();

/**
 * Autenticar un usuario
 * Verifica:
 * 1. Que exista un correo y que sea de tipo correo
 * 2. Que exista una contraseña
 *
 * Luego pasa a la función de login (Se encuentra en los controllers)
 */
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;