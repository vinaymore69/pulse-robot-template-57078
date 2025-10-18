import React, { useEffect, useRef } from "react";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const EventCard = ({ event, index, onClick }) => {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`
        opacity-0 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant 
        hover:shadow-2xl transition-all duration-500 cursor-pointer group
        ${!isEven ? 'lg:grid-flow-dense' : ''}
      `}
      style={{ animationDelay: `${0.1 * index}s` }}
      onClick={() => onClick(event)}
    >
      {/* Image Section */}
      <div 
        className={`relative h-64 sm:h-80 lg:h-full min-h-[400px] overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}
      >
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className={`
            inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm font-medium text-sm
            ${event.status === 'active' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-pulse-500/90 text-white'
            }
          `}>
            <span className={`w-2 h-2 rounded-full mr-2 ${event.status === 'active' ? 'bg-white' : 'bg-white'} animate-pulse`}></span>
            {event.status === 'active' ? 'Live Now' : 'Upcoming'}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 lg:p-10 bg-white flex flex-col justify-center">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 mb-4 w-fit">
          <span className="text-2xl">{event.categoryIcon}</span>
          <span className="px-3 py-1 bg-pulse-50 text-pulse-500 rounded-full text-sm font-semibold">
            {event.category}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 group-hover:text-pulse-500 transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Event Meta Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-5 h-5 text-pulse-500" />
            <span className="text-sm sm:text-base font-medium">{event.date}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-5 h-5 text-pulse-500" />
            <span className="text-sm sm:text-base font-medium">{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-pulse-500" />
            <span className="text-sm sm:text-base font-medium">{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Users className="w-5 h-5 text-pulse-500" />
            <span className="text-sm sm:text-base font-medium">{event.participants} Participants</span>
          </div>
        </div>

        {/* View Gallery Button */}
        <button className="mt-6 px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-fit group-hover:scale-105">
          View Gallery →
        </button>
      </div>
    </div>
  );
};

const EventsList = ({ events, selectedCategory, selectedYear, onEventClick }) => {
  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory;
    const yearMatch = event.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  // Sort events: active first, then upcoming
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return 0;
  });

  return (
    <section className="w-full py-12 sm:py-16 bg-white" id="events-list">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
            <span>Events</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Events Grid */}
        {sortedEvents.length > 0 ? (
          <div className="space-y-8 sm:space-y-12">
            {sortedEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index}
                onClick={onEventClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600">Try selecting a different category or year</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsList;