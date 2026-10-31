# Pesquisa ampliada e implementação

Consulta e corte editorial: **29/10/2026**. A pedido do usuário, o projeto passou de PHP como eixo principal para uma investigação de múltiplas camadas, com implementação autorizada nesta etapa.

## Cobertura

| Camada | Casos incluídos | Natureza do registro |
| --- | --- | --- |
| Runtimes | PHP2Shell, vetor adicional de sessões, Node.js/Brotli, DNS e TLS | Falhas distintas; gravidade e condições preservadas |
| Desenvolvimento | GitLab de 12/10 e 21/10 | Dois CVEs críticos separados |
| Servidores web | Três falhas NGINX | Potencial de DoS/RCE condicionado à configuração |
| Certificados | eMudhra e resposta Go | Comprometimento de chaves / atualização de confiança |
| Sistemas e aplicações | Microsoft, Oracle EBS e Plex | Boletins e exploração atribuída ao caso específico |
| Nuvem | Railway e Zeabur | Incidentes confirmados pelos fornecedores |
| Ecossistema de IA | OpenCode/MCP OAuth e LiteLLM | Pesquisa de vulnerabilidade e cadeia de fornecimento |
| Firmware | TianoCore EDK II PXE | Risco pré-boot e diferença entre patch upstream e firmware do equipamento |

O catálogo contém 16 dossiês. As referências canônicas estão em [data/sources.js](../data/sources.js); resumos, versões, ressalvas e CVEs estão em [data/events.js](../data/events.js). A página [Fontes](../pages/fontes.html) apresenta os links ao leitor.

## Decisões editoriais

- “Todas” foi tratado como ampliação da investigação entre ecossistemas. O site explicita que a seleção não enumera todos os CVEs críticos mundiais do mês nem cobre 30–31/10, posteriores ao corte.
- Node.js classifica Brotli como alta gravidade. A ficha não recebe nota crítica importada de outra avaliação.
- Plex e OpenCode tinham correções anteriores a outubro; o marco publicado é a divulgação/atualização do mês.
- O advisory OpenCode GHSA-632h-h47v-g4x4 é de setembro e trata de outro problema. Ele não sustenta a violação do Console em outubro. A ficha usa a pesquisa direta da Pillar sobre MCP OAuth.
- Boletins Microsoft e Oracle abrangem mais falhas do que os destaques aqui. Os links integrais ficam disponíveis; não há número agregado de vítimas ou de vulnerabilidades do mês.
- A confirmação de exploração em PAN-OS de 29/10 é distinta da atribuição retirada pela Unit 42 em 25/10.
- O campo de release corrigida do advisory EDK II permanece sem versão indicada, embora referencie uma PR. O texto não promete firmware corrigido para todo fabricante.
- Ações defensivas são sínteses didáticas; as fontes guardam as condições completas e as atualizações operacionais.

## Resultado implementado

Seis páginas estáticas, conteúdo separado em módulos, Anime.js 4.5.0 local e fonte local licenciada. Diagrama de infraestrutura ilustrativo, filtros de cronologia e dossiês, referências rastreáveis, menu para telas pequenas e jogo de seis rodadas com revisão de respostas.

As contagens da interface descrevem somente o catálogo editorial. O globo não representa tráfego real. Não há ataque, coleta de respostas, backend de aplicação ou publicação externa.

## Verificação

Use `npm run check` para as verificações reproduzíveis de dados, filtros, jogo, links e sintaxe. A sessão não dispõe de navegador conectado; conferência visual, console em navegador, contraste medido e interação real permanecem pendentes. O README registra a execução e o roteiro manual.
