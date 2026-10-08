import type { Cliente } from '@api/types';

export const CLIENTE_VALIDO: Cliente = {
  nome: 'Maria Silva',
  email: 'maria@exemplo.com',
  cep: '01310-100',
};

export const CLIENTES_INVALIDOS: { titulo: string; cliente: Cliente }[] = [
  { titulo: 'nome sem sobrenome', cliente: { ...CLIENTE_VALIDO, nome: 'Maria' } },
  { titulo: 'e-mail inválido', cliente: { ...CLIENTE_VALIDO, email: 'maria@' } },
  { titulo: 'CEP com 7 dígitos', cliente: { ...CLIENTE_VALIDO, cep: '0131010' } },
  { titulo: 'CEP com letras', cliente: { ...CLIENTE_VALIDO, cep: '0131010A' } },
];
