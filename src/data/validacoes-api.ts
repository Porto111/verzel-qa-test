import type { Payload } from '@api/types';

export interface CasoValidacao {
  id: string;
  titulo: string;
  payload: Payload;
  status: number;
  codigo: string;
}

const P001 = (quantidade: unknown) => ({ itens: [{ produtoId: 'P001', quantidade }] });

/** Erros de estrutura/itens – mesmos códigos em /calcular (veja tabela de erros da doc). */
export const CASOS_VALIDACAO_ITENS: CasoValidacao[] = [
  { id: 'CT-14', titulo: '6 unidades excede o máximo', payload: { itens: [{ produtoId: 'P004', quantidade: 6 }] }, status: 422, codigo: 'QUANTIDADE_MAXIMA_EXCEDIDA' },
  { id: 'CT-15', titulo: 'quantidade 0', payload: P001(0), status: 422, codigo: 'QUANTIDADE_INVALIDA' },
  { id: 'CT-15', titulo: 'quantidade -1', payload: P001(-1), status: 422, codigo: 'QUANTIDADE_INVALIDA' },
  { id: 'CT-15', titulo: 'quantidade 1.5', payload: P001(1.5), status: 422, codigo: 'QUANTIDADE_INVALIDA' },
  { id: 'CT-16', titulo: 'itens ausente', payload: {}, status: 422, codigo: 'ITENS_OBRIGATORIOS' },
  { id: 'CT-16', titulo: 'itens vazio', payload: { itens: [] }, status: 422, codigo: 'ITENS_OBRIGATORIOS' },
  { id: 'CT-17', titulo: 'produto inexistente (P999)', payload: { itens: [{ produtoId: 'P999', quantidade: 1 }] }, status: 422, codigo: 'PRODUTO_NAO_ENCONTRADO' },
  { id: 'CT-18', titulo: 'produto repetido na lista', payload: { itens: [{ produtoId: 'P001', quantidade: 1 }, { produtoId: 'P001', quantidade: 2 }] }, status: 422, codigo: 'ITEM_DUPLICADO' },
];
