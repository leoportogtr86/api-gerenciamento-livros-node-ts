import { body } from 'express-validator';

export const validacaoLivro = [
    body('titulo')
        .isString()
        .withMessage('O título deve ser uma string.')
        .isLength({ min: 1 })
        .withMessage('O título é obrigatório.'),
    body('autor')
        .isString()
        .withMessage('O autor deve ser uma string.')
        .isLength({ min: 1 })
        .withMessage('O autor é obrigatório.'),
    body('anoPublicacao')
        .isInt({ min: 1440, max: new Date().getFullYear() })
        .withMessage(`O ano de publicação deve ser um número entre 1440 e ${new Date().getFullYear()}.`),
    body('descricao')
        .isString()
        .withMessage('A descrição deve ser uma string.')
        .isLength({ min: 1 })
        .withMessage('A descrição é obrigatória.')
];
