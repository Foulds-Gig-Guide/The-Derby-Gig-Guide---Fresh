// pages/index.js

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
        .limit(12);
      if (error) console.error(error);
      else setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-screen bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4">
            Live Music in Derby & Derbyshire
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover and submit the best gigs happening around town — all in one place.
          </p>
          <div className="space-x-4">
            <a
              href="#upcoming"
              className="inline-block bg-derbyGold hover:bg-derbyGold/90 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-lg transition"
            >
              Browse Gigs
            </a>
            <a
              href="/submit"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-6 rounded-full transition"
            >
              Submit a Gig
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Gigs */}
      <section id="upcoming" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Upcoming Gigs
          </h2>

          {loading ? (
            <p className="text-center">Loading events…</p>
          ) : events.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="text-center">No upcoming gigs found.</p>
          )}

          <div className="text-center mt-12">
            <a
              href="/submit"
              className="inline-block bg-derbyBlue hover:bg-derbyBlue/90 text-white font-semibold py-3 px-8 rounded-full transition"
            >
              Submit Yours
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
