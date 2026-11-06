// Verificações locais: dados editoriais, filtros, jogo, links e sintaxe dos módulos.
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cases, timeline, categories } from '../data/events.js';
import { sources, verifiedAt } from '../data/sources.js';
import { scenarios } from '../data/scenarios.js';
import { filterEvents, newGame, startGame, answerGame, advanceGame, escapeHTML } from './core.js';

const root = fileURLToPath(new URL('../', import.meta.url));
let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks++; }

// Integridade editorial: dados sempre têm referência e data no recorte declarado.
const sourceIds = new Set(sources.map(source => source.id));
check(sourceIds.size === sources.length, 'Referências duplicadas');
check(new Set(cases.map(item => item.id)).size === cases.length, 'Dossiês duplicados');
check(new Set(timeline.map(item => item.id)).size === timeline.length, 'Eventos duplicados');
for (const source of sources) {
  check(new URL(source.url).protocol === 'https:', `Fonte sem HTTPS: ${source.id}`);
  check(source.date <= verifiedAt, `Fonte posterior à verificação: ${source.id}`);
}
for (const item of cases) {
  check(item.date >= '2026-10-01' && item.date <= '2026-10-31', `Data fora do recorte de outubro: ${item.id}`);
  check(Boolean(categories[item.category]), `Categoria inexistente: ${item.id}`);
  check(item.sources.length > 0 && item.sources.every(id => sourceIds.has(id)), `Referências inválidas: ${item.id}`);
  check([item.summary, item.affected, item.fixed, item.action, item.limit].every(Boolean), `Ficha incompleta: ${item.id}`);
}
for (const event of timeline) {
  check(cases.some(item => item.id === event.caseId), `Dossiê inexistente: ${event.id}`);
  check(event.sources.every(id => sourceIds.has(id)), `Fonte de evento inexistente: ${event.id}`);
}
check(cases.find(item => item.id === 'node').severity === 'Alta', 'Preservar a classificação oficial do Node.js');
check(timeline.some(event => event.evidence === 'Atribuição retratada'), 'Preservar a retratação');
check(cases.find(item => item.id === 'binance')?.cves.length === 0, 'Binance não deve ser apresentado como um CVE');
check(!cases.some(item => item.id === 'serpro'), 'Serpro deve permanecer como tentativa mitigada, não como dossiê de vulnerabilidade');

// Filtros: combinação, fronteiras inclusivas, busca e ausência de resultados.
const fixture = [
  { title: 'Node.js', description: 'Brotli', date: '2026-10-21', category: 'runtime', cves: ['CVE-2026-111497'] },
  { title: 'GitLab', description: 'CI/CD', date: '2026-10-12', category: 'devtools' },
  { title: 'PHP', description: 'Sessões', date: '2026-10-23', category: 'runtime' },
];
assert.deepEqual(filterEvents(fixture, { category: 'runtime', from: '2026-10-21', to: '2026-10-21' }), [fixture[0]]); checks++;
assert.deepEqual(filterEvents(fixture, { query: '  bRoTlI ' }), [fixture[0]]); checks++;
assert.deepEqual(filterEvents(fixture, { query: '111497' }), [fixture[0]]); checks++;
assert.deepEqual(filterEvents(fixture, { query: 'inexistente' }), []); checks++;
assert.deepEqual(filterEvents(fixture, { category: 'devtools', from: '2026-10-20' }), []); checks++;
assert.deepEqual(filterEvents(fixture, { from: '2026-10-23', to: '2026-10-12' }), []); checks++;
assert.deepEqual(filterEvents(fixture), fixture); checks++;
check(escapeHTML('<script>"&\'') === '&lt;script&gt;&quot;&amp;&#39;', 'Escape de texto');

// Todos os caminhos certos/errados do jogo: 2^6 = 64 partidas completas.
for (let mask = 0; mask < 2 ** scenarios.length; mask++) {
  let state = startGame();
  let expectedScore = 0;
  for (let index = 0; index < scenarios.length; index++) {
    const scenario = scenarios[index];
    const correct = Boolean(mask & (1 << index));
    const choice = correct ? scenario.correct : (scenario.correct + 1) % scenario.choices.length;
    check(answerGame(state, -1, scenarios) === state, 'Rejeitar alternativa inválida');
    state = answerGame(state, choice, scenarios);
    expectedScore += correct ? 100 : 0;
    check(state.score === expectedScore, 'Pontuação por decisão');
    check(answerGame(state, scenario.correct, scenarios) === state, 'Impedir resposta e pontuação duplicadas');
    state = advanceGame(state, scenarios.length);
  }
  check(state.stage === 'result' && state.answers.length === scenarios.length, 'Concluir as seis rodadas');
  check(advanceGame(state, scenarios.length) === state, 'Resultado não avança novamente');
}
check(newGame().stage === 'intro', 'Estado inicial');
assert.deepEqual(startGame(), { stage: 'playing', index: 0, score: 0, answers: [] }); checks++;
for (const scenario of scenarios) check(scenario.choices.length === 3 && Number.isInteger(scenario.correct) && scenario.correct >= 0 && scenario.correct < 3 && Boolean(scenario.feedback), 'Cenário válido');

// Todos os destinos locais presentes no HTML precisam existir; hashes dinâmicos são os dossiês.
const htmlFiles = ['index.html', ...(await readdir(path.join(root, 'pages'))).filter(name => name.endsWith('.html')).map(name => `pages/${name}`)];
for (const filename of htmlFiles) {
  const html = await readFile(path.join(root, filename), 'utf8');
  check(!html.includes('✳'), `Símbolo decorativo sujeito a emoji: ${filename}`);
  check(html.includes('<html lang="pt-BR">'), `Idioma: ${filename}`);
  check((html.match(/<h1\b/g) || []).length === 1, `Um H1: ${filename}`);
  check(html.includes('id="conteudo"') && html.includes('class="skip-link"'), `Atalho acessível: ${filename}`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(target)) continue;
    const [localPath, hash] = target.split('#');
    const resolved = localPath ? path.resolve(root, path.dirname(filename), localPath) : path.join(root, filename);
    check((await stat(resolved)).isFile(), `Link quebrado: ${filename} → ${target}`);
    if (hash) {
      const destination = await readFile(resolved, 'utf8');
      check(destination.includes(`id="${hash}"`) || (resolved.endsWith('investigacao.html') && cases.some(item => item.id === hash)), `Âncora inválida: ${filename} → ${target}`);
    }
  }
}
check(!(await readFile(path.join(root, 'scripts/challenge.js'), 'utf8')).includes('✳'), 'Desafio sem símbolo sujeito a emoji');
for (const folder of ['scripts', 'data']) {
  for (const filename of await readdir(path.join(root, folder))) {
    if (/\.(m?js)$/.test(filename)) execFileSync(process.execPath, ['--check', path.join(root, folder, filename)]);
  }
}
const anime = await import('../assets/vendor/animejs/anime.esm.min.js');
check(typeof anime.animate === 'function' && typeof anime.stagger === 'function', 'Bundle Anime.js e API utilizadas');
// Opcional: inicie `npm start` antes de usar --http para conferir a entrega local.
if (process.argv.includes('--http')) {
  for (const filename of htmlFiles) {
    const response = await fetch(`http://127.0.0.1:8000/${filename}`);
    check(response.status === 200 && response.headers.get('content-type').startsWith('text/html'), `HTTP: ${filename}`);
    check((await response.text()).includes('<html lang="pt-BR">'), `HTML entregue: ${filename}`);
  }
  for (const [filename, type] of [['styles/main.css', 'text/css'], ['scripts/main.js', 'text/javascript'], ['assets/fonts/AdwaitaSans.ttf', 'font/ttf'], ['assets/favicon.svg', 'image/svg+xml'], ['assets/vendor/animejs/anime.esm.min.js', 'text/javascript']]) {
    const response = await fetch(`http://127.0.0.1:8000/${filename}`);
    check(response.status === 200 && response.headers.get('content-type').startsWith(type), `Asset HTTP: ${filename}`);
    await response.arrayBuffer();
  }
  for (const filename of ['.aws/credentials', '.git/config', 'docs/pesquisa-e-plano-inicial.md', 'arquivo-inexistente']) {
    const response = await fetch(`http://127.0.0.1:8000/${filename}`);
    check(response.status === 404, `Caminho privado ou inexistente: ${filename}`);
    await response.text();
  }
  const unsupported = await fetch('http://127.0.0.1:8000/', { method: 'POST' });
  check(unsupported.status === 405, 'Servidor só aceita leitura');
  console.log('HTTP aprovado nas seis páginas, assets e limites de acesso.');
}
console.log(`${checks} verificações aprovadas: dados, filtros, 64 partidas, links locais, sintaxe e Anime.js.`);
console.log(`${htmlFiles.length} páginas; ${cases.length} dossiês; ${timeline.length} marcos; ${sources.length} referências; ${new Set(cases.flatMap(item => item.cves)).size} CVEs citados.`);
console.log('Não cobre renderização, contraste medido nem interação em navegador.');
