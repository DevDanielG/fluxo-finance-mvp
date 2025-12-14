/**
 * Calcula o saldo final aplicando regras percentuais
 * Não depende de banco nem API
 */

function calcularSaldo(saldoInicial, lancamentos, regras = []) {
  let saldo = saldoInicial;

  // aplica lançamentos
  for (const l of lancamentos) {
    if (l.tipo === 'entrada') {
      saldo += l.valor;
    } else if (l.tipo === 'saida') {
      saldo -= l.valor;
    }
  }

  // aplica regras percentuais
  for (const regra of regras) {
    if (!regra.ativa) continue;

    const valorRegra = saldo * (regra.percentual / 100);

    if (regra.operacao === 'somar') {
      saldo += valorRegra;
    } else if (regra.operacao === 'subtrair') {
      saldo -= valorRegra;
    }
  }

  return Number(saldo.toFixed(2));
}

/* ===== TESTE NO CONSOLE ===== */
const saldoFinal = calcularSaldo(
  1000,
  [
    { tipo: 'entrada', valor: 500 },
    { tipo: 'saida', valor: 200 }
  ],
  [
    { percentual: 10, operacao: 'subtrair', ativa: true }
  ]
);

console.log('Saldo final:', saldoFinal);

export { calcularSaldo };

