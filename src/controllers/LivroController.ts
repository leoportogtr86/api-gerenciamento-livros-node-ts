import {Request, Response} from "express";
import Livro from "../models/Livro";

export const adicionarLivro = async (req: Request, res: Response): Promise<void> => {
    try {
        const {titulo, autor, anoPublicacao, descricao} = req.body;
        const novoLivro = new Livro({titulo, autor, anoPublicacao, descricao});
        await novoLivro.save();

        res.status(201).json(novoLivro);
    } catch (err: any) {
        res.status(400).json({msg: err.message});
    }
}

export const atualizarLivro = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {titulo, autor, anoPublicacao, descricao} = req.body;
        const livroAtualizado = await Livro.findByIdAndUpdate(id, {titulo, autor, anoPublicacao, descricao});

        if (!livroAtualizado) {
            res.status(404).json({err: 'Livro não encontrado'});
            return;
        }
        res.status(200).json(livroAtualizado);
    } catch (err: any) {
        res.status(400).json({msg: err.message});
    }
}

export const removerLivro = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const livroRemovido = await Livro.findByIdAndDelete(id);
        if (!livroRemovido) {
            res.status(404).json({err: 'Livro não encontrado'});
            return;
        }
        res.status(200).json({message: 'Livro removido com sucesso'});
    } catch (err: any) {
        res.status(400).json({err: err.message});
    }
};

export const listarLivros = async (req: Request, res: Response): Promise<void> => {
    try {
        const livros = await Livro.find();
        res.status(200).json(livros);
    } catch (err: any) {
        res.status(400).json({err: err.message});
    }
};