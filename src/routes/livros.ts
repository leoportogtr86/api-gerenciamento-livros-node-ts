import { Router } from 'express';
import { adicionarLivro, atualizarLivro, removerLivro, listarLivros } from '../controllers/LivroController';
import { validacaoLivro } from '../middleware/validacaoLivro';
import { tratamentoErros } from '../middleware/tratamentoErros';

const router = Router();

router.post('/', validacaoLivro, tratamentoErros, adicionarLivro);
router.put('/:id', validacaoLivro, tratamentoErros, atualizarLivro);
router.delete('/:id', removerLivro);
router.get('/', listarLivros);

export default router;
