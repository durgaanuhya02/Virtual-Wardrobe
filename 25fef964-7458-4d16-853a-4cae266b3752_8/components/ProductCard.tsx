'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFavorite?: boolean;
}

interface ProductCardProps {
  product: Product;
  onFavorite?: (id: string) => void;
}

const ProductCard = ({ product, onFavorite }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite?.(product.id);
  };

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden !rounded-button">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Sale
              </span>
            )}
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <i className={`text-lg ${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'}`}></i>
          </button>
          
          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors !rounded-button">
              <i className="ri-camera-line text-sm text-gray-700"></i>
            </button>
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors !rounded-button">
              <i className="ri-add-line text-sm text-gray-700"></i>
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</span>
            <div className="flex items-center gap-1">
              <i className="ri-star-fill text-yellow-400 text-xs"></i>
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-snug">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          {/* Color Options */}
          <div className="flex items-center gap-2 mb-3">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
          
          {/* Size Options */}
          <div className="flex items-center gap-1">
            {product.sizes.slice(0, 4).map((size, index) => (
              <span key={index} className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-gray-500">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;