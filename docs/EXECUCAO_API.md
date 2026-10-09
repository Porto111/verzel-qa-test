# Roteiro de execução via API (curl – pode ser replicado no Bruno)

```bash
BASE=https://verzel-store.qa-test-verzel-store.workers.dev

# CT-01
curl -s -X POST $BASE/api/carrinho/calcular -H 'Content-Type: application/json' \
  -d '{"itens":[{"produtoId":"P002","quantidade":1},{"produtoId":"P004","quantidade":2}],"cupom":"BEMVINDO10"}'

# CT-07 (limite 200,00)
curl -s -X POST $BASE/api/carrinho/calcular -H 'Content-Type: application/json' \
  -d '{"itens":[{"produtoId":"P005","quantidade":2}]}'

# CT-10 (frete usa subtotal antes do cupom)
curl -s -X POST $BASE/api/carrinho/calcular -H 'Content-Type: application/json' \
  -d '{"itens":[{"produtoId":"P005","quantidade":2}],"cupom":"BEMVINDO10"}'

# CT-14 (6 unidades)
curl -si -X POST $BASE/api/carrinho/calcular -H 'Content-Type: application/json' \
  -d '{"itens":[{"produtoId":"P004","quantidade":6}]}'

# CT-23 (pedido)
curl -si -X POST $BASE/api/pedidos -H 'Content-Type: application/json' \
  -d '{"cliente":{"nome":"Maria Silva","email":"maria@exemplo.com","cep":"01310-100"},"itens":[{"produtoId":"P005","quantidade":1}],"cupom":"BEMVINDO10"}'
```
Registrar status, corpo e print/arquivo de cada chamada em `docs/EVIDENCIAS.md`.
