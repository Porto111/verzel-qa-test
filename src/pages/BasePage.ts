import type { Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';

/**
 * Base de todos os Page Objects.
 * Regras do projeto: page objects expõem Locators e ações do usuário; as asserções ficam nos
 * testes (ou em src/support/assertions.ts). Esperas usam auto-wait do Playwright, nunca sleeps.
 */
export abstract class BasePage {
  abstract readonly path: string;
  readonly header: HeaderComponent;

  protected constructor(protected readonly page: Page) {
    this.header = new HeaderComponent(page);
  }

  /** Condição que indica que a página terminou de renderizar (SPA). */
  protected abstract esperarCarregada(): Promise<void>;

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.esperarCarregada();
  }

  async aguardarCarregamento(): Promise<void> {
    await this.esperarCarregada();
  }
}
