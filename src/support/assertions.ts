import { expect } from '@playwright/test';
import type { ValoresCarrinho } from '@api/types';
import type { ResumoPedido } from '@components/ResumoPedido';
import { padraoTexto, textoMoeda } from './moeda';

/**
 * Asserção de domínio: confere o resumo do pedido exibido na UI contra os valores esperados
 * (os mesmos números usados nos testes de API – fonte única em src/data).
 * Regras de exibição: desconto "- R$ x" (ou "R$ 0,00"), frete "Grátis" quando 0,
 * aviso "Faltam R$ x para o frete grátis." somente abaixo do limite.
 */
export async function esperarResumo(resumo: ResumoPedido, esperado: ValoresCarrinho): Promise<void> {
  await expect(resumo.subtotal).toHaveText(padraoTexto(textoMoeda(esperado.subtotal)));
  await expect(resumo.desconto).toHaveText(
    padraoTexto(esperado.desconto > 0 ? `- ${textoMoeda(esperado.desconto)}` : textoMoeda(0)),
  );
  await expect(resumo.frete).toHaveText(
    padraoTexto(esperado.freteGratis ? 'Grátis' : textoMoeda(esperado.frete)),
  );
  await expect(resumo.total).toHaveText(padraoTexto(textoMoeda(esperado.total)));

  if (esperado.valorFaltanteFreteGratis > 0) {
    await expect(resumo.avisoFrete).toHaveText(
      padraoTexto(`Faltam ${textoMoeda(esperado.valorFaltanteFreteGratis)} para o frete grátis.`),
    );
  } else {
    await expect(resumo.avisoFrete).toHaveCount(0);
  }
}
