# language: pt
Funcionalidade: Limite de quantidade e validações da API (CA10 e códigos de erro)

  @CT-13 @limite
  Cenário: 5 unidades de um produto é permitido
    Quando calculo o carrinho com "Boné Aba Curva" (P004) x5
    Então o subtotal é R$ 249,50 e o frete é R$ 0,00

  @CT-14 @CT-U04 @negativo @api @ui
  Cenário: Mais de 5 unidades de um produto é bloqueado na UI e na API
    Quando calculo ou confirmo um pedido com "Boné Aba Curva" (P004) x6
    Então recebo 422 com código "QUANTIDADE_MAXIMA_EXCEDIDA"

  @CT-15 @negativo @api
  Esquema do Cenário: Quantidade inválida
    Quando envio o item P001 com quantidade <quantidade>
    Então recebo 422 com código "QUANTIDADE_INVALIDA"

    Exemplos:
      | quantidade |
      | 0          |
      | -1         |
      | 1.5        |

  @CT-16 @CT-17 @CT-18 @CT-19 @negativo @api
  Esquema do Cenário: Erros de estrutura da requisição
    Quando envio a requisição "<caso>"
    Então recebo <status> com código "<codigo>"

    Exemplos:
      | caso                     | status | codigo                |
      | itens vazio              | 422    | ITENS_OBRIGATORIOS    |
      | itens ausente            | 422    | ITENS_OBRIGATORIOS    |
      | produto inexistente      | 422    | PRODUTO_NAO_ENCONTRADO|
      | produto repetido         | 422    | ITEM_DUPLICADO        |
      | corpo não é JSON válido  | 400    | JSON_INVALIDO         |
      | rota inexistente         | 404    | ROTA_NAO_ENCONTRADA   |
      | GET em /carrinho/calcular| 405    | METODO_NAO_PERMITIDO  |
