import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'GET':
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .eq('approved', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true });
      if (fetchError) return res.status(500).json({ error: fetchError.message });
      return res.status(200).json(data);
    case 'POST':
      const { artist, date, time, venue, link, genre, image_url, user_id } = body;
      const { data: newEvent, error: insertError } = await supabase
        .from('events')
        .insert([{ artist, date, time, venue, link, genre, image_url, createdBy: user_id }])
        .single();
      if (insertError) return res.status(500).json({ error: insertError.message });
      return res.status(201).json(newEvent);
    case 'PUT':
      const { id, approved } = body;
      const { data: updatedEvent, error: updateError } = await supabase
        .from('events')
        .update({ approved })
        .eq('id', id)
        .single();
      if (updateError) return res.status(500).json({ error: updateError.message });
      return res.status(200).json(updatedEvent);
    default:
      res.setHeader('Allow', ['GET','POST','PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}