import React, { useState, useEffect, useRef } from "react";
import { Calendar, Sparkles } from "lucide-react";

const EventFilters = ({ selectedCategory, setSelectedCategory, selectedYear, setSelectedYear }) => {
  const [years] = useState([2025, 2024, 2023, 2022, 2021]);
  const sectionRef = useRef(null);
  
  const categories = [
    { id: 'all', name: 'All Events', icon: '🎯' },
    { id: 'cultural', name: 'Cultural', icon: '🎭' },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-8 sm:py-12 bg-gray-50 sticky top-0 z-40 backdrop-blur-lg bg-gray-50/95" id="filters">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
            <span>Filters</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Filters Container */}
        <div className="space-y-6">
          {/* Category Filters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-pulse-500" />
              <h3 className="text-lg font-display font-semibold">Event Type</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all duration-300 
                    ${selectedCategory === category.id 
                      ? 'bg-pulse-500 text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-700 hover:bg-pulse-50 border border-gray-200'
                    }
                    opacity-0 animate-fade-in
                  `}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-pulse-500" />
              <h3 className="text-lg font-display font-semibold">Year</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {years.map((year, index) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all duration-300
                    ${selectedYear === year 
                      ? 'bg-pulse-500 text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-700 hover:bg-pulse-50 border border-gray-200'
                    }
                    opacity-0 animate-fade-in
                  `}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventFilters;