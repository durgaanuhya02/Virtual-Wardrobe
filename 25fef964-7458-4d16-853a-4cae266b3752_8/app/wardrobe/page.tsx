'use client';

import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

export default function Wardrobe() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [viewMode, setViewMode] = useState('grid');

  const favorites = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      category: 'tops',
      brand: 'StyleCo',
      image: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=300&height=300&seq=fav1&orientation=squarish',
      colors: ['white', 'black', 'navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviews: 124,
      isFavorite: true
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      price: 65.99,
      category: 'dresses',
      brand: 'FloralFashion',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20floral%20summer%20dress%2C%20flowing%20fabric%2C%20feminine%20design%2C%20colorful%20flower%20pattern%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20elegant%20styling%2C%20comfortable%20fit%2C%20spring%20fashion&width=300&height=300&seq=fav2&orientation=squarish',
      colors: ['floral', 'white', 'pink'],
      sizes: ['XS', 'S', 'M', 'L'],
      rating: 4.9,
      reviews: 156,
      isFavorite: true
    }
  ];

  const tryOnHistory = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      triedOn: '2024-01-15',
      image: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=300&height=300&seq=try1&orientation=squarish',
      rating: 5
    },
    {
      id: '2',
      name: 'Denim Skinny Jeans',
      triedOn: '2024-01-14',
      image: 'https://readdy.ai/api/search-image?query=Dark%20blue%20denim%20skinny%20jeans%2C%20premium%20quality%2C%20modern%20fit%2C%20detailed%20stitching%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20clean%20styling%2C%20contemporary%20design%2C%20comfortable%20stretch%20fabric&width=300&height=300&seq=try2&orientation=squarish',
      rating: 4
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      triedOn: '2024-01-13',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20floral%20summer%20dress%2C%20flowing%20fabric%2C%20feminine%20design%2C%20colorful%20flower%20pattern%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20elegant%20styling%2C%20comfortable%20fit%2C%20spring%20fashion&width=300&height=300&seq=try3&orientation=squarish',
      rating: 5
    }
  ];

  const outfits = [
    {
      id: '1',
      name: 'Casual Weekend Look',
      items: ['Premium Cotton T-Shirt', 'Denim Skinny Jeans', 'White Sneakers'],
      image: 'https://readdy.ai/api/search-image?query=Casual%20weekend%20outfit%20flat%20lay%2C%20white%20t-shirt%2C%20blue%20jeans%2C%20white%20sneakers%2C%20minimalist%20styling%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20modern%20casual%20wear%2C%20comfortable%20style&width=300&height=300&seq=outfit1&orientation=squarish',
      created: '2024-01-12'
    },
    {
      id: '2',
      name: 'Summer Brunch Outfit',
      items: ['Floral Summer Dress', 'Leather Crossbody Bag', 'Sandals'],
      image: 'https://readdy.ai/api/search-image?query=Summer%20brunch%20outfit%20flat%20lay%2C%20floral%20dress%2C%20leather%20bag%2C%20sandals%2C%20feminine%20styling%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20elegant%20casual%20wear%2C%20spring%20style&width=300&height=300&seq=outfit2&orientation=squarish',
      created: '2024-01-10'
    }
  ];

  const tabs = [
    { id: 'favorites', name: 'Favorites', icon: 'ri-heart-line' },
    { id: 'tried', name: 'Tried On', icon: 'ri-camera-line' },
    { id: 'outfits', name: 'My Outfits', icon: 'ri-shirt-line' }
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Wardrobe</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <i className="ri-apps-line"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <i className="ri-list-check"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
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

        {/* Content */}
        <div className="px-4">
          {activeTab === 'favorites' && (
            <div>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {favorites.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-heart-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-4">Start adding items to your favorites</p>
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors !rounded-button">
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tried' && (
            <div>
              {tryOnHistory.length > 0 ? (
                <div className="space-y-4">
                  {tryOnHistory.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all !rounded-button">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">Tried on {item.triedOn}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`ri-star-${i < item.rating ? 'fill' : 'line'} text-xs ${
                                  i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors !rounded-button">
                            <i className="ri-camera-line text-sm"></i>
                          </button>
                          <button className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors !rounded-button">
                            <i className="ri-heart-line text-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-camera-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-semibold mb-2">No try-on history</h3>
                  <p className="text-gray-600 mb-4">Start trying on clothes with AR</p>
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors !rounded-button">
                    Try AR Now
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'outfits' && (
            <div>
              {outfits.length > 0 ? (
                <div className="space-y-4">
                  {outfits.map(outfit => (
                    <div key={outfit.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all !rounded-button">
                      <div className="flex items-center gap-4">
                        <img 
                          src={outfit.image}
                          alt={outfit.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{outfit.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">Created {outfit.created}</p>
                          <div className="flex flex-wrap gap-1">
                            {outfit.items.map((item, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors !rounded-button">
                            <i className="ri-edit-line text-sm"></i>
                          </button>
                          <button className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors !rounded-button">
                            <i className="ri-share-line text-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-shirt-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-semibold mb-2">No outfits created</h3>
                  <p className="text-gray-600 mb-4">Create your first outfit combination</p>
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors !rounded-button">
                    Create Outfit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}