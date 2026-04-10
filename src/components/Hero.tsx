import React from 'react';
import { SearchBar } from './SearchBar';
export function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
          'url("https://cdn.magicpatterns.com/uploads/p7vbJcB7Vn5A1wgrYE9vPV/image11.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-4rem]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
          Houses. Apartments. Land. Office.
        </h1>
        <p className="text-xl md:text-2xl text-white mb-10 font-medium drop-shadow-md max-w-3xl mx-auto">
          Zero Broker Fee &bull; Affordable Prices &bull; All Over United States
        </p>

        <SearchBar />
      </div>
    </div>);

}