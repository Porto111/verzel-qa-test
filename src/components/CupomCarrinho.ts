import type { Locator, Page } from '@playwright/test';

/**
 * Cupom no carrinho. Enquanto há cupom aplicado o campo desaparece e surge "Remover cupom"
 * (é assim que a UI cumpre o CA05: um cupom por vez).
 */
export class CupomCarrinho {
  readonly campo: Locator;
  readonly botaoAplicar: Locator;
  readonly aplicado: Locator;
  readonly botaoRemover: Locator;

  constructor(private readonly page: Page) {
    this.campo = page.getByLabel('Cupom de desconto');
    this.botaoAplicar = page.getByRole('button', { name: 'Aplicar cupom' });
    this.aplicado = page.locator('.cupom-aplicado');
    this.botaoRemover = page.getByRole('button', { name: 'Remover cupom' });
  }

  async aplicar(codigo: string): Promise<void> {
    await this.campo.fill(codigo);
    await this.botaoAplicar.click();
  }

  async remover(): Promise<void> {
    await this.botaoRemover.click();
  }

  /** Mensagem exibida pela UI (ex.: "Cupom inválido.", "Cupom expirado."). */
  mensagem(texto: string): Locator {
    return this.page.getByText(texto, { exact: true });
  }
}
