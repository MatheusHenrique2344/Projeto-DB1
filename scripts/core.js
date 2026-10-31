// Lógica sem dependência do HTML: aplica os filtros combináveis da cronologia.
export function filterEvents(events, { category = 'all', from = '', to = '', query = '' } = {}) {
  const term = query.trim().toLocaleLowerCase('pt-BR');
  return events.filter(event =>
    (category === 'all' || event.category === category) &&
    (!from || event.date >= from) && (!to || event.date <= to) &&
    (!term || `${event.title} ${event.description} ${(event.cves || []).join(' ')}`.toLocaleLowerCase('pt-BR').includes(term))
  );
}

// O estado descreve a tela atual, a rodada, a pontuação e as respostas dadas.
export function newGame() { return { stage: 'intro', index: 0, score: 0, answers: [] }; }
export function startGame() { return { ...newGame(), stage: 'playing' }; }

// Aceita uma resposta por rodada e devolve um estado novo, sem mutação.
export function answerGame(state, choice, scenarios) {
  if (state.stage !== 'playing' || !Number.isInteger(choice) || choice < 0 || choice >= scenarios[state.index].choices.length) return state;
  const correct = choice === scenarios[state.index].correct;
  return { ...state, stage: 'feedback', score: state.score + (correct ? 100 : 0), answers: [...state.answers, { choice, correct }] };
}
// Avança após o feedback ou mostra a tela final quando não há mais situações.
export function advanceGame(state, total) {
  if (state.stage !== 'feedback') return state;
  return state.index + 1 === total ? { ...state, stage: 'result' } : { ...state, stage: 'playing', index: state.index + 1 };
}

// Evita que texto vindo dos dados seja interpretado como marcação HTML.
const htmlEscapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => htmlEscapes[char]);
}

// As datas chegam como AAAA-MM-DD e são exibidas como DD/MM/AAAA.
export function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}
