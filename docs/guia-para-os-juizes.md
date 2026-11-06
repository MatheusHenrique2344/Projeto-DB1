# Guia de apresentação para os juízes

Este roteiro ajuda a explicar o que o site faz e onde cada parte do código está. Não é preciso ler arquivo por arquivo durante a apresentação.

## Apresentação em quatro passos

1. **Comece pela página inicial** (`index.html`). Explique que o projeto reúne casos de segurança digital de outubro de 2026 e apresenta primeiro um resumo para quem não conhece os termos.
2. **Abra “Casos explicados”** (`pages/investigacao.html`). Mostre o glossário, os filtros e um caso. O resumo aparece aberto; versões, números e recomendações ficam disponíveis nos detalhes expansíveis.
3. **Mostre a linha do tempo** (`pages/cronologia.html`). É possível combinar busca, área da tecnologia e datas. As fontes ajudam a conferir de onde veio cada afirmação.
4. **Feche com o desafio** (`pages/cyber-challenge.html`) e a página de fontes. O jogo explica cada escolha; as fontes registram o que foi confirmado e o que ainda é incerto.

## Como os arquivos se conectam

| Arquivo | Como explicar sua função |
| --- | --- |
| `index.html` | Estrutura da página inicial: títulos, navegação, seções e lugares onde os dados aparecem. |
| `pages/*.html` | Estrutura das outras páginas. O texto e os controles ficam no HTML; a navegação é compartilhada. |
| `styles/main.css` | Regras de layout para celular e computador, componentes e estados de foco. |
| `styles/editorial-refresh.css` | Camada visual carregada depois da folha principal: cores, fontes, cartões e espaçamento. |
| `data/events.js` | Casos e acontecimentos. Cada caso guarda o resumo simples e, em campos separados, as informações técnicas. |
| `data/sources.js` | Links das fontes originais e a data em que a pesquisa foi conferida. O ID da fonte conecta o link ao caso. |
| `data/scenarios.js` | Situações inventadas, alternativas, resposta correta e explicação do jogo. |
| `assets/vendor/animejs/` e `assets/fonts/` | Biblioteca de animação e fonte distribuídas com as respectivas licenças. São arquivos de terceiros/binários, não código escrito para esta página. |
| `assets/outubro-negro.svg` | Marca do especial, usada sozinha no cabeçalho e acompanhada de texto no rodapé. O escudo com lupa representa proteção e investigação de falhas. |
| `assets/favicon.svg` | Ícone da aba do navegador: um inseto digital que representa uma falha escondida no código. |
| `scripts/core.js` | Regras independentes da página: filtros, pontuação, avanço do jogo e proteção de texto inserido no HTML. |
| `scripts/main.js` | Lê os dados e os coloca nas páginas; conecta filtros, navegação, referências e animações. |
| `scripts/challenge.js` | Desenha as telas do jogo e envia as escolhas para as regras de `core.js`. |
| `scripts/motion.js` | Animações opcionais com Anime.js. O conteúdo continua disponível se a animação for desligada. |
| `scripts/serve.mjs` | Servidor local que entrega arquivos do projeto durante a apresentação. Não é o servidor de uma aplicação com banco de dados. |
| `scripts/check.mjs` | Verificações automáticas do projeto, como dados, filtros, estados do jogo e links locais. |

O `package.json` não aceita comentários JSON. Ele contém os comandos `npm start` e `npm run check`; esta tabela explica para que servem. Também não é útil inserir comentários dentro do arquivo minificado do Anime.js ou da fonte: as licenças e este guia explicam a origem deles.

## Três conceitos que podem aparecer

- **CVE:** número usado para identificar uma falha de segurança específica.
- **Gravidade:** estimativa do impacto que a falha poderia ter. Uma nota alta não prova que alguém usou a falha.
- **Resumo simples e detalhe técnico:** o resumo ajuda qualquer pessoa a entender o caso; a ficha técnica preserva versões, condições e recomendações das fontes.

## Limites que vale dizer em voz alta

O site faz uma seleção editorial; não lista todas as falhas críticas do mundo. O recorte dos acontecimentos termina em outubro, com fontes e atualizações verificadas até **06/11/2026**. O projeto registra o que as fontes disseram, mas não reproduziu ataques nem confirma de forma independente cada relato. Os números da página contam apenas os casos desta edição.

## Como abrir o projeto

No terminal, dentro da pasta do projeto:

```bash
npm start
```

Depois, abra **http://127.0.0.1:8000** no navegador. O servidor só precisa entregar os arquivos para a página funcionar; não há instalação de pacotes para o site.
