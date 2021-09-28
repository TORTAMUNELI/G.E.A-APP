const { Schema, model } = require('mongoose');

//Representación de la colección 'usuarios'
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasenia: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

/**
 *
 * Cambiar la impresión de cada usuario
 *
 * {
 * nombre: String
 * correo: String
 * rol: Mongo.Id
 * img: String
 * estado: Boolean
 * uid: Mongo.Id
 * }
 */
UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, contrasenia, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);