# Bugs encontrados

## BUG-01 UI/API – <Desconto não concedido sem cupom aplicado >
- **Severidade / Prioridade: ** Alta
- **Ambiente:** [URL](https://verzel-store.qa-test-verzel-store.workers.dev/carrinho), Chrome, Data 09/10/2026
- **Regra de negócio violada (seção da doc): ** CA06 O frete é grátis para compras com subtotal a partir de R$ 200,00, inclusive.

- **Passos para reproduzir:**
- Na home, adicione 4× o produto P008(Garrafa Térmica 750ml).
- Abra o Carrinho.
- A somatória dos itens no carrinho é de R$ 200,00

- **Resultado esperado:** Alcançar o valor total de R$ 200,00, e ganhar o frete grátis.

- **Resultado obtido:** Ao adicionar 4x o produto P008(Garrafa Térmica 750ml), que custa R4 50,00,cada, e totalizando R$ 200,00, a cobrança do frete permanece ativa ignorando co citério CA06.  
- **Evidência:** docs/evidencias/screenshots/bugs/EX-U4-03.png
- **Cenário relacionado:** EX-U4-03


## BUG-02 UI/API – <Desconto não concedido com cupom aplicado >
- **Severidade / Prioridade: ** Alta
- **Ambiente:** [URL](https://verzel-store.qa-test-verzel-store.workers.dev/carrinho), Chrome, data Data 09/10/2026
- **Regra de negócio violada (seção da doc): ** 
- CA06 O frete é grátis para compras com subtotal a partir de R$ 200,00, inclusive. 
- CA09 O desconto do cupom não incide sobre o frete.

- **Passos para reproduzir:**
- Na home, adicione 4× o produto P008(Garrafa Térmica 750ml).
- Abra o Carrinho.
- Digite BEMVINDO10 em "Cupom de desconto" e clique em "Aplicar cupom".

- **Resultado esperado:** Alcançar o valor total de R$ 200,00, e ganhar o frete grátis e pagar 
R$ 180,00, por conta do cupom BEMVINDO10 aplicado.

- **Resultado obtido:** Ao adicionar 4x o produto P008(Garrafa Térmica 750ml), que custa R4 50,00,cada, e totalizando R$ 200,00, e aplicar o cupom BEMVINDO10 a cobrança do frete permanece ativa, e, ao invés de o valor final ser R$ 180,00, é cobrado o valor de R$ 199,90, ignorando os citérios CA06 e CA09.  
- **Evidência:** docs/evidencias/screenshots/bugs/EX-U4-04.png
- **Cenário relacionado:** EX-U4-04


## BUG-02 API – <Limite de produto excedido>
- **Severidade / Prioridade: ** Alta
- **Ambiente:** [URL](https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular), Chrome, Data 09/10/2026
- **Regra de negócio violada (seção da doc): ** 
- CA10 Cada produto pode ter no máximo 5 unidades por pedido. A regra vale para a interface e para a API.

- **Passos para reproduzir:**
- envio POST /api/carrinho/calcular
- o corpo contém o produto P001 quantidade= 99
- Visualizo o status e o corpo da resposta

- **Resultado esperado:** Não conseguir incluir mais que 5 unidades de um mesmo produto no carrinho.

- **Resultado obtido:** Ao anviar uma requisição POST incluindo 99 unidades do mesmo produto no carrinho, a quantidade é aceita e retorna status code-200, aplicando o calculo total e o frete grátis,  ignorando o citério CA10.  
- **Evidência:** docs/evidencias/screenshots/bugs/EX-A2-04.png
- **Cenário relacionado:** EX-A2-04