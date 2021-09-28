const { Schema, model } = require('mongoose');

//Representacion de la colección 'rols'
const RolSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});


/**
 *
 * Cambiar la impresión de cada rol
 *
 * {
 * nombre: String
 * estado: Boolean
 * uid: Mongo.Id
 * }
 */
RolSchema.methods.toJSON = function () {
    const { __v, _id, ...rol } = this.toObject();
    rol.uid = _id;
    return rol;
}

module.exports = model('Rol', RolSchema);