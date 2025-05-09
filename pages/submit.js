import { useState } from 'react';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';

export default function Submit() {
  const [form, setForm] = useState({ artist: '', date: '', time: '', venue: '', link: '', genre: '', image_url: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Submitting...');
    const user = supabase.auth.user();
    const payload = { ...form, user_id: user?.id || null };
    const res = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setStatus(res.ok ? 'Submission received! Awaiting approval.' : 'Error submitting. Please try again.');
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Submit a Gig</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['artist','date','time','venue','link','genre','image_url'].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
              <input type={field==='date'?'date':'text'} name={field} id={field} required value={form[field]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
          ))}
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg">Submit for Review</button>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </Layout>
}