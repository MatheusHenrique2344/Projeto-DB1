# Outubro Negro — pesquisa e plano inicial

> Registro histórico da primeira etapa. O usuário ampliou o recorte para além de PHP e autorizou a criação das páginas na mensagem seguinte. A implementação e o novo escopo estão descritos em [pesquisa ampliada](pesquisa-ampliada.md) e no [README](../README.md). As condições de espera abaixo registram o plano original e não representam um bloqueio atual.

Verificação: **29/10/2026**, referência de calendário America/Sao_Paulo.
Estado: Fase 1 concluída; pesquisa inicial da Fase 2 e proposta de arquitetura para validação. Implementação ainda não iniciada.

## 1. Inspeção do ambiente

- Diretório: `/home/matheus/Projetos/DB1`.
- Nenhum arquivo de aplicação, manifesto, README ou teste encontrado.
- Existem diretórios reservados `.agents`, `.aws`, `.codex` e `.git`; seus conteúdos não foram modificados. A presença de `.git` não corresponde a um repositório utilizável: `git status --short --branch` retornou “not a git repository”.
- Não foram encontrados arquivos `AGENTS.md` no projeto ou nos diretórios ancestrais consultados.
- Ferramentas disponíveis: Node.js 26.11.1, npm 12.2.0 e Python 3.14.7.
- Acesso real à pesquisa web disponível. Alguns destinos bloquearam a leitura ou não forneceram conteúdo útil; essas limitações estão registradas abaixo.
- Nenhuma dependência instalada, configuração alterada, publicação ou inicialização Git realizada.

## 2. Recorte editorial proposto

Especial sobre os acontecimentos divulgados em outubro de 2026, com antecedentes essenciais da pesquisa de PHP2Shell. Tratar “Outubro Negro” como denominação editorial informal, sem presumir campanha única, autoria comum ou participação de IA em todos os incidentes.

Priorizar PHP2Shell, o papel documentado da IA na investigação e um caso distinto de ataque à cadeia de fornecimento, LiteLLM. Outros acontecimentos só entram após checagem individual.

Separar dois eixos nos registros:

1. **Tipo de evidência:** descoberta, relato ao mantenedor, divulgação, demonstração em laboratório, tentativa de exploração, comprometimento ou correção.
2. **Estado da informação:** confirmado pela fonte identificada, atribuição pendente, contestado ou retratado.

“Confirmado pelo fornecedor” sempre terá atribuição explícita; não significa reprodução independente por este projeto.

## 3. Cronologia preliminar

| Data do acontecimento | Registro proposto | Natureza e limite | Referência |
| --- | --- | --- | --- |
| 2024, sem dia definido | Sinais do problema OOM aparecem durante trabalho ligado a uma auditoria. | Antecedente descrito retrospectivamente pelo mantenedor; sem vetor concreto de RCE naquele momento. | [PHP Foundation][foundation] |
| 11/08/2026 | Calif reporta RCE relacionada à mesma causa raiz. | Relato privado ao mantenedor; não ataque a uma vítima. | [PHP Foundation][foundation] |
| 19–24/08/2026 | Wiz registra descoberta assistida por IA, demonstrações em Drupal e WordPress e comunicação ao PHP em 24/08. | Cronologia declarada pelos pesquisadores; demonstração técnica não comprova exploração criminosa. | [Wiz: pesquisa original][wiz] |
| 20/10/2026 | Identificadores circulam e o PHP antecipa o pré-aviso e a publicação das correções. | Divulgação antecipada; a Foundation corrige a pontuação inicialmente divulgada como 10,0 para 9,2. | [PHP Foundation][foundation] |
| 21/10/2026 | PHP publica correções para CVE-2026-109618 e CVE-2026-109619. | Lançamento de segurança e divulgação pública. | [PHP: aviso oficial][php], [advisory OOM][oom], [advisory estado global][state] |
| 21/10/2026 | Release LiteLLM 1.107.0 distribuída com conteúdo malicioso. | Comprometimento de distribuição confirmado pelo mantenedor; não atribuir ligação causal a PHP2Shell. | [LiteLLM: comunicado][litellm], [Wiz: análise][litellm-wiz] |
| 23/10/2026 | PHP informa vetor adicional, CVE-2026-115560, em configuração específica de sessões. | Correção prevista para o ciclo regular; não afirmar que as releases de 21/10 corrigem esse vetor. | [PHP: aviso de sessões][php], [Cyber Centre][canada] |
| 25/10/2026 | Unit 42 retira atribuição anterior de acesso inicial a PHP2Shell em órgão europeu. | Ataque observado, mas vínculo com os dois CVEs não confirmado. | [Unit 42: retratação][unit42] |
| 26/10/2026 | Inclusão dos dois CVEs no catálogo KEV, segundo alerta oficial canadense atualizado em 27/10. | Exploração conhecida; checagem direta do catálogo CISA ainda pendente. | [Cyber Centre: atualização 2][canada] |
| 29/10/2026 | Unit 42 confirma exploração de PHP2Shell em interfaces de gerenciamento PAN-OS expostas à internet, encadeada com falha do kernel Linux. | Comprometimento confirmado no relato do fornecedor; distinto do caso retratado de 25/10. Não extrapolar o alcance. | [Unit 42: atualização de 29/10][unit42] |

## 4. PHP em foco

| Identificador | Descrição editorial | Primeiras versões corrigidas nas linhas suportadas |
| --- | --- | --- |
| CVE-2026-109618 | Corrupção de memória no tratamento de falta de memória (OOM). | 8.2.35, 8.3.36, 8.4.27 e 8.5.12 |
| CVE-2026-109619 | Estado global retido após a memória associada ter sido liberada. | 8.2.35, 8.3.36, 8.4.27 e 8.5.12 |

O aviso do PHP considera em risco as instalações que atendem requisições web e aponta maior risco em Apache com mod_php. As faixas anteriores às versões corrigidas devem ser apresentadas por linha, sem usar uma comparação numérica única entre versões. Atualizar é a correção completa; regras WAF e outras medidas temporárias não equivalem ao patch. Fontes: [PHP][php], [OOM][oom] e [estado global][state].

Nas versões antigas e nos pacotes de distribuições, verificar backports com o fornecedor: apenas o número upstream pode não revelar a presença da correção. Fonte: [Cyber Centre][canada].

## 5. IA e limites da evidência

A Wiz relata uso de Wiz Atlas, Gemini 4 Argon e GPT-5.6 Sol na pesquisa. Essa informação deve ser atribuída à equipe, sem transformar alegações de produtividade em benchmark independente. Fonte: [Wiz][wiz].

A Foundation descreve IA apoiando a validação e a organização de relatos, com pessoas tomando decisões e trabalhando nos patches. A redação deve preservar a participação humana e os antecedentes da auditoria. Fonte: [PHP Foundation][foundation].

Lacunas e divergências que precisam continuar visíveis:

- **PHP-FPM:** a Foundation menciona RCE confirmada por caminhos da aplicação; o advisory OOM consultado afirma não haver exploit completo demonstrado para essa SAPI. Registrar a divergência e esclarecer escopo/atualização antes da redação definitiva. Fontes: [Foundation][foundation] e [OOM][oom].
- **17/10 e AWS:** resultados de pesquisa apontam uma tentativa anterior à divulgação; a URL principal consultada retornou conteúdo de navegação, sem o artigo legível. Não promover esse item a fato verificado nesta entrega.
- **CISA/NVD:** leitura direta da CISA retornou HTTP 403; NVD não forneceu texto legível. O registro sobre KEV está sustentado aqui pelo [alerta oficial canadense][canada], não por inspeção direta da CISA.
- **LiteLLM:** o comunicado avisa que hipóteses iniciais foram revistas e remete a um registro canônico. A distribuição maliciosa está documentada; a cadeia causal detalhada fica pendente da leitura desse registro. Fonte: [LiteLLM][litellm].
- Não usar participação do PHP na web como número de sites comprometidos, nem tentativas como contagem de vítimas.
- Não afirmar que IA causou todos os incidentes, que há um “colapso da internet” ou que os casos compartilham autoria.
- Gráficos quantitativos só entram com definição da amostra, período, unidade e dados rastreáveis. A primeira versão pode usar diagramas explicativos e cronologia sem estatísticas.

Como contexto jornalístico, foi localizada a cobertura da [404 Media][media]. Ela ajuda a contextualizar o rótulo e a diversidade de incidentes, mas não substitui os avisos dos mantenedores para versões ou exploração.

## 6. Sitemap e arquitetura propostos

Site estático, sem framework, backend ou banco. Anime.js será a biblioteca de animação solicitada pelo usuário. A versão exata será conferida e fixada na implementação, com licença preservada e distribuição local para evitar dependência de um CDN durante a apresentação.

```text
DB1/
├── index.html
├── pages/
│   ├── cronologia.html
│   ├── investigacao.html
│   ├── inteligencia-artificial.html
│   ├── fontes.html
│   └── cyber-challenge.html
├── styles/
│   ├── tokens.css
│   ├── main.css
│   └── challenge.css
├── scripts/
│   ├── main.js
│   ├── motion.js
│   ├── timeline.js
│   └── challenge.js
├── data/
│   ├── events.js
│   ├── sources.js
│   └── scenarios.js
├── assets/
│   ├── diagrams/
│   └── vendor/animejs/
├── docs/pesquisa-e-plano-inicial.md
└── README.md
```

HTML editorial semântico; dados interativos em módulos JavaScript. Cada evento terá identificador, data do acontecimento, data da publicação, categoria, tipo de evidência, estado da confirmação, referências e data de verificação. Eventos de vários dias terão início/fim explícitos, sem inventar precisão.

A página inicial terá abertura editorial, resumo, destaques, cronologia resumida, IA, PHP em foco e acesso ao jogo e às fontes. A cronologia terá intervalo de datas e categoria, filtros combináveis, limpeza e estado vazio. Investigação reunirá fichas dos CVEs, versões e recomendações defensivas. Fontes explicará seleção, divergências, limitações e correções editoriais.

Execução prevista: servidor HTTP local, por exemplo `python3 -m http.server 8000`, necessário para módulos JavaScript. Sem etapa de compilação. Publicação fica fora desta etapa de pesquisa.

## 7. Direção visual e Anime.js

- Fundo `#0A0A0B`, superfícies grafite, acento `#FF6A2A`, texto claro e contraste a verificar na implementação.
- Tipografia de títulos forte, corpo legível com coluna de leitura limitada e monoespaçada para datas, versões e CVEs.
- Abertura com título editorial amplo e diagrama SVG de requisição, processamento e memória; rótulo claro de ilustração explicativa.
- Cards com hierarquia de título, data, evidência e referência. Selos com texto, sem depender apenas de cor.
- Anime.js para sequência de entrada do hero, revelação discreta de cards, desenho de conexões SVG e transição entre cenários. Evitar loops decorativos, contadores estatísticos e bloqueio da rolagem.
- Respeitar `prefers-reduced-motion: reduce` em CSS e no JavaScript; conteúdo e controles permanecem disponíveis se a animação falhar.
- Preferir `transform` e `opacity`; animações curtas e executadas uma vez quando apropriado. Foco e feedback do jogo não dependem do fim de uma animação.

A documentação oficial permite distribuição local e apresenta `createScope()` com media queries, incluindo preferência por movimento reduzido: [instalação][anime-install] e [Scope][anime-scope].

## 8. Cyber Challenge e validação futura

Seis cenários fictícios: inventário, priorização de patch, diferença entre WAF e correção, análise de evidências, dependência comprometida e proteção de credenciais. Três alternativas por rodada, uma resposta avaliada por cenário, feedback imediato com justificativa, pontuação de 0 a 600, progresso, resultado e reinício completo. Duração estimada de leitura: 1–3 minutos; sem cronômetro que exclua leitores mais lentos. Sem ataques, varreduras ou comandos executáveis.

Critérios para a implementação após aprovação:

1. Verificar navegação e links internos; conferir fontes externas e registrar bloqueios.
2. Exercitar filtros isolados/combinados, limpeza e ausência de resultados.
3. Exercitar todas as alternativas do jogo, impedir pontuação duplicada e testar reinício.
4. Conferir teclado, foco, rótulos, feedback acessível e movimento reduzido.
5. Inspecionar 360, 768, 1024 e 1440 pixels, overflow e console.
6. Revisar afirmações e referências, datas, versões e distinção entre laboratório e incidente real.
7. Documentar execução, arquitetura, dependências, limitações e opções de publicação no README.

Nenhum desses testes de aplicação foi executado, pois a aplicação ainda não existe.

## 9. Próximo marco de validação

Validar o recorte PHP2Shell + IA + LiteLLM, as ressalvas editoriais, as seis páginas e a direção visual com Anime.js. Depois da validação, concluir as lacunas de pesquisa e detalhar o plano visual da Fase 3; solicitar a aprovação prevista no briefing antes da implementação da Fase 4.

## Referências

Todos os links abaixo foram consultados em 29/10/2026; os bloqueios e as limitações de leitura estão indicados no texto. A data de consulta não implica reprodução técnica das vulnerabilidades.

[php]: https://www.php.net/index.php
[foundation]: https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/
[oom]: https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w
[state]: https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp
[wiz]: https://www.wiz.io/blog/php2shell-php-rce
[unit42]: https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/
[canada]: https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619
[litellm]: https://docs.litellm.ai/blog/security-incident-oct-21-2026
[litellm-wiz]: https://www.wiz.io/blog/litellm-compromised-steals-credentials
[media]: https://www.404media.co/php2shell-black-october-ai-is-changing-everything-about-hacking-no-one-knows-what-happens-next/
[anime-install]: https://animejs.com/documentation/getting-started/installation
[anime-scope]: https://animejs.com/documentation/scope/
