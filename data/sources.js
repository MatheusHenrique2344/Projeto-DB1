// Fontes usadas nos casos; cada registro guarda ID, autor, título, data, tipo e URL.
export const verifiedAt = '2026-10-29';
export const sources = [
  { id: 'node', publisher: 'Node.js', title: 'Security releases — 21 de outubro', date: '2026-10-21', type: 'Mantenedor', url: 'https://nodejs.org/en/blog/vulnerability/october-2026-security-releases' },
  { id: 'gitlab12', publisher: 'GitLab', title: 'Critical patch: 19.4.2, 19.3.5 e 19.2.8', date: '2026-10-12', type: 'Mantenedor', url: 'https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/' },
  { id: 'gitlab21', publisher: 'GitLab', title: 'Critical patch: 19.5.1 e backports', date: '2026-10-21', type: 'Mantenedor', url: 'https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/' },
  { id: 'php', publisher: 'PHP', title: 'RCE via OOM corruption', date: '2026-10-21', type: 'Advisory', url: 'https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w' },
  { id: 'php-state', publisher: 'PHP', title: 'RCE via stale global state', date: '2026-10-21', type: 'Advisory', url: 'https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp' },
  { id: 'foundation', publisher: 'PHP Foundation', title: 'Como as falhas foram encontradas e corrigidas', date: '2026-10-21', type: 'Mantenedor', url: 'https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/' },
  { id: 'wiz', publisher: 'Wiz Research', title: 'PHP2Shell: pesquisa assistida por IA', date: '2026-10-21', type: 'Pesquisadores', url: 'https://www.wiz.io/blog/php2shell-php-rce' },
  { id: 'nginx', publisher: 'CSA Singapore', title: 'Três vulnerabilidades críticas em NGINX', date: '2026-10-21', type: 'Agência de segurança', url: 'https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-150/' },
  { id: 'emudhra', publisher: 'Mozilla Security', title: 'Proteção contra intermediários eMudhra comprometidos', date: '2026-10-20', type: 'Fornecedor', url: 'https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/' },
  { id: 'emudhra-vendor', publisher: 'eMudhra', title: 'Comunicado sobre a geração de chaves fracas', date: '2026-10-20', type: 'Fornecedor', url: 'https://emudhra.com/en/post/certificate-security-incident' },
  { id: 'go', publisher: 'Go Security', title: 'Resposta ao incidente eMudhra', date: '2026-10-26', type: 'Mantenedor', url: 'https://go.dev/blog/emudhra-incident' },
  { id: 'oracle', publisher: 'Oracle', title: 'Critical Patch Update — outubro de 2026', date: '2026-10-20', type: 'Mantenedor', url: 'https://www.oracle.com/security-alerts/cpuoct2026.html' },
  { id: 'railway', publisher: 'Railway', title: 'Relatório preliminar do incidente de outubro', date: '2026-10-22', type: 'Fornecedor', url: 'https://blog.railway.com/p/preliminary-report-october-security-incident' },
  { id: 'zeabur', publisher: 'Zeabur', title: 'Acesso não autorizado à infraestrutura', date: '2026-10-16', type: 'Fornecedor', url: 'https://status.zeabur.com/incident/1091243' },
  { id: 'zeabur-report', publisher: 'Zeabur', title: 'Comunicado sobre o incidente de 14 de outubro', date: '2026-10-17', type: 'Fornecedor', url: 'https://zeabur.com/blogs/zeabur-is-shutting-down' },
  { id: 'litellm', publisher: 'LiteLLM', title: 'Release 1.107.0 comprometida', date: '2026-10-21', type: 'Mantenedor', url: 'https://docs.litellm.ai/blog/security-incident-oct-21-2026' },
  { id: 'plex', publisher: 'Plex', title: 'Atualização de 19/10: CVEs e exploração ativa', date: '2026-10-19', type: 'Fornecedor', url: 'https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319/3' },
  { id: 'edk', publisher: 'TianoCore', title: 'Execução de código antes do boot em EDK II', date: '2026-10-22', type: 'Advisory', url: 'https://github.com/tianocore/edk2/security/advisories/GHSA-99cj-7hg9-mp4m' },
  { id: 'opencode', publisher: 'Pillar Security', title: 'OpenCode: RCE via OAuth de servidores MCP', date: '2026-10-19', type: 'Pesquisadores', url: 'https://www.pillar.security/blog/open-and-shut-remote-code-execution-in-opencode-via-mcp-oauth' },
  { id: 'microsoft', publisher: 'Cyber Centre / Canadá', title: 'Microsoft: boletim mensal e exploração conhecida', date: '2026-10-13', type: 'Agência de segurança', url: 'https://www.cyber.gc.ca/en/alerts-advisories/microsoft-security-advisory-october-2026-monthly-rollup-av26-1038' },
  { id: 'unit42', publisher: 'Unit 42', title: 'PHP2Shell: retratação e atualização de 29/10', date: '2026-10-29', type: 'Pesquisadores', url: 'https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/' },
  { id: 'php-extra', publisher: 'Cyber Centre / Canadá', title: 'PHP: atualização de 27/10 e vetor de sessões', date: '2026-10-27', type: 'Agência de segurança', url: 'https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619' },
];
// Índice rápido para gerar o link de uma fonte a partir do ID guardado no caso.
export const sourceById = Object.fromEntries(sources.map(source => [source.id, source]));
