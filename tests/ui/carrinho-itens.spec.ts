import { test, expect } from '@fixtures';
import { RESUMO_P005_COM_CUPOM, item } from '@data/cenarios-calculo';
import { CUPONS } from '@data/cupons';
import { MAX_UNIDADES_POR_PRODUTO } from '@data/regras';
import { nomeDe } from '@data/produtos';
import { esperarResumo } from '@support/assertions';

test.describe('UI – carrinho: itens, quantidades e frete', { tag: '@ui' }, () => {
  test('CT-U06 limite de 5 unidades no carrinho (CA10)', { tag: '@regressao' }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P004')]);
    const bone = carrinho.item(nomeDe('P004'));

    await bone.aumentar(MAX_UNIDADES_POR_PRODUTO - 1);
    await expect(bone.quantidade).toHaveText(String(MAX_UNIDADES_POR_PRODUTO));

    // No limite o "+" deve ficar desabilitado ou ser ignorado; a quantidade nunca passa de 5.
    if (await bone.botaoAumentar.isEnabled()) await bone.aumentar();
    await expect(bone.quantidade).toHaveText(String(MAX_UNIDADES_POR_PRODUTO));
    await expect(carrinho.resumo.subtotal).toContainText('249,50');
  });

  test('CT-U17 botão "-" fica desabilitado com 1 unidade', { tag: '@regressao' }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P001')]);

    await expect(carrinho.item(nomeDe('P001')).botaoDiminuir).toBeDisabled();
  });

  test('CT-U16 remover item recalcula resumo, frete e contador', { tag: '@regressao' }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P003'), item('P007')]); // 189,90 + 229,90

    await carrinho.item(nomeDe('P007')).remover();

    await esperarResumo(carrinho.resumo, {
      subtotal: 189.9, desconto: 0, frete: 19.9, freteGratis: false, valorFaltanteFreteGratis: 10.1, total: 209.8,
    });
    await expect(carrinho.header.contadorCarrinho).toHaveText('1');
  });

  test('CT-U19 "Esvaziar carrinho" zera o contador', { tag: '@regressao' }, async ({ page, carrinhoCom }) => {
    page.on('dialog', (dialogo) => dialogo.accept()); // caso exista confirmação
    const carrinho = await carrinhoCom([item('P001'), item('P002')]);

    await carrinho.esvaziar();

    await expect(carrinho.header.contadorCarrinho).toHaveText('0');
  });

  test('CT-U18 com cupom aplicado, reduzir a quantidade recalcula desconto e frete', { tag: '@regressao' }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P005', 2)]);
    await carrinho.cupom.aplicar(CUPONS.valido);
    await expect(carrinho.resumo.total).toContainText('180,00');

    await carrinho.item(nomeDe('P005')).diminuir();

    await esperarResumo(carrinho.resumo, RESUMO_P005_COM_CUPOM);
  });

  test('CT-U21 aviso de faltante some quando o subtotal chega a R$ 200,00', { tag: '@regressao' }, async ({ carrinhoCom }) => {
    const carrinho = await carrinhoCom([item('P005')]);
    await expect(carrinho.resumo.avisoFrete).toBeVisible();

    await carrinho.item(nomeDe('P005')).aumentar();

    await expect(carrinho.resumo.subtotal).toContainText('200,00');
    await expect(carrinho.resumo.avisoFrete).toHaveCount(0);
  });
});
