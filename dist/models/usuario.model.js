"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    edad: {
        type: String,
        required: [true, 'La edad es necesaria']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es necesaria']
    },
    cp: {
        type: String,
        required: [true, 'El cp es necesario']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo es necesario']
    },
    giro: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }
});
usuarioSchema.method('compararPassword', function (password) {
    if (password === void 0) { password = ''; }
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
