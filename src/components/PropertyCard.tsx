import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../lib/supabase';
interface PropertyCardProps {
  property: Property;
}
export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  const mainImage =
  property.images && property.images.length > 0 ?
  property.images[0] :
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const getStatusBadge = () => {
    switch (property.status) {
      case 'active':
        return {
          text: 'Active',
          className: 'bg-green-500'
        };
      case 'sold':
        return {
          text: 'Sold',
          className: 'bg-red-500'
        };
      case 'rented':
        return {
          text: 'Rented',
          className: 'bg-blue-500'
        };
      case 'inactive':
        return {
          text: 'Inactive',
          className: 'bg-gray-500'
        };
      default:
        return {
          text: 'Active',
          className: 'bg-green-500'
        };
    }
  };
  const statusBadge = getStatusBadge();
  return (
    <Link to={`/property/${property.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          

          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-sm text-white ${property.listing_type === 'sale' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              
              For {property.listing_type === 'sale' ? 'Sale' : 'Rent'}
            </span>
            <span
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-sm text-white ${statusBadge.className}`}>
              
              {statusBadge.text}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price)}
              {property.listing_type === 'rent' &&
              <span className="text-sm text-gray-500 font-normal">/mo</span>
              }
            </span>
          </div>

          <div className="flex items-center text-gray-700 text-sm mb-3 space-x-4">
            {property.beds > 0 &&
            <div className="flex items-center font-medium">
                <span className="font-bold mr-1">{property.beds}</span> bds
              </div>
            }
            {property.baths > 0 &&
            <div className="flex items-center font-medium">
                <span className="font-bold mr-1">{property.baths}</span> ba
              </div>
            }
            {property.sqft > 0 &&
            <div className="flex items-center font-medium">
                <span className="font-bold mr-1">
                  {property.sqft.toLocaleString()}
                </span>{' '}
                sqft
              </div>
            }
            <div className="text-gray-400">|</div>
            <div className="capitalize text-gray-500">
              {property.property_type}
            </div>
          </div>

          <div className="text-gray-600 text-sm truncate mb-1">
            {property.address}
          </div>
          <div className="text-gray-500 text-sm truncate">
            {property.city}, {property.state} {property.zip_code}
          </div>
        </div>
      </div>
    </Link>);

}