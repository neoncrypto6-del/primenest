import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ChevronRight,
  MapPin,
  Home,
  Building,
  Map as MapIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PropertyCard } from '../components/PropertyCard';
import { supabase, Property } from '../lib/supabase';
import { seoPages, SeoPageConfig } from '../lib/seoPages';

export function SEOLocationPage() {
  const { slug } = useParams<{ slug: string }>();

  const [pageData, setPageData] = useState<SeoPageConfig | null>(null);
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const normalizedSlug = slug.toLowerCase().trim();

    const foundPage = seoPages.find(
      (p) => p.slug.toLowerCase().trim() === normalizedSlug
    );

    console.log('Slug:', slug);
    console.log('Found page:', foundPage);

    if (!foundPage) {
      setPageData(null);
      setLoading(false);
      return;
    }

    setPageData(foundPage);
    fetchListings(foundPage);
  }, [slug]);

  const fetchListings = async (config: SeoPageConfig) => {
    try {
      setLoading(true);

      let query = supabase
        .from('properties')
        .select('*')
        .eq('property_type', config.propertyType)
        .eq('listing_type', config.listingType)
        .eq('state', config.state);

      if (config.city) {
        query = query.ilike('city', `%${config.city}%`);
      }

      const { data, error } = await query.limit(6);

      if (error) {
        console.error('Supabase error:', error);
        setListings([]);
      } else {
        setListings(data || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  if (!slug) {
    return <Navigate to="/" />;
  }

  if (!loading && !pageData) {
    return (
      <div className="p-10 text-center text-red-500">
        ❌ Page not found for slug: {slug}
      </div>
    );
  }

  if (loading || !pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (pageData.propertyType) {
      case 'apartment':
        return <Building className="h-5 w-5 text-blue-600" />;
      case 'house':
        return <Home className="h-5 w-5 text-blue-600" />;
      case 'land':
        return <MapIcon className="h-5 w-5 text-blue-600" />;
      default:
        return <Home className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.metaDescription} />
        <link
          rel="canonical"
          href={`https://www.theprimenest.online/${pageData.slug}`}
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-900 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">{pageData.h1}</h1>
          <p className="mt-4 text-lg">{pageData.metaDescription}</p>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: pageData.content.replace(/\n/g, '<br/>')
            }}
          />

          {/* Listings */}
          <h2 className="text-2xl font-bold mt-10 mb-4">
            Browse available listings
          </h2>

          {listings.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {listings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p>No listings found.</p>
          )}

          {/* FAQs */}
          <h2 className="text-2xl font-bold mt-10 mb-4">FAQs</h2>
          {pageData.faqs.map((faq, i) => (
            <div key={i} className="mb-4">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="font-semibold"
              >
                {faq.question}
              </button>
              {openFaq === i && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
