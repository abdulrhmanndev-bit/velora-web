import React from 'react';
import Image from 'next/image';
import { PlayCircleIcon } from '@heroicons/react/24/outline'; // Using Heroicons for the Play icon

// --- 1. Static Data Extraction ---
const GAME_STATS = [
  { value: '5', label: 'Kingdoms' },
  { value: '100+', label: 'Dungeons' },
  { value: '∞', label: 'Adventures' }, // Using the unicode character for infinity
];

// --- 2. Video Player Sub-Component ---
const TrailerVideoPlayer = () => {
  // Use a ref to control the video element directly.
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Handles the click on the custom play button
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.controls = true; // Show controls after starting
      videoRef.current.muted = false; // Unmute on play
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden 
                    shadow-2xl shadow-green-900/50 border-2 border-green-700/50 group" >
      
      {/* HTML Video Tag */}
      <video
        ref={videoRef}
        src="/about/okayge.mp4" 
        poster="/about/poster.png" 
        controls={false} // Initially hidden, controlled by state
        loop
        muted // Starts muted for autoplay compatibility
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Custom Play Button Overlay - Hidden once played */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center 
                        transition-opacity duration-300 hover:bg-black/20">
          <button 
            onClick={handlePlay}
            className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center 
                       backdrop-blur-sm border-2 border-amber-400 
                       hover:bg-amber-500/40 transition-all duration-300 
                       shadow-2xl shadow-amber-500/50 transform hover:scale-105"
            aria-label="Play Video Trailer"
          >
            {/* Switched to Heroicons PlayCircleIcon */}
            <PlayCircleIcon className="w-10 h-10 text-amber-300 ml-1" fill="currentColor" />
          </button>
        </div>
      )}
    </div>
  );
};

// --- 3. Main Component (Focuses on Layout) ---
const About = () => {
  return (
    <section 
      className="text-white py-20 md:py-36 relative overflow-hidden" 
      style={{
        backgroundImage: "url('/abouttsx/About.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay to Ensure Text Readability */}
      <div className="absolute inset-0 bg-[#0a1515] opacity-90 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Video Player */}
          <TrailerVideoPlayer />

          {/* Right Side: Text Content */}
          <div className="space-y-8">
            {/* Small Heading */}
            <p className="text-sm tracking-widest uppercase text-amber-600/90 border-b border-amber-600/50 pb-1 w-fit mx-auto lg:mx-0">
              About the Game
            </p>
            
            {/* Main Title - Styled with Gold Gradient */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text 
                           bg-gradient-to-r from-amber-200 to-amber-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.3)] 
                           tracking-wider text-center lg:text-left">
              THE LEGEND OF VELORA
            </h1>

            <div className="space-y-6 text-lg text-gray-300">
              <p>
                In the ancient realm of Velora, **five kingdoms** once lived in harmony, their power sustained by **mystical crystals** scattered across the land. But when **darkness awakened**, the balance shattered.
              </p>
              <p>
                Now, heroes from all corners of the realm must unite. Form guilds, master **ancient magic**, and venture into forgotten dungeons where **legendary treasures** await those brave enough to claim them.
              </p>
              <p>
                Your destiny awaits in a world where every choice shapes the future. Will you rise as a **champion of light**, or will the **shadows consume you**?
              </p>
            </div>
            
            {/* Stats Section - Mapped Data */}
            <div className="flex justify-center lg:justify-start pt-6 space-x-10 border-t border-green-800/50 pt-8">
              {GAME_STATS.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-green-900/20">
                  <p className="text-4xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-sm uppercase tracking-wider text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;