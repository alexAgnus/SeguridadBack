
import { Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema ({

    nombre:{
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

usuarioSchema.method('compararPassword', function(password:string=''):boolean {
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
});

interface IUsuario extends Document{
    nombre: string;
    email: string;
    password: string;
    edad:string;
    direccion: string;
    colonia: string;
    cp: string;
    sexo:string;
    giro:string;
    avatar:string;

    compararPassword(password: string): boolean;


}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);