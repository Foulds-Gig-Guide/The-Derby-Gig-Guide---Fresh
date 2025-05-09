import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import EventCard from '../components/EventCard';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('approved', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(20);
      if (error) console.error(error);
      else setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-r from-blue-800 to-gray-900 text-white py-20 mb-10">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Derby's Best Gigs</h1>
          <p className="text-lg md:text-xl mb-6">Your weekly guide to live music across Derby & Derbyshire</p>
          <a href="#upcoming-gigs" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transition">
            Explore Gigs
          </a>
        </div>
      </section>

      <div id="upcoming-gigs" className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Upcoming Gigs</h2>
        {loading ? (
          <p>Loading upcoming events...</p>
        ) : events.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p>No upcoming gigs found.</p>
        )}
      </div>
    </Layout>
  );
}
