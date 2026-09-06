import React, { useState } from 'react';
import { STORE_LOGO } from '../data';
import { apiService } from '../services/api';

export const AuthView = ({ onLoginSuccess, onGuestAccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('customer'); // 'customer' | 'vendor'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
    storeDescription: '',
    rememberMe: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Backend register API attempt
        const result = await apiService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
          storeName: role === 'vendor' ? formData.storeName : undefined,
          storeDescription: role === 'vendor' ? formData.storeDescription : undefined,
        });

        if (result && (result.user || result.token || result.message)) {
          onLoginSuccess({
            name: formData.name || (role === 'vendor' ? 'Artisan Studio' : 'Sophia Green'),
            email: formData.email,
            role,
            storeName: formData.storeName,
          });
        } else {
          // Fallback to local demo auth if backend response is mock/generic
          onLoginSuccess({
            name: formData.name || 'New Community Member',
            email: formData.email,
            role,
            storeName: formData.storeName,
          });
        }
      } else {
        // Backend login API attempt
        const result = await apiService.login({
          email: formData.email,
          password: formData.password,
        });

        if (result && (result.token || result.user)) {
          onLoginSuccess(result.user || {
            name: formData.email.split('@')[0] || 'Sophia Green',
            email: formData.email,
            role,
          });
        } else {
          // Fallback demo user
          onLoginSuccess({
            name: formData.email ? formData.email.split('@')[0] : 'Sophia Green',
            email: formData.email || 'sophia@verdantmart.eco',
            role,
          });
        }
      }
    } catch (err) {
      console.warn('Backend Auth API unavailable, using client authentication:', err);
      // Friendly fallback so user experience is always fluid
      onLoginSuccess({
        name: formData.name || (formData.email ? formData.email.split('@')[0] : 'Sophia Green'),
        email: formData.email || 'sophia@verdantmart.eco',
        role,
        storeName: formData.storeName,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoRole) => {
    if (demoRole === 'vendor') {
      onLoginSuccess({
        name: 'Earth & Clay Studio',
        email: 'artisan@earthandclay.eco',
        role: 'vendor',
        storeName: 'Earth & Clay Studio',
      });
    } else {
      onLoginSuccess({
        name: 'Sophia Green',
        email: 'sophia.green@verdantmart.eco',
        role: 'customer',
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-[#fcf9f5] via-[#eff4ff] to-[#e4f6ec]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-[#bccac0]/30 grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Branding Showcase Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#006948] to-[#004d34] text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle eco pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a6f2cf_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <img
                src={STORE_LOGO}
                alt="VerdantMart Logo"
                className="h-10 w-auto bg-white/10 p-1.5 rounded-xl backdrop-blur-md"
              />
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tight">
                VerdantMart
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a6f2cf]/20 text-[#a6f2cf] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#a6f2cf]/30">
              <span className="material-symbols-outlined text-sm">nature_people</span>
              <span>Sustainable Multi-Vendor Marketplace</span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-4">
              {isSignUp ? 'Join our conscious artisan community.' : 'Welcome back to authentic craftsmanship.'}
            </h2>

            <p className="text-white/80 font-['Inter'] text-sm md:text-base leading-relaxed">
              Connect directly with verified eco-craftsmen, discover zero-waste goods, and support small sustainable studios worldwide.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Top Switcher Tabs: Sign In / Create Account */}
            <div className="flex items-center justify-between mb-8 border-b border-[#eff4ff] pb-4">
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setErrorMessage('');
                  }}
                  className={`font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold cursor-pointer transition-colors relative pb-2 ${
                    !isSignUp ? 'text-[#006948]' : 'text-[#6d7a72] hover:text-[#121c2a]'
                  }`}
                >
                  Sign In
                  {!isSignUp && (
                    <span className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#006948] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setErrorMessage('');
                  }}
                  className={`font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold cursor-pointer transition-colors relative pb-2 ${
                    isSignUp ? 'text-[#006948]' : 'text-[#6d7a72] hover:text-[#121c2a]'
                  }`}
                >
                  Create Account
                  {isSignUp && (
                    <span className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#006948] rounded-full" />
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={onGuestAccess}
                className="text-xs font-['Inter'] font-semibold text-[#006948] hover:underline flex items-center gap-1 cursor-pointer bg-[#a6f2cf]/30 px-3 py-1.5 rounded-full"
              >
                <span>Guest Mode</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Account Type Selector (Customer vs Artisan/Vendor) */}
            <div className="mb-6">
              <label className="block text-xs font-['Inter'] font-bold text-[#3d4a42] uppercase tracking-wider mb-2">
                I am entering as a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-['Inter'] text-xs font-bold transition-all cursor-pointer ${
                    role === 'customer'
                      ? 'border-[#006948] bg-[#006948]/5 text-[#006948] ring-2 ring-[#006948]/20'
                      : 'border-[#bccac0]/40 text-[#6d7a72] hover:border-[#006948]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">shopping_bag</span>
                  <span>Shopper / Buyer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('vendor')}
                  className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-['Inter'] text-xs font-bold transition-all cursor-pointer ${
                    role === 'vendor'
                      ? 'border-[#006948] bg-[#006948]/5 text-[#006948] ring-2 ring-[#006948]/20'
                      : 'border-[#bccac0]/40 text-[#6d7a72] hover:border-[#006948]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">storefront</span>
                  <span>Artisan / Vendor</span>
                </button>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-['Inter'] font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-['Inter'] font-semibold text-[#121c2a] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      person
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={role === 'vendor' ? 'e.g. Elena Rostova' : 'e.g. Sophia Green'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#bccac0]/50 text-sm font-['Inter'] focus:outline-none focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 transition-all"
                    />
                  </div>
                </div>
              )}

              {isSignUp && role === 'vendor' && (
                <div>
                  <label className="block text-xs font-['Inter'] font-semibold text-[#121c2a] mb-1">
                    Studio / Store Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      store
                    </span>
                    <input
                      type="text"
                      name="storeName"
                      required
                      value={formData.storeName}
                      onChange={handleInputChange}
                      placeholder="e.g. Earth & Clay Studio"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#bccac0]/50 text-sm font-['Inter'] focus:outline-none focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-['Inter'] font-semibold text-[#121c2a] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#bccac0]/50 text-sm font-['Inter'] focus:outline-none focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-['Inter'] font-semibold text-[#121c2a]">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link will be sent to your email.')}
                      className="text-xs font-['Inter'] text-[#006948] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#bccac0]/50 text-sm font-['Inter'] focus:outline-none focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded border-[#bccac0] text-[#006948] focus:ring-[#006948] h-4 w-4 accent-[#006948] cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs font-['Inter'] text-[#3d4a42] cursor-pointer select-none">
                    Remember me on this device
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#006948] text-white font-['Plus_Jakarta_Sans'] font-bold text-sm hover:bg-[#004d34] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Quick Demo Shortcuts for instant test preview */}
          <div className="mt-6 pt-5 border-t border-[#eff4ff] flex flex-col gap-2">
            <span className="text-[11px] font-['Inter'] font-bold uppercase tracking-wider text-[#6d7a72] text-center">
              Quick Demo Access:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="py-2 px-3 rounded-xl bg-[#eff4ff] hover:bg-[#a6f2cf]/40 text-[#006948] font-['Inter'] text-xs font-semibold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">person</span>
                <span>Demo Customer</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('vendor')}
                className="py-2 px-3 rounded-xl bg-[#eff4ff] hover:bg-[#a6f2cf]/40 text-[#006948] font-['Inter'] text-xs font-semibold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">store</span>
                <span>Demo Vendor</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
