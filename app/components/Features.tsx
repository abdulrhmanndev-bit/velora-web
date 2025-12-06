"use client";

import React, { memo } from 'react';
import { 
  TrophyIcon,
  GlobeAltIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'; 

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const featureData: Feature[] = [
  {
    icon: TrophyIcon,
    title: 'EPIC BATTLES & GUILD WARS',
    description:
      'Engage in massive PvP battles and strategic guild wars. Lead your faction to victory and claim legendary rewards.',
  },
  {
    icon: GlobeAltIcon,
    title: 'EXPANSIVE OPEN WORLD',
    description:
      'Explore vast landscapes from mystical forests to ancient ruins. Every corner holds secrets waiting to be discovered.',
  },
  {
    icon: UserCircleIcon,
    title: 'DEEP CHARACTER CUSTOMIZATION',
    description:
      'Create your unique hero with extensive customization options. Choose from multiple classes and skill trees.',
  },
  {
    icon: WrenchScrewdriverIcon, 
    title: 'TRADE, CRAFT & CONQUER',
    description:
      'Master the economy through trading and crafting. Forge legendary weapons and build your empire.',
  },
];

// Memoized Feature Card
const FeatureCard = memo(({ feature }: { feature: Feature }) => (
  <div
    className="bg-[#123030]/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.03] border border-green-700/30"
  >
    <div
      className="w-16 h-16 bg-[#1B4D3E] rounded-full flex items-center justify-center mb-6 
                 border-2 border-[#C6A664] 
                 shadow-[0_0_20px_0_rgba(198,166,100,0.6)] 
                 transition-all duration-300 group-hover:shadow-[0_0_30px_0_rgba(198,166,100,0.8)]"
    >
      <feature.icon className="w-8 h-8 text-[#C6A664] drop-shadow-[0_0_5px_rgba(27,77,62,0.5)]" />
    </div>

    <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-green-200">
      {feature.title}
    </h3>

    <p className="text-sm text-gray-300 leading-relaxed">
      {feature.description}
    </p>
  </div>
));

const Feature = () => {
  return (
    <section
      className="py-20 md:py-32 text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/feature/Feature.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#2a2a2a] to-[#0a1515] opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase text-green-600/90 border-b border-amber-600/50 pb-1 w-fit mx-auto">
            Features
          </p>
          <h2 className="mt-4 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.3)] tracking-wider">
            FORGE YOUR LEGEND
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Immerse yourself in a world of endless possibilities where your choices shape the realm
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Feature);
