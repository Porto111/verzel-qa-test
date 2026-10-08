# language: pt
Funcionalidade: Vitrine de produtos e carrinho (UI)

  @CT-U09 @ui
  Cenário: Vitrine exibe os produtos conforme a API
    Quando acesso a página inicial
    Então vejo 8 produtos com nome, categoria, descrição e preço iguais aos de GET /api/produtos

  @CT-U10 @ui
  Cenário: Adicionar produtos atualiza o contador do carrinho
    Dado que o carrinho está vazio
    Quando adiciono "Camiseta Essencial" e "Calça Jeans Slim"
    Então o contador do carrinho mostra 2

  @CT-U11 @limite @ui
  Cenário: Não é possível passar de 5 unidades do mesmo produto
    Dado que adicionei "Boné Aba Curva" 5 vezes
    Quando tento adicionar a 6ª unidade
    Então a unidade não é adicionada e vejo um aviso no card do produto

  @CT-U08 @ambiente @ui
  Cenário: Carrinho existe apenas na aba atual
    Dado que adicionei um produto ao carrinho
    Quando abro a loja em outra aba
    Então o carrinho está vazio
