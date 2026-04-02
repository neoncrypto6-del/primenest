import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { supabase, Property } from "../lib/supabase";

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
  MapPin,
} from "lucide-react";

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data as Property);
      } catch (error) {
        console.error("Error fetching property:", error);
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
      </div>
    );
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
            onClick={() => navigate("/listings")}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        ];

  const getStatusBadge = () => {
    switch (property.status) {
      case "active":
        return { text: "Active", className: "bg-green-500" };
      case "sold":
        return { text: "Sold", className: "bg-red-500" };
      case "rented":
        return { text: "Rented", className: "bg-blue-500" };
      case "inactive":
        return { text: "Inactive", className: "bg-gray-500" };
      default:
        return { text: "Active", className: "bg-green-500" };
    }
  };

  const statusBadge = getStatusBadge();

  const agentName = property.agent_name || "Lora Wale";
  const agentPhone = property.agent_phone || "+1 850-641-8765";
  const agentEmail = property.agent_email || "lorawale9639@outlook.com";
  const agentImage =
    property.agent_image ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80";

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
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to search
          </button>

          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Share className="h-5 w-5 mr-1.5" />
              Share
            </button>

            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Heart className="h-5 w-5 mr-1.5" />
              Save
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:w-2/3">

            {/* IMAGE GRID */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
              <div
                className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer"
                onClick={() => {
                  setGalleryIndex(0);
                  setShowGallery(true);
                }}
              >
                <img
                  src={images[0]}
                  alt="Main"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold text-white ${statusBadge.className}`}
                  >
                    {statusBadge.text}
                  </span>
                </div>
              </div>

              {images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="hidden md:block cursor-pointer"
                  onClick={() => {
                    setGalleryIndex(idx + 1);
                    setShowGallery(true);
                  }}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* HEADER */}
            <div className="mb-8 border-b border-gray-200 pb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {formatPrice(property.price)}
              </h1>

              <p className="text-xl text-gray-700 flex items-center">
                {property.address}, {property.city}, {property.state}{" "}
                {property.zip_code}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>

              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {property.description || "No description provided."}
              </p>
            </div>

            {/* FEATURES */}
            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Amenities & Features</h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MAP */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Location
              </h2>

              <div className="rounded-xl overflow-hidden border shadow-sm">
                <iframe
                  title="Property Location"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}`}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl border shadow-lg p-6 sticky top-32">
              <h3 className="text-xl font-bold mb-6 text-center">
                Contact an Agent
              </h3>

              <div className="flex flex-col items-center mb-6">
                <img
                  src={agentImage}
                  alt={agentName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4"
                />

                <h4 className="text-lg font-bold">{agentName}</h4>
                <p className="text-gray-500 text-sm">Real Estate Agent</p>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${agentPhone}`}
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {agentPhone}
                </a>

                <a
                  href={`mailto:${agentEmail}`}
                  className="flex items-center justify-center w-full border border-blue-600 text-blue-600 py-3 rounded-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Agent
                </a>
              </div>

              <p className="text-sm text-gray-500 text-center">
                {agentEmail}
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* FULLSCREEN GALLERY */}
      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <span className="text-white">
              {galleryIndex + 1} / {images.length}
            </span>

            <button
              onClick={() => setShowGallery(false)}
              className="text-white"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center px-4">
            <img
              src={images[galleryIndex]}
              alt="Gallery"
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
