// A tela do jogo usa situações separadas da lógica de pontuação.
import { scenarios } from '../data/scenarios.js';
import { newGame, startGame, answerGame, advanceGame, escapeHTML as h } from './core.js';
import { reveal } from './motion.js';

// Toda a interface do desafio é montada dentro deste painel.
const host = document.querySelector('#game');
let state = newGame();

// Desenha a tela correspondente ao estado: introdução, pergunta ou resultado.
function render(moveFocus = true) {
  if (state.stage === 'intro') {
    host.innerHTML = `<div class="game-intro"><div class="game-cross" aria-hidden="true">✳</div><p class="eyebrow">UM TREINO DE SEGURANÇA</p><h2 id="game-title" tabindex="-1">Seu próximo passo<br>faz diferença.</h2><p>Leia cada situação, escolha o que faria e descubra como essa decisão ajuda a proteger pessoas e computadores.</p><div class="game-facts"><span>6 situações inventadas</span><span>1 a 3 minutos</span><span>Até 600 pontos</span></div><button class="button button-orange" data-action="start">Começar <span aria-hidden="true">↗</span></button><p class="caption">Sem cronômetro. Nenhum comando ou acesso à internet é necessário.</p></div>`;
  } else if (state.stage === 'result') {
    const correct = state.answers.filter(answer => answer.correct).length;
    const title = correct === scenarios.length ? 'Defesa bem fundamentada.' : correct >= 4 ? 'Você está construindo uma boa defesa.' : 'Toda boa defesa começa com treino.';
    host.innerHTML = `<div class="game-result"><p class="eyebrow">MISSÃO CONCLUÍDA</p><p class="result-score">${state.score}<span>/600</span></p><h2 id="game-title" tabindex="-1">${title}</h2><p>Você acertou ${correct} de ${scenarios.length} decisões. Inventário, atualização, evidência e menor privilégio formam uma base para agir.</p><div class="result-review">${scenarios.map((scenario, index) => `<details><summary><span class="review-mark">${state.answers[index].correct ? '✓' : '↻'}</span>${h(scenario.category)}</summary><p>${h(scenario.feedback)}</p></details>`).join('')}</div><div class="button-row"><button class="button button-orange" data-action="restart">Jogar novamente <span aria-hidden="true">↻</span></button><a class="text-link" href="investigacao.html">Explorar os casos reais ↗</a></div></div>`;
  } else {
    const scenario = scenarios[state.index];
    const answered = state.stage === 'feedback';
    const answer = state.answers[state.index];
    host.innerHTML = `<div class="game-question"><div class="game-status"><span class="mono">SITUAÇÃO ${String(state.index + 1).padStart(2, '0')} DE 06</span><span class="mono">${state.score} PONTOS</span></div><label class="sr-only" for="game-progress">Situações respondidas</label><progress id="game-progress" value="${state.answers.length}" max="${scenarios.length}"></progress><p class="eyebrow">${h(scenario.category)}</p><h2 id="game-title" tabindex="-1">${h(scenario.title)}</h2><p class="scenario-context">${h(scenario.context)}</p><div class="choices" role="group" aria-label="Escolha uma resposta">${scenario.choices.map((choice, index) => `<button class="choice ${answered && index === scenario.correct ? 'is-correct' : ''} ${answered && index === answer.choice && !answer.correct ? 'is-incorrect' : ''}" data-choice="${index}" ${answered ? 'disabled' : ''}><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${h(choice)}</span>${answered && index === scenario.correct ? '<span class="choice-mark" aria-label="Resposta correta">✓</span>' : ''}${answered && index === answer.choice && !answer.correct ? '<span class="choice-mark" aria-label="Sua resposta: incorreta">×</span>' : ''}</button>`).join('')}</div>${answered ? `<div class="game-feedback" role="status"><strong>${answer.correct ? 'Boa decisão. +100 pontos' : 'Vamos rever essa decisão.'}</strong><p>${h(scenario.feedback)}</p></div><button class="button button-orange" data-action="next">${state.index === scenarios.length - 1 ? 'Ver resultado' : 'Próxima situação'} <span aria-hidden="true">→</span></button>` : '<p class="caption">Escolha uma resposta para ver a explicação.</p>'}</div>`;
  }
  if (moveFocus) {
    const target = state.stage === 'feedback' ? host.querySelector('[data-action="next"]') : host.querySelector('#game-title');
    target?.focus({ preventScroll: true });
    reveal([host.firstElementChild]);
  }
}

// Um único ouvinte trata respostas, próximo passo e reinício.
host.addEventListener('click', event => {
  const choice = event.target.closest('[data-choice]');
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (choice) {
    const next = answerGame(state, Number(choice.dataset.choice), scenarios);
    if (next === state) return;
    state = next;
  } else if (action === 'start' || action === 'restart') state = startGame();
  else if (action === 'next') state = advanceGame(state, scenarios.length);
  else return;
  render();
});
render(false);
