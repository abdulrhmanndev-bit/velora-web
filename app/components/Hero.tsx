// app/components/ClassesAndHeroes.tsx 

"use client"; // REQUIRED for State Management and User Interaction

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  StarIcon 
} from '@heroicons/react/24/outline'; 

// --- Dynamic Data Structure for All Classes ---
const allClassesData = [
  {
       classImage: '/hero/harp.png',
    className: 'HARP',
    subTitle: 'Melody of Ruin',
    description:
      'Swift and deadly masters of sonic warfare, the Harp character combines precision string work with shadow manipulation.',
    abilities: ['Precision Shot',  'Sonic Barrier', 'Melody of Ruin'],
  },
  {
    classImage: '/hero/warriorr.png', // Placeholder for another class
    className: 'WARRIOR',
    subTitle: 'Ironclad Sentinel',
    description:
      'Unstoppable frontline fighters clad in heavy armor. Warriors use raw strength and unwavering defense to protect allies .',
    abilities: ['Tectonic Slam', 'Defensive Stance', 'Bloodlust'],
  },
  {
    classImage: '/hero/wizzardd.png', // Placeholder for another class
    className: 'WIZZARD',
    subTitle: 'Arcane Weaver',
    description:
      'Masters of ancient magic, Mages wield elemental forces to devastate opponents from a distance. A true glass cannon.',
    abilities: ['Fireball Barrage', 'Time Warp', 'Earth Quaker'],
  },
];

const ClassesAndHeroes = () => {
  // State to track the currently active class index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get the data for the currently displayed class
  const currentHero = allClassesData[currentIndex];
  const totalClasses = allClassesData.length;

  // Function to navigate to the previous class
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalClasses - 1 : prevIndex - 1
    );
  };

  // Function to navigate to the next class
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalClasses - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate directly to an index (for the dots)
  const goToClass = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 md:py-32 text-white bg-[#0a1515] relative overflow-hidden" 
      style={{
        backgroundImage: "url('/hero/Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      
      {/* Background/Overlay mimicking the green ambient light */}
      <div className="absolute inset-0 bg-[#102020]/90 -z-10"></div> 
      {/* Container - Ensure it is positioned relative to avoid z-index issues */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase text-amber-600/90 border-b border-amber-600/50 pb-1 w-fit mx-auto">
            Choose Your Path
          </p>
          <h2 className="mt-4 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.3)] tracking-wider">
            CLASSES & HEROES
          </h2>
        </div>

        {/* Hero Content Grid (Image on Left, Text on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Character Image and Name */}
          <div className="relative w-full rounded-lg overflow-hidden shadow-2xl shadow-green-900/50">
            {/* Image Container */}
            <div className="bg-[#1a3a3a] h-[500px] flex flex-col justify-end p-6 relative">
              {/* Dynamic Image with transition effect */}
              <Image
                key={currentHero.className} // Key ensures the component remounts/transitions on change
                src={currentHero.classImage}
                alt={currentHero.className}
                width={700} 
                height={800} 
                className=" absolute inset-0 w-full h-full opacity-90 transition-opacity duration-500 ease-in-out"
              />
              {/* Text Overlay for Class Name */}
              <div className="relative z-10 pt-4">
                <h3 className="text-6xl font-bold uppercase text-white tracking-widest drop-shadow-md">
                  {currentHero.className}
                </h3>
                <p className="text-xl text-green-300 mt-1">
                  {currentHero.subTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Description and Abilities */}
          <div className="space-y-10 text-gray-200">
            {/* Description */}
            <p className="text-lg leading-relaxed">
              {currentHero.description}
            </p>

            {/* Signature Abilities Section */}
            <div className="space-y-4">
              <h4 className="text-2xl font-bold uppercase tracking-wider text-amber-300 border-b border-amber-300/50 pb-2">
                SIGNATURE ABILITIES
              </h4>
              {/* Custom list structure using Heroicons */}
              <div className="space-y-3">
                {currentHero.abilities.map((ability, i) => (
                  <div key={i} className="flex items-start text-lg text-gray-300">
                    <StarIcon className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-green-500" />
                    <span className="font-semibold">{ability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation (Next/Prev Class) */}
            <div className="flex items-center space-x-4 pt-4">
              {/* Previous Button */}
              <button 
                onClick={goToPrevious}
                className="p-3 rounded-full border border-green-700/50 text-green-400 hover:bg-green-700/30 transition active:scale-95"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              {/* Slider Dots */}
              <div className="flex space-x-2">
                {allClassesData.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToClass(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to class ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button 
                onClick={goToNext}
                className="p-3 rounded-full border border-green-700/50 text-green-400 hover:bg-green-700/30 transition active:scale-95"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesAndHeroes;