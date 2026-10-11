import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HttpError, sendDonateEmails, sendVolunteerEmails } from '../lib/mail.mjs';

const ROOT = join(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 3000;

function loadEnvFile() {
  const path = join(ROOT, '.env');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function handleApi(req, res, sendFn) {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'Méthode non autorisée' });
    return;
  }
  try {
    const data = await readJson(req);
    await sendFn(data);
    json(res, 200, { success: true });
  } catch (err) {
    if (err instanceof HttpError) {
      json(res, err.statusCode, { error: err.publicMessage });
      return;
    }
    if (err instanceof SyntaxError) {
      json(res, 400, { error: 'Données invalides.' });
      return;
    }
    console.error(err);
    json(res, 500, { error: 'Erreur serveur' });
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let relative = decodeURIComponent(url.pathname);
  if (relative === '/') relative = '/index.html';
  const filePath = normalize(join(DIST, relative));
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
  res.end(readFileSync(filePath));
}

const server = createServer(async (req, res) => {
  const path = new URL(req.url, `http://localhost:${PORT}`).pathname;
  if (path === '/api/donate') {
    await handleApi(req, res, sendDonateEmails);
    return;
  }
  if (path === '/api/volunteer') {
    await handleApi(req, res, sendVolunteerEmails);
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Save Us — http://localhost:${PORT}`);
});
