'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isLogin) {
      // Login logic
      console.log('Login:', { email: formData.email, password: formData.password });
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        setIsLoading(false);
        return;
      }
      console.log('Signup:', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-line text-3xl text-indigo-600"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Join our fashion community'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors !rounded-button">
              <i className="ri-google-fill text-red-500"></i>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors !rounded-button">
              <i className="ri-facebook-fill text-blue-600"></i>
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm !rounded-button">
          <h3 className="font-semibold mb-4">Why join us?</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <i className="ri-camera-line text-indigo-600"></i>
              <span className="text-sm">Try clothes with AR technology</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-heart-line text-indigo-600"></i>
              <span className="text-sm">Save your favorite items</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-magic-line text-indigo-600"></i>
              <span className="text-sm">Get personalized recommendations</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-truck-line text-indigo-600"></i>
              <span className="text-sm">Free shipping on orders over $50</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}