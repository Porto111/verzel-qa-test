import { test, expect } from '@fixtures';
import type { ErroResponse, PedidoResponse } from '@api/types';
import { RESUMO_P005_COM_CUPOM, item } from '@data/cenarios-calculo';
import { CLIENTES_INVALIDOS, CLIENTE_VALIDO } from '@data/clientes';
import { CUPONS, CUPONS_REJEITADOS } from '@data/cupons';

test.describe('API – POST /api/pedidos', { tag: '@api' }, () => {
  test('CT-23 pedido válido com cupom => 201, número VZ-000000 e CEP normalizado', { tag: ['@smoke', '@regressao'] }, async ({ api }) => {
    const { status, body } = await api.criarPedido({
      cliente: CLIENTE_VALIDO,
      itens: [item('P005')],
      cupom: CUPONS.valido,
    });

    expect(status).toBe(201);
    expect(body.numero).toMatch(/^VZ-\d{6}$/);
    expect(body.cliente.cep).toBe('01310100');
    expect(body).toMatchObject(RESUMO_P005_COM_CUPOM);
  });

  test('CT-26 CEP com 8 dígitos sem hífen é aceito', { tag: '@regressao' }, async ({ api }) => {
    const { status } = await api.criarPedido({
      cliente: { ...CLIENTE_VALIDO, cep: '01310100' },
      itens: [item('P005')],
    });

    expect(status).toBe(201);
  });

  for (const c of CUPONS_REJEITADOS) {
    test(`CT-24 ${c.titulo} no pedido => 422 ${c.codigoErroPedido}`, { tag: '@regressao' }, async ({ api }) => {
      const { status, body } = await api.criarPedido<ErroResponse>({
        cliente: CLIENTE_VALIDO,
        itens: [item('P005')],
        cupom: c.codigo,
      });

      expect(status).toBe(422);
      expect(body.erro.codigo).toBe(c.codigoErroPedido);
    });
  }

  for (const { titulo, cliente } of CLIENTES_INVALIDOS) {
    test(`CT-25 dados do cliente inválidos (${titulo}) => 422 DADOS_INVALIDOS`, { tag: '@regressao' }, async ({ api }) => {
      const { status, body } = await api.criarPedido<ErroResponse>({ cliente, itens: [item('P005')] });

      expect(status).toBe(422);
      expect(body.erro.codigo).toBe('DADOS_INVALIDOS');
    });
  }

  test('CT-14b 6 unidades também é rejeitado no pedido (CA10 vale na API)', { tag: '@regressao' }, async ({ api }) => {
    const { status, body } = await api.criarPedido<PedidoResponse & ErroResponse>({
      cliente: CLIENTE_VALIDO,
      itens: [item('P004', 6)],
    });

    expect(status).toBe(422);
    expect(body.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
  });
});
