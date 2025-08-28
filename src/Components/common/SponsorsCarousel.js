import React, { useState, useEffect } from 'react';

const SponsorsCarousel = ({ sponsors }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Version avec défilement automatique contrôlé
  useEffect(() => {
    if (isPlaying && sponsors?.length > 0) {
      const interval = setInterval(() => {
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, sponsors?.length]);

  return (
    <div className="relative overflow-hidden w-full py-8 sponsors-container">
      {/* Version défilement infini avec contrôles */}
      <div 
        className={`flex transition-transform duration-1000 ${isPlaying ? 'animate-scroll-infinite' : ''}`}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {sponsors?.length > 0 && [...sponsors, ...sponsors].map((item, index) => (
          <div
            key={index}
            className="group relative flex items-center justify-center p-4 bg-gradient-to-br from-gray-50/5 to-gray-100/10 rounded-2xl border border-gray-200/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl mx-4 min-w-[200px] flex-shrink-0"
          >
            <img
              src={item?.logo}
              alt={`Sponsor ${index + 1}`}
              className="max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Effets de fade sur les bords */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

// Version avec dots indicateurs
const SponsorsWithDots = ({ sponsors }) => {
  const [currentSet, setCurrentSet] = useState(0);
  const itemsPerView = 5;
  const totalSets = Math.ceil((sponsors?.length || 0) / itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet(prev => (prev + 1) % totalSets);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSets]);

  return (
    <div className="relative w-full py-8">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSet * 100}%)` }}
        >
          {Array.from({ length: totalSets }).map((_, setIndex) => (
            <div key={setIndex} className="flex min-w-full gap-6 px-4">
              {sponsors?.slice(setIndex * itemsPerView, (setIndex + 1) * itemsPerView).map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-center justify-center p-4 bg-gradient-to-br from-gray-50/5 to-gray-100/10 rounded-2xl border border-gray-200/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl flex-1"
                >
                  <img
                    src={item?.logo}
                    alt={`Sponsor ${index + 1}`}
                    className="max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicateurs */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSets }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSet(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSet === index ? 'bg-blue-500 w-6' : 'bg-gray-300'
            }`}
          >
            {``}
          </button>
        ))}
      </div>
    </div>
  );
};

export { SponsorsCarousel, SponsorsWithDots };