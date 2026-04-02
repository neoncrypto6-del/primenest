import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedListings } from '../components/FeaturedListings';
import { CategorySection } from '../components/CategorySection';
import { WhyPrimeNest } from '../components/WhyPrimeNest';
import { Footer } from '../components/Footer';
export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedListings />
        <CategorySection />
        <WhyPrimeNest />
      </main>
      <Footer />
    </div>);

}