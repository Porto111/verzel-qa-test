# language: pt
Funcionalidade: Cupom de desconto no carrinho (VZS-142 – CA01 a CA05, CA09)
  Como cliente da Verzel Store
  Quero aplicar um cupom de desconto
  Para pagar menos nas minhas compras

  Contexto:
    Dado que o carrinho contém "Calça Jeans Slim" (P002) x1 e "Boné Aba Curva" (P004) x2

  @CT-01 @positivo @api @ui
  Cenário: Aplicar o cupom válido BEMVINDO10
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal é R$ 239,70
    E o desconto é R$ 23,97
    E o frete é R$ 0,00
    E o total é R$ 215,73

  @CT-02 @CT-03 @api @ui
  Esquema do Cenário: Código do cupom ignora caixa e espaços nas pontas
    Quando aplico o cupom "<codigo>"
    Então o cupom é aplicado com 10% de desconto

    Exemplos:
      | codigo         |
      | bemvindo10     |
      | BemVindo10     |
      |   BEMVINDO10   |

  @CT-04 @negativo @api @ui
  Cenário: Cupom inexistente
    Quando aplico o cupom "XPTO99"
    Então vejo a mensagem "Cupom inválido."
    E nenhum desconto é aplicado

  @CT-05 @negativo @api @ui
  Cenário: Cupom expirado
    Quando aplico o cupom "VERAO2026"
    Então vejo a mensagem "Cupom expirado."
    E nenhum desconto é aplicado

  @CT-U03 @ui
  Cenário: Apenas um cupom por vez; para trocar é preciso remover o atual
    Dado que o cupom "BEMVINDO10" está aplicado
    Quando tento aplicar outro cupom sem remover o atual
    Então o segundo cupom não é aplicado
    Quando removo o cupom atual
    Então posso aplicar outro cupom

  @CT-11 @api
  Cenário: O desconto não incide sobre o frete (CA09)
    Dado que o carrinho contém "Mochila Urbana 20L" (P005) x1
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal é R$ 100,00
    E o desconto é R$ 10,00
    E o frete é R$ 19,90
    E o total é R$ 109,90

  @CT-12 @api
  Cenário: Arredondamento em 2 casas decimais (CA11)
    Dado que o carrinho contém "Camiseta Essencial" (P001) x3
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal é R$ 179,70
    E o desconto é R$ 17,97
    E o total é R$ 181,63
