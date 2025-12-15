import { Router } from 'express';

const router = Router();

// mock temporário (em memória)
let lancamentos = [];

// listar lançamentos
router.get('/', (req, res) => {
  res.json(lancamentos);
});

// criar lançamento
router.post('/', (req, res) => {
  const { tipo, valor, descricao } = req.body;

  if (!tipo || !valor) {
    return res.status(400).json({ error: 'tipo e valor são obrigatórios' });
  }

  const novoLancamento = {
    id: Date.now(),
    tipo,
    valor,
    descricao: descricao || ''
  };

  lancamentos.push(novoLancamento);

  res.status(201).json(novoLancamento);
});

export default router;
