
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



class HttpError extends Error {

  constructor(statusCode, publicMessage) {

    super(publicMessage);

    this.statusCode = statusCode;

    this.publicMessage = publicMessage;

  }

}



function env(name) {

  const value = process.env[name]?.trim();

  if (!value) {

    throw new HttpError(500, 'Configuration email manquante sur le serveur.');

  }

  return value;

}



function str(value, max = 2000) {

  return String(value ?? '').trim().slice(0, max);

}



function requireFields(data, fields) {

  for (const field of fields) {

    if (!str(data[field], 500)) {

      throw new HttpError(400, `Le champ « ${field} » est requis.`);

    }

  }

}



function requireEmail(email) {

  if (!EMAIL_RE.test(email)) {

    throw new HttpError(400, 'Adresse email invalide.');

  }

}



function getMailConfig() {

  return {

    apiKey: env('RESEND_API_KEY'),

    from: process.env.RESEND_FROM?.trim() || 'onboarding@resend.dev',

    fromName: process.env.RESEND_FROM_NAME?.trim() || 'Save Us',

    toAdmin: process.env.PARTNER_RECEIVER?.trim() || env('RESEND_TO'),

  };

}



function getResend() {

  return new Resend(getMailConfig().apiKey);

}



function toHtml(text) {

  return `<p>${String(text)

    .replace(/&/g, '&amp;')

    .replace(/</g, '&lt;')

    .replace(/>/g, '&gt;')

    .replace(/\n/g, '<br>')}</p>`;

}



function isTestRecipientRestriction(error) {

  const message = String(error?.message || error?.publicMessage || '').toLowerCase();

  return message.includes('only send testing emails') || message.includes('verify a domain');

}



async function sendResendEmail({ to, from, fromName, replyTo, subject, text }) {

  const resend = getResend();

  const payload = {

    from: `${fromName} <${from}>`,

    to: [to],

    subject,

    text,

    html: toHtml(text),

  };

  if (replyTo) payload.replyTo = replyTo;



  const { error } = await resend.emails.send(payload);

  if (!error) return;



  console.error('Resend error:', error);

  const message = String(error.message || '');

  const status = Number(error.statusCode) || 502;



  if (isTestRecipientRestriction(error)) {

    const err = new HttpError(

      502,

      'Resend n’envoie qu’à l’email du compte tant qu’aucun domaine n’est vérifié. Mettez PARTNER_RECEIVER sur cet email, ou vérifiez un domaine sur resend.com/domains.'

    );

    err.restrictedRecipient = true;

    throw err;

  }

  if (status === 401 || status === 403) {

    throw new HttpError(502, 'La clé API Resend est invalide ou l’expéditeur n’est pas autorisé.');

  }

  if (status === 429 || message.toLowerCase().includes('rate')) {

    throw new HttpError(502, 'Trop d’envois Resend pour le moment. Réessayez plus tard.');

  }

  throw new HttpError(502, 'Impossible d’envoyer l’email pour le moment. Réessayez plus tard.');

}



async function sendPair(adminMsg, confirmMsg) {

  try {

    await sendResendEmail(adminMsg);

    try {

      await sendResendEmail(confirmMsg);

    } catch (err) {

      if (err?.restrictedRecipient || isTestRecipientRestriction(err)) {

        console.warn(

          'Confirmation visiteur ignorée : vérifiez un domaine Resend pour envoyer à d’autres destinataires.'

        );

        return;

      }

      throw err;

    }

  } catch (err) {

    if (err instanceof HttpError) throw err;

    console.error('Resend error:', err);

    throw new HttpError(502, 'Impossible d’envoyer l’email pour le moment. Réessayez plus tard.');

  }

}



const AMOUNT_LABELS = {

  25: '25 000 FCFA',

  50: '50 000 FCFA',

  100: '100 000 FCFA',

  250: '250 000 FCFA',

  500: '500 000 FCFA',

};



const PROJECT_LABELS = {

  general: 'Fonds général (là où le besoin est le plus urgent)',

  education: 'Partage de kits scolaires',

  psychologie: 'Soutien psychologique',

  reinsertion: 'Réinsertion & autonomie',

};



const AVAILABILITY_LABELS = {

  weekend: 'Week-ends',

  semaine: 'En semaine',

  flexible: 'Flexible',

  terrain: 'Mission terrain (longue durée)',

};



export function formatDonateAmount(data) {

  const amount = str(data.montant || data.amount, 40);

  const custom = str(data.customAmount || data['custom-amount'], 40);

  if (amount === 'custom' || !amount) {

    return custom ? `${custom} FCFA` : '';

  }

  return AMOUNT_LABELS[amount] || `${amount} FCFA`;

}



export async function sendDonateEmails(raw) {

  const prenom = str(raw.prenom, 80);

  const nom = str(raw.nom, 80);

  const email = str(raw.email, 120).toLowerCase();

  const telephone = str(raw.telephone, 40) || '(non renseigné)';

  const projetKey = str(raw.projet, 40);

  const projet = PROJECT_LABELS[projetKey] || projetKey || '(non renseigné)';

  const message = str(raw.message, 4000) || '(aucun message)';

  const recu = raw.recu === true || raw.recu === 'on' || raw.recu === 'true';

  const montant = formatDonateAmount(raw);



  requireFields({ prenom, nom, email, montant }, ['prenom', 'nom', 'email', 'montant']);

  requireEmail(email);



  const { from, fromName, toAdmin } = getMailConfig();

  const fullName = `${prenom} ${nom}`;



  await sendPair(

    {

      to: toAdmin,

      from,

      fromName,

      replyTo: email,

      subject: `Nouveau don de ${fullName}`,

      text: `

Nom : ${fullName}

Email : ${email}

Téléphone : ${telephone}

Montant : ${montant}

Affectation : ${projet}

Reçu fiscal : ${recu ? 'Oui' : 'Non'}

Message : ${message}

`.trim(),

    },

    {

      to: email,

      from,

      fromName,

      subject: 'Merci pour votre don 🌸',

      text: `

Bonjour ${prenom},



Merci beaucoup pour votre soutien envers Save Us !

Nous avons bien reçu votre intention de don (${montant}) et nous reviendrons vers vous rapidement.



Avec gratitude,

L'équipe Save Us 💜

`.trim(),

    }

  );

}



export async function sendVolunteerEmails(raw) {

  const prenom = str(raw.prenom, 80);

  const nom = str(raw.nom, 80);

  const email = str(raw.email, 120).toLowerCase();

  const telephone = str(raw.telephone, 40);

  const ville = str(raw.ville, 80);

  const disponibiliteKey = str(raw.disponibilite, 40);

  const disponibilite = AVAILABILITY_LABELS[disponibiliteKey] || disponibiliteKey;

  const motivation = str(raw.motivation || raw.motivations, 4000);

  const skills = Array.isArray(raw.skills)

    ? raw.skills.map((s) => str(s, 40)).filter(Boolean)

    : str(raw.skills, 400).split(',').map((s) => s.trim()).filter(Boolean);

  const rgpd = raw.rgpd === true || raw.rgpd === 'on' || raw.rgpd === 'true';



  requireFields({ prenom, nom, email, telephone, ville, disponibilite, motivation }, [

    'prenom',

    'nom',

    'email',

    'telephone',

    'ville',

    'disponibilite',

    'motivation',

  ]);

  requireEmail(email);



  if (!rgpd) {

    throw new HttpError(400, 'Vous devez accepter le traitement de vos données.');

  }



  const { from, fromName, toAdmin } = getMailConfig();



  await sendPair(

    {

      to: toAdmin,

      from,

      fromName,

      replyTo: email,

      subject: `Nouvelle candidature bénévole — ${prenom} ${nom}`,

      text: `

Nom : ${nom} ${prenom}

Email : ${email}

Téléphone : ${telephone}

Ville : ${ville}

Disponibilité : ${disponibilite}

Compétences : ${skills.length ? skills.join(', ') : '(aucune)'}

Motivations : ${motivation}

`.trim(),

    },

    {

      to: email,

      from,

      fromName,

      subject: 'Merci pour votre candidature',

      text: `Bonjour ${prenom},



Merci pour votre candidature chez Save Us ! Nous avons bien reçu vos informations et nous reviendrons vers vous rapidement.



Cordialement,

L'équipe Save Us`,

    }

  );

}



export { HttpError }; 

