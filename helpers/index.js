const dbValidators = require('./db-validators');
const genrarJWT = require('./generarJWT');

module.exports = {
    ...dbValidators,
    ...genrarJWT
}