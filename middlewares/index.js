const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-JWT');
const validarRoles = require('./validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}