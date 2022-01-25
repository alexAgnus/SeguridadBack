import { Router, Response } from "express";
import { FileUpload } from "../interfaces/file-upload";
import { verificaToken } from "../middlewares/autenticacion";
import {Post} from '../models/post.model';
import FileSystem from "../classes/file-system";



const postRoutes = Router();
const fileSystem = new FileSystem();

//Obtener Post Paginado
postRoutes.get('/', async(req: any, res: Response) =>{

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip *10;

    const posts = await Post.find()
                            .sort({_id:-1})
                            .skip(skip)
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok:true,
        pagina,
        posts
    
    });

});


//crear Post
postRoutes.post('/', [verificaToken], (req: any, res: Response) =>{

    const body = req.body;

    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesTempHaciaPost(req.usuario._id);
    body.img = imagenes;

    Post.create(body).then( async postDB =>{
       await  postDB.populate('usuario', '-password');

        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
});


//Servicio Para subir archivos
postRoutes.post('/upload', [verificaToken], async (req: any, res: Response) =>{

    if(!req.files){
        return res.status(400).json({
            ok:false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file: FileUpload = req.files.image;

    if(!file){
            return res.status(400).json({
                ok:false,
                mensaje: 'No se subio ningun archivo-imagen'
            });

    }

    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok:false,
            mensaje: 'No se subio ningun archivo-imagen*'
        });
    }

   await fileSystem.guardarImagenTemporal(file, req.usuario._id );

       res.json({
        ok:true,
        file :file.mimetype
    });
});

postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) =>{

    const userId = req.params.userid;
    const img = req.params.img;
    const tipo1 = req.params.tipo1;
    const tipo2 = req.params.tipo2;

    const pathFoto = fileSystem.getFotoUrl(userId, img);

    //res.json({
    //   userId, img
    //});

    res.sendFile( pathFoto);
});

export default postRoutes;
