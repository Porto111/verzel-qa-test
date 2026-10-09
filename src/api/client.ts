import type { APIRequestContext, APIResponse } from '@playwright/test';
import type {
  ApiResposta,
  CalculoResponse,
  ErroResponse,
  Payload,
  PedidoResponse,
  Produto,
} from './types';

export const ROTAS = {
  produtos: '/api/produtos',
  calcular: '/api/carrinho/calcular',
  pedidos: '/api/pedidos',
} as const;

/**
 * Cliente HTTP tipado da Verzel Store (camada equivalente a um Page Object, para a API).
 * Não faz asserções: devolve { status, body } e deixa a verificação para o teste.
 */
export class VerzelApi {
  constructor(private readonly request: APIRequestContext) {}

  listarProdutos(): Promise<ApiResposta<Produto[]>> {
    return this.get<Produto[]>(ROTAS.produtos);
  }

  obterProduto<T = Produto>(id: string): Promise<ApiResposta<T>> {
    return this.get<T>(`${ROTAS.produtos}/${encodeURIComponent(id)}`);
  }

  calcular<T = CalculoResponse>(payload: Payload): Promise<ApiResposta<T>> {
    return this.post<T>(ROTAS.calcular, payload);
  }

  criarPedido<T = PedidoResponse>(payload: Payload): Promise<ApiResposta<T>> {
    return this.post<T>(ROTAS.pedidos, payload);
  }

  get<T = ErroResponse>(path: string): Promise<ApiResposta<T>> {
    return this.ler<T>(this.request.get(path));
  }

  post<T = ErroResponse>(path: string, payload: Payload): Promise<ApiResposta<T>> {
    return this.ler<T>(this.request.post(path, { data: payload }));
  }

  /** Envia o texto como corpo, sem serializar (para testar JSON inválido). */
  postCorpoBruto<T = ErroResponse>(path: string, corpo: string): Promise<ApiResposta<T>> {
    return this.ler<T>(
      this.request.post(path, { headers: { 'Content-Type': 'application/json' }, data: corpo }),
    );
  }

  private async ler<T>(pendente: Promise<APIResponse>): Promise<ApiResposta<T>> {
    const resposta = await pendente;
    const texto = await resposta.text();
    let body: unknown = texto;
    try {
      body = texto ? JSON.parse(texto) : undefined;
    } catch {
      // mantém o texto cru para facilitar o diagnóstico quando a resposta não for JSON
    }
    return { status: resposta.status(), body: body as T };
  }
}
