import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Mountain, Briefcase } from 'lucide-react';
const categories = [
{
  id: 'house',
  name: 'Houses',
  icon: Home,
  description: 'Find your perfect family home',
  color: 'bg-blue-50 text-blue-600',
  hoverColor: 'group-hover:bg-blue-600 group-hover:text-white'
},
{
  id: 'apartment',
  name: 'Apartments',
  icon: Building2,
  description: 'Modern living spaces in the city',
  color: 'bg-indigo-50 text-indigo-600',
  hoverColor: 'group-hover:bg-indigo-600 group-hover:text-white'
},
{
  id: 'land',
  name: 'Land',
  icon: Mountain,
  description: 'Build your dream from the ground up',
  color: 'bg-emerald-50 text-emerald-600',
  hoverColor: 'group-hover:bg-emerald-600 group-hover:text-white'
},
{
  id: 'office',
  name: 'Offices',
  icon: Briefcase,
  description: 'Professional spaces for your business',
  color: 'bg-purple-50 text-purple-600',
  hoverColor: 'group-hover:bg-purple-600 group-hover:text-white'
}];

export function CategorySection() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Property Type
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're looking for a cozy apartment, a spacious house,
            commercial office space, or vacant land, we have options for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/listings?category=${category.id}`}
                className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 ${category.color} ${category.hoverColor}`}>
                  
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm">{category.description}</p>
              </Link>);

          })}
        </div>
      </div>
    </section>);

}