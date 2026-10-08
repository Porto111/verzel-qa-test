import type { Locator, Page } from '@playwright/test';

/** Cabeçalho/navegação presente em todas as páginas. */
export class HeaderComponent {
  readonly linkProdutos: Locator;
  readonly linkDocumentacao: Locator;
  readonly linkCarrinho: Locator;
  /** Número exibido no selo do carrinho (aria-label: "N itens no carrinho"). */
  readonly contadorCarrinho: Locator;

  constructor(page: Page) {
    const navegacao = page.getByRole('navigation', { name: 'Principal' });
    this.linkProdutos = navegacao.getByRole('link', { name: 'Produtos', exact: true });
    this.linkDocumentacao = navegacao.getByRole('link', { name: 'Documentação', exact: true });
    this.linkCarrinho = navegacao.getByRole('link', { name: /Carrinho/ });
    this.contadorCarrinho = this.linkCarrinho.locator('.contador-carrinho');
  }

  async irParaProdutos(): Promise<void> {
    await this.linkProdutos.click();
  }

  async irParaDocumentacao(): Promise<void> {
    await this.linkDocumentacao.click();
  }

  async irParaCarrinho(): Promise<void> {
    await this.linkCarrinho.click();
  }
}
