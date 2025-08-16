'use client';

import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      originalPrice: 39.99,
      category: 'tops',
      brand: 'StyleCo',
      image: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=300&height=300&seq=fav1&orientation=squarish',
      colors: ['white', 'black', 'navy', 'gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviews: 124,
      isNew: true,
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
      isNew: true,
      isFavorite: true
    },
    {
      id: '5',
      name: 'Classic White Sneakers',
      price: 89.99,
      category: 'shoes',
      brand: 'ComfortStep',
      image: 'https://readdy.ai/api/search-image?query=Classic%20white%20leather%20sneakers%2C%20clean%20minimalist%20design%2C%20premium%20materials%2C%20comfortable%20sole%2C%20athletic%20footwear%2C%20isolated%20on%20white%20background%2C%20modern%20styling%2C%20versatile%20casual%20shoes&width=300&height=300&seq=fav3&orientation=squarish',
      colors: ['white', 'black', 'gray'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      rating: 4.5,
      reviews: 203,
      isFavorite: true
    },
    {
      id: '6',
      name: 'Leather Crossbody Bag',
      price: 129.99,
      category: 'accessories',
      brand: 'LuxeBags',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20brown%20leather%20crossbody%20bag%2C%20premium%20quality%2C%20minimalist%20design%2C%20adjustable%20strap%2C%20fashion%20accessory%2C%20isolated%20on%20white%20background%2C%20luxurious%20materials%2C%20practical%20and%20stylish&width=300&height=300&seq=fav4&orientation=squarish',
      colors: ['brown', 'black', 'tan'],
      sizes: ['One Size'],
      rating: 4.8,
      reviews: 95,
      isFavorite: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'shoes', 'accessories'];
  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name' }
  ];

  const filteredFavorites = favorites.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const getTotalValue = () => {
    return favorites.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Favorites</h1>
            <div className="text-right">
              <p className="text-sm text-gray-600">{favorites.length} items</p>
              <p className="text-sm font-medium">Total: ${getTotalValue().toFixed(2)}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white !rounded-button">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Your Collection</p>
                <p className="text-2xl font-bold">{favorites.length}</p>
              </div>
              <div className="text-right">
                <p className="text-pink-100 text-sm">Total Value</p>
                <p className="text-xl font-bold">${getTotalValue().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 mb-6">
          <div className="flex gap-3 mb-4 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors !rounded-button ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 hover:border-indigo-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors !rounded-button">
              <i className="ri-filter-line"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4">
          {sortedFavorites.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {sortedFavorites.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onFavorite={handleRemoveFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="ri-heart-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-semibold mb-2">No favorites found</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory === 'all' 
                  ? 'Start adding items to your favorites' 
                  : `No ${selectedCategory} items in your favorites`
                }
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors !rounded-button">
                Browse Products
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {favorites.length > 0 && (
          <div className="px-4 mt-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors !rounded-button">
                <i className="ri-shopping-cart-line mr-2"></i>
                Add All to Cart
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-indigo-300 transition-colors !rounded-button">
                <i className="ri-share-line mr-2"></i>
                Share List
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}