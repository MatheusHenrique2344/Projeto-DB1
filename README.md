# Outubro Negro · DB1

Especial editorial em português brasileiro sobre vulnerabilidades e incidentes de segurança divulgados ou atualizados em **outubro de 2026**, com corte de pesquisa em **29/10/2026**.

## Executar

Requer Node.js moderno (validado com Node 26.11.1). Não é necessário instalar pacotes nem compilar:

```bash
npm start
```

Abra **http://127.0.0.1:8000**. Para mudar a porta: `PORT=8080 npm start`.

Alternativa, com Python 3: `python3 -m http.server 8000 --bind 127.0.0.1`. O servidor Node incluído restringe os caminhos públicos e é a opção recomendada. A aplicação precisa de HTTP para carregar módulos; não abra diretamente por `file://`.

## Conteúdo e navegação

- `index.html`: panorama editorial, diagrama de infraestrutura, destaques, cronologia resumida e acesso às demais páginas.
- `pages/cronologia.html`: busca por termo/CVE, filtros combináveis de categoria e datas, referências e estados de evidência.
- `pages/investigacao.html`: 16 dossiês com exposição, versões corrigidas, ações defensivas, fontes e ressalvas.
- `pages/inteligencia-artificial.html`: papel documentado da IA, ferramentas e limites das alegações.
- `pages/fontes.html`: referências primárias, metodologia e limitações.
- `pages/cyber-challenge.html`: seis cenários fictícios, feedback imediato, pontuação, revisão e reinício.

O recorte inclui Node.js/Brotli e DNS/TLS, PHP, GitLab, NGINX, eMudhra, Oracle, Microsoft, Plex, EDK II, OpenCode/MCP, Railway, Zeabur e LiteLLM. Não pretende enumerar todos os CVEs críticos do mês no mundo. Nem todos os registros têm gravidade formal “crítica”: os rótulos preservam as fontes.

## Arquitetura

HTML semântico, CSS responsivo e módulos JavaScript, sem framework ou serviço de aplicação. O servidor incluído apenas entrega arquivos estáticos; não armazena respostas ou executa lógica do jogo no servidor. Para apresentar o projeto, consulte o [guia para os juízes](docs/guia-para-os-juizes.md).

```text
assets/               Marca SVG do especial, favicon, fonte e Anime.js local
data/events.js        Casos, resumos simples, detalhes e marcos históricos
data/sources.js       Referências e data de verificação
data/scenarios.js     Cenários fictícios e feedback
scripts/core.js       Filtros, estados e pontuação, sem DOM
scripts/main.js       Navegação e apresentação dos dados
scripts/motion.js     Animações como melhoria progressiva
scripts/challenge.js  Interface do jogo
scripts/serve.mjs     Servidor estático de desenvolvimento
scripts/check.mjs     Verificações reproduzíveis
styles/main.css       Estrutura visual compartilhada e layouts responsivos
styles/editorial-refresh.css  Paleta, tipografia e ajustes de legibilidade
docs/                 Pesquisa original e ampliação do escopo
```

Para adicionar um caso: cadastrar as referências em `sources.js`, criar a ficha em `events.js` e informar um `plainSummary` em linguagem simples, além dos detalhes, tipo de evidência, datas, fontes e limites. As contagens da interface são derivadas dos registros; o cabeçalho da investigação deve ser atualizado se o número de casos mudar.

## Animações e acessibilidade

Anime.js **4.5.0**, obtido do pacote oficial npm, com bundle ESM e licença MIT em `assets/vendor/animejs/`. A fonte Adwaita Sans é distribuída com sua licença em `assets/fonts/`.

Entradas e transições usam Anime.js; não há animação contínua nem bloqueio de rolagem. `prefers-reduced-motion` desativa as animações e conclui as que já estiverem em execução. Falha ao carregar a biblioteca não oculta o conteúdo.

Navegação responsiva com botão e Escape, atalho para o conteúdo, foco visível, controles rotulados, dossiês com `details/summary`, resultados de filtro anunciados e feedback textual do jogo. O desafio não tem limite de tempo. Não há cadastro, analytics, envio ou persistência de respostas.

Breakpoints e layouts foram implementados para 360, 768, 1024 e 1440 px. **A renderização nessas larguras ainda precisa de conferência em navegador:** nenhuma superfície de navegador estava disponível nesta sessão. Não há alegação de auditoria WCAG concluída.

## Verificar

```bash
npm run check
```

O check valida referências, datas e IDs, filtros combinados, as 64 combinações de acertos/erros, prevenção de pontuação duplicada, links e âncoras locais, sintaxe dos módulos e a API do Anime.js. Não executa exploits ou tráfego contra terceiros. Os testes de lógica não substituem testes da interface.

Com o servidor na porta padrão, `npm run check -- --http` confere também as seis páginas, os tipos MIME dos assets, a recusa de métodos de escrita e a ausência de acesso aos diretórios privados.

Uma verificação adicional com jsdom, instalado somente em `/tmp`, exercitou 57 interações sobre o HTML e os módulos reais das seis páginas: menu/Escape/foco, filtros combinados e reset, links diretos, fontes, feedback, duas partidas completas e reinício. Não adiciona dependência ao projeto e não verifica layout. Veja [o registro de verificação](docs/verificacao.md).

Conferência manual pendente: abrir as seis páginas nas quatro larguras; usar apenas teclado; testar menu, filtros e desafio; alternar movimento reduzido; revisar console e contraste medido.

## Fontes e limites editoriais

As referências e suas datas estão no site e em `data/sources.js`. A pesquisa usa mantenedores, pesquisadores e agências de segurança. Uma fonte confirmar um ataque não significa que o projeto o reproduziu independentemente.

Pontos preservados: classificação alta de Brotli pelo Node.js; correções anteriores a outubro em Plex/OpenCode; retratação Unit 42 de 25/10 e confirmação distinta em 29/10; ausência de nota inventada para incidentes; divergência sobre PHP-FPM; hipóteses preliminares revistas em LiteLLM. Acesso direto à CISA e à NVD foi limitado. Veja a página de metodologia para os detalhes.

O documento `docs/pesquisa-e-plano-inicial.md` é o registro da etapa inicial, cujo recorte foi ampliado a pedido do usuário. `docs/pesquisa-ampliada.md` descreve o escopo da implementação.

## Publicação

Pode ser hospedado como conteúdo estático, preservando `index.html`, `pages/`, `styles/`, `scripts/` (módulos do cliente), `data/` e `assets/`. Nenhuma variável secreta é necessária. `serve.mjs` e `check.mjs` são ferramentas locais e podem ser excluídos do pacote publicado.

Não houve commit, push ou publicação nesta etapa. Revalidar os avisos antes de apresentar o conteúdo como atualizado em outra data.
