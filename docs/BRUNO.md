# Bruno – execução manual dos exploratórios de API

A automação (Playwright, `tests/`) já valida as regras de UI e de API. A **execução manual** deste projeto é
feita nos **cenários exploratórios** (UI no navegador, API no Bruno). Esta collection traz os exploratórios
de API, uma requisição por evidência.

## Estrutura (`bruno/`)
| Pasta | Conteúdo |
|---|---|
| `01-Exploratorios-API` | **Execução manual.** 23 requests (EX-A1-01 … EX-A4-04), uma por cartão de evidência do PPT |
| `Referencia-Automacao` | Requisições das regras da documentação (CT-xx), já cobertas pela automação. Use para **repetir manualmente** uma falha antes de abrir bug |
| `environments/Verzel Store.bru` | Variável `baseUrl` |

Cenários da pasta `01-Exploratorios-API`:
| Cenário | Evidências | O que explora |
|---|---|---|
| A1 | EX-A1-01 a 04 | Cupom com tipos inválidos (`null`, número, lista, booleano) |
| A2 | EX-A2-01 a 08 | Corpo do cálculo atípico (produtoId, quantidade, `itens`, array, campos extras, `text/plain`) |
| A3 | EX-A3-01 a 07 | Pedido com dados do cliente atípicos |
| A4 | EX-A4-01 a 04 | Consistência entre endpoints (**execute na ordem a → b**; usa variáveis do Bruno) |

## Como executar no Bruno (app)
1. **Open Collection** → selecione a pasta `bruno/` do repositório.
2. No canto superior direito, escolha o environment **Verzel Store**.
3. Abra uma request, leia a aba **Docs** (Gherkin do exemplo e instruções) e clique em **Send** (Ctrl+Enter).
4. Observe status, tempo e corpo da resposta e a aba **Tests**.
5. Tire o print com método/URL, corpo da requisição, resposta e **Tests** → `docs/evidencias/screenshots/EX-A1-01.png`.
6. Registre o que observou em `docs/CENARIOS.xlsx` (aba Exploratórias) e abra bug em `docs/BUGS.md` se for o caso.

Nos exploratórios as únicas falhas automáticas são **erro 5xx** ou **resposta que não é JSON** (e os resultados
esperados do A4 e do pedido válido). O restante é observação sua.

## Relatório de execução com o Bruno CLI (evidência complementar)
```bash
npm install
npm run bruno:exploratorio   # pasta 01-Exploratorios-API
npm run bruno:referencia     # regras da documentação (opcional)
npm run bruno:completo       # tudo
```
Gera `reports/bruno/<nome>-AAAAMMDD-HHMMSS.html` e `.json` (histórico por carimbo de data/hora). O Bruno CLI roda
`bru run <pasta> --env "Verzel Store"` dentro de `bruno/`; o ambiente é compartilhado e carga está fora do escopo.

## Dicas
- Confira "Sobre este ambiente" antes de reportar: pedidos não persistem, API sem estado, preços fixos.
- Se alterar o corpo de uma request para testar outra variação, volte ao original ou duplique a request.
