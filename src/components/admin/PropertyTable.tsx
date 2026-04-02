import React from 'react';
import { Property } from '../../lib/supabase';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}
export function PropertyTable({
  properties,
  onEdit,
  onDelete
}: PropertyTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Price / Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) =>
                <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={
                          property.images?.[0] ||
                          'https://via.placeholder.com/40'
                          }
                          alt="" />
                        
                        </div>
                        <div className="ml-4">
                          <div
                          className="text-sm font-medium text-gray-900 truncate w-48"
                          title={property.title}>
                          
                            {property.title}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {property.property_type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {formatPrice(property.price)}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        For {property.listing_type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.city}, {property.state}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.zip_code}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${property.status === 'active' ? 'bg-green-100 text-green-800' : property.status === 'sold' ? 'bg-red-100 text-red-800' : property.status === 'rented' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <a
                        href={`/property/${property.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-blue-600"
                        title="View on site">
                        
                          <ExternalLink className="h-5 w-5" />
                        </a>
                        <button
                        onClick={() => onEdit(property)}
                        className="text-gray-400 hover:text-indigo-600"
                        title="Edit">
                        
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                        onClick={() => onDelete(property.id)}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete">
                        
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {properties.length === 0 &&
            <div className="text-center py-12 text-gray-500">
                No properties found. Click "Add New Property" to get started.
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}