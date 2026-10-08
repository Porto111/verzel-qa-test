import { test, expect } from '@fixtures';
import { TODOS_OS_PRODUTOS } from '@data/produtos';
import type { ErroResponse, Produto } from '@api/types';

test.describe('API – produtos e rotas', { tag: '@api' }, () => {
  test('CT-20 GET /api/produtos lista o catálogo da documentação', { tag: ['@smoke', '@regressao'] }, async ({ api }) => {
    const { status, body } = await api.listarProdutos();
    expect(status).toBe(200);
    expect(body).toHaveLength(TODOS_OS_PRODUTOS.length);
    for (const esperado of TODOS_OS_PRODUTOS) {
      expect.soft(body.find((p: Produto) => p.id === esperado.id), esperado.id).toMatchObject(esperado);
    }
  });

  test('CT-21 GET /api/produtos/{id} existente', { tag: '@regressao' }, async ({ api }) => {
    const { status, body } = await api.obterProduto('P001');
    expect(status).toBe(200);
    expect(body).toMatchObject({ id: 'P001', nome: 'Camiseta Essencial', preco: 59.9 });
  });

  test('CT-21b GET /api/produtos/{id} inexistente => 404 PRODUTO_NAO_ENCONTRADO', { tag: '@regressao' }, async ({ api }) => {
    const { status, body } = await api.obterProduto<ErroResponse>('P999');
    expect(status).toBe(404);
    expect(body.erro.codigo).toBe('PRODUTO_NAO_ENCONTRADO');
  });

  test('CT-22 rota inexistente => 404 ROTA_NAO_ENCONTRADA', { tag: '@regressao' }, async ({ api }) => {
    const { status, body } = await api.get('/api/nao-existe');
    expect(status).toBe(404);
    expect(body.erro.codigo).toBe('ROTA_NAO_ENCONTRADA');
  });

  test('CT-22b método não permitido => 405 METODO_NAO_PERMITIDO', { tag: '@regressao' }, async ({ api }) => {
    const { status, body } = await api.get('/api/carrinho/calcular');
    expect(status).toBe(405);
    expect(body.erro.codigo).toBe('METODO_NAO_PERMITIDO');
  });

  test('CT-19 corpo que não é JSON válido => 400 JSON_INVALIDO', { tag: '@regressao' }, async ({ api }) => {
    const { status, body } = await api.postCorpoBruto('/api/carrinho/calcular', '{itens: [');
    expect(status).toBe(400);
    expect(body.erro.codigo).toBe('JSON_INVALIDO');
  });
});
