"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_model_1 = require("../models/usuario.model");
var bcrypt_1 = __importDefault(require("bcrypt"));
var tokens_1 = __importDefault(require("../classes/tokens"));
var autenticacion_1 = require("../middlewares/autenticacion");
var userRoutes = (0, express_1.Router)();
//login
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña Incorrectos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            var tokenUser = tokens_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                edad: userDB.edad,
                avatar: userDB.avatar,
                colonia: userDB.colonia,
                cp: userDB.cp,
                sexo: userDB.sexo,
                giro: userDB.giro,
                direccion: userDB.direccion
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña Incorrectos***'
            });
        }
    });
});
//crear usuario
userRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        //password:req.body.password,
        edad: req.body.edad,
        direccion: req.body.direccion,
        colonia: req.body.colonia,
        cp: req.body.cp,
        sexo: req.body.sexo,
        giro: req.body.giro,
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        var tokenUser = tokens_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            edad: userDB.edad,
            avatar: userDB.avatar,
            colonia: userDB.colonia,
            cp: userDB.cp,
            sexo: userDB.sexo,
            giro: userDB.giro,
            direccion: userDB.direccion
        });
        res.json({
            ok: true,
            token: tokenUser,
            user: userDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
// Actualiza usuario
userRoutes.post('/update', autenticacion_1.verificaToken, function (req, res) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        edad: req.body.edad || req.usuario.edad,
        direccion: req.body.direccion || req.usuario.direccion,
        colonia: req.body.colonia || req.usuario.ecolonia,
        cp: req.body.cp || req.usuario.cp,
        sexo: req.body.sexo || req.usuario.sexo,
        giro: req.body.giro || req.usuario.giro,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: true,
                usuario: req.usuario
            });
        }
        var tokenUser = tokens_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            edad: userDB.edad,
            avatar: userDB.avatar,
            colonia: userDB.colonia,
            cp: userDB.cp,
            sexo: userDB.sexo,
            giro: userDB.giro,
            direccion: userDB.direccion
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], function (req, res) {
    var usuario = req.usuario;
    res.json({
        ok: true,
        usuario: usuario
    });
});
userRoutes.get('/hola', function (req, res) {
    console.log("si entra")
    res.json({
        ok: true,
        mensaje: "escucha correctamente"
    });
});
exports.default = userRoutes;
