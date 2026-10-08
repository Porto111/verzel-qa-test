import { test, expect } from '@fixtures';
import { RESUMO_P005_COM_CUPOM, RESUMO_P005_SEM_CUPOM, item } from '@data/cenarios-calculo';
import { CUPONS, CUPONS_REJEITADOS, VARIACOES_CUPOM_VALIDO } from '@data/cupons';
import { esperarResumo } from '@support/assertions';

test.describe('UI – carrinho: cupom de desconto', { tag: '@ui' }, () => {
  for (const codigo of VARIACOES_CUPOM_VALIDO) {
    test(`CT-02/03 ignora caixa e espaços nas pontas: "${codigo}"`, { tag: '@regressao' }, async ({ carrinhoCom }) => {
      const carrinho = await carrinhoCom([item('P005')]);

      await carrinho.cupom.aplicar(codigo);

      await esperarResumo(carrinho.resumo, RESUMO_P005_COM_CUPOM);
      await expect(carrinho.cupom.aplicado).toContainText(CUPONS.valido); // código normalizado
    });
  }

  for (const c of CUPONS_REJEITADOS) {
    test(`${c.id} ${c.titulo}: mostra "${c.mensagem}" e não aplica desconto`, { tag: '@regressao' }, async ({ carrinhoCom }) => {
      const carrinho = await carrinhoCom([item('P005')]);

      await carrinho.cupom.aplicar(c.codigo);

      await expect(carrinho.cupom.mensagem(c.mensagem)).toBeVisible();
      await esperarResumo(carrinho.resumo, RESUMO_P005_SEM_CUPOM);
    });
  }

  test('CT-U22 cupom aplicado: mensagem, rótulo do desconto e campo oculto', { tag: '@regressao' }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P005')]);

    await carrinho.cupom.aplicar(CUPONS.valido);

    await expect(carrinho.cupom.aplicado).toContainText(`Cupom ${CUPONS.valido} aplicado.`);
    await expect(carrinho.resumo.rotuloDesconto).toHaveText(`Desconto (${CUPONS.valido})`);
    await expect(carrinho.cupom.campo).toHaveCount(0);
    await expect(carrinho.cupom.botaoRemover).toBeVisible();
  });

  test('CT-U03 só um cupom por vez: para trocar é preciso remover o atual (CA05)', { tag: ['@smoke', '@regressao'] }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P005')]);
    await carrinho.cupom.aplicar(CUPONS.valido);
    await expect(carrinho.cupom.campo).toHaveCount(0); // não há como aplicar um 2º cupom

    await carrinho.cupom.remover();

    await esperarResumo(carrinho.resumo, RESUMO_P005_SEM_CUPOM);
    await expect(carrinho.cupom.campo).toBeVisible();

    await carrinho.cupom.aplicar(CUPONS.expirado);
    await expect(carrinho.cupom.mensagem('Cupom expirado.')).toBeVisible();
    await esperarResumo(carrinho.resumo, RESUMO_P005_SEM_CUPOM);
  });
});
