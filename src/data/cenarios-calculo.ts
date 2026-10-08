import type { ItemPedido, ValoresCarrinho } from '@api/types';
import { CUPONS } from './cupons';
import { PRODUTOS, type IdProduto } from './produtos';

export interface CenarioCalculo {
  id: string;
  titulo: string;
  itens: ItemPedido[];
  cupom?: string;
  esperado: ValoresCarrinho;
  smoke?: boolean;
}

export const item = (produtoId: IdProduto, quantidade = 1): ItemPedido => ({ produtoId, quantidade });

export const TODOS_OS_PRODUTOS_X1: ItemPedido[] = (Object.keys(PRODUTOS) as IdProduto[]).map((id) => item(id));

/** Valores esperados reutilizados em testes de cupom (P005 x1 = R$ 100,00). */
export const RESUMO_P005_SEM_CUPOM: ValoresCarrinho = {
  subtotal: 100, desconto: 0, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 100, total: 119.9,
};
export const RESUMO_P005_COM_CUPOM: ValoresCarrinho = {
  subtotal: 100, desconto: 10, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 100, total: 109.9,
};

/**
 * Fonte única dos resultados esperados (calculados a partir das regras CA01–CA11),
 * consumida pelos testes de API e de UI.
 */
export const CENARIOS_CALCULO: CenarioCalculo[] = [
  {
    id: 'CT-01', titulo: 'BEMVINDO10 aplica 10% (P002x1 + P004x2)', smoke: true,
    itens: [item('P002'), item('P004', 2)], cupom: CUPONS.valido,
    esperado: { subtotal: 239.7, desconto: 23.97, frete: 0, freteGratis: true, valorFaltanteFreteGratis: 0, total: 215.73 },
  },
  {
    id: 'CT-06', titulo: 'abaixo de R$ 200: frete fixo e valor faltante (P005x1)',
    itens: [item('P005')],
    esperado: RESUMO_P005_SEM_CUPOM,
  },
  {
    id: 'CT-07', titulo: 'subtotal exatamente R$ 200,00 tem frete grátis (P005x2)', smoke: true,
    itens: [item('P005', 2)],
    esperado: { subtotal: 200, desconto: 0, frete: 0, freteGratis: true, valorFaltanteFreteGratis: 0, total: 200 },
  },
  {
    id: 'CT-08', titulo: 'subtotal 189,90 cobra frete e faltam 10,10 (P003x1)',
    itens: [item('P003')],
    esperado: { subtotal: 189.9, desconto: 0, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 10.1, total: 209.8 },
  },
  {
    id: 'CT-09', titulo: 'subtotal 199,80 (logo abaixo do limite) cobra frete (P001 + P002)',
    itens: [item('P001'), item('P002')],
    esperado: { subtotal: 199.8, desconto: 0, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 0.2, total: 219.7 },
  },
  {
    id: 'CT-10', titulo: 'frete grátis considera o subtotal ANTES do cupom (P005x2 + cupom)',
    itens: [item('P005', 2)], cupom: CUPONS.valido,
    esperado: { subtotal: 200, desconto: 20, frete: 0, freteGratis: true, valorFaltanteFreteGratis: 0, total: 180 },
  },
  {
    id: 'CT-11', titulo: 'desconto não incide sobre o frete (P005x1 + cupom)',
    itens: [item('P005')], cupom: CUPONS.valido,
    esperado: RESUMO_P005_COM_CUPOM,
  },
  {
    id: 'CT-12', titulo: 'arredondamento em 2 casas (P001x3 + cupom)',
    itens: [item('P001', 3)], cupom: CUPONS.valido,
    esperado: { subtotal: 179.7, desconto: 17.97, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 20.3, total: 181.63 },
  },
  {
    id: 'CT-13', titulo: '5 unidades (limite) é aceito (P004x5)',
    itens: [item('P004', 5)],
    esperado: { subtotal: 249.5, desconto: 0, frete: 0, freteGratis: true, valorFaltanteFreteGratis: 0, total: 249.5 },
  },
  {
    id: 'CT-U23', titulo: 'P004 + P008 + cupom: 99,90 / -9,99 / 19,90 / 109,81',
    itens: [item('P004'), item('P008')], cupom: CUPONS.valido,
    esperado: { subtotal: 99.9, desconto: 9.99, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 100.1, total: 109.81 },
  },
  {
    id: 'CT-U24', titulo: 'os 8 produtos + cupom: 849,40 / -84,94 / Grátis / 764,46',
    itens: TODOS_OS_PRODUTOS_X1, cupom: CUPONS.valido,
    esperado: { subtotal: 849.4, desconto: 84.94, frete: 0, freteGratis: true, valorFaltanteFreteGratis: 0, total: 764.46 },
  },
  {
    id: 'CT-U15', titulo: 'os 8 produtos sem cupom: 849,40 / 0,00 / Grátis',
    itens: TODOS_OS_PRODUTOS_X1,
    esperado: { subtotal: 849.4, desconto: 0, frete: 0, freteGratis: true, valorFaltanteFreteGratis: 0, total: 849.4 },
  },
];
