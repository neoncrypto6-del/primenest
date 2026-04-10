import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
  {
    name: 'Buy',
    path: '/listings?type=sale'
  },
  {
    name: 'Rent',
    path: '/listings?type=rent'
  },
  {
    name: 'All Listings',
    path: '/listings'
  },
  {
    name: 'Contact Us',
    path: '/contact'
  }];

  const isActive = (path: string) =>
  location.pathname + location.search === path || location.pathname === path;
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src="/Prime_logo.png"
                alt="PrimeNest Logo" />
              
              <span className="ml-2 text-xl font-bold text-blue-700 hidden sm:block">
                PrimeNest
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive(link.path) ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              
                {link.name}
              </Link>
            )}
            <Link
              to="/admin/login"
              className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
              
              Sign In
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false">
              
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ?
              <X className="block h-6 w-6" aria-hidden="true" /> :

              <Menu className="block h-6 w-6" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen &&
      <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(link.path) ? 'bg-blue-50 border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}
            onClick={() => setIsMobileMenuOpen(false)}>
            
                {link.name}
              </Link>
          )}
            <Link
            to="/admin/login"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}>
            
              Admin Sign In
            </Link>
          </div>
        </div>
      }
    </nav>);

}