import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Servidor local de arquivos estáticos; não tem rotas de aplicação nem banco.
const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 8000);

// Só estes diretórios e a página inicial podem ser servidos pelo servidor local.
const publicDirectories = new Set(['pages', 'styles', 'scripts', 'data', 'assets']);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

const server = http.createServer(async (request, response) => {
  try {
    // A demonstração só precisa ler páginas e arquivos; métodos de escrita são recusados.
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }

    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const segments = pathname.split('/').filter(Boolean);
    const isPrivatePath = segments.some(segment => segment.startsWith('.'));
    const isPublicPath = !segments.length || segments[0] === 'index.html' || publicDirectories.has(segments[0]);
    if (isPrivatePath || !isPublicPath) throw new Error('not public');

    const filename = path.resolve(root, '.' + (pathname.endsWith('/') ? `${pathname}index.html` : pathname));
    if (!filename.startsWith(root)) throw new Error('outside root');
    const body = await readFile(filename);

    // MIME correto habilita módulos ES, estilos, imagens e a fonte local.
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filename)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Página não encontrada.');
  }
});

// Informa erros comuns de porta, por exemplo quando outra execução já está ativa.
server.on('error', error => {
  console.error(`Não foi possível iniciar o servidor: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Outubro Negro · http://127.0.0.1:${port}`));
