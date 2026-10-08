import type { Locator, Page } from '@playwright/test';

/** Linha de um produto na página do carrinho, localizada pelo nome do produto. */
export class ItemCarrinho {
  readonly raiz: Locator;
  readonly precoUnitario: Locator;
  readonly totalDoItem: Locator;
  readonly quantidade: Locator;
  readonly botaoAumentar: Locator;
  readonly botaoDiminuir: Locator;
  readonly botaoRemover: Locator;

  constructor(page: Page, readonly nomeProduto: string) {
    this.raiz = page
      .locator('.item-carrinho')
      .filter({ has: page.getByRole('heading', { name: nomeProduto, exact: true }) });
    this.precoUnitario = this.raiz.locator('.item-unitario');
    this.totalDoItem = this.raiz.locator('.item-total');
    this.quantidade = this.raiz
      .getByRole('group', { name: `Quantidade de ${nomeProduto}`, exact: true })
      .locator('output');
    this.botaoAumentar = this.raiz.getByRole('button', {
      name: `Aumentar quantidade de ${nomeProduto}`,
      exact: true,
    });
    this.botaoDiminuir = this.raiz.getByRole('button', {
      name: `Diminuir quantidade de ${nomeProduto}`,
      exact: true,
    });
    this.botaoRemover = this.raiz.getByRole('button', {
      name: `Remover ${nomeProduto} do carrinho`,
      exact: true,
    });
  }

  async aumentar(vezes = 1): Promise<void> {
    for (let i = 0; i < vezes; i++) {
      await this.botaoAumentar.click();
    }
  }

  async diminuir(vezes = 1): Promise<void> {
    for (let i = 0; i < vezes; i++) {
      await this.botaoDiminuir.click();
    }
  }

  async remover(): Promise<void> {
    await this.botaoRemover.click();
  }
}
