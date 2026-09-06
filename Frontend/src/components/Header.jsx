import React from 'react';
import { STORE_LOGO, USER_AVATAR } from '../data';

export const Header = ({
  currentScreen,
  onNavigate,
  cartCount,
  wishlistCount,
  onBack,
  onShare,
}) => {
  const isProductDetails = currentScreen === 'product-details';

  const getSubtitle = () => {
    switch (currentScreen) {
      case 'storefront':
        return 'Storefront';
      case 'explore-listings':
        return 'Explore Listings';
      case 'vendor-hub':
        return 'Vendor Hub';
      case 'shopping-cart':
        return 'Shopping Cart';
      case 'customer-account':
        return 'My Account';
      default:
        return 'Storefront';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {!isProductDetails && (
        <div className="bg-[#a6f2cf] text-[#247155] px-4 py-1 flex items-center justify-center gap-1.5 text-center transition-colors">
          <span className="material-symbols-outlined text-sm">eco</span>
          <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
            Free eco-delivery on orders over $50 | Shop Sustainable Vendors
          </span>
        </div>
      )}

      <div
        className={`${
          isProductDetails ? 'h-16' : 'h-20'
        } px-4 flex items-center justify-between gap-2 max-w-7xl mx-auto`}
      >
        {isProductDetails ? (
          <>
            <div className="flex items-center gap-2">
              <button
                aria-label="Go Back"
                onClick={onBack || (() => onNavigate('explore-listings'))}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#121c2a] hover:bg-[#a6f2cf]/40 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
              </button>
              <img
                src={STORE_LOGO}
                alt="VerdantMart Marketplace Logo"
                className="h-7 w-auto object-contain cursor-pointer"
                onClick={() => onNavigate('storefront')}
              />
              <h1 className="font-['Plus Jakarta Sans'] text-[18px] font-semibold text-[#121c2a] tracking-tight truncate">
                Product Details
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label="Share"
                onClick={onShare}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#3d4a42] hover:text-[#006948] hover:bg-[#eff4ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
              <button
                aria-label="View Account"
                onClick={() => onNavigate('customer-account')}
                className="cursor-pointer"
              >
                <img
                  src={USER_AVATAR}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#a6f2cf]"
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => onNavigate('storefront')}
            >
              <img
                src={STORE_LOGO}
                alt="VerdantMart Marketplace Logo"
                className="h-8 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#006948] tracking-tight">
                  VerdantMart
                </span>
                <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#3d4a42]">
                  {getSubtitle()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                aria-label="Search"
                onClick={() => onNavigate('explore-listings')}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#3d4a42] hover:text-[#006948] hover:bg-[#eff4ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">search</span>
              </button>

              <button
                aria-label="Wishlist"
                onClick={() => onNavigate('customer-account')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#3d4a42] hover:text-[#006948] hover:bg-[#eff4ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#1b6b4f] text-[#ffffff] font-['Inter'] text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Shopping Cart"
                onClick={() => onNavigate('shopping-cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#3d4a42] hover:text-[#006948] hover:bg-[#eff4ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#006948] text-[#ffffff] font-['Inter'] text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="pl-1">
                <button
                  aria-label="Profile"
                  onClick={() => onNavigate('customer-account')}
                  className="cursor-pointer"
                >
                  <img
                    src={USER_AVATAR}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#a6f2cf]"
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
