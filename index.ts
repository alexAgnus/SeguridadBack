import  Server  from "./classes/server";
import userRoutes from "./routes/usuario";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/post";
import fileUpload from 'express-fileupload';
import cors from 'cors';



const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//FileUpload
server.app.use(fileUpload());

//Configurar Cors
server.app.use(cors({ origin:true, credentials: true }));


//Rutas de mi app
server.app.use('/user', userRoutes)
server.app.use('/posts', postRoutes)

//Conectar DB
//mongoose.connect( 'mongodb://localhost:27017/Reportes',
mongoose.connect('mongodb+srv://alex:alexagnus@cluster0.25r2w.mongodb.net/seguridad',
 (err) => {
    if (err) throw err;

    console.log('Base de datos ONILINE');
})

//Levantar Express
server.start(() => {
    console.log(`Servidor correindo en puerto ${server.port}`) ;
});