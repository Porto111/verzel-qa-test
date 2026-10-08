# Mapa de elementos da UI (extraído do HTML da página de produtos)

| Elemento | Localizador |
|---|---|
| Aviso do ambiente | `.aviso-ambiente` (link para /documentacao) |
| Menu | `nav[aria-label="Principal"]`: Produtos `/`, Documentação `/documentacao`, Carrinho `/carrinho` |
| Contador do carrinho | `.contador-carrinho` (`aria-label="N itens no carrinho"`) |
| Destaque/promoção | `.destaque` (frete grátis a partir de R$ 200,00; BEMVINDO10 = 10%) |
| Lista de produtos | `ul.grade-produtos > li` (8 itens) |
| Card de produto | `article[aria-labelledby="nome-P00X"]` |
| Categoria / descrição / preço | `.produto-categoria`, `.produto-descricao`, `.produto-preco` |
| Botão adicionar | `getByRole('button', { name: 'Adicionar ao carrinho' })` dentro do card |
| Mensagem por produto | `#aviso-P00X` (`aria-live="polite"`, vazio no estado inicial) |

Categorias na UI: P001/P002/P006/P007 Vestuário · P003 Calçados · P004/P005/P008 Acessórios.

## Pontos para verificar na execução (não confirmados como bug)
- O contador conta unidades ou itens distintos? Gramática com 1 item ("1 itens no carrinho")?
- Texto exato exibido em `#aviso-P00X` ao tentar a 6ª unidade (CA10) e se há feedback ao adicionar.
- Botões "Adicionar ao carrinho" são idênticos entre cards (nome acessível vem do `article` rotulado) – checar com leitor de tela/teclado.
- A categoria da UI bate com a da API para os 8 produtos (CT-U11).
