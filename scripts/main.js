// Liga o conteúdo cadastrado em data/ às páginas HTML e aos controles do leitor.
import { cases, categories, timeline } from '../data/events.js';
import { sources, sourceById, verifiedAt } from '../data/sources.js';
import { escapeHTML as h, formatDate, filterEvents } from './core.js';
import { initMotion } from './motion.js';

// As páginas ficam em pastas diferentes; base mantém corretos os links gerados.
const page = document.body.dataset.page;
const base = page === 'home' ? './' : '../';
const arrow = '<span aria-hidden="true">↗</span>';

// Monta um link consistente para uma fonte citada por ID em data/sources.js.
const sourceLink = id => {
  const source = sourceById[id];
  return `<a class="source-link" href="${h(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="${h(source.publisher + ': ' + source.title)} (abre em nova aba)">${h(source.publisher)} ${arrow}</a>`;
};

// Os números do panorama são calculados dos dados para não duplicar contagens.
document.querySelectorAll('[data-source]').forEach(element => { element.innerHTML = sourceLink(element.dataset.source); });
document.querySelectorAll('[data-stat="cases"]').forEach(element => { element.textContent = String(cases.length).padStart(2, '0'); });
document.querySelectorAll('[data-stat="cves"]').forEach(element => { element.textContent = new Set(cases.flatMap(item => item.cves)).size; });
document.querySelectorAll('[data-stat="categories"]').forEach(element => { element.textContent = String(Object.keys(categories).length).padStart(2, '0'); });
document.querySelectorAll('[data-stat="sources"]').forEach(element => { element.textContent = sources.length; });

// Menu pequeno: o mesmo botão abre e fecha; Escape devolve o foco ao botão.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir navegação' : 'Fechar navegação');
  nav.classList.toggle('is-open', !expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    menuButton.click();
    menuButton.focus();
  }
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a') && menuButton.getAttribute('aria-expanded') === 'true') menuButton.click();
});

// Cartão curto usado na página inicial. O texto vem do resumo em linguagem simples.
function caseCard(item, index) {
  return `<article class="case-card" data-reveal>
    <div class="card-top"><span class="mono dim">DOSSIÊ ${String(index + 1).padStart(2, '0')}</span><span class="severity ${item.severity === 'Crítica' ? 'critical' : ''}">${h(item.severity)}</span></div>
    <div class="product-icon ${h(item.id)}" aria-hidden="true">${h(({ node: 'JS', php: 'php', gitlab: 'GL', nginx: 'N' })[item.id] || item.product.slice(0, 2))}</div>
    <p class="eyebrow">${h(categories[item.category])}</p><h3>${h(item.product)}</h3>
    <p>${h(item.plainSummary)}</p>
    <a class="card-link" href="${base}pages/investigacao.html#${h(item.id)}">Abrir dossiê <span aria-hidden="true">↗</span></a>
  </article>`;
}

// Destaques e quatro marcos resumidos aparecem somente na página inicial.
const featured = document.querySelector('#featured-cases');
if (featured) featured.innerHTML = ['node', 'php', 'gitlab', 'binance'].map((id, index) => caseCard(cases.find(item => item.id === id), index)).join('');

const miniTimeline = document.querySelector('#mini-timeline');
if (miniTimeline) {
  miniTimeline.innerHTML = ['gitlab-ci', 'emudhra', 'node', 'binance'].map(id => {
    const item = cases.find(entry => entry.id === id);
    return `<a class="mini-event" href="${base}pages/investigacao.html#${id}"><time datetime="${item.date}">${item.date.slice(8)} <span>OUT</span></time><span class="mini-dot" aria-hidden="true"></span><h3>${h(item.shortTitle)}</h3><p>${h(item.evidence)}</p><span class="mini-arrow" aria-hidden="true">↗</span></a>`;
  }).join('');
}

// Cada filtro lê a mesma lista de casos; <details> guarda o conteúdo expansível.
const caseList = document.querySelector('#case-list');
if (caseList) {
  const categorySelect = document.querySelector('#case-category');
  addCategoryOptions(categorySelect);
  const form = document.querySelector('#case-filters');
  const draw = () => {
    const term = form.elements.query.value.trim().toLocaleLowerCase('pt-BR');
    const items = cases.filter(item => (categorySelect.value === 'all' || item.category === categorySelect.value) && `${item.product} ${item.title} ${item.cves.join(' ')} ${item.summary} ${item.plainSummary}`.toLocaleLowerCase('pt-BR').includes(term));
    caseList.innerHTML = items.length ? items.map((item, index) => `<details class="dossier" id="${item.id}">
      <summary><span class="dossier-index mono">${String(index + 1).padStart(2, '0')}</span><span class="dossier-name"><span class="eyebrow">${h(item.product)} <span class="dim">/ ${formatDate(item.date)}</span></span><strong>${h(item.title)}</strong></span><span class="dossier-grade"><span class="severity ${item.severity === 'Crítica' ? 'critical' : ''}">${h(item.severity)}</span>${item.score ? `<span class="score">${item.score}<small> / 10</small></span>` : ''}</span><span class="expand-icon" aria-hidden="true">+</span></summary>
      <div class="dossier-body"><div><p class="eyebrow plain-label">EM POUCAS PALAVRAS</p><p class="lead-small">${h(item.plainSummary)}</p><details class="technical-details"><summary>O que aconteceu nos bastidores?</summary><p>${h(item.summary)}</p></details><p class="mono cve-list">${item.cves.length ? item.cves.map(h).join('<br>') : 'Sem número de falha associado nesta ficha'}</p><span class="evidence">${h(item.evidence)}</span>${item.scoreSystem ? `<p class="caption">${h(item.scoreSystem)}. As escalas podem variar entre fornecedores.</p>` : ''}</div><details class="technical-details technical-more"><summary>Ver versões, correções e recomendações</summary><div class="technical-copy"><h3>Que parte foi afetada?</h3><p>${h(item.affected)}</p><h3>O que foi feito?</h3><p>${h(item.fixed)}</p><h3>Como reduzir o risco?</h3><p>${h(item.action)}</p><div class="editorial-note"><span class="eyebrow">O que ainda não se sabe</span><p>${h(item.limit)}</p></div><div class="source-row">${item.sources.map(sourceLink).join('')}</div><p class="caption">Fontes consultadas em ${formatDate(verifiedAt)}.${item.published ? ` Publicação: ${formatDate(item.published)}; a data da ficha identifica o acontecimento.` : ''}</p></div></details></div></div>
    </details>`).join('') : '<div class="empty-state"><span aria-hidden="true">∅</span><h2>Nenhum caso encontrado.</h2><p>Experimente outro termo ou limpe os filtros.</p></div>';
    document.querySelector('#case-count').textContent = `${items.length} de ${cases.length} casos`;
  };
  form.addEventListener('input', draw);
  form.addEventListener('submit', event => { event.preventDefault(); draw(); });
  form.addEventListener('reset', () => { queueMicrotask(draw); });
  draw();
  function openHash() {
    const id = location.hash.slice(1);
    const detail = [...caseList.querySelectorAll('details')].find(element => element.id === id);
    if (detail) { detail.open = true; detail.scrollIntoView({ block: 'start' }); }
  }
  openHash();
  window.addEventListener('hashchange', openHash);
}

// A cronologia combina categoria, datas e busca sem alterar os dados originais.
const timelineList = document.querySelector('#timeline-list');
if (timelineList) {
  const form = document.querySelector('#timeline-filters');
  addCategoryOptions(form.elements.category);
  const events = timeline.map(event => ({ ...event, cves: cases.find(item => item.id === event.caseId)?.cves || [] }));
  function drawTimeline() {
    const filters = Object.fromEntries(new FormData(form));
    const invalid = filters.from && filters.to && filters.from > filters.to;
    const items = invalid ? [] : filterEvents(events, filters);
    document.querySelector('#timeline-count').textContent = invalid ? 'A data inicial deve ser anterior ou igual à data final.' : `${items.length} de ${events.length} acontecimentos`;
    timelineList.innerHTML = items.length ? items.map(event => `<article class="timeline-event"><div class="event-date"><time datetime="${event.date}"><strong>${event.date.slice(8)}</strong><span>OUT / 2026</span></time></div><div class="event-track" aria-hidden="true"><i></i></div><div class="event-content"><div class="event-meta"><span class="eyebrow">${h(categories[event.category])}</span><span class="evidence ${event.evidence.includes('retratada') ? 'retracted' : ''}">${h(event.evidence)}</span></div><h2>${h(event.title)}</h2><p>${h(event.description)}</p>${event.published ? `<p class="caption">Acontecimento: ${formatDate(event.date)} · publicação consultada: ${formatDate(event.published)}</p>` : ''}<div class="event-links"><a class="text-link" href="investigacao.html#${event.caseId}">Entender este caso ${arrow}</a>${event.sources.map(sourceLink).join('')}</div></div></article>`).join('') : '<div class="empty-state"><span aria-hidden="true">∅</span><h2>Nenhum marco neste recorte.</h2><p>Altere as datas, a categoria ou o termo de busca.</p></div>';
  }
  form.addEventListener('input', drawTimeline);
  form.addEventListener('submit', event => { event.preventDefault(); drawTimeline(); });
  form.addEventListener('reset', () => queueMicrotask(drawTimeline));
  drawTimeline();
}

// A página de fontes usa os mesmos registros que alimentam os links nos casos.
const sourceList = document.querySelector('#source-list');
if (sourceList) sourceList.innerHTML = sources.map((source, index) => `<article class="source-item"><span class="mono dim">${String(index + 1).padStart(2, '0')}</span><div><span class="eyebrow">${h(source.publisher)} <span class="dim">/ ${h(source.type)}</span></span><h3><a href="${h(source.url)}" target="_blank" rel="noopener noreferrer">${h(source.title)} ${arrow}<span class="sr-only"> (abre em nova aba)</span></a></h3><p class="caption">Publicação ou atualização citada: ${formatDate(source.date)} · consulta: ${formatDate(verifiedAt)}</p></div></article>`).join('');

// Se Anime.js falhar ou movimento reduzido estiver ativo, o conteúdo segue legível.
initMotion();

// A lista de categorias aparece em dois filtros; centralizar evita divergências.
function addCategoryOptions(select) {
  select.insertAdjacentHTML('beforeend', Object.entries(categories)
    .map(([value, label]) => `<option value="${value}">${h(label)}</option>`)
    .join(''));
}
