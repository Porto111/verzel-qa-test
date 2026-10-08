import type { Locator, Page } from '@playwright/test';

/** Card de um produto na vitrine (<article aria-labelledby="nome-P001">). */
export class CardProduto {
  readonly raiz: Locator;
  readonly nome: Locator;
  readonly categoria: Locator;
  readonly descricao: Locator;
  readonly preco: Locator;
  readonly botaoAdicionar: Locator;
  /** Região aria-live com avisos do produto (ex.: limite de unidades). */
  readonly aviso: Locator;

  constructor(page: Page, readonly id: string) {
    this.raiz = page.locator(`article[aria-labelledby="nome-${id}"]`);
    this.nome = this.raiz.getByRole('heading', { level: 3 });
    this.categoria = this.raiz.locator('.produto-categoria');
    this.descricao = this.raiz.locator('.produto-descricao');
    this.preco = this.raiz.locator('.produto-preco');
    this.botaoAdicionar = this.raiz.getByRole('button', { name: 'Adicionar ao carrinho' });
    this.aviso = page.locator(`#aviso-${id}`);
  }

  async adicionar(vezes = 1): Promise<void> {
    for (let i = 0; i < vezes; i++) {
      await this.botaoAdicionar.click();
    }
  }
}
