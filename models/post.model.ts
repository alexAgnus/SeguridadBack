
import { Schema, Document, model} from 'mongoose';

const postSchema = new Schema({

    created:{
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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de Existir una referencia a un usuario']
    }



});

postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next();

});

interface IPost extends Document{
    created: Date;
    mensaje: string;
    img: string [];
    coords: string;
    tipo1: string;
    tipo2: string;
    usuario: string;

}

export const Post =  model<IPost>('Post', postSchema);

