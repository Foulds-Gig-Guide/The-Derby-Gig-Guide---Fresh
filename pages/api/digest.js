import { supabase } from '../../lib/supabase';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('approved', true)
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) return res.status(500).send(error.message);

  const items = events.map(e => `• ${new Date(e.date).toLocaleDateString()} ${e.time}: ${e.artist} @ ${e.venue} (<a href="${e.link}">Tickets</a>)`).join('<br/>');
  const html = `<h2>Weekly Gigs Digest</h2>${items}<p>Unsubscribe at <a href="{{unsubscribe_url}}">this link</a>.</p>`;
  const msg = { to: process.env.MAILING_LIST, from: process.env.EMAIL_FROM, subject: `Weekly Gigs: ${new Date().toLocaleDateString()}`, html };

  try { await sendgrid.send(msg); return res.status(200).json({ success: true }); }
  catch (err) { return res.status(500).json({ error: err.message }); }
}