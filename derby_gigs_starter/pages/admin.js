import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (!session?.user?.isAdmin) { window.location.href='/'; return; }
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data.filter(e=>!e.approved));
      setLoading(false);
    }
    load();
  }, []);

  const handleApprove=async id=>{ await fetch('/api/events',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,approved:true})}); setEvents(events.filter(e=>e.id!==id)); };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {loading? <p>Loading submissions...</p> : events.length>0? (
          <div className="space-y-4">{events.map(e=>(
            <div key={e.id} className="bg-white p-4 rounded-lg shadow">
              <p><strong>{e.artist}</strong> on {new Date(e.date).toLocaleDateString()} at {e.time}</p>
              <p>Venue: {e.venue}</p>
              <button onClick={()=>handleApprove(e.id)} className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">Approve</button>
            </div>))}
          </div>
        ):(<p>No pending submissions.</p>)}
      </div>
    </Layout>
}