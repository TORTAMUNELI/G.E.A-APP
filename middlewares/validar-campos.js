const { validationResult } = require('express-validator');

//Validar que todas las validaciones esten correctas
const validarCampos = (req, res, next) => {
    //Obtener errores de la peticion
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //Sigue con la ejecución normal en caso de que no existan errores
    next();
}

module.exports = {
    validarCampos
}