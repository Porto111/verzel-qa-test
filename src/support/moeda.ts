const formatadorBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 59.9 -> "R$ 59,90" (a UI usa espaço não separável; veja padraoTexto). */
export const textoMoeda = (valor: number): string => formatadorBRL.format(valor);

const escaparRegex = (texto: string): string => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Regex exata para um texto, tolerante a espaço comum/não separável. */
export const padraoTexto = (texto: string): RegExp =>
  new RegExp(`^${escaparRegex(texto).replace(/\s+/g, '\\s+')}$`);
