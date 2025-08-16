'use client';

import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'outfits', name: 'Outfits' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'newest', name: 'Newest' },
    { id: 'rating', name: 'Best Rating' }
  ];

  const allProducts = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      originalPrice: 39.99,
      category: 'tops',
      brand: 'StyleCo',
      image: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=300&height=300&seq=tshirt1&orientation=squarish',
      colors: ['white', 'black', 'navy', 'gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviews: 124,
      isNew: true
    },
    {
      id: '2',
      name: 'Denim Skinny Jeans',
      price: 79.99,
      category: 'bottoms',
      brand: 'DenimCo',
      image: 'https://readdy.ai/api/search-image?query=Dark%20blue%20denim%20skinny%20jeans%2C%20premium%20quality%2C%20modern%20fit%2C%20detailed%20stitching%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20clean%20styling%2C%20contemporary%20design%2C%20comfortable%20stretch%20fabric&width=300&height=300&seq=jeans1&orientation=squarish',
      colors: ['dark blue', 'light blue', 'black'],
      sizes: ['26', '28', '30', '32', '34'],
      rating: 4.6,
      reviews: 89
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      price: 65.99,
      category: 'dresses',
      brand: 'FloralFashion',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20floral%20summer%20dress%2C%20flowing%20fabric%2C%20feminine%20design%2C%20colorful%20flower%20pattern%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20elegant%20styling%2C%20comfortable%20fit%2C%20spring%20fashion&width=300&height=300&seq=dress1&orientation=squarish',
      colors: ['floral', 'white', 'pink'],
      sizes: ['XS', 'S', 'M', 'L'],
      rating: 4.9,
      reviews: 156,
      isNew: true
    },
    {
      id: '4',
      name: 'Casual Blazer',
      price: 99.99,
      category: 'outfits',
      brand: 'BusinessCasual',
      image: 'https://readdy.ai/api/search-image?query=Navy%20blue%20casual%20blazer%2C%20professional%20style%2C%20tailored%20fit%2C%20high%20quality%20fabric%2C%20business%20casual%20wear%2C%20isolated%20on%20white%20background%2C%20clean%20photography%2C%20modern%20design%2C%20versatile%20jacket&width=300&height=300&seq=blazer1&orientation=squarish',
      colors: ['navy', 'black', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.7,
      reviews: 78
    },
    {
      id: '5',
      name: 'Classic White Sneakers',
      price: 89.99,
      category: 'shoes',
      brand: 'ComfortStep',
      image: 'https://readdy.ai/api/search-image?query=Classic%20white%20leather%20sneakers%2C%20clean%20minimalist%20design%2C%20premium%20materials%2C%20comfortable%20sole%2C%20athletic%20footwear%2C%20isolated%20on%20white%20background%2C%20modern%20styling%2C%20versatile%20casual%20shoes&width=300&height=300&seq=shoes1&orientation=squarish',
      colors: ['white', 'black', 'gray'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      rating: 4.5,
      reviews: 203
    },
    {
      id: '6',
      name: 'Leather Crossbody Bag',
      price: 129.99,
      category: 'accessories',
      brand: 'LuxeBags',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20brown%20leather%20crossbody%20bag%2C%20premium%20quality%2C%20minimalist%20design%2C%20adjustable%20strap%2C%20fashion%20accessory%2C%20isolated%20on%20white%20background%2C%20luxurious%20materials%2C%20practical%20and%20stylish&width=300&height=300&seq=bag1&orientation=squarish',
      colors: ['brown', 'black', 'tan'],
      sizes: ['One Size'],
      rating: 4.8,
      reviews: 95
    },
    {
      id: '7',
      name: 'Vintage Denim Jacket',
      price: 69.99,
      category: 'tops',
      brand: 'RetroStyle',
      image: 'https://readdy.ai/api/search-image?query=Vintage%20blue%20denim%20jacket%2C%20classic%20fit%2C%20distressed%20details%2C%20authentic%20vintage%20style%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20timeless%20design%2C%20casual%20outerwear&width=300&height=300&seq=jacket1&orientation=squarish',
      colors: ['blue', 'light blue', 'black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.4,
      reviews: 67
    },
    {
      id: '8',
      name: 'High-Waisted Trousers',
      price: 89.99,
      category: 'bottoms',
      brand: 'ModernFit',
      image: 'https://readdy.ai/api/search-image?query=High-waisted%20black%20trousers%2C%20tailored%20fit%2C%20professional%20style%2C%20premium%20fabric%2C%20business%20casual%20wear%2C%20isolated%20on%20white%20background%2C%20sleek%20design%2C%20contemporary%20fashion&width=300&height=300&seq=trousers1&orientation=squarish',
      colors: ['black', 'navy', 'gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.6,
      reviews: 112
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Search Bar */}
        <div className="px-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-indigo-500 focus:outline-none"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-indigo-500 transition-colors !rounded-button"
            >
              <i className="ri-filter-line"></i>
              <span className="text-sm">Filters</span>
            </button>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors !rounded-button ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-200 hover:border-indigo-500'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4 !rounded-button">
              {/* Sort Options */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Sort By</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSort(option.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors !rounded-button ${
                        selectedSort === option.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm">${priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="px-4 mb-4">
          <p className="text-sm text-gray-600">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Products Grid */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <div className="px-4 mb-6 text-center">
            <button className="w-full py-3 bg-white border border-gray-200 rounded-2xl hover:border-indigo-500 transition-colors !rounded-button">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    }>
      <ShopContent />
    </Suspense>
  );
}