"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    img: [{
            type: String
        }],
    coords: {
        type: String
    },
    tipo1: {
        type: String
    },
    tipo2: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de Existir una referencia a un usuario']
    }
});
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
