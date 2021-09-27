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

const router = Router();

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasenia', 'La contraseña debe contener más de 8 caracteres y menos de 16').isLength({ min: 8 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom((correo) => emailExiste(correo)),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
], usuariosPost);

module.exports = router;