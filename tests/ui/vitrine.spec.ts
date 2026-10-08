import { test, expect } from '@fixtures';
import { ProdutosPage } from '@pages/ProdutosPage';
import { CUPONS } from '@data/cupons';
import { LIMITE_FRETE_GRATIS, MAX_UNIDADES_POR_PRODUTO, PERCENTUAL_BEMVINDO10 } from '@data/regras';
import { TODOS_OS_PRODUTOS } from '@data/produtos';
import { padraoTexto, textoMoeda } from '@support/moeda';

test.describe('UI – vitrine de produtos', { tag: '@ui' }, () => {
  test.beforeEach(async ({ produtosPage }) => {
    await produtosPage.goto();
  });

  test('CT-U09 exibe os produtos com nome, categoria, descrição e preço do catálogo', { tag: '@regressao' }, async ({ produtosPage }) => {
    await expect(produtosPage.cards).toHaveCount(TODOS_OS_PRODUTOS.length);

    for (const p of TODOS_OS_PRODUTOS) {
      const card = produtosPage.produto(p.id);
      await expect.soft(card.nome, `${p.id} nome`).toHaveText(p.nome);
      await expect.soft(card.categoria, `${p.id} categoria`).toHaveText(p.categoria);
      await expect.soft(card.descricao, `${p.id} descrição`).toHaveText(p.descricao);
      await expect.soft(card.preco, `${p.id} preço`).toHaveText(padraoTexto(textoMoeda(p.preco)));
    }
  });

  test('CT-U10 adicionar produtos atualiza o contador do carrinho', { tag: ['@smoke', '@regressao'] }, async ({ produtosPage }) => {
    const { contadorCarrinho } = produtosPage.header;
    await expect(contadorCarrinho).toHaveText('0');

    await produtosPage.adicionarAoCarrinho('P001');
    await expect(contadorCarrinho).toHaveText('1');

    await produtosPage.adicionarAoCarrinho('P002');
    await expect(contadorCarrinho).toHaveText('2');
  });

  test('CT-U11 não permite passar de 5 unidades do mesmo produto (CA10)', { tag: '@regressao' }, async ({ produtosPage }) => {
    const card = produtosPage.produto('P004');
    await card.adicionar(MAX_UNIDADES_POR_PRODUTO);

    // Comportamento no limite não está especificado: botão desabilitado OU aviso no card.
    // Ajuste este trecho para o comportamento real observado na 1ª execução.
    if (await card.botaoAdicionar.isEnabled()) {
      await card.adicionar();
      await expect(card.aviso).not.toBeEmpty();
    }
    await expect(produtosPage.header.contadorCarrinho).not.toHaveText(String(MAX_UNIDADES_POR_PRODUTO + 1));
  });

  test('CT-U12 destaque informa frete grátis a partir de R$ 200,00 e o cupom BEMVINDO10', { tag: '@regressao' }, async ({ produtosPage }) => {
    await expect(produtosPage.tituloDestaque).toContainText(textoMoeda(LIMITE_FRETE_GRATIS));
    await expect(produtosPage.textoDestaque).toContainText(CUPONS.valido);
    await expect(produtosPage.textoDestaque).toContainText(`${PERCENTUAL_BEMVINDO10}%`);
  });

  test('CT-U13 navegação principal: título da aba, Documentação e Carrinho', { tag: '@regressao' }, async ({ page, produtosPage }) => {
    await expect(page).toHaveTitle(/Produtos \| Verzel Store/);

    await produtosPage.header.irParaDocumentacao();
    await expect(page).toHaveURL(/\/documentacao$/);

    await page.goBack();
    await produtosPage.header.irParaCarrinho();
    await expect(page).toHaveURL(/\/carrinho$/);
  });

  test('CT-U08 carrinho existe só na aba: nova aba começa vazia (comportamento esperado)', { tag: '@regressao' }, async ({ context, produtosPage }) => {
    await produtosPage.adicionarAoCarrinho('P001');
    await expect(produtosPage.header.contadorCarrinho).toHaveText('1');

    const outraAba = new ProdutosPage(await context.newPage());
    await outraAba.goto();

    await expect(outraAba.header.contadorCarrinho).toHaveText('0');
  });
});
