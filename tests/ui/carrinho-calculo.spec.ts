import { test, expect } from '@fixtures';
import { CENARIOS_CALCULO } from '@data/cenarios-calculo';
import { esperarResumo } from '@support/assertions';

test.describe('UI – carrinho: resumo (subtotal, desconto, frete e total)', { tag: '@ui' }, () => {
  for (const c of CENARIOS_CALCULO) {
    test(`${c.id} ${c.titulo}`, { tag: c.smoke ? ['@smoke', '@regressao'] : ['@regressao'] }, async ({ carrinhoCom }) => {
      const carrinho = await carrinhoCom(c.itens);

      if (c.cupom) {
        await carrinho.cupom.aplicar(c.cupom);
        await expect(carrinho.cupom.aplicado).toBeVisible();
      }

      await esperarResumo(carrinho.resumo, c.esperado);
    });
  }
});
