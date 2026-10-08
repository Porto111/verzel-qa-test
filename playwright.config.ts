import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://verzel-store.qa-test-verzel-store.workers.dev';
const EM_CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: EM_CI,
  retries: EM_CI ? 1 : 0,
  // Ambiente compartilhado com outros candidatos: paralelismo baixo e sem testes de carga.
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    // EVIDENCIAS=1 gera screenshot de TODOS os testes (útil para docs/EVIDENCIAS.md)
    screenshot: process.env.EVIDENCIAS ? 'on' : 'only-on-failure',
    video: 'off',
    locale: 'pt-BR',
  },
  projects: [
    { name: 'api', testDir: './tests/api' },
    { name: 'ui-chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'] } },
  ],
});
