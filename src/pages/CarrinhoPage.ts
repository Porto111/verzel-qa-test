import type { Locator, Page } from '@playwright/test';
import { CupomCarrinho } from '@components/CupomCarrinho';
import { ItemCarrinho } from '@components/ItemCarrinho';
import { ResumoPedido } from '@components/ResumoPedido';
import { BasePage } from './BasePage';

/** Página do carrinho ("/carrinho"). */
export class CarrinhoPage extends BasePage {
  override readonly path = '/carrinho';

  readonly resumo: ResumoPedido;
  readonly cupom: CupomCarrinho;
  readonly linhasDeItens: Locator;
  readonly botaoEsvaziar: Locator;

  constructor(page: Page) {
    super(page);
    this.resumo = new ResumoPedido(page);
    this.cupom = new CupomCarrinho(page);
    this.linhasDeItens = page.locator('.lista-carrinho > li');
    this.botaoEsvaziar = page.getByRole('button', { name: 'Esvaziar carrinho' });
  }

  item(nomeProduto: string): ItemCarrinho {
    return new ItemCarrinho(this.page, nomeProduto);
  }

  async esvaziar(): Promise<void> {
    await this.botaoEsvaziar.click();
  }

  async finalizarCompra(): Promise<void> {
    await this.resumo.linkFinalizarCompra.click();
  }

  protected override async esperarCarregada(): Promise<void> {
    await this.page.getByRole('heading', { level: 1, name: 'Carrinho' }).waitFor();
  }
}
