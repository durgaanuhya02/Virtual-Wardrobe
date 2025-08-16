'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import Link from 'next/link';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const product = {
    id: productId,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    brand: 'StyleCo',
    description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear with a modern fit that flatters all body types.',
    images: [
      'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%20front%20view%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=400&height=400&seq=detail1&orientation=squarish',
      'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%20back%20view%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=400&height=400&seq=detail2&orientation=squarish',
      'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%20side%20view%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=400&height=400&seq=detail3&orientation=squarish'
    ],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1E3A8A' },
      { name: 'Gray', value: '#6B7280' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    features: [
      '100% Organic Cotton',
      'Pre-shrunk Fabric',
      'Machine Washable',
      'Breathable & Comfortable',
      'Durable Construction'
    ],
    sizeGuide: {
      'XS': { chest: '32-34', length: '26' },
      'S': { chest: '34-36', length: '27' },
      'M': { chest: '36-38', length: '28' },
      'L': { chest: '38-40', length: '29' },
      'XL': { chest: '40-42', length: '30' },
      'XXL': { chest: '42-44', length: '31' }
    }
  };

  const recommendations = [
    {
      id: '2',
      name: 'Denim Skinny Jeans',
      price: 79.99,
      image: 'https://readdy.ai/api/search-image?query=Dark%20blue%20denim%20skinny%20jeans%2C%20premium%20quality%2C%20modern%20fit%2C%20detailed%20stitching%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20clean%20styling%2C%20contemporary%20design%2C%20comfortable%20stretch%20fabric&width=200&height=200&seq=rec1&orientation=squarish'
    },
    {
      id: '3',
      name: 'Casual Sneakers',
      price: 89.99,
      image: 'https://readdy.ai/api/search-image?query=Classic%20white%20leather%20sneakers%2C%20clean%20minimalist%20design%2C%20premium%20materials%2C%20comfortable%20sole%2C%20athletic%20footwear%2C%20isolated%20on%20white%20background%2C%20modern%20styling%2C%20versatile%20casual%20shoes&width=200&height=200&seq=rec2&orientation=squarish'
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    // Add to cart logic here
    console.log('Added to cart:', { productId, size: selectedSize, color: selectedColor, quantity });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {/* Product Images */}
        <div className="relative mb-6">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Favorite Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors !rounded-button">
            <i className="ri-heart-line text-gray-600"></i>
          </button>
        </div>

        {/* Product Info */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
            <div className="flex items-center gap-1">
              <i className="ri-star-fill text-yellow-400"></i>
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews})</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span className="text-sm text-green-600 font-medium">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
        </div>

        {/* Color Selection */}
        <div className="px-4 mb-6">
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color.name)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  selectedColor === color.name 
                    ? 'border-indigo-600 scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
          )}
        </div>

        {/* Size Selection */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Size</h3>
            <button
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Size Guide
            </button>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 px-2 text-sm font-medium border rounded-lg transition-all !rounded-button ${
                  selectedSize === size
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          
          {/* Size Guide Modal */}
          {showSizeGuide && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full !rounded-button">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Size Guide</h3>
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest (in)</th>
                        <th className="text-left py-2">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                        <tr key={size} className="border-b">
                          <td className="py-2 font-medium">{size}</td>
                          <td className="py-2">{measurements.chest}</td>
                          <td className="py-2">{measurements.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="px-4 mb-6">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <i className="ri-check-line text-green-500"></i>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="px-4 mb-6">
          <div className="flex gap-4 mb-4">
            <Link
              href={`/ar-tryout?product=${productId}`}
              className="flex-1 bg-indigo-100 text-indigo-700 py-4 rounded-2xl font-medium text-center hover:bg-indigo-200 transition-colors !rounded-button"
            >
              <i className="ri-camera-line mr-2"></i>
              Try with AR
            </Link>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-medium hover:bg-indigo-700 transition-colors !rounded-button"
            >
              Add to Cart
            </button>
          </div>
          
          <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-medium hover:bg-gray-800 transition-colors !rounded-button">
            Buy Now
          </button>
        </div>

        {/* Recommendations */}
        <div className="px-4 mb-6">
          <h3 className="font-semibold mb-4">You might also like</h3>
          <div className="grid grid-cols-2 gap-4">
            {recommendations.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all !rounded-button">
                  <div className="aspect-square overflow-hidden rounded-t-2xl">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                    <p className="text-indigo-600 font-semibold">${item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;