-- Banco: fluxo_finance_mvp
-- Schema inicial do MVP

-- =========================
-- TABELA: conta
-- =========================
CREATE TABLE IF NOT EXISTS conta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    saldo_inicial NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABELA: lancamento
-- =========================
CREATE TABLE IF NOT EXISTS lancamento (
    id SERIAL PRIMARY KEY,
    conta_id INTEGER NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    valor NUMERIC(12,2) NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_conta
        FOREIGN KEY (conta_id)
        REFERENCES conta(id)
        ON DELETE CASCADE
);

-- =========================
-- TABELA: regra_percentual
-- =========================
CREATE TABLE IF NOT EXISTS regra_percentual (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    percentual NUMERIC(5,2) NOT NULL,
    operacao VARCHAR(10) NOT NULL CHECK (operacao IN ('somar', 'subtrair')),
    aplicar_em VARCHAR(20) NOT NULL CHECK (aplicar_em IN ('antes', 'depois')),
    ordem INTEGER NOT NULL DEFAULT 1,
    ativa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
