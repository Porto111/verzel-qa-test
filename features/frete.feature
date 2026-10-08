# language: pt
Funcionalidade: Frete grátis (VZS-142 – CA06 a CA08)

  @CT-06 @api @ui
  Cenário: Abaixo de R$ 200,00 cobra frete fixo e informa o quanto falta
    Dado que o carrinho contém "Mochila Urbana 20L" (P005) x1
    Então o frete é R$ 19,90
    E o carrinho informa que faltam R$ 100,00 para o frete grátis
    E o total é R$ 119,90

  @CT-07 @limite @api @ui
  Cenário: Subtotal exatamente R$ 200,00 tem frete grátis (inclusive)
    Dado que o carrinho contém "Mochila Urbana 20L" (P005) x2
    Então o frete é R$ 0,00
    E o frete grátis é indicado
    E o total é R$ 200,00

  @CT-08 @CT-09 @limite @api
  Esquema do Cenário: Subtotal logo abaixo do limite cobra frete
    Dado que o carrinho contém <itens>
    Então o subtotal é R$ <subtotal>
    E o frete é R$ 19,90
    E faltam R$ <faltante> para o frete grátis
    E o total é R$ <total>

    Exemplos:
      | itens                                 | subtotal | faltante | total  |
      | "Tênis Casual Urbano" (P003) x1       | 189,90   | 10,10    | 209,80 |
      | P001 x1 e P002 x1                     | 199,80   | 0,20     | 219,70 |

  @CT-10 @regra @api
  Cenário: A regra do frete grátis considera o subtotal ANTES do desconto (CA08)
    Dado que o carrinho contém "Mochila Urbana 20L" (P005) x2
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal é R$ 200,00
    E o desconto é R$ 20,00
    E o frete é R$ 0,00
    E o total é R$ 180,00
