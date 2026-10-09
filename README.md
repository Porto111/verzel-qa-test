# Teste técnico QA Júnior – Verzel Store (card VZS-142 v2.3.0: cupom e frete grátis)

Validação da entrega "Cupom de desconto e frete grátis": cenários em Gherkin, execução manual/exploratória,
bugs, evidências e automação com **Playwright + TypeScript** organizada em **Page Object Model**.

## Onde encontrar cada entrega
| Entrega | Local |
|---|---|
| Cenários em Gherkin | `features/*.feature` |
| Matriz de cenários + resultados + sessões exploratórias | `docs/CENARIOS.xlsx` (e `docs/CENARIOS.md`) |
| Roteiro de execução manual: exploratórios UI/API em Gherkin, 1 cartão por evidência (PPT) | `docs/Execucao-Manual-Verzel-Store.pptx` |
| Bugs | `docs/BUGS.md` |
| Evidências da execução | `docs/EVIDENCIAS.md` e `docs/evidencias/screenshots/` |
| Ambiguidades e interpretações | `docs/AMBIGUIDADES.md` |
| Roteiro de execução da API (curl) | `docs/EXECUCAO_API.md` |
| Arquitetura da automação (POM) | `docs/ARQUITETURA.md` |
| Collection Bruno (exploratórios de API) + relatório Bruno CLI | `bruno/` e `docs/BRUNO.md` |
| Uso de IA | `docs/USO_DE_IA.md` |
| Automação | `tests/` (specs) e `src/` (page objects, API client, dados) |

## Estrutura
```
src/
  pages/        Page Objects (BasePage, ProdutosPage, CarrinhoPage)
  components/   Componentes reutilizáveis (Header, CardProduto, ItemCarrinho, ResumoPedido, CupomCarrinho)
  api/          Cliente HTTP tipado (VerzelApi) e tipos das respostas
  data/         Dados de teste e resultados esperados (fonte única para API e UI)
  fixtures/     test.extend(): api, produtosPage, carrinhoPage, carrinhoCom([...itens])
  support/      Asserções de domínio e formatação de moeda
tests/
  api/          Specs de API (projeto "api")
  ui/           Specs de UI (projeto "ui-chromium")
```

## Como rodar
Requisitos: Node.js 18+.
```bash
npm install
npx playwright install --with-deps chromium
npm test                # API + UI
npm run test:api        # só API
npm run test:ui         # só UI
npm run test:smoke      # testes marcados com @smoke
npm run test:evidencias # UI com screenshot de todos os testes (para docs/EVIDENCIAS.md)
npm run report          # abre o relatório HTML
npm run typecheck && npm run lint

# Relatório HTML da execução manual da API (Bruno CLI → reports/bruno/)
npm run bruno:exploratorio
```
A URL da loja pode ser trocada com `BASE_URL=... npm test` (padrão em `playwright.config.ts`).

### Linux Mint (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install -y curl git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# feche e reabra o terminal
nvm install --lts && node -v   # >= 18
npm install
npx playwright install --with-deps chromium
npm test
```
- Aviso de SO "não oficialmente suportado" é esperado no Mint; o Playwright usa o build do Ubuntu.
- Se `--with-deps` falhar por permissão: `sudo npx playwright install-deps` e depois `npx playwright install chromium`.
- Prints manuais: `PrtSc` ou `Shift+PrtSc` (área).

## Convenções
- IDs `CT-xx` nos títulos dos testes = linhas de `docs/CENARIOS.md` (rastreabilidade).
- Tags: `@api`, `@ui`, `@smoke`, `@regressao` (`npx playwright test --grep @smoke`).
- Page Objects não contêm asserções; testes usam web-first assertions (`await expect(locator)...`), sem `sleep`.
- Resultados esperados ficam em `src/data/` e valem para API e UI.
- Ambiente compartilhado: `workers: 2` e nenhum teste de carga/estresse/segurança (fora do escopo).

## Escopo
Fora do escopo (conforme o enunciado): carga, estresse e segurança. Comportamentos listados em
"Sobre este ambiente" da documentação não são reportados como bug. Premissas em `docs/AMBIGUIDADES.md`.
