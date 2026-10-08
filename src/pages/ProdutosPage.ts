import type { Locator, Page } from '@playwright/test';
import { CardProduto } from '@components/CardProduto';
import { BasePage } from './BasePage';

/** Página inicial ("/"): destaque da promoção e vitrine de produtos. */
export class ProdutosPage extends BasePage {
  override readonly path = '/';

  readonly tituloDestaque: Locator;
  readonly textoDestaque: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);
    this.tituloDestaque = page.getByRole('heading', { level: 1 });
    this.textoDestaque = page.locator('.destaque-texto');
    this.cards = page.locator('.grade-produtos > li');
  }

  produto(id: string): CardProduto {
    return new CardProduto(this.page, id);
  }

  async adicionarAoCarrinho(id: string, vezes = 1): Promise<void> {
    await this.produto(id).adicionar(vezes);
  }

  protected override async esperarCarregada(): Promise<void> {
    await this.page.getByRole('heading', { level: 2, name: 'Produtos' }).waitFor();
  }
}
