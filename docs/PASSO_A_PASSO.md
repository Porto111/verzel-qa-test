# O que falta fazer (só você consegue, pois exige acesso à loja)

1. Ler `/documentacao` (já refletida em `docs/CENARIOS.md`) e conferir se os cenários fazem sentido.
2. Executar cada cenário (UI manual + API, ver `docs/EXECUCAO_API.md`); preencher "Obtido", "Status" e salvar prints em `docs/evidencias/screenshots/` com o nome do cenário (ex.: `CT-07.png`).
3. Fazer as sessões exploratórias (tabela no fim de `docs/CENARIOS.md`).
4. Reportar cada falha em `docs/BUGS.md` (um bug por defeito). Antes, confira "Sobre este ambiente": carrinho só na aba, pedidos não persistem, sem e-mail/cobrança, sem estoque, API stateless NÃO são bugs.
5. Instalar e rodar a automação (Linux Mint: veja a seção própria no README – instale o Node 18+ via nvm e use `npx playwright install --with-deps`): `npm install && npx playwright install --with-deps chromium && npm test` (veja `README.md` e `docs/ARQUITETURA.md`). Se algum teste falhar, confirme se é bug do produto ou erro de expectativa/ambiguidade (registre em `AMBIGUIDADES.md`).
6. Criar `CheckoutPage` em `src/pages` (precisa do HTML de `/checkout`) e implementar `tests/ui/checkout.spec.ts`.
7. Atualizar `docs/USO_DE_IA.md`, subir tudo em um repositório PÚBLICO no GitHub, conferir se abre sem login e enviar em https://elitedev.verzel.com.br/ (prazo: 5 dias corridos).
