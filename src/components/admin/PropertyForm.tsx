import React, { useEffect, useState } from 'react'
import { supabase, Property } from '../../lib/supabase'
import { X, Upload, Loader2, Plus, Trash2, User } from 'lucide-react'

interface PropertyFormProps {
  property?: Property | null
  onClose: () => void
  onSuccess: () => void
}

export function PropertyForm({
  property,
  onClose,
  onSuccess,
}: PropertyFormProps) {

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingAgent, setUploadingAgent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    property_type: 'house',
    listing_type: 'sale',
    beds: 0,
    baths: 0,
    sqft: 0,
    address: '',
    city: '',
    state: '',
    zip_code: '',
    year_built: null,
    lot_size: '',
    status: 'active',
    images: [],
    features: [],
    agent_name: 'Lora Wale',
    agent_phone: '+1 850-641-8765',
    agent_email: 'lorawale9639@outlook.com',
    agent_image: '',
  })

  const [featureInput, setFeatureInput] = useState('')

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        agent_name: property.agent_name || 'Lora Wale',
        agent_phone: property.agent_phone || '+1 850-641-8765',
        agent_email: property.agent_email || 'lorawale9639@outlook.com',
        agent_image: property.agent_image || '',
      })
    }
  }, [property])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleAddFeature = () => {
    if (
      featureInput.trim() &&
      !formData.features?.includes(featureInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()],
      }))
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((f) => f !== feature),
    }))
  }

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImageToSupabase = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath)

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), data.publicUrl],
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setError(null)

      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]

      await uploadImageToSupabase(file)

    } catch (err: any) {
      setError(err.message || 'Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  /* ----------- NEW: PASTE IMAGE SUPPORT ----------- */

  const handlePasteImage = async (e: React.ClipboardEvent<HTMLDivElement>) => {

    const items = e.clipboardData.items

    for (let i = 0; i < items.length; i++) {

      if (items[i].type.indexOf('image') !== -1) {

        const blob = items[i].getAsFile()

        if (!blob) return

        try {

          setUploading(true)
          await uploadImageToSupabase(blob)

        } catch (err: any) {

          setError(err.message || 'Error uploading pasted image')

        } finally {

          setUploading(false)

        }

      }
    }
  }

  /* ---------------- AGENT IMAGE ---------------- */

  const handleAgentImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {

    try {

      setUploadingAgent(true)
      setError(null)

      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]

      const fileExt = file.name.split('.').pop()
      const fileName = `agent-${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath)

      setFormData((prev) => ({
        ...prev,
        agent_image: data.publicUrl,
      }))

    } catch (err: any) {

      setError(err.message || 'Error uploading agent image')

    } finally {

      setUploadingAgent(false)

    }
  }

  const handleRemoveImage = (urlToRemove: string) => {

    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((url) => url !== urlToRemove),
    }))

  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)
    setError(null)

    try {

      if (property?.id) {

        const { error } = await supabase
          .from('properties')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', property.id)

        if (error) throw error

      } else {

        const { error } = await supabase
          .from('properties')
          .insert([formData])

        if (error) throw error

      }

      onSuccess()

    } catch (err: any) {

      setError(err.message || 'Error saving property')

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10 pb-10">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 p-6">

        <div className="flex justify-between items-center mb-6 border-b pb-4">

          <h3 className="text-2xl font-bold text-gray-900">
            {property ? 'Edit Property' : 'Add New Property'}
          </h3>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>

        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

{/* ------------------ PROPERTY IMAGES ------------------ */}

<div
  onPaste={handlePasteImage}
  className="border-t border-gray-200 pt-6"
>

<h4 className="text-lg font-medium text-gray-900 mb-4">
  Property Images
</h4>

<div className="mb-4">

<label className="cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50">

{uploading ? (
  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
) : (
  <Upload className="w-5 h-5 mr-2 text-gray-400" />
)}

Upload Image or Paste (Ctrl + V)

<input
  type="file"
  className="hidden"
  accept="image/*"
  onChange={handleImageUpload}
  disabled={uploading}
/>

</label>

</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

{formData.images?.map((url, idx) => (

<div
  key={idx}
  className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
>

<img
  src={url}
  alt={`Property ${idx}`}
  className="w-full h-full object-cover"
/>

<button
  type="button"
  onClick={() => handleRemoveImage(url)}
  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
>

<Trash2 className="w-4 h-4" />

</button>

</div>

))}

</div>

</div>

{/* ------------------ SUBMIT ------------------ */}

<div className="border-t border-gray-200 pt-6 flex justify-end gap-4">

<button
  type="button"
  onClick={onClose}
  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
>

Cancel

</button>

<button
  type="submit"
  disabled={loading}
  className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
>

{loading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}

{property ? 'Update Property' : 'Save Property'}

</button>

</div>

</form>

</div>

</div>

)
}
