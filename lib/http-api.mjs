import { HttpError } from './mail.mjs';

async function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === 'string') {
    return req.body ? JSON.parse(req.body) : {};
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export function createApiHandler(sendFn) {
  return async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Méthode non autorisée' });
      return;
    }

    try {
      const data = await readBody(req);
      await sendFn(data);
      res.status(200).json({ success: true });
    } catch (err) {
      if (err instanceof SyntaxError) {
        res.status(400).json({ error: 'Données invalides.' });
        return;
      }
      const status = err instanceof HttpError ? err.statusCode : 500;
      const message = err instanceof HttpError ? err.publicMessage : 'Erreur serveur';
      if (!(err instanceof HttpError)) console.error(err);
      res.status(status).json({ error: message });
    }
  };
}
