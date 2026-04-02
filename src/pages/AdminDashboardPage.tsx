// components/admin/PropertyForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Property } from '../../lib/supabase';

interface PropertyFormProps {
  property?: Property | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function PropertyForm({ property, onClose, onSuccess }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    property_type: property?.property_type || 'House',
    listing_type: property?.listing_type || 'Sale',
    price: property?.price || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    square_feet: property?.square_feet || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zip_code: property?.zip_code || '',
    year_built: property?.year_built || '',
    property_condition: property?.property_condition || 'Good',
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(property?.image_urls || []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageItems = Array.from(items).filter(item => item.type.indexOf('image') !== -1);
      
      imageItems.forEach(item => {
        const file = item.getAsFile();
        if (file) {
          handleNewImageFile(file);
        }
      });
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleNewImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please paste or upload an image file');
      return;
    }

    setImageFiles(prev => [...prev, file]);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreviews(prev => [...prev, e.target!.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => handleNewImageFile(file));
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `properties/${fileName}`;

      const { error } = await supabase.storage
        .from('property-images') // Make sure this bucket exists in Supabase
        .upload(filePath, file, { upsert: true });

      if (error) {
        console.error('Upload error:', error);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      let imageUrls: string[] = [...(property?.image_urls || [])];

      // Upload new images if any
      if (imageFiles.length > 0) {
        const newUrls = await uploadImages();
        imageUrls = [...imageUrls, ...newUrls];
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price as string),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms as string) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms as string) : null,
        square_feet: formData.square_feet ? parseInt(formData.square_feet as string) : null,
        year_built: formData.year_built ? parseInt(formData.year_built as string) : null,
        image_urls: imageUrls,
        status: 'active',
      };

      let result;
      if (property) {
        // Update existing
        result = await supabase
          .from('properties')
          .update(payload)
          .eq('id', property.id);
      } else {
        // Insert new
        result = await supabase.from('properties').insert([payload]);
      }

      if (result.error) throw result.error;

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to save property');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Image Upload Section - SMART UPLOAD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Images (Click, Drag & Drop, or Paste with Ctrl/Cmd + V)
            </label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                Array.from(e.dataTransfer.files).forEach(file => handleNewImageFile(file));
              }}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">Click to upload or drag images here</p>
              <p className="text-sm text-gray-500 mt-1">You can also paste images directly (Ctrl/Cmd + V)</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rest of the form fields (description, type, address, etc.) */}
          {/* ... You can keep your existing form fields here ... */}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 flex items-center gap-2"
            >
              {uploading && <Loader2 className="animate-spin h-5 w-5" />}
              {property ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
