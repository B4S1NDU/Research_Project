/**
 * ============================================================================
 * MUSEUM KIOSK - CRAFT SELECTOR
 * ============================================================================
 * Design Theme: "Modern Heritage" - Big, Bold, Accessible
 * Target: Large-format digital kiosk displays (1920x1080 - 4K)
 * ============================================================================
 */

import React, { useState } from 'react';

const CRAFTS = [
  {
    id: 'painting',
    title: 'Kandyan Painting Restoration',
    description: 'Restore ancient temple murals using traditional techniques from the Kingdom of Kandy.',
    icon: '🎨',
    difficulty: 'Beginner',
    estimatedTime: '10-15 min',
    culturalFocus: 'Buddhist temple art',
    historicalPeriod: '17th-19th Century CE',
  },
  {
    id: 'mask',
    title: 'Kolam Mask Painting',
    description: 'Create protective ritual masks using ancestral techniques from Southern coastal regions.',
    icon: '🎭',
    difficulty: 'Intermediate',
    estimatedTime: '15-20 min',
    culturalFocus: 'Ritual theater',
    historicalPeriod: 'Pre-Buddhist Era',
  },
  {
    id: 'pottery',
    title: 'Clay Pot Decoration',
    description: 'Decorate ceremonial vessels with motifs from ancient Anuradhapura and Polonnaruwa.',
    icon: '🏺',
    difficulty: 'Advanced',
    estimatedTime: '20-25 min',
    culturalFocus: 'Ceremonial vessels',
    historicalPeriod: '3rd Century BCE',
  }
];

const CraftSelector = ({ onCraftSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Main Content Area */}
      <div className="flex flex-col gap-12">

        {/* Hero Section */}
        <div className="text-center py-8 animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-museum-primary mb-6 drop-shadow-sm">
            🏛️ Sri Lankan Cultural Crafts
          </h1>
          <p className="text-xl md:text-2xl text-museum-secondary font-light font-sans tracking-wide">
            Choose Your Interactive Heritage Experience
          </p>
        </div>

        {/* Craft Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {CRAFTS.map((craft, index) => (
            <div
              key={craft.id}
              className={`relative group bg-white border border-stone-200 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-xl hover:border-museum-accent hover:-translate-y-3
                ${hoveredCard === craft.id ? 'z-10 bg-stone-50' : ''}`}
              onMouseEnter={() => setHoveredCard(craft.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-museum-accent/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Large Icon */}
              <span className="text-7xl mb-8 block transform transition-transform duration-500 group-hover:scale-110 drop-shadow-md opacity-80">
                {craft.icon}
              </span>

              {/* Title - Large & Bold */}
              <h2 className="text-3xl font-serif font-bold text-museum-primary mb-4 group-hover:text-museum-accent transition-colors">
                {craft.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-museum-secondary/80 mb-8 min-h-[60px] leading-relaxed">
                {craft.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 my-6 p-4 bg-stone-100 rounded-2xl border border-stone-200 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-museum-accent mb-1 font-bold">Duration</span>
                  <span className="font-semibold text-museum-primary">{craft.estimatedTime}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-museum-accent mb-1 font-bold">Level</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-sm font-bold w-fit
                    ${craft.difficulty === 'Beginner' ? 'text-green-700 bg-green-100' : ''}
                    ${craft.difficulty === 'Intermediate' ? 'text-amber-700 bg-amber-100' : ''}
                    ${craft.difficulty === 'Advanced' ? 'text-red-700 bg-red-100' : ''}
                  `}>
                    {craft.difficulty}
                  </span>
                </div>
                <div className="col-span-2 flex flex-col pt-2 border-t border-stone-300">
                  <span className="text-xs uppercase tracking-wider text-museum-accent mb-1 font-bold">Period</span>
                  <span className="font-semibold text-museum-primary text-sm">{craft.historicalPeriod}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={() => onCraftSelect(craft.id)}
                  className="w-full py-4 bg-museum-accent hover:bg-museum-primary text-white font-bold tracking-[0.2em] uppercase text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group-hover:shadow-museum-accent/20 active:scale-95"
                >
                  <span>Begin Experience</span>
                  <span className="text-xl transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Objectives Panel */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 backdrop-blur-md">
          <h3 className="text-2xl font-serif font-bold text-museum-primary mb-6 flex items-center gap-3">
            <span>📚</span> What You'll Learn
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-3xl">🎯</span>
              <span className="text-museum-secondary font-medium">Traditional artistic techniques</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-3xl">🧠</span>
              <span className="text-museum-secondary font-medium">Cultural symbolism & iconography</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-3xl">🏛️</span>
              <span className="text-museum-secondary font-medium">Religious & spiritual significance</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-3xl">🔬</span>
              <span className="text-museum-secondary font-medium">Heritage preservation methods</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftSelector;