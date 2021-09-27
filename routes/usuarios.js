const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuariosGet
} = require('../controllers/usuario');

const {
    validarCampos
} = require('../middlewares/');

const router = Router();

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], usuariosGet);

module.exports = router;