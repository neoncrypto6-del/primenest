import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                className="h-8 w-auto grayscale opacity-80"
                src="/Prime_logo.png"
                alt="PrimeNest Logo" />
              
              <span className="ml-2 text-xl font-bold text-gray-700">
                PrimeNest
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Your trusted partner in finding the perfect home, apartment, land,
              or office at affordable prices across the United States.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Properties
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/listings?type=sale"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/listings?type=rent"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Apartments for Rent
                </Link>
              </li>
              <li>
                <Link
                  to="/listings?category=land"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Land for Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/listings?category=office"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Office Spaces
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-500 hover:text-blue-600">
                  
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                1-800-PRIMENEST
              </li>
              <li className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                hello@primenest.com
              </li>
              <li className="flex items-start text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                <span>
                  123 Real Estate Blvd
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PrimeNest. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              to="/admin/login"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}