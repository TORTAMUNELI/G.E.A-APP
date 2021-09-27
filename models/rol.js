const { Schema, model } = require('mongoose');

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

RolSchema.methods.toJSON = function () {
    const { __v, _id, ...rol } = this.toObject();
    rol.uid = _id;
    return rol;
}

module.exports = model('Rol', RolSchema);