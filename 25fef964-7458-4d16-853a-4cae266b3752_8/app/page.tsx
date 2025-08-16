'use client';

import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
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
      category: 'jackets',
      brand: 'BusinessCasual',
      image: 'https://readdy.ai/api/search-image?query=Navy%20blue%20casual%20blazer%2C%20professional%20style%2C%20tailored%20fit%2C%20high%20quality%20fabric%2C%20business%20casual%20wear%2C%20isolated%20on%20white%20background%2C%20clean%20photography%2C%20modern%20design%2C%20versatile%20jacket&width=300&height=300&seq=blazer1&orientation=squarish',
      colors: ['navy', 'black', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.7,
      reviews: 78
    }
  ];

  const categories = [
    { 
      name: 'Tops', 
      icon: 'ri-shirt-line',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20stylish%20shirt%20and%20blouse%20collection%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20modern%20look&width=100&height=100&seq=cat1&orientation=squarish'
    },
    { 
      name: 'Bottoms', 
      icon: 'ri-user-line',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20jeans%20and%20pants%20collection%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20modern%20look&width=100&height=100&seq=cat2&orientation=squarish'
    },
    { 
      name: 'Dresses', 
      icon: 'ri-user-line',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20elegant%20dress%20collection%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20modern%20look&width=100&height=100&seq=cat3&orientation=squarish'
    },
    { 
      name: 'Shoes', 
      icon: 'ri-user-line',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20stylish%20shoes%20and%20sneakers%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20modern%20look&width=100&height=100&seq=cat4&orientation=squarish'
    },
    { 
      name: 'Accessories', 
      icon: 'ri-user-line',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20fashion%20accessories%20collection%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20modern%20look&width=100&height=100&seq=cat5&orientation=squarish'
    },
    { 
      name: 'Outfits', 
      icon: 'ri-user-line',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20complete%20outfit%20sets%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20modern%20look&width=100&height=100&seq=cat6&orientation=squarish'
    }
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mx-4 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-6 text-white h-full flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-2">Try Before You Buy</h1>
            <p className="text-indigo-100 mb-4">Experience AR virtual try-on with our latest collection</p>
            <Link href="/ar-tryout" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium w-fit hover:bg-indigo-50 transition-colors !rounded-button">
              Start AR Try-On
            </Link>
          </div>
          <div className="absolute right-4 top-4 opacity-20">
            <i className="ri-camera-line text-6xl"></i>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/shop?category=${category.name.toLowerCase()}`} className="group">
                <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 text-center !rounded-button">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured</h2>
            <Link href="/shop" className="text-indigo-600 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/wardrobe" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 !rounded-button">
              <i className="ri-shirt-line text-2xl mb-2 block"></i>
              <h3 className="font-semibold">My Wardrobe</h3>
              <p className="text-sm text-pink-100">View saved items</p>
            </Link>
            <Link href="/recommendations" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 !rounded-button">
              <i className="ri-magic-line text-2xl mb-2 block"></i>
              <h3 className="font-semibold">AI Recommendations</h3>
              <p className="text-sm text-amber-100">Personalized picks</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm !rounded-button">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="ri-camera-line text-indigo-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Tried on Summer Dress</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <i className="ri-heart-line text-pink-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Added to favorites</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-shopping-cart-line text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Purchased 3 items</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}