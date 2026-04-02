import React, { useEffect, useState, lazy, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase, Property } from '../lib/supabase';
import {
  ChevronLeft,
  Share,
  Heart,
  Loader2,
  Home,
  Calendar,
  Square,
  Check,
  Phone,
  Mail,
  X,
  MapPin } from
'lucide-react';
export function PropertyDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    async function fetchProperty() {
      if (!id) return;
      try {
        const { data, error } = await supabase.
        from('properties').
        select('*').
        eq('id', id).
        single();
        if (error) throw error;
        setProperty(data as Property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      </div>);

  }
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The listing you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/listings')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
            
            Back to Search
          </button>
        </div>
      </div>);

  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  const images =
  property.images && property.images.length > 0 ?
  property.images :
  [
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'];

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
  // Default agent info
  const agentName = property.agent_name || 'Lora Wale';
  const agentPhone = property.agent_phone || '+1 850-641-8765';
  const agentEmail = property.agent_email || 'lorawale9639@outlook.com';
  const agentImage =
  property.agent_image ||
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
  // Map URL
  const mapQuery = encodeURIComponent(
    `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`
  );
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            
            <ChevronLeft className="h-5 w-5 mr-1" /> Back to search
          </button>
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Share className="h-5 w-5 mr-1.5" /> Share
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Heart className="h-5 w-5 mr-1.5" /> Save
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Images & Details */}
          <div className="lg:w-2/3">
            {/* Image Gallery Grid */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
              <div
                className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer"
                onClick={() => {
                  setGalleryIndex(0);
                  setShowGallery(true);
                }}>
                
                <img
                  src={images[0]}
                  alt="Main"
                  className="w-full h-full object-cover hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold shadow-md text-white ${statusBadge.className}`}>
                    
                    {statusBadge.text}
                  </span>
                </div>
              </div>
              {images.slice(1, 5).map((img, idx) =>
              <div
                key={idx}
                className="hidden md:block col-span-1 row-span-1 cursor-pointer relative"
                onClick={() => {
                  setGalleryIndex(idx + 1);
                  setShowGallery(true);
                }}>
                
                  <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover hover:opacity-95 transition-opacity" />
                
                  {idx === 3 && images.length > 5 &&
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">
                        +{images.length - 5} more
                      </span>
                    </div>
                }
                </div>
              )}
            </div>

            {/* All Images Section */}
            {images.length > 1 &&
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  All Photos ({images.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img, idx) =>
                <div
                  key={idx}
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setGalleryIndex(idx);
                    setShowGallery(true);
                  }}>
                  
                      <img
                    src={img}
                    alt={`Property ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  
                    </div>
                )}
                </div>
              </div>
            }

            {/* Header Info */}
            <div className="mb-8 border-b border-gray-200 pb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price)}
                    {property.listing_type === 'rent' &&
                    <span className="text-xl text-gray-500 font-normal">
                        /mo
                      </span>
                    }
                  </h1>
                  <p className="text-xl text-gray-700 flex items-center">
                    {property.address}, {property.city}, {property.state}{' '}
                    {property.zip_code}
                  </p>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0 text-gray-700">
                  {property.beds > 0 &&
                  <div className="text-center">
                      <span className="block text-2xl font-bold text-gray-900">
                        {property.beds}
                      </span>
                      <span className="text-sm">beds</span>
                    </div>
                  }
                  {property.baths > 0 &&
                  <div className="text-center">
                      <span className="block text-2xl font-bold text-gray-900">
                        {property.baths}
                      </span>
                      <span className="text-sm">baths</span>
                    </div>
                  }
                  {property.sqft > 0 &&
                  <div className="text-center">
                      <span className="block text-2xl font-bold text-gray-900">
                        {property.sqft.toLocaleString()}
                      </span>
                      <span className="text-sm">sqft</span>
                    </div>
                  }
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
                  <Home className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="capitalize">{property.property_type}</span>
                </div>
                {property.year_built &&
                <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Built in {property.year_built}</span>
                  </div>
                }
                {property.lot_size &&
                <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
                    <Square className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{property.lot_size} lot</span>
                  </div>
                }
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {property.description || 'No description provided.'}
              </p>
            </div>

            {/* Facts & Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Facts & features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                    Interior details
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 w-32">Bedrooms:</span>{' '}
                      <span className="font-medium">{property.beds}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 w-32">Bathrooms:</span>{' '}
                      <span className="font-medium">{property.baths}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 w-32">Living area:</span>{' '}
                      <span className="font-medium">{property.sqft} sqft</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                    Property details
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-500 w-32">Property type:</span>{' '}
                      <span className="font-medium capitalize">
                        {property.property_type}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 w-32">Year built:</span>{' '}
                      <span className="font-medium">
                        {property.year_built || 'Unknown'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 w-32">Lot size:</span>{' '}
                      <span className="font-medium">
                        {property.lot_size || 'Unknown'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {property.features && property.features.length > 0 &&
              <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Amenities & Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, idx) =>
                  <li key={idx} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                  )}
                  </ul>
                </div>
              }
            </div>

            {/* Location Map */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Location
              </h2>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title="Property Location"
                  width="100%"
                  height="400"
                  style={{
                    border: 0
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}`}>
                </iframe>
              </div>
              <p className="mt-3 text-gray-600">
                {property.address}, {property.city}, {property.state}{' '}
                {property.zip_code}
              </p>
            </div>
          </div>

          {/* Right Column: Agent Contact Card */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Contact an Agent
              </h3>

              {/* Agent Profile */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={agentImage}
                  alt={agentName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4" />
                
                <h4 className="text-lg font-bold text-gray-900">{agentName}</h4>
                <p className="text-gray-500 text-sm">Real Estate Agent</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${agentPhone}`}
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  
                  <Phone className="w-5 h-5 mr-2" />
                  {agentPhone}
                </a>
                <a
                  href={`mailto:${agentEmail}`}
                  className="flex items-center justify-center w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-3 px-4 rounded-lg transition-colors">
                  
                  <Mail className="w-5 h-5 mr-2" />
                  Email Agent
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 text-center">
                  {agentEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full Screen Gallery Modal */}
      {showGallery &&
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-medium">
              {galleryIndex + 1} / {images.length}
            </span>
            <button
            onClick={() => setShowGallery(false)}
            className="text-white hover:text-gray-300">
            
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center px-4">
            <button
            onClick={() =>
            setGalleryIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
            )
            }
            className="absolute left-4 text-white hover:text-gray-300 p-2">
            
              <ChevronLeft className="w-10 h-10" />
            </button>
            <img
            src={images[galleryIndex]}
            alt={`Gallery ${galleryIndex + 1}`}
            className="max-h-[80vh] max-w-full object-contain" />
          
            <button
            onClick={() =>
            setGalleryIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
            )
            }
            className="absolute right-4 text-white hover:text-gray-300 p-2">
            
              <ChevronLeft className="w-10 h-10 rotate-180" />
            </button>
          </div>
          <div className="p-4 flex justify-center gap-2 overflow-x-auto">
            {images.map((img, idx) =>
          <button
            key={idx}
            onClick={() => setGalleryIndex(idx)}
            className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 ${idx === galleryIndex ? 'ring-2 ring-white' : 'opacity-60'}`}>
            
                <img
              src={img}
              alt={`Thumb ${idx + 1}`}
              className="w-full h-full object-cover" />
            
              </button>
          )}
          </div>
        </div>
      }

      <Footer />
    </div>);

}