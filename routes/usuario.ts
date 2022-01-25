import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/tokens';
import { verificaToken } from '../middlewares/autenticacion';


const userRoutes = Router();

//login
userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    Usuario.findOne({ email:body.email}, ( err: any, userDB: any ) => {

        if(err) throw err;

        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'Usuario/contraseña Incorrectos'
            });
        }

       if(userDB.compararPassword(body.password)){

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            edad: userDB.edad,
            avatar:userDB.avatar,
            colonia:userDB.colonia,
            cp: userDB.cp,
            sexo:userDB.sexo,
            giro: userDB.giro,
            direccion: userDB.direccion
            
        });

        res.json({
            ok: true,
            token: tokenUser
        });

       }else{

        return res.json({
            ok:false,
            mensaje: 'Usuario/contraseña Incorrectos***'
        });

       }
        
    })




});



//crear usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre:req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        //password:req.body.password,
        edad:req.body.edad,
        direccion: req.body.direccion,
        colonia:req.body.colonia,
        cp: req.body.cp,
        sexo:req.body.sexo,
        giro: req.body.giro,
        avatar: req.body.avatar
    };
    
    
    Usuario.create(user).then(userDB=> {

    
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            edad: userDB.edad,
            avatar: userDB.avatar,
            colonia:userDB.colonia,
            cp: userDB.cp,
            sexo:userDB.sexo,
            giro: userDB.giro,
            direccion: userDB.direccion

        });

        res.json({
            ok: true,
            token: tokenUser,
            user:userDB
        });

    
    }).catch(err=>{
       res.json({
            ok : false,
           err
        });
    });


});


// Actualiza usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        edad: req.body.edad || req.usuario.edad,
        direccion: req.body.direccion || req.usuario.direccion,
        colonia: req.body.colonia || req.usuario.ecolonia,
        cp: req.body.cp || req.usuario.cp,
        sexo: req.body.sexo || req.usuario.sexo,
        giro: req.body.giro || req.usuario.giro,
        avatar: req.body.avatar || req.usuario.avatar
        
    }

    Usuario.findByIdAndUpdate(req.usuario._id, user, {new: true}, (err, userDB)=>{

        if(err) throw err;

        if(!userDB){
            return res.json({
                ok: true,
                usuario: req.usuario
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            edad: userDB.edad,
            avatar: userDB.avatar,
            colonia:userDB.colonia,
            cp: userDB.cp,
            sexo:userDB.sexo,
            giro: userDB.giro,
            direccion: userDB.direccion
            
        });

        res.json({
            ok: true,
            token: tokenUser
        });
        
    });
});

userRoutes.get('/', [verificaToken], (req: any, res: Response) =>{


    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });
});

export default userRoutes;