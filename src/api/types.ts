export interface ItemPedido {
  produtoId: string;
  quantidade: number;
}

export interface Cliente {
  nome: string;
  email: string;
  cep: string;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
}

/** Valores monetários devolvidos pela API (e exibidos no resumo da UI). */
export interface ValoresCarrinho {
  subtotal: number;
  desconto: number;
  frete: number;
  freteGratis: boolean;
  valorFaltanteFreteGratis: number;
  total: number;
}

export interface CupomResultado {
  codigo: string;
  aplicado: boolean;
  mensagem: string;
}

export interface ItemCalculado {
  produtoId: string;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  total: number;
}

export interface CalculoResponse extends ValoresCarrinho {
  itens: ItemCalculado[];
  cupom: CupomResultado;
}

export interface PedidoResponse extends CalculoResponse {
  numero: string;
  criadoEm: string;
  cliente: Cliente;
}

export interface ErroResponse {
  erro: { codigo: string; mensagem: string; campo?: string; campos?: unknown };
}

export interface ApiResposta<T> {
  status: number;
  body: T;
}

/** Corpo livre, para montar requisições inválidas em testes negativos. */
export type Payload = Record<string, unknown>;
