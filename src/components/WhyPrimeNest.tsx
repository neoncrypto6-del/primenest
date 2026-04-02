import React from 'react';
import { DollarSign, TrendingDown, MapPin } from 'lucide-react';
export function WhyPrimeNest() {
  const features = [
  {
    icon: DollarSign,
    title: 'Zero Broker Fee',
    description:
    "We believe finding a place shouldn't cost you extra. Skip the hefty broker fees and save your money for what matters."
  },
  {
    icon: TrendingDown,
    title: 'Affordable Prices',
    description:
    'We curate listings that offer the best value for your money, ensuring you find quality spaces within your budget.'
  },
  {
    icon: MapPin,
    title: 'Nationwide Coverage',
    description:
    'From bustling cities to quiet suburbs, find properties for sale or rent anywhere across the United States.'
  }];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose PrimeNest?
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>);

          })}
        </div>
      </div>
    </section>);

}