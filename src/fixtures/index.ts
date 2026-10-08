import { test as base, expect } from '@playwright/test';
import { VerzelApi } from '@api/client';
import type { ItemPedido } from '@api/types';
import { CarrinhoPage } from '@pages/CarrinhoPage';
import { ProdutosPage } from '@pages/ProdutosPage';

interface Fixtures {
  api: VerzelApi;
  produtosPage: ProdutosPage;
  carrinhoPage: CarrinhoPage;
  /**
   * Monta o carrinho como o usuário (adicionando pela vitrine) e abre /carrinho.
   * O carrinho vive só na aba do navegador, por isso não há atalho via API.
   */
  carrinhoCom: (itens: readonly ItemPedido[]) => Promise<CarrinhoPage>;
}

export const test = base.extend<Fixtures>({
  api: async ({ request }, use) => {
    await use(new VerzelApi(request));
  },
  produtosPage: async ({ page }, use) => {
    await use(new ProdutosPage(page));
  },
  carrinhoPage: async ({ page }, use) => {
    await use(new CarrinhoPage(page));
  },
  carrinhoCom: async ({ produtosPage, carrinhoPage }, use) => {
    await use(async (itens) => {
      await produtosPage.goto();
      for (const { produtoId, quantidade } of itens) {
        await produtosPage.adicionarAoCarrinho(produtoId, quantidade);
      }
      await produtosPage.header.irParaCarrinho();
      await carrinhoPage.aguardarCarregamento();
      return carrinhoPage;
    });
  },
});

export { expect };
