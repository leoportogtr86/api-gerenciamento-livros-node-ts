import {Schema, model, Document} from "mongoose";

export interface ILivro extends Document {
    titulo: string;
    autor: string;
    anoPublicacao: number;
    descricao: string;
}

const livroSchema = new Schema<ILivro>({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    anoPublicacao: {
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true});

const Livro = model<ILivro>("Livro", livroSchema);

export default Livro;