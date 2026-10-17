import { HttpError, sendDonateEmails } from '../lib/mail.mjs';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    await sendDonateEmails(data);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Données invalides.' }) };
    }
    const status = err instanceof HttpError ? err.statusCode : 500;
    const message = err instanceof HttpError ? err.publicMessage : 'Erreur serveur';
    if (!(err instanceof HttpError)) console.error(err);
    return { statusCode: status, headers, body: JSON.stringify({ error: message }) };
  }
};
