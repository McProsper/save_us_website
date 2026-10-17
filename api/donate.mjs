import { sendDonateEmails } from '../lib/mail.mjs';
import { createApiHandler } from '../lib/http-api.mjs';

export default createApiHandler(sendDonateEmails);
