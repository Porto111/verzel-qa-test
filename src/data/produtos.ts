export interface ProdutoCatalogo {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
}

export const PRODUTOS = {
  P001: { id: 'P001', nome: 'Camiseta Essencial', categoria: 'Vestuário', descricao: 'Algodão penteado e corte reto.', preco: 59.9 },
  P002: { id: 'P002', nome: 'Calça Jeans Slim', categoria: 'Vestuário', descricao: 'Jeans com elastano e lavagem escura.', preco: 139.9 },
  P003: { id: 'P003', nome: 'Tênis Casual Urbano', categoria: 'Calçados', descricao: 'Solado de borracha e cabedal em lona.', preco: 189.9 },
  P004: { id: 'P004', nome: 'Boné Aba Curva', categoria: 'Acessórios', descricao: 'Ajuste traseiro com fivela metálica.', preco: 49.9 },
  P005: { id: 'P005', nome: 'Mochila Urbana 20L', categoria: 'Acessórios', descricao: 'Compartimento acolchoado para notebook.', preco: 100.0 },
  P006: { id: 'P006', nome: 'Kit 3 Pares de Meias', categoria: 'Vestuário', descricao: 'Cano médio, algodão com reforço no calcanhar.', preco: 29.9 },
  P007: { id: 'P007', nome: 'Jaqueta Corta-Vento', categoria: 'Vestuário', descricao: 'Tecido leve e repelente à água.', preco: 229.9 },
  P008: { id: 'P008', nome: 'Garrafa Térmica 750ml', categoria: 'Acessórios', descricao: 'Mantém a temperatura por até 12 horas.', preco: 50.0 },
} as const satisfies Record<string, ProdutoCatalogo>;

export type IdProduto = keyof typeof PRODUTOS;

export const TODOS_OS_PRODUTOS: readonly ProdutoCatalogo[] = Object.values(PRODUTOS);

export const nomeDe = (id: IdProduto): string => PRODUTOS[id].nome;
