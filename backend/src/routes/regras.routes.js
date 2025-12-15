import { Router } from 'express';

const router = Router();

// mock temporário (em memória)
let regras = [];

// listar regras
router.get('/', (req, res) => {
  res.json(regras);
});

// criar regra
router.post('/', (req, res) => {
  const { percentual, operacao, ativa } = req.body;

  if (percentual == null || !operacao) {
    return res.status(400).json({ error: 'percentual e operacao são obrigatórios' });
  }

  const novaRegra = {
    id: Date.now(),
    percentual,
    operacao,
    ativa: ativa ?? true
  };

  regras.push(novaRegra);

  res.status(201).json(novaRegra);
});

export default router;
