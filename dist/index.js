"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var post_1 = __importDefault(require("./routes/post"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use((0, express_fileupload_1.default)());
//Configurar Cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//Conectar DB
//mongoose.connect( 'mongodb://localhost:27017/Reportes',
mongoose_1.default.connect('mongodb+srv://alex:alexagnus@cluster0.25r2w.mongodb.net/seguridad', function (err) {
    if (err)
        throw err;
    console.log('Base de datos ONILINE');
    console.log('Desde dist');
});
//Levantar Express
server.start(function () {
    console.log("Servidor correindo en puerto " + server.port);
});
