import type { Locator, Page } from '@playwright/test';

/** Painel "Resumo do pedido" (valores calculados pela API e apenas exibidos pela UI). */
export class ResumoPedido {
  readonly raiz: Locator;
  readonly subtotal: Locator;
  readonly desconto: Locator;
  readonly rotuloDesconto: Locator;
  readonly frete: Locator;
  readonly total: Locator;
  /** "Faltam R$ X para o frete grátis." – só existe abaixo do limite. */
  readonly avisoFrete: Locator;
  readonly linkFinalizarCompra: Locator;

  constructor(page: Page) {
    this.raiz = page.getByRole('region', { name: 'Resumo do pedido' });
    this.subtotal = page.locator('[data-valor="subtotal"]');
    this.desconto = page.locator('[data-valor="desconto"]');
    this.rotuloDesconto = this.raiz.locator('dt', { hasText: /^Desconto/ });
    this.frete = page.locator('[data-valor="frete"]');
    this.total = page.locator('[data-valor="total"]');
    this.avisoFrete = page.locator('.aviso-frete');
    this.linkFinalizarCompra = this.raiz.getByRole('link', { name: 'Finalizar compra' });
  }
}
