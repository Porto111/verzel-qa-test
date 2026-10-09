# O que falta fazer (só você consegue, pois exige acesso à loja)

A automação (Playwright) cobre as regras de UI e de API. A **execução manual** é dos **cenários exploratórios**.

1. Rode a automação e guarde o relatório: `npm install && npx playwright install --with-deps chromium && npm test`
   (veja `README.md` e `docs/ARQUITETURA.md`). Falhas: confirme manualmente antes de abrir bug.
2. Abra `docs/Execucao-Manual-Verzel-Store.pptx`: são 56 cartões de evidência (33 de UI e 23 de API), em Gherkin.
   - **UI (roxo):** execute na loja, no navegador.
   - **API (azul-petróleo):** execute no Bruno (`bruno/`, environment "Verzel Store"; veja `docs/BRUNO.md`).
3. Para cada cartão: tire o print, salve com o nome indicado em `docs/evidencias/screenshots/` e cole no PPT.
4. Registre o resultado em `docs/CENARIOS.xlsx` (aba Exploratórias): Sem achados / Bug encontrado + observação.
5. Reporte cada divergência em `docs/BUGS.md`. Antes, confira "Sobre este ambiente": carrinho só na aba, pedidos
   não persistem, sem e-mail/cobrança, sem estoque e API sem estado NÃO são bugs.
6. Opcional: relatório HTML do Bruno CLI (`npm run bruno:exploratorio`) como evidência complementar.
7. Criar `CheckoutPage` em `src/pages` (precisa do HTML de `/checkout`) e implementar `tests/ui/checkout.spec.ts`.
8. Atualizar `docs/USO_DE_IA.md`, subir tudo em um repositório PÚBLICO no GitHub, conferir se abre sem login e enviar
   em https://elitedev.verzel.com.br/ (prazo: 5 dias corridos).
