# Postman + Newman

## Arquivos
- `postman/Verzel-Store.postman_collection.json` – 64 requests, com testes (`pm.test`) em cada uma.
- `postman/Verzel-Store.postman_environment.json` – variável `baseUrl`.

## Pastas
| Pasta | Conteúdo |
|---|---|
| 01-Produtos | CT-20, CT-21, CT-21b |
| 02-Calculo-e-Frete | CT-01, 06–13, U15, U23, U24 (valores exatos de subtotal, desconto, frete, faltante e total) |
| 03-Cupom | CT-02, CT-03, CT-04, CT-05 |
| 04-Validacoes | CT-14 a CT-19 (códigos 400/422) |
| 05-Pedidos | CT-23 a CT-26, CT-14b |
| 06-Rotas | CT-22 (404 e 405) |
| 07-Exploratorios | EX-01 a EX-24: registram o comportamento; só falham em 5xx ou resposta não-JSON |

## Rodando no Postman
Importe a collection e o environment, selecione o environment e use **Run collection**.

## Rodando com Newman
```bash
npm install
npm run postman:regressao    # pastas 01 a 06 (regras da documentação)
npm run postman:exploratorio # pasta 07
npm run postman:all          # tudo
```
Relatórios em `reports/newman/`:
- `*.html` (htmlextra – use como evidência), `*-junit.xml`, `*.json`.
- Use `--delay-request 200` (já configurado): o ambiente é compartilhado e carga está fora do escopo.

## Como usar o resultado
- Falha em 01–06 = divergência da documentação: confirme manualmente, depois registre em `docs/BUGS.md`.
- 07-Exploratorios: leia o log (htmlextra → *Console logs*) e anote o comportamento observado.
