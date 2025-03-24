import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import timelineData from '../data/timeline.json';

const EventDetails = () => {
  const { id } = useParams();
  const event = timelineData.events.find(event => event.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h1>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Timeline
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Timeline
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video relative">
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time>{event.date}</time>
              <span className="capitalize">{event.type}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {event.images.length > 1 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${event.title} - Image ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetails;