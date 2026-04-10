import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
interface SearchBarProps {
  className?: string;
  initialQuery?: string;
  initialListingType?: 'sale' | 'rent' | 'all';
}
export function SearchBar({
  className = '',
  initialQuery = '',
  initialListingType = 'all'
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [listingType, setListingType] = useState<'sale' | 'rent' | 'all'>(
    initialListingType
  );
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (listingType !== 'all') params.append('type', listingType);
    navigate(`/listings?${params.toString()}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className={`w-full max-w-4xl mx-auto ${className}`}>
      
      <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="flex-1 flex items-center px-4 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r border-gray-200">
          <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Enter an address, neighborhood, city, or ZIP code"
            className="w-full focus:outline-none text-gray-700 text-base py-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
          
        </div>

        <div className="flex items-center">
          <select
            className="bg-transparent text-gray-700 py-3 px-4 focus:outline-none border-r border-gray-200 cursor-pointer"
            value={listingType}
            onChange={(e) => setListingType(e.target.value as any)}>
            
            <option value="all">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 transition-colors w-full sm:w-auto">
            
            Search
          </button>
        </div>
      </div>
    </form>);

}