# Cenários de teste e resultados – VZS-142 v2.3.0

Legenda de status: ✅ Passou · ❌ Falhou (ver BUG) · ⏳ Pendente de execução.
Os resultados esperados vêm da documentação da entrega. Preencher "Obtido", "Status" e "Evidência" ao executar.
Camada: **API** (Bruno/Playwright) · **UI** (manual).

| ID | Regra | Cenário | Camada | Esperado | Obtido | Status | Evidência | Bug |
|----|-------|---------|--------|----------|--------|--------|-----------|-----|
| CT-01 | CA01 | BEMVINDO10 em P002x1 + P004x2 | API/UI | subtotal 239,70; desconto 23,97; frete 0; total 215,73 | | ⏳ | | |
| CT-02 | CA02 | Cupom em minúsculas/misto (`bemvindo10`, `BemVindo10`) | API/UI | desconto de 10% aplicado | | ⏳ | | |
| CT-03 | CA02 | Cupom com espaços nas pontas (`  BEMVINDO10  `) | API/UI | desconto de 10% aplicado | | ⏳ | | |
| CT-04 | CA03 | Cupom inexistente (`XPTO99`) | API/UI | "Cupom inválido."; desconto 0 | | ⏳ | | |
| CT-05 | CA04 | Cupom expirado (`VERAO2026`) | API/UI | "Cupom expirado."; desconto 0 | | ⏳ | | |
| CT-06 | CA07 | P005x1 sem cupom | API/UI | frete 19,90; faltam 100,00; total 119,90 | | ⏳ | | |
| CT-07 | CA06 | P005x2 = 200,00 exato | API/UI | frete 0; frete grátis; total 200,00 | | ⏳ | | |
| CT-08 | CA07 | P003x1 = 189,90 | API/UI | frete 19,90; faltam 10,10; total 209,80 | | ⏳ | | |
| CT-09 | CA06/07 | P001x1 + P002x1 = 199,80 | API | frete 19,90; faltam 0,20; total 219,70 | | ⏳ | | |
| CT-10 | CA08 | P005x2 + BEMVINDO10 (subtotal 200 → desconto 20) | API/UI | frete 0 (usa subtotal pré-desconto); total 180,00 | | ⏳ | | |
| CT-11 | CA09 | P005x1 + BEMVINDO10 | API/UI | desconto 10,00; frete 19,90; total 109,90 | | ⏳ | | |
| CT-12 | CA11 | P001x3 + BEMVINDO10 (59,90×3) | API | subtotal 179,70; desconto 17,97; frete 19,90; faltam 20,30; total 181,63 | | ⏳ | | |
| CT-13 | CA10 | P004x5 (limite) | API/UI | aceito; subtotal 249,50; frete 0 | | ⏳ | | |
| CT-14 | CA10 | P004x6 | API/UI | 422 QUANTIDADE_MAXIMA_EXCEDIDA (API); UI impede | | ⏳ | | |
| CT-15 | – | Quantidade 0, -1, 1.5 | API | 422 QUANTIDADE_INVALIDA | | ⏳ | | |
| CT-16 | – | `itens` ausente / vazio | API | 422 ITENS_OBRIGATORIOS | | ⏳ | | |
| CT-17 | – | Produto inexistente (P999) | API | 422 PRODUTO_NAO_ENCONTRADO | | ⏳ | | |
| CT-18 | – | Produto repetido na lista | API | 422 ITEM_DUPLICADO | | ⏳ | | |
| CT-19 | – | Corpo não-JSON | API | 400 JSON_INVALIDO | | ⏳ | | |
| CT-20 | – | GET /api/produtos | API | 200; 8 produtos | | ⏳ | | |
| CT-21 | – | GET /api/produtos/P001 e /P999 | API | 200 (59,90) e 404 PRODUTO_NAO_ENCONTRADO | | ⏳ | | |
| CT-22 | – | Rota inexistente e método não permitido | API | 404 ROTA_NAO_ENCONTRADA; 405 METODO_NAO_PERMITIDO | | ⏳ | | |
| CT-23 | – | Pedido válido com cupom | API | 201; `VZ-000000`; CEP `01310100`; total 109,90 | | ⏳ | | |
| CT-24 | – | Pedido com cupom inválido / expirado | API | 422 CUPOM_INVALIDO / CUPOM_EXPIRADO | | ⏳ | | |
| CT-25 | regra existente | Nome sem sobrenome; e-mail inválido; CEP 7 dígitos; CEP com letras | API/UI | 422 DADOS_INVALIDOS (UI bloqueia/mostra erro) | | ⏳ | | |
| CT-26 | regra existente | CEP com 8 dígitos sem hífen | API/UI | aceito | | ⏳ | | |
| CT-U03 | CA05 | Com cupom aplicado, tentar aplicar outro; remover e aplicar VERAO2026 | UI | campo de cupom some enquanto há cupom; após "Remover cupom" volta e aceita novo código | | ⏳ | | |
| CT-U05 | CA07 | Aviso "Faltam R$ X para o frete grátis." (P005x1 → X = 100,00) | UI | aviso exibido com o valor correto | | ⏳ | | |
| CT-U06 | CA10 | Botão "+" além de 5 unidades | UI | bloqueia ou avisa; sem 6ª unidade | | ⏳ | | |
| CT-U07 | – | Interface exibe o mesmo valor que a API calcula | UI/API | valores idênticos | | ⏳ | | |
| CT-U08 | Ambiente | Carrinho some em outra aba (comportamento esperado, NÃO é bug) | UI | carrinho vazio | | ⏳ | | |
| CT-U09 | – | Vitrine lista os 8 produtos com nome, categoria, descrição e preço iguais à API | UI/API | dados idênticos | | ⏳ | | |
| CT-U10 | – | Adicionar ao carrinho atualiza o contador do cabeçalho (e seu texto acessível: "1 item" vs "1 itens") | UI | contador = quantidade adicionada | | ⏳ | | |
| CT-U11 | CA10 | Limite de 5 na vitrine: 6º clique no mesmo produto | UI | bloqueia e/ou exibe aviso (`#aviso-P004`); nunca chega a 6 | | ⏳ | | |
| CT-U12 | CA06/CA01 | Destaque da home: frete grátis a partir de R$ 200,00 e cupom BEMVINDO10 (10%) | UI | textos coerentes com a documentação (ver A11 sobre "primeira compra") | | ⏳ | | |
| CT-U13 | – | Navegação: Produtos, Documentação, Carrinho; título da aba | UI | rotas e título corretos | | ⏳ | | |
| CT-U14 | – | Acessibilidade básica: botões "Adicionar ao carrinho" repetidos sem nome do produto, foco por teclado, aviso `aria-live` | UI | observar e registrar (severidade baixa) | | ⏳ | | |
| CT-U15 | CA06/CA09 | Resumo com os 8 produtos (subtotal 849,40) | UI | desconto 0,00; frete "Grátis"; total 849,40 | | ⏳ | | |
| CT-U16 | – | Remover item recalcula resumo e contador | UI | subtotal/frete/contador atualizados | | ⏳ | | |
| CT-U17 | – | Botão "-" com 1 unidade | UI | desabilitado (visto no HTML) | | ⏳ | | |
| CT-U18 | CA07/CA08 | Cupom aplicado + reduzir quantidade (P005 2→1) | UI | desconto 10,00; frete passa a 19,90; total 109,90 | | ⏳ | | |
| CT-U19 | – | Esvaziar carrinho | UI | carrinho vazio; contador 0 | | ⏳ | | |
| CT-U20 | regra existente | Checkout: nome/e-mail/CEP e confirmação do pedido | UI | validações da doc; nº VZ-000000 | | ⏳ | | |
| CT-U21 | CA06/CA07 | Aviso de faltante some ao atingir R$ 200,00 | UI | aviso oculto com subtotal ≥ 200 | | ⏳ | | |
| CT-U22 | CA02 | Cupom aplicado: mensagem, rótulo "Desconto (BEMVINDO10)" e código normalizado | UI | "Cupom BEMVINDO10 aplicado." mesmo digitando `  bemvindo10  ` | | ⏳ | | |
| CT-U23 | CA01/07/09 | P004 + P008 + BEMVINDO10 | UI | subtotal 99,90; desconto -9,99; frete 19,90; total 109,81; "Faltam R$ 100,10" | subtotal 99,90; desconto -9,99; frete 19,90; total 109,81; "Faltam R$ 100,10 para o frete grátis." (HTML capturado) | ✅ (anexar print) | | |
| CT-U24 | CA01/06/08 | 8 produtos x1 + BEMVINDO10 | UI | subtotal 849,40; desconto -84,94; frete Grátis; total 764,46 | subtotal 849,40; desconto -84,94; frete Grátis; total 764,46 (HTML capturado) | ✅ (anexar print) | | |
| CT-U10 | Vitrine | 8 produtos com nome, categoria, descrição e preço corretos | UI | conforme tabela de produtos da doc | | ⏳ | | |
| CT-U11 | Vitrine | Dados da vitrine = `/api/produtos` | UI/API | idênticos | | ⏳ | | |
| CT-U12 | Carrinho | Adicionar produto atualiza o contador | UI | contador = 1 | | ⏳ | | |
| CT-U13 | Carrinho | Estado inicial vazio | UI | contador 0 | | ⏳ | | |
| CT-U14 | Carrinho | Itens permanecem ao ir a /carrinho e voltar (mesma aba) | UI | contador mantido | | ⏳ | | |
| CT-U15 | CA06/CA09 | Resumo com os 8 produtos (subtotal 849,40) | UI | desconto 0,00; frete "Grátis"; total 849,40 | | ⏳ | | |
| CT-U16 | – | Remover item recalcula resumo e contador | UI | subtotal/frete/contador atualizados | | ⏳ | | |
| CT-U17 | – | Botão "-" com 1 unidade | UI | desabilitado (visto no HTML) | | ⏳ | | |
| CT-U18 | CA07/CA08 | Cupom aplicado + reduzir quantidade (P005 2→1) | UI | desconto 10,00; frete passa a 19,90; total 109,90 | | ⏳ | | |
| CT-U19 | – | Esvaziar carrinho | UI | carrinho vazio; contador 0 | | ⏳ | | |
| CT-U20 | regra existente | Checkout: nome/e-mail/CEP e confirmação do pedido | UI | validações da doc; nº VZ-000000 | | ⏳ | | |
| CT-U21 | CA06/CA07 | Aviso de faltante some ao atingir R$ 200,00 | UI | aviso oculto com subtotal ≥ 200 | | ⏳ | | |
| CT-U22 | CA02 | Cupom aplicado: mensagem, rótulo "Desconto (BEMVINDO10)" e código normalizado | UI | "Cupom BEMVINDO10 aplicado." mesmo digitando `  bemvindo10  ` | | ⏳ | | |
| CT-U23 | CA01/07/09 | P004 + P008 + BEMVINDO10 | UI | subtotal 99,90; desconto -9,99; frete 19,90; total 109,81; "Faltam R$ 100,10" | subtotal 99,90; desconto -9,99; frete 19,90; total 109,81; "Faltam R$ 100,10 para o frete grátis." (HTML capturado) | ✅ (anexar print) | | |
| CT-U24 | CA01/06/08 | 8 produtos x1 + BEMVINDO10 | UI | subtotal 849,40; desconto -84,94; frete Grátis; total 764,46 | subtotal 849,40; desconto -84,94; frete Grátis; total 764,46 (HTML capturado) | ✅ (anexar print) | | |
| CT-U15 | Navegação | Links Produtos / Documentação / Carrinho | UI | páginas corretas | | ⏳ | | |
| CT-U16 | Promoção | Destaque informa frete grátis a partir de R$ 200,00 e BEMVINDO10 (10%) | UI | textos coerentes com a doc | | ⏳ | | |

## Sessões exploratórias sugeridas (preencher achados em BUGS.md)

| Sessão | Ideias |
|---|---|
| Cupom | código com espaço no meio (`BEM VINDO10`), vazio `""`, só espaços, `null`, número, lista, caracteres especiais, 1000 caracteres, aplicar o mesmo cupom duas vezes, cupom com acento |
| Quantidade | digitar 6, 99, 0, negativo, decimal e letras no campo; colar valor; editar quantidade após aplicar cupom |
| Carrinho | adicionar/remover itens com cupom ativo e ver se desconto/frete recalculam; remover todos os itens; recarregar a página |
| Fronteira de frete | combinações perto de 200,00 (199,80 / 200,00 / 200,10), mudando quantidades |
| API | `produtoId` minúsculo (`p001`) ou vazio; `quantidade` string `"2"`; `itens` não array; `cliente` ausente; body array; Content-Type diferente; campos extras |
| Pedido | nome com espaços extras, só espaços, e-mail com espaço, CEP `0131-0100`, CEP com espaços; pedido sem cupom |
| UI | responsividade, mensagens (texto exato "Cupom inválido." / "Cupom expirado."), acessibilidade básica, foco/teclado (Enter aplica cupom?), estados de erro/loading |
