import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PropertyCard } from '../components/PropertyCard';
import { supabase, Property } from '../lib/supabase';
import { Search, Filter, Loader2 } from 'lucide-react';
export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [listingType, setListingType] = useState(
    searchParams.get('type') || 'all'
  );
  const [propertyType, setPropertyType] = useState(
    searchParams.get('category') || 'all'
  );
  useEffect(() => {
    fetchProperties();
  }, [searchParams]);
  const fetchProperties = async () => {
    setLoading(true);
    try {
      let queryBuilder = supabase.
      from('properties').
      select('*').
      order('created_at', {
        ascending: false
      });
      const type = searchParams.get('type');
      const category = searchParams.get('category');
      const q = searchParams.get('q');
      if (type && type !== 'all') {
        queryBuilder = queryBuilder.eq('listing_type', type);
      }
      if (category && category !== 'all') {
        queryBuilder = queryBuilder.eq('property_type', category);
      }
      if (q) {
        queryBuilder = queryBuilder.or(
          `city.ilike.%${q}%,state.ilike.%${q}%,zip_code.ilike.%${q}%,address.ilike.%${q}%`
        );
      }
      const { data, error } = await queryBuilder;
      if (error) throw error;
      setProperties(data as Property[] || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (listingType !== 'all') params.append('type', listingType);
    if (propertyType !== 'all') params.append('category', propertyType);
    setSearchParams(params);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form
            onSubmit={handleFilterSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center">
            
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="City, Neighborhood, or ZIP"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
              
            </div>

            <div className="flex gap-4 w-full sm:w-auto">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}>
                
                <option value="all">Any Status</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>

              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}>
                
                <option value="all">Home Type</option>
                <option value="house">Houses</option>
                <option value="apartment">Apartments</option>
                <option value="land">Land</option>
                <option value="office">Offices</option>
              </select>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Real Estate & Homes
          </h1>
          <span className="text-gray-500 font-medium">
            {properties.length} results
          </span>
        </div>

        {loading ?
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div> :
        properties.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) =>
          <PropertyCard key={property.id} property={property} />
          )}
          </div> :

        <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria.
            </p>
            <button
            onClick={() => {
              setQuery('');
              setListingType('all');
              setPropertyType('all');
              setSearchParams({});
            }}
            className="mt-4 text-blue-600 font-medium hover:text-blue-800">
            
              Clear all filters
            </button>
          </div>
        }
      </main>

      <Footer />
    </div>);

}