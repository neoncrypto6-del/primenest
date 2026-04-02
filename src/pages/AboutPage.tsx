import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Home, Users, Award, TrendingUp } from 'lucide-react';
export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About PrimeNest
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner in finding affordable homes, apartments,
              land, and office spaces across the United States.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At PrimeNest, we believe everyone deserves access to quality
                  real estate without the burden of excessive fees. Our mission
                  is to connect buyers and renters with their perfect properties
                  at affordable prices, with complete transparency and zero
                  hidden costs.
                </p>
                <p className="text-lg text-gray-600">
                  Founded with the vision of making real estate accessible to
                  all, we've helped thousands of families and businesses find
                  their ideal spaces across all 50 states.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern home"
                  className="rounded-2xl shadow-xl" />
                
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  10,000+
                </div>
                <div className="text-gray-600">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  50,000+
                </div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">50</div>
                <div className="text-gray-600">States Covered</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600">Broker Fees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Transparency
                </h3>
                <p className="text-gray-600">
                  We believe in complete honesty about pricing, property
                  conditions, and all aspects of the real estate process. No
                  hidden fees, no surprises.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Affordability
                </h3>
                <p className="text-gray-600">
                  We curate listings that offer genuine value, helping you find
                  quality properties that fit your budget without compromising
                  on your needs.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Customer First
                </h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. Our dedicated team is
                  always ready to assist you throughout your property search
                  journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Our Leadership Team
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Meet the dedicated professionals working to make your real estate
              dreams a reality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="CEO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                
                <h3 className="text-lg font-bold text-gray-900">
                  Michael Chen
                </h3>
                <p className="text-blue-600 mb-2">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  20+ years in real estate with a vision for accessible housing.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="COO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                
                <h3 className="text-lg font-bold text-gray-900">
                  Sarah Johnson
                </h3>
                <p className="text-blue-600 mb-2">Chief Operations Officer</p>
                <p className="text-gray-600 text-sm">
                  Expert in streamlining real estate operations nationwide.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="CTO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                
                <h3 className="text-lg font-bold text-gray-900">David Park</h3>
                <p className="text-blue-600 mb-2">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  Building the technology that powers modern real estate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}