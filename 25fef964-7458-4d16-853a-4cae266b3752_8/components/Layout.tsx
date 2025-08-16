'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-600" style={{ fontFamily: 'Pacifico, serif' }}>
              VirtualWardrobe
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-search-line text-xl text-gray-600"></i>
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <i className="ri-menu-line text-xl text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <div className="max-w-md mx-auto">
              <Link 
                href="/profile" 
                className="block px-4 py-3 hover:bg-gray-50 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="ri-user-line mr-3"></i>Profile
              </Link>
              <Link 
                href="/wardrobe" 
                className="block px-4 py-3 hover:bg-gray-50 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="ri-shirt-line mr-3"></i>My Wardrobe
              </Link>
              <Link 
                href="/auth" 
                className="block px-4 py-3 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="ri-login-box-line mr-3"></i>Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 h-16">
            <Link 
              href="/" 
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-home-line text-xl"></i>
              </div>
              <span className="text-xs">Home</span>
            </Link>
            
            <Link 
              href="/shop" 
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive('/shop') ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-store-line text-xl"></i>
              </div>
              <span className="text-xs">Shop</span>
            </Link>
            
            <Link 
              href="/ar-tryout" 
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive('/ar-tryout') ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-camera-line text-xl"></i>
              </div>
              <span className="text-xs">Try On</span>
            </Link>
            
            <Link 
              href="/favorites" 
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive('/favorites') ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-heart-line text-xl"></i>
              </div>
              <span className="text-xs">Favorites</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;