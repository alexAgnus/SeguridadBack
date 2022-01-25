"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
var tokens_1 = __importDefault(require("../classes/tokens"));
var verificaToken = function (req, res, next) {
    var userToken = req.get('x-token') || '';
    tokens_1.default.comprobarToken(userToken)
        .then(function (decoded) {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })
        .catch(function (err) {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
exports.verificaToken = verificaToken;
