const { Router } = require('express');

const { rolesGet } = require('../controllers/rol');

const {
    validarJWT,
    validarCampos,
    esAdmin } = require('../middlewares');

//Organiza las rutas que va a el path de rol
const router = Router();

/**
 * Obtener todos los roles de la colección rols
 * Verifica:
 * 1. JWT
 * 2. Que su rol sea ADMIN
 */
router.get('/', [], rolesGet);

module.exports = router;