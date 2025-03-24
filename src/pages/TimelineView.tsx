import React, { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
import { Calendar, Filter, X, ArrowUpDown } from 'lucide-react';
import timelineData from '../data/timeline.json';

function TimelineView() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredData = timelineData.events
    .filter(item => {
      const itemDate = new Date(item.date.split('/').reverse().join('-'));
      const start = startDate ? new Date(startDate) : new Date('2000-01-01');
      const end = endDate ? new Date(endDate) : new Date('2100-12-31');
      
      const dateInRange = itemDate >= start && itemDate <= end;
      const typeMatch = !selectedType || item.type === selectedType;
      
      return dateInRange && typeMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const handleTypeSelect = (type: string) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const handleTypeText = (type: string) => {
    if(type === 'maintenance'){
      return 'Ремонтні роботи'
    }

    if(type === 'news'){
      return 'Новини'
    }

    if(type === 'improvements'){
      return 'Покращення'
    }
  }

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedType(null);
    setSortOrder('desc');
  };

  const toggleSortOrder = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  const hasActiveFilters = startDate || endDate || selectedType || sortOrder === 'asc';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ОСББ Лесі Українки 38Б</h1>
          <p className="text-lg text-gray-600 mb-8">Tracking our progress through time</p>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              {/* Date Range Filters */}
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Type Filters */}
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex gap-2">
                  {['maintenance', 'news', 'improvements'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                        ${selectedType === type
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {handleTypeText(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order Button */}
              <button
                onClick={toggleSortOrder}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors w-[140px]"
              >
                <ArrowUpDown className="w-4 h-4" />
                {sortOrder === 'desc' ? 'Спочатку новіші' : 'Спочатку старіші'}
              </button>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${hasActiveFilters
                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  }`}
              >
                <X className="w-4 h-4" />
                Очистити
              </button>
            </div>
          </div>
        </div>
        
        {/* Timeline container */}
        <div className="relative">
          {/* Timeline line - only show when there are events */}
          {filteredData.length > 0 && (
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2" />
          )}
          
          {filteredData.length > 0 ? (
            /* Timeline items */
            <div className="space-y-24">
              {filteredData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  id={item.id}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  images={item.images}
                  type={item.type}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-gray-700">
                Немає івентів для показу. Відредагуйте або очистіть фільтри
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimelineView;
