# Arquitetura da automação (Page Object Model)

## Camadas
| Camada | Pasta | Responsabilidade |
|---|---|---|
| Testes | `tests/` | Cenário, dados de entrada e asserções. Não conhecem seletores. |
| Page Objects | `src/pages` | Uma classe por página; expõem ações do usuário e Locators. |
| Componentes | `src/components` | Pedaços repetidos da UI (cabeçalho, card, linha do carrinho, resumo, cupom). |
| API client | `src/api` | `VerzelApi`: chamadas tipadas que devolvem `{ status, body }`. |
| Dados | `src/data` | Catálogo, cupons, clientes e **resultados esperados** (CENARIOS_CALCULO). |
| Fixtures | `src/fixtures` | Injeta page objects/API e a fixture `carrinhoCom(itens)`. |
| Suporte | `src/support` | `esperarResumo` (asserção de domínio) e formatação de moeda. |

## Decisões
1. **Sem asserções nos page objects.** Eles descrevem a tela; o teste decide o que verificar.
   O que se repete (resumo do pedido) vira helper explícito em `support/assertions.ts`.
2. **Fonte única de verdade.** `CENARIOS_CALCULO` alimenta testes de API (valores numéricos)
   e de UI (texto formatado), evitando divergência e duplicação.
3. **Seletores resilientes:** `getByRole`/`getByLabel` e nomes acessíveis primeiro; CSS/atributos
   (`[data-valor]`, `.aviso-frete`) só quando a página não oferece papel/label. Se a loja ganhar
   `data-testid`, trocar apenas dentro de `src/components`.
4. **Estado do carrinho:** vive só na aba; por isso `carrinhoCom` monta o carrinho pela vitrine
   (como o usuário faria) e cada teste roda isolado (contexto novo do Playwright).
5. **Dois projetos Playwright** (`api` sem navegador e `ui-chromium`), tags e `workers: 2`
   por ser ambiente compartilhado.
6. **Tipos fortes** (`strict`, `noUncheckedIndexedAccess`) e aliases (`@pages`, `@data`...).
7. **Evidências:** `EVIDENCIAS=1` liga screenshot em todos os testes de UI; falhas sempre geram
   screenshot e trace no 1º retry.

## Como adicionar um teste
1. Novo cenário de cálculo? Inclua em `src/data/cenarios-calculo.ts` (vale para API e UI).
2. Nova tela? Crie `src/pages/NovaPage.ts` estendendo `BasePage` e, se houver parte reutilizável,
   um componente em `src/components`.
3. Escreva o spec em `tests/ui` ou `tests/api` usando `import { test, expect } from '@fixtures'`.
4. Registre o `CT-xx` em `docs/CENARIOS.md`.

## Pendências
- `CheckoutPage` e a tela de confirmação (precisam do HTML de `/checkout`) – `tests/ui/checkout.spec.ts` está com `test.fixme`.
- Confirmar na 1ª execução o comportamento exato no limite de 5 unidades (CT-U06/CT-U11).
