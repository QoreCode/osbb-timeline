import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wrench, Newspaper, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TimelineItemProps {
  id: string;
  date: string;
  title: string;
  description: string;
  images: string[];
  type: 'maintenance' | 'news' | 'improvements';
  isLeft: boolean;
}

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

const TimelineItem: React.FC<TimelineItemProps> = ({
  id,
  date,
  title,
  description,
  images,
  type,
  isLeft,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const TypeIcon = typeConfig[type].icon;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const newImageLoaded = [...imageLoaded];
    newImageLoaded[index] = true;
    setImageLoaded(newImageLoaded);
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
        <div className="w-1 h-full bg-blue-200"></div>
      </div>

      {/* Timeline dot and date */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        {/* Date and type on the opposite side of content */}
        <div className={`absolute ${!isLeft ? 'right-8' : 'left-8'} flex flex-col items-start gap-2`}>
          <span className="text-lg font-semibold text-gray-700 whitespace-nowrap">{formatDate(date)}</span>
          <div className="flex items-center gap-2">
            <TypeIcon className={`w-5 h-5 ${typeConfig[type].textColor}`} />
            <span className={`text-sm font-medium ${typeConfig[type].textColor}`}>
              {typeConfig[type].label}
            </span>
          </div>
        </div>
        {/* Center dot */}
        <div className={`w-4 h-4 ${typeConfig[type].color} rounded-full shadow-lg z-10`}></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative flex items-center ${
          isLeft ? 'flex-row' : 'flex-row-reverse'
        } mt-8`}
      >
        {/* Content container */}
        <div className={`w-1/2 ${isLeft ? 'pr-8' : 'pl-8'}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Image slider */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              {images.length > 0 ? (
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                      {!imageLoaded[index] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                      )}
                      <img
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        onLoad={(e) => handleImageLoad(index, e)}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={defaultImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
              )}
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        currentImage === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
              <p className="text-gray-600 leading-relaxed line-clamp-5 mb-4">{description}</p>
              <Link 
                to={`/event/${id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Більше інформації
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
