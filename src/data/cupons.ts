export const CUPONS = {
  valido: 'BEMVINDO10',
  expirado: 'VERAO2026',
  inexistente: 'XPTO99',
} as const;

export const MENSAGENS_CUPOM = {
  invalido: 'Cupom inválido.',
  expirado: 'Cupom expirado.',
} as const;

/** CA02: sem diferenciar maiúsculas/minúsculas e ignorando espaços nas pontas. */
export const VARIACOES_CUPOM_VALIDO = [
  'bemvindo10',
  'BemVindo10',
  '  BEMVINDO10  ',
  '  bemvindo10  ',
] as const;

/** CA03 e CA04 – usado por API e UI. */
export const CUPONS_REJEITADOS = [
  { id: 'CT-04', titulo: 'cupom inexistente', codigo: CUPONS.inexistente, mensagem: MENSAGENS_CUPOM.invalido, codigoErroPedido: 'CUPOM_INVALIDO' },
  { id: 'CT-05', titulo: 'cupom expirado', codigo: CUPONS.expirado, mensagem: MENSAGENS_CUPOM.expirado, codigoErroPedido: 'CUPOM_EXPIRADO' },
] as const;
