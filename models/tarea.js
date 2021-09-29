const { Schema, model } = require('mongoose');

//Representación de la colección 'tareas'
const TareaSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripcion: {
        type: String,
        default: ''
    },
    fecha_inicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fecha_final: {
        type: Date,
        required: [true, 'La fecha de finalización es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    }
});

/**
 *
 * Cambiar la impresión de cada tarea
 *
 * {
 * titulo: String,
 * descripcion: String,
 * fecha_inicio: Date,
 * fecha_final: Date,
 * id_usuario: MongoId,
 * uid: MongoId
 * }
 */
TareaSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...tarea } = this.toObject();
    tarea.uid = _id;
    return tarea;
}


module.exports = model('Tarea', TareaSchema);