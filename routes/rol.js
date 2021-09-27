const { Router } = require('express');

const { rolesGet } = require('../controllers/rol');

const router = Router();

router.get('/', rolesGet);

module.exports = router;