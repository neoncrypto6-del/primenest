import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, Property, ContactMessage } from '../lib/supabase'
import { PropertyTable } from '../components/admin/PropertyTable'
import { PropertyForm } from '../components/admin/PropertyForm'
import {
  LogOut,
  Plus,
  Home,
  DollarSign,
  Building,
  Loader2,
  Mail,
  Eye,
  Trash2,
  MessageSquare,
  X,
} from 'lucide-react'
export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [activeTab, setActiveTab] = useState<'properties' | 'messages'>(
    'properties',
  )
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  )
  useEffect(() => {
    checkUser()
    fetchProperties()
    fetchMessages()
  }, [])
  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }
  const fetchProperties = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', {
          ascending: false,
        })
      if (error) throw error
      setProperties(data as Property[])
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', {
          ascending: false,
        })
      if (error) throw error
      setMessages((data as ContactMessage[]) || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const { error } = await supabase
          .from('properties')
          .delete()
          .eq('id', id)
        if (error) throw error
        fetchProperties()
      } catch (error) {
        console.error('Error deleting property:', error)
        alert('Failed to delete property')
      }
    }
  }
  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id)
        if (error) throw error
        fetchMessages()
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      } catch (error) {
        console.error('Error deleting message:', error)
        alert('Failed to delete message')
      }
    }
  }
  const handleMarkAsRead = async (message: ContactMessage) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({
          is_read: true,
        })
        .eq('id', message.id)
      if (error) throw error
      fetchMessages()
      setSelectedMessage({
        ...message,
        is_read: true,
      })
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }
  const openNewForm = () => {
    setEditingProperty(null)
    setIsFormOpen(true)
  }
  const openEditForm = (property: Property) => {
    setEditingProperty(property)
    setIsFormOpen(true)
  }
  const handleFormSuccess = () => {
    setIsFormOpen(false)
    fetchProperties()
  }
  // Stats
  const totalProperties = properties.length
  const activeProperties = properties.filter(
    (p) => p.status === 'active',
  ).length
  const forSale = properties.filter((p) => p.listing_type === 'sale').length
  const forRent = properties.filter((p) => p.listing_type === 'rent').length
  const unreadMessages = messages.filter((m) => !m.is_read).length
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="h-8 w-auto mr-3"
              src="https://cdn.magicpatterns.com/uploads/3NxxoEL58UE9ykVMswL9n3/Prime_logo.png"
              alt="PrimeNest Logo"
            />
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Home className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Properties
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalProperties}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">For Sale</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {forSale}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Building className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">For Rent</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {forRent}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <div className="h-6 w-6 flex items-center justify-center font-bold">
                  A
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Listings
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {activeProperties}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Unread Messages
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {unreadMessages}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'properties' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'messages' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Contact Messages
                {unreadMessages > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'properties' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Manage Properties
              </h2>
              <button
                onClick={openNewForm}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <PropertyTable
                  properties={properties}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Messages</h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No messages yet
                  </div>
                ) : (
                  messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message)
                        if (!message.is_read) {
                          handleMarkAsRead(message)
                        }
                      }}
                      className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${selectedMessage?.id === message.id ? 'bg-blue-50' : ''} ${!message.is_read ? 'bg-yellow-50' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900 truncate">
                          {message.name}
                        </span>
                        {!message.is_read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              {selectedMessage ? (
                <div className="h-full flex flex-col">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      Message Details
                    </h2>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedMessage.name}
                          </h3>
                          <p className="text-gray-600">
                            {selectedMessage.email}
                          </p>
                          {selectedMessage.phone && (
                            <p className="text-gray-600">
                              {selectedMessage.phone}
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(
                            selectedMessage.created_at,
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-500 mb-1">Subject</p>
                        <p className="font-medium text-gray-900">
                          {selectedMessage.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Message</p>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 p-6">
                  <div className="text-center">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a message to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {isFormOpen && (
        <PropertyForm
          property={editingProperty}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}
