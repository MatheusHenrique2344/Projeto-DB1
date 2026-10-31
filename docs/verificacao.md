# Registro de verificação

Referência editorial e de calendário: 29/10/2026, America/Sao_Paulo. Verificações executadas sobre os arquivos desta entrega.

## Código, dados e comportamento

- `npm run check`: aprovado, saída 1589 verificações antes da inclusão do modo HTTP.
- 16 dossiês, 19 marcos, 22 referências e 20 CVEs citados; esses números são do catálogo, não totais mundiais do mês.
- Casos referenciam fontes existentes, preservam os identificadores e têm datas no recorte.
- Filtros exercitados com categoria, busca, CVE, datas inclusivas e intervalo invertido.
- Jogo exercitado nas 64 combinações de acerto/erro, incluindo prevenção de pontuação duplicada, término e estado de reinício.
- Destinos locais e âncoras conferidos; sintaxe dos módulos e exports usados do Anime.js aprovados.

## Interface simulada em DOM

Um harness temporário em `/tmp/db1-ui-check.mjs`, com jsdom instalado fora do projeto em `/tmp/db1-ui-check`, carregou o HTML real e importou os módulos da aplicação. Resultado: **57 verificações aprovadas**.

Foram exercitados destaques e contagens da página inicial; menu, Escape e retorno de foco; filtro combinado de cronologia, busca de CVE, estado vazio, reset e aviso de intervalo invertido; busca/categoria/reset de dossiês; abertura por hash; referências e atributos dos links; fontes da página de IA; seis rodadas com todas as respostas corretas e resultado 600; revisão das seis decisões; reinício; seis respostas erradas e resultado zero; opções desabilitadas e presença do feedback.

O ambiente simulou movimento reduzido. Ele não executa um navegador nem mede renderização ou desempenho real.

## HTTP

A aplicação iniciou com `npm start` em `http://127.0.0.1:8000`. A requisição HEAD da página inicial retornou **200 OK**, `text/html; charset=utf-8`, `nosniff` e `no-cache`.

O modo reproduzível `npm run check -- --http` foi executado e aprovado: **1611 verificações**, incluindo os caminhos das seis páginas, tipos MIME dos assets, resposta 404 para caminhos privados/inexistentes e resposta 405 para POST. Requer o servidor na porta 8000.

## CSS e contraste calculado

O CSS foi carregado no parser de estilos do jsdom: **301 regras de nível superior**, sem erros relatados. Foi calculada a luminância relativa de seis pares explícitos de cores, sem presumir renderização real:

| Par | Contraste calculado |
| --- | --- |
| Texto principal / fundo | 17,33:1 |
| Texto secundário / superfície | 6,97:1 |
| Laranja / fundo | 6,92:1 |
| Texto / botão laranja | 6,66:1 |
| Texto / seção clara | 5,94:1 |
| Texto / banner laranja | 4,95:1 |

Os pares calculados superam 4,5:1. Isso não mede todos os componentes, estados, sobreposições ou condições de uma página renderizada.

## Limitações explícitas

- `cua.getState()` retornou nenhum navegador disponível; a tentativa de abrir a prévia com `iab` também informou indisponibilidade.
- Não houve screenshot, conferência visual em 360/768/1024/1440 px, inspeção de console de navegador, teste real de leitor de tela ou medição de contraste sobre a renderização real.
- As media queries, o foco, os rótulos e o tratamento de movimento reduzido foram implementados e inspecionados em código. Isso não equivale a uma auditoria de acessibilidade concluída.
- Não foram executados exploits, ataques, varreduras, commits, pushes ou publicação.
