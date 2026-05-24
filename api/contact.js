const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const sanitize = (value, maxLength = 1000) =>
  String(value || '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, maxLength);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export default async function handler(request, response) {
  try {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return response.status(405).json({ error: 'Metodo non consentito.' });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return response.status(500).json({ error: 'Resend non configurato.' });
    }

    const name = sanitize(request.body?.name, 120);
    const email = sanitize(request.body?.email, 180).toLowerCase();
    const phone = sanitize(request.body?.phone, 80);
    const service = sanitize(request.body?.service, 160);
    const message = sanitize(request.body?.message, 2000);
    const requestType = sanitize(request.body?.requestType, 40);
    const preferredDate = sanitize(request.body?.preferredDate, 80);
    const preferredTime = sanitize(request.body?.preferredTime, 120);
    const website = sanitize(request.body?.website, 240);

    if (!name || !isEmail(email) || !message) {
      return response.status(400).json({ error: 'Controlla nome, email e messaggio.' });
    }

    const from = (process.env.RESEND_FROM_EMAIL || 'Mago System <noreply@mago.digital.group>').trim();
    const to = (process.env.LEAD_TO_EMAIL || 'info@magodigital.it').trim();
    const isBooking = requestType === 'booking';
    const subject = isBooking ? `Nuova videochiamata richiesta da ${name}` : `Nuovo lead sanitario da ${name}`;
    const text = [
      `Tipo richiesta: ${isBooking ? 'Booking videochiamata' : 'Consulenza'}`,
      `Nome: ${name}`,
      `Email: ${email}`,
      `Telefono: ${phone || 'Non indicato'}`,
      `Settore: ${service || 'Non indicato'}`,
      ...(isBooking
        ? [
            `Giorno preferito: ${preferredDate || 'Non indicato'}`,
            `Fascia oraria: ${preferredTime || 'Non indicata'}`,
            `Sito attuale: ${website || 'Non indicato'}`,
          ]
        : []),
      '',
      'Messaggio:',
      message,
    ].join('\n');

    const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">Nuovo lead sanitario</h2>
      <p><strong>Tipo richiesta:</strong> ${isBooking ? 'Booking videochiamata' : 'Consulenza'}</p>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(phone || 'Non indicato')}</p>
      <p><strong>Settore:</strong> ${escapeHtml(service || 'Non indicato')}</p>
      ${
        isBooking
          ? `<p><strong>Giorno preferito:</strong> ${escapeHtml(preferredDate || 'Non indicato')}</p>
      <p><strong>Fascia oraria:</strong> ${escapeHtml(preferredTime || 'Non indicata')}</p>
      <p><strong>Sito attuale:</strong> ${escapeHtml(website || 'Non indicato')}</p>`
          : ''
      }
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0" />
      <p style="white-space:pre-line">${escapeHtml(message)}</p>
    </div>
  `;

    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.json().catch(() => null);
      return response.status(502).json({
        error: details?.message || details?.error?.message || 'Invio email non riuscito.',
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(500).json({ error: error.message || 'Errore interno durante l’invio.' });
  }
}
