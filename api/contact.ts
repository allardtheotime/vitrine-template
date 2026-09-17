import type { VercelRequest, VercelResponse } from '@vercel/node';

// Fonction serverless Vercel pour le formulaire de contact — pas de webhook externe.
// Envoie l'email via l'API Resend (https://resend.com), clé stockée dans la variable
// d'environnement Vercel RESEND_API_KEY, destinataire dans CONTACT_TO_EMAIL.
// Si tu préfères un autre fournisseur (Postmark, SMTP...), seule cette fonction
// est à adapter — le formulaire côté client (Contact.astro) n'a pas à changer.

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = (req.body ?? {}) as ContactBody;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Champs requis manquants' });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Email invalide' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const siteName = process.env.SITE_NAME ?? 'Site vitrine';

  if (!apiKey || !toEmail) {
    console.error('RESEND_API_KEY ou CONTACT_TO_EMAIL manquant dans les variables d\'environnement Vercel');
    res.status(500).json({ error: 'Configuration serveur incomplète' });
    return;
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Formulaire de contact <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: `Nouveau message — ${siteName}`,
        text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!emailRes.ok) {
      const detail = await emailRes.text();
      console.error('Resend a refusé l\'envoi:', detail);
      res.status(502).json({ error: 'Échec de l\'envoi' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erreur envoi contact:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
