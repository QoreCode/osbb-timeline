import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Newspaper, Sparkles, ZoomIn, Image as ImageIcon } from 'lucide-react';
import timelineData from '../data/timeline.json';
import ImageModal from '../components/ImageModal';

const typeConfig = {
  maintenance: {
    icon: Wrench,
    color: 'bg-amber-500',
    textColor: 'text-amber-600',
    label: 'Ремонтні роботи'
  },
  news: {
    icon: Newspaper,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    label: 'Новини'
  },
  improvements: {
    icon: Sparkles,
    color: 'bg-green-500',
    textColor: 'text-green-600',
    label: 'Покращення'
  }
};

const EventDetails = () => {
  const { id } = useParams();
  const event = timelineData.events.find(event => event.id === id);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Подію не знайдено</h1>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до списку
          </Link>
        </div>
      </div>
    );
  }

  const TypeIcon = typeConfig[event.type].icon;
  const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200";

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до списку
          </Link>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video">
              {event.images.length > 0 ? (
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={defaultImage}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <time className="text-sm text-gray-500">{event.date}</time>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${typeConfig[event.type].textColor} bg-opacity-10 ${typeConfig[event.type].color.replace('bg-', 'bg-')}`}>
                  <TypeIcon className="w-4 h-4" />
                  {typeConfig[event.type].label}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  <div dangerouslySetInnerHTML={{__html: event.description}} />
                </p>
              </div>

              {event.images.length > 1 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.images.map((image, index) => (
                      <div
                        key={index}
                        className="cursor-pointer rounded-lg overflow-hidden relative group"
                        onClick={() => openModal(index)}
                      >
                        <img
                          src={image}
                          alt={`${event.title} - Image ${index + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>

      {modalOpen && event.images.length > 0 && (
        <ImageModal
          images={event.images}
          currentIndex={currentImageIndex}
          onClose={() => setModalOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default EventDetails;
