import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Property } from '../lib/supabase';
import { PropertyCard } from './PropertyCard';
import { ArrowRight } from 'lucide-react';
export function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase.
        from('properties').
        select('*').
        order('created_at', {
          ascending: false
        }).
        limit(8);
        if (error) throw error;
        if (data) setProperties(data as Property[]);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Properties
            </h2>
            <p className="text-gray-600">
              Explore our newest listings across the United States.
            </p>
          </div>
          <Link
            to="/listings"
            className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
            
            View All Listings <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) =>
          <div
            key={i}
            className="bg-gray-100 rounded-lg h-80 animate-pulse">
          </div>
          )}
          </div> :
        properties.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) =>
          <PropertyCard key={property.id} property={property} />
          )}
          </div> :

        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">
              No properties available at the moment.
            </p>
          </div>
        }

        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/listings"
            className="inline-flex items-center justify-center w-full px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            
            View All Listings
          </Link>
        </div>
      </div>
    </section>);

}