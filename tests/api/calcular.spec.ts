import { test, expect } from '@fixtures';
import type { CalculoResponse, ErroResponse } from '@api/types';
import { CENARIOS_CALCULO, RESUMO_P005_COM_CUPOM, RESUMO_P005_SEM_CUPOM, item } from '@data/cenarios-calculo';
import { CUPONS_REJEITADOS, VARIACOES_CUPOM_VALIDO } from '@data/cupons';
import { CASOS_VALIDACAO_ITENS } from '@data/validacoes-api';

test.describe('API – POST /api/carrinho/calcular', { tag: '@api' }, () => {
  test.describe('regras de cálculo (CA01, CA06–CA09, CA11)', () => {
    for (const c of CENARIOS_CALCULO) {
      test(`${c.id} ${c.titulo}`, { tag: c.smoke ? ['@smoke', '@regressao'] : ['@regressao'] }, async ({ api }) => {
        const { status, body } = await api.calcular({ itens: c.itens, cupom: c.cupom });

        expect(status).toBe(200);
        expect(body).toMatchObject(c.esperado);
        if (c.cupom) expect(body.cupom.aplicado).toBe(true);
      });
    }
  });

  test.describe('cupom (CA02–CA04)', () => {
    for (const codigo of VARIACOES_CUPOM_VALIDO) {
      test(`CT-02/03 ignora caixa e espaços nas pontas: "${codigo}"`, { tag: '@regressao' }, async ({ api }) => {
        const { status, body } = await api.calcular({ itens: [item('P005')], cupom: codigo });

        expect(status).toBe(200);
        expect(body.cupom.aplicado).toBe(true);
        expect(body).toMatchObject(RESUMO_P005_COM_CUPOM);
      });
    }

    for (const c of CUPONS_REJEITADOS) {
      test(`${c.id} ${c.titulo}: 200, sem desconto e mensagem "${c.mensagem}"`, { tag: '@regressao' }, async ({ api }) => {
        const { status, body } = await api.calcular({ itens: [item('P005')], cupom: c.codigo });

        expect(status).toBe(200); // em /calcular o cupom rejeitado não gera erro HTTP
        expect(body.cupom.aplicado).toBe(false);
        expect(body.cupom.mensagem).toBe(c.mensagem);
        expect(body).toMatchObject(RESUMO_P005_SEM_CUPOM);
      });
    }
  });

  test.describe('validações de itens (CA10 e códigos de erro)', () => {
    for (const caso of CASOS_VALIDACAO_ITENS) {
      test(`${caso.id} ${caso.titulo} => ${caso.status} ${caso.codigo}`, { tag: '@regressao' }, async ({ api }) => {
        const { status, body } = await api.calcular<ErroResponse>(caso.payload);

        expect(status).toBe(caso.status);
        expect(body.erro.codigo).toBe(caso.codigo);
      });
    }
  });

  test('CT-13b 5 unidades continua válido e 6 não (fronteira do CA10)', { tag: '@regressao' }, async ({ api }) => {
    const ok = await api.calcular<CalculoResponse>({ itens: [item('P004', 5)] });
    const excedido = await api.calcular<ErroResponse>({ itens: [item('P004', 6)] });

    expect(ok.status).toBe(200);
    expect(excedido.status).toBe(422);
  });
});
