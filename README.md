# Teste técnico QA – Verzel Store (card VZS-142 v2.3.0: cupom e frete grátis)

Validação da entrega "Cupom de desconto e frete grátis": cenários em Gherkin, execução manual/exploratória,
bugs, evidências e automação com **Playwright + TypeScript** organizada em **Page Object Model**.

## Onde encontrar cada entrega
| Entrega | Local |
|---|---|
| Cenários em Gherkin | `features/*.feature` |
| Matriz de cenários + resultados + sessões exploratórias | `docs/CENARIOS.xlsx` (abas Cenários, Exploratórias e Resumo) |
| Roteiros de execução manual (PPT, 1 cartão por evidência) | `docs/exec_manual/` (API · Cupom e frete · Checkout e responsividade) |
| Bugs (BUG-01, BUG-02 e BUG-03) | `docs/BUGS.md` |
| Evidências da execução | `docs/EVIDENCIAS.md` e `docs/evidencias/screenshots/` |
| Ambiguidades e interpretações | `docs/AMBIGUIDADES.md` |
| Roteiro de execução da API (curl) | `docs/EXECUCAO_API.md` |
| Mapa de elementos da UI | `docs/ELEMENTOS_UI.md` |
| Uso de IA | seção "Uso de IA" deste README |
| Arquitetura da automação (POM) | `docs/ARQUITETURA.md` |
| Collection Bruno (exploratórios de API) + relatório Bruno CLI | `bruno/` e `docs/BRUNO.md` |
| Automação | `tests/` (specs) e `src/` (page objects, API client, dados) |

## Resultado da execução (09/10/2026)
Três defeitos encontrados, todos com evidência e reprodução na API ou na UI:
- **BUG-01** – frete grátis não aplicado com subtotal de R$ 200,00 (CA06);
- **BUG-02** – o mesmo com o cupom BEMVINDO10, em que o frete deveria usar o subtotal antes do desconto (CA06 e CA08);
- **BUG-03** – a API aceita mais de 5 unidades por produto (CA10).

Detalhes em `docs/BUGS.md`; a lista de cenários e o que foi observado em cada um estão em `docs/EVIDENCIAS.md`.

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
npm run test:evidencias # UI com screenshot de todos os testes (gerados em test-results/, pasta local e não versionada)
npm run report          # abre o relatório HTML
npm run typecheck && npm run lint
npm run docs:check      # confere links, caminhos citados, IDs de bug e marcadores sem preencher

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
- IDs `CT-xx` nos títulos dos testes = linhas da aba Cenários de `docs/CENARIOS.xlsx` (rastreabilidade).
- Tags: `@api`, `@ui`, `@smoke`, `@regressao` (`npx playwright test --grep @smoke`).
- Page Objects não contêm asserções; testes usam web-first assertions (`await expect(locator)...`), sem `sleep`.
- Resultados esperados ficam em `src/data/` e valem para API e UI.
- Ambiente compartilhado: `workers: 2` e nenhum teste de carga/estresse/segurança (fora do escopo).

## Uso de IA

**Ferramenta:** Claude (Anthropic), em chat, como assistente em todas as etapas do desafio. Eu defini o que seria feito, executei o que exigia o navegador e a API e validei cada resultado. A IA não acessa o ambiente de teste.

### Do início à entrega

| Etapa | Como usei a IA | O que eu fiz e decidi |
|---|---|---|
| 1. Entendimento do desafio | Enviei o PDF do teste e pedi a análise da documentação e das regras de negócio (CA01 a CA10), exigindo que as regras fossem seguidas à risca | Li as regras, conferi a interpretação e aprovei as decisões sobre os pontos em que a documentação era ambígua (`docs/AMBIGUIDADES.md`) |
| 2. Planejamento | Pedi cenários em Gherkin e a matriz de casos com valores esperados por item, cobrindo as fronteiras de frete (R$ 200,00) e de quantidade (5 unidades) | Revisei os valores esperados contra as regras e decidi o que ia para a automação e o que ia para a execução manual |
| 3. Automação | Pedi a estrutura em Playwright + TypeScript com Page Objects, componentes, fixtures, cliente de API tipado e dados centralizados | Executei a suíte, confirmei que as falhas apontavam para defeitos do produto e não para seletor ou instabilidade, e ajustei o que era necessário |
| 4. O que a IA não podia executar | Pedi roteiros passo a passo (cartões de evidência nos PPTs e a collection do Bruno) | Executei no Linux Mint, com Chrome e Bruno, e capturei os prints de cada sessão exploratória |
| 5. Bugs | Pedi apoio na redação dos reports | Reproduzi os defeitos, defini severidade e critério violado e encontrei os dois defeitos da entrega, sem falso bug |
| 6. Feedback e correção | Enviei o retorno do time da Verzel e o projeto, e pedi a análise e a correção | Validei cada apontamento: títulos dos reports, marcadores sem preencher, IDs repetidos, observações das exploratórias, evidências e links do README |

### O que aprendi com o feedback
Na primeira entrega, a automação e o planejamento estavam sólidos, mas a **revisão final** da documentação falhou (títulos de bug imprecisos, IDs repetidos, links para arquivos inexistentes). Isso é um erro meu de conferência, e não da ferramenta: o texto gerado por IA precisa ser lido e verificado antes de publicar. Por isso:
- criei o `scripts/check-docs.mjs` (`npm run docs:check`), que confere links, caminhos citados, IDs de bug repetidos, marcadores `<...>` e erros de digitação;
- passei a comparar cada observação e cada valor com o print ou a resposta da API de origem;
- quando uma evidência não prova o cenário (como EX-A2-05, EX-U1-05 e EX-U5-06), o item fica como pendente em vez de ser preenchido por suposição.

### Como uso IA no trabalho de QA
- Aceleração do trabalho repetitivo: análise de requisitos, rascunho de cenários, estrutura de código, documentação e varredura de arquivos.
- Decisão e responsabilidade comigo: o que testar, o que é bug, a severidade e o critério violado.
- Verificação contra a fonte: regra de negócio, print, resposta da API ou execução do teste.
- Automação das conferências que se repetem, para que o erro seja pego antes da entrega.

## Escopo
Fora do escopo (conforme o enunciado): carga, estresse e segurança. Comportamentos listados em
"Sobre este ambiente" da documentação não são reportados como bug. Premissas em `docs/AMBIGUIDADES.md`.
