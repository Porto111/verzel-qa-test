# language: pt
Funcionalidade: Confirmação de pedido (POST /api/pedidos)

  @CT-23 @positivo @api
  Cenário: Pedido válido com cupom
    Dado o cliente "Maria Silva", "maria@exemplo.com", CEP "01310-100"
    Quando confirmo o pedido com P005 x1 e cupom "BEMVINDO10"
    Então recebo 201
    E o número do pedido segue o formato "VZ-000000"
    E o CEP é devolvido como "01310100"
    E o total é R$ 109,90

  @CT-24 @negativo @api
  Esquema do Cenário: Cupom inválido ou expirado no pedido gera erro
    Quando confirmo o pedido com o cupom "<cupom>"
    Então recebo 422 com código "<codigo>"

    Exemplos:
      | cupom     | codigo         |
      | XPTO99    | CUPOM_INVALIDO |
      | VERAO2026 | CUPOM_EXPIRADO |

  @CT-25 @CT-26 @negativo @api
  Esquema do Cenário: Validação dos dados do cliente
    Quando confirmo o pedido com nome "<nome>", e-mail "<email>" e CEP "<cep>"
    Então o resultado é <resultado>

    Exemplos:
      | nome        | email              | cep       | resultado                    |
      | Maria       | maria@exemplo.com  | 01310-100 | 422 DADOS_INVALIDOS          |
      | Maria Silva | maria@             | 01310-100 | 422 DADOS_INVALIDOS          |
      | Maria Silva | maria@exemplo.com  | 0131010   | 422 DADOS_INVALIDOS          |
      | Maria Silva | maria@exemplo.com  | 0131010A  | 422 DADOS_INVALIDOS          |
      | Maria Silva | maria@exemplo.com  | 01310100  | 201 (CEP sem hífen é válido) |
