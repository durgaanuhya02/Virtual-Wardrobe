'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    birthdate: '1992-05-15',
    gender: 'female',
    measurements: {
      chest: '34',
      waist: '26',
      hips: '36',
      height: '5\'6"',
      weight: '125 lbs'
    },
    preferences: {
      style: 'modern',
      size: 'M',
      colors: ['black', 'white', 'navy'],
      brands: ['StyleCo', 'ModernFit', 'LuxeBags']
    }
  });

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.97,
      items: [
        { name: 'Premium Cotton T-Shirt', size: 'M', color: 'White', price: 29.99 },
        { name: 'Denim Skinny Jeans', size: '30', color: 'Dark Blue', price: 79.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      status: 'Processing',
      total: 65.99,
      items: [
        { name: 'Floral Summer Dress', size: 'M', color: 'Floral', price: 65.99 }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'measurements', name: 'Measurements', icon: 'ri-ruler-line' },
    { id: 'orders', name: 'Orders', icon: 'ri-shopping-bag-line' },
    { id: 'settings', name: 'Settings', icon: 'ri-settings-line' }
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-2xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold">{profileData.name}</h1>
                <p className="text-indigo-100">Member since Jan 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 mb-6">
          <div className="flex overflow-x-auto gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors !rounded-button ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm !rounded-button">
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'measurements' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm !rounded-button">
                <h2 className="text-lg font-semibold mb-4">Body Measurements</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Accurate measurements help us recommend the perfect fit for you.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chest</label>
                    <input
                      type="text"
                      name="measurements.chest"
                      value={profileData.measurements.chest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="34"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist</label>
                    <input
                      type="text"
                      name="measurements.waist"
                      value={profileData.measurements.waist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="26"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hips</label>
                    <input
                      type="text"
                      name="measurements.hips"
                      value={profileData.measurements.hips}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="36"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <input
                      type="text"
                      name="measurements.height"
                      value={profileData.measurements.height}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="5'6\""
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orderHistory.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm !rounded-button">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-sm font-semibold mt-1">${order.total}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{item.name} ({item.size}, {item.color})</span>
                        <span className="font-medium">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm !rounded-button">
                <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Size</label>
                    <select
                      name="preferences.size"
                      value={profileData.preferences.size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style Preference</label>
                    <select
                      name="preferences.style"
                      value={profileData.preferences.style}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="casual">Casual</option>
                      <option value="trendy">Trendy</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm !rounded-button">
                <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New arrivals</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-12 h-6 bg-indigo-600 rounded-full shadow-inner"></div>
                      <div className="absolute inset-y-0 right-0 w-6 h-6 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sales & offers</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-12 h-6 bg-indigo-600 rounded-full shadow-inner"></div>
                      <div className="absolute inset-y-0 right-0 w-6 h-6 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Order updates</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-12 h-6 bg-indigo-600 rounded-full shadow-inner"></div>
                      <div className="absolute inset-y-0 right-0 w-6 h-6 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}