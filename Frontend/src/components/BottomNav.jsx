import React from 'react';

export const BottomNav = ({
  currentScreen,
  onNavigate,
  cartCount,
}) => {
  const tabs = [
    { id: 'storefront', label: 'Home', icon: 'storefront' },
    { id: 'explore-listings', label: 'Explore', icon: 'category' },
    { id: 'shopping-cart', label: 'Cart', icon: 'shopping_cart', badge: cartCount },
    { id: 'vendor-hub', label: 'Vendor Hub', icon: 'store' },
    { id: 'customer-account', label: 'Account', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-[#eff4ff]">
      <div className="flex items-center justify-around h-16 px-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive =
            currentScreen === tab.id ||
            (tab.id === 'explore-listings' && currentScreen === 'product-details');

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] h-14 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#006948] font-bold scale-102'
                  : 'text-[#3d4a42] hover:text-[#006948]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>

                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#006948] text-white font-['Inter'] text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`font-['Inter'] text-[12px] leading-tight mt-0.5 ${
                  isActive ? 'font-semibold text-[#006948]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
