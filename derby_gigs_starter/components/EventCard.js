import Image from 'next/image';

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
      {event.image_url && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image src={event.image_url} alt={`${event.artist} poster`} layout="fill" objectFit="cover" />
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-2">{event.artist}</h3>
      <p className="text-gray-600 mb-1">
        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {event.time}
      </p>
      <p className="text-gray-600 mb-3">{event.venue}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {event.genre?.split(',').map(g => (
          <span key={g} className="bg-gray-200 px-2 py-1 rounded-full text-sm">{g.trim()}</span>
        ))}
      </div>
      <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition">
        Buy Tickets
      </a>
    </div>
  );
}