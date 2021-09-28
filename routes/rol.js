const { Router } = require('express');

const { rolesGet } = require('../controllers/rol');

//Organiza las rutas que va a el path de rol
const router = Router();

//Obtener todos los roles de la colección rols
router.get('/', rolesGet);

module.exports = router;