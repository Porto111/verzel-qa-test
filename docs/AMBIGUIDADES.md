# Ambiguidades e interpretações adotadas

| # | Trecho da documentação | Dúvida | Interpretação adotada |
|---|---|---|---|
| A1 | CA10 "vale para a interface e para a API" | O limite de 5 também vale em `/api/carrinho/calcular` ou só em `/api/pedidos`? | Vale nos dois endpoints (a tabela de erros não restringe `QUANTIDADE_MAXIMA_EXCEDIDA` a um deles). |
| A2 | CA02 "espaços no início e no fim são ignorados" | Espaços no MEIO do código (`BEM VINDO10`)? | Não são ignorados: espera-se "Cupom inválido.". |
| A3 | `cupom` opcional | Cupom `""`, só espaços ou `null` equivalem a "sem cupom" ou a cupom inválido? | Sem cupom (opcional). Registrar o comportamento observado e reportar apenas se houver inconsistência entre endpoints. |
| A4 | CA05 | A API só recebe um campo `cupom`; a regra "um por vez" é testável apenas na UI? | Sim: validar na UI (remover → aplicar outro). |
| A5 | CA11 "todos os valores são arredondados" | Com os preços e o único cupom válido (10%), todo resultado já tem ≤ 2 casas; o arredondamento só é exercitado por erros de ponto flutuante (ex.: 59,90 × 3). | CT-12 verifica isso; qualquer valor com mais de 2 casas é falha. |
| A6 | Erros 422 em `/calcular` | Para quantidade inválida e itens inválidos, o `calcular` usa os mesmos erros do pedido? | Sim, mesmo formato de erro `{erro:{codigo,mensagem,campo}}`. |
| A7 | `quantidade` como string `"2"` | É "número inteiro"? | Tratado como inválido (QUANTIDADE_INVALIDA); registrar comportamento real. |
| A8 | "CEP com 8 dígitos, com ou sem hífen" | Posição do hífen (`0131-0100`) é aceita? | Apenas formato `00000-000` ou `00000000`. |
| A9 | "nome e sobrenome" | Nome com espaços extras (`"Maria  "`) conta como sobrenome? | Não: precisa de duas palavras não vazias. |
| A10 | Ambiente | Carrinho só na aba; pedidos não persistem; sem estoque | Comportamentos esperados, não reportados como bug (seção "Sobre este ambiente"). |
| A11 | Home: "E na primeira compra, o cupom BEMVINDO10 dá 10%" | A documentação (CA01) não restringe o cupom à primeira compra, e o ambiente não tem login nem histórico de pedidos. | Interpretação: a restrição não é verificável/aplicável; o cupom vale em qualquer carrinho. Registrar como inconsistência de texto (sugestão de melhoria), não como defeito funcional. |
| A12 | Contador do carrinho (`aria-label="N itens no carrinho"`) | Conta unidades ou produtos distintos? E o singular ("1 item")? | Conta unidades. Verificar singular/plural e registrar divergência como melhoria de acessibilidade/texto. |
| A13 | Resumo do carrinho | A doc diz "frete R$ 0,00"; a UI exibe o texto "Grátis". | Equivalente: "Grátis" ≡ R$ 0,00. Não é bug. |
| A14 | Carrinho → "Finalizar compra" (/checkout) | A doc não descreve a tela de checkout, só as regras de cliente (nome e sobrenome, e-mail, CEP). | Validar as regras existentes no checkout e no `POST /api/pedidos`. |
| A15 | Mensagem de cupom aplicado | A API devolve "Cupom aplicado: 10% de desconto nos produtos."; a UI mostra "Cupom BEMVINDO10 aplicado." | A UI monta o próprio texto. Texto diferente não viola nenhum CA; registrar como observação (baixa). |
| A16 | CA05 na UI | Enquanto há cupom, o campo some e só aparece "Remover cupom". | Interpretado como a forma de cumprir "remover o atual para aplicar outro". |
| A17 | Desconto na UI | Aparece como "- R$ 84,94" (com sinal); sem cupom, "R$ 0,00". | Formato esperado de exibição; os testes de UI levam isso em conta. |
