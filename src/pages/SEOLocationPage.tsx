import React, { useEffect, useState, createElement } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ChevronRight,
  MapPin,
  Home,
  Building,
  Map as MapIcon,
  ChevronDown,
  ChevronUp } from
'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PropertyCard } from '../components/PropertyCard';
import { supabase, Property } from '../lib/supabase';
import { seoPages, SeoPageConfig } from '../lib/seoPages';
export function SEOLocationPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const [pageData, setPageData] = useState<SeoPageConfig | null>(null);
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => {
    if (slug) {
      const foundPage = seoPages.find((p) => p.slug === slug);
      setPageData(foundPage || null);
      if (foundPage) {
        document.title = foundPage.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', foundPage.metaDescription);
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = foundPage.metaDescription;
          document.head.appendChild(meta);
        }
        fetchListings(foundPage);
      } else {
        setLoading(false);
      }
    }
  }, [slug]);
  const fetchListings = async (config: SeoPageConfig) => {
    setLoading(true);
    try {
      let query = supabase.
      from('properties').
      select('*').
      eq('property_type', config.propertyType).
      eq('listing_type', config.listingType).
      eq('state', config.state);
      if (config.city) {
        query = query.ilike('city', `%${config.city}%`);
      }
      const { data, error } = await query.limit(6);
      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };
  if (!slug) return <Navigate to="/" />;
  if (!loading && !pageData) return <Navigate to="/" />;
  if (loading || !pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>);

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
          href={`https://www.theprimenest.online/${pageData.slug}`} />
        
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors">
                    
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <span className="text-gray-900 font-medium">
                    {pageData.h1}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-blue-900 text-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4 text-blue-200">
                {getTypeIcon()}
                <span className="uppercase tracking-wider font-semibold text-sm">
                  {pageData.propertyType}s for {pageData.listingType}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                {pageData.h1}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                {pageData.metaDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section className="prose prose-blue max-w-none prose-lg text-gray-600">
                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData.content.replace(/\n/g, '<br/>')
                  }} />
                
              </section>

              {pageData.h2Sections.map((section, index) =>
              <section
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {section.heading}
                  </h2>
                  <div
                  className="prose prose-blue max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: section.content.replace(/\n/g, '<br/>')
                  }} />
                
                </section>
              )}

              {/* Listings Section */}
              <section id="listings" className="pt-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Browse available listings below
                  </h2>
                  <Link
                    to="/listings"
                    className="text-blue-600 hover:text-blue-700 font-medium hidden sm:block">
                    
                    View all listings &rarr;
                  </Link>
                </div>

                {listings.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {listings.map((property) =>
                  <PropertyCard key={property.id} property={property} />
                  )}
                  </div> :

                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No exact matches found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      We're constantly updating our inventory in{' '}
                      {pageData.city || pageData.state}. Check out our other
                      available properties.
                    </p>
                    <Link
                    to="/listings"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                    
                      Browse All Properties
                    </Link>
                  </div>
                }
              </section>

              {/* FAQs */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {pageData.faqs.map((faq, index) =>
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                      <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                      onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                      }>
                      
                        <span className="font-semibold text-gray-900">
                          {faq.question}
                        </span>
                        {openFaq === index ?
                      <ChevronUp className="h-5 w-5 text-gray-500" /> :

                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                      </button>
                      {openFaq === index &&
                    <div className="px-6 pb-4 text-gray-600">
                          {faq.answer}
                        </div>
                    }
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* CTA Card */}
                <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-2">
                    Ready to find your nest?
                  </h3>
                  <p className="text-blue-100 mb-6 text-sm">
                    Contact our local experts in{' '}
                    {pageData.city || pageData.state} to help you find the
                    perfect property.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full text-center bg-white text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    
                    Contact Us Today
                  </Link>
                </div>

                {/* Related Pages */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Explore More Areas
                  </h3>
                  <ul className="space-y-3">
                    {pageData.relatedPages.map((relatedSlug) => {
                      const relatedPage = seoPages.find(
                        (p) => p.slug === relatedSlug
                      );
                      if (!relatedPage) return null;
                      return (
                        <li key={relatedSlug}>
                          <Link
                            to={`/${relatedSlug}`}
                            className="text-gray-600 hover:text-blue-600 flex items-center text-sm group">
                            
                            <ChevronRight className="h-4 w-4 mr-1 text-gray-400 group-hover:text-blue-600" />
                            {relatedPage.h1}
                          </Link>
                        </li>);

                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}