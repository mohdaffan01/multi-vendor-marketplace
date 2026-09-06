import React from 'react';
import { ALL_PRODUCTS, USER_AVATAR } from '../data';

export const AccountView = ({
  onNavigate,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  followedVendors,
  onToggleFollowVendor,
  currentUser,
  onLogout,
}) => {
  const wishlistProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));
  const displayName = currentUser?.name || 'Sophia Green';
  const displayRole = currentUser?.role === 'vendor' ? 'Artisan Studio' : 'Level 4 Steward';

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pb-28 pt-2">
      {/* Main Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile, Impact Stats, Wishlist */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* User Profile Header Card */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#bccac0]/20 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#eff4ff] text-[#006948] flex items-center justify-center ring-4 ring-[#a6f2cf]">
                  <span className="material-symbols-outlined text-3xl">person</span>
                </div>
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-[#006948] text-white rounded-full flex items-center justify-center text-xs">
                  <span className="material-symbols-outlined text-[14px]">eco</span>
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h1 className="font-['Plus Jakarta Sans'] text-[20px] md:text-[24px] font-bold text-[#121c2a]">
                    {displayName}
                  </h1>
                  <span className="bg-[#a6f2cf] text-[#247155] font-['Inter'] text-[11px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {displayRole}
                  </span>
                </div>
                <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
                  {currentUser?.email || 'sophia@verdantmart.eco'} • Member since May 2023
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onLogout || (() => onNavigate('auth'))}
                className="px-3.5 py-2 rounded-2xl bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#ba1a1a] font-['Inter'] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Sustainability Impact Stats */}
          <div className="bg-[#a6f2cf]/40 p-5 rounded-3xl border border-[#00855d]/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#247155] flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">nature_people</span>
                <span>Your Conscious Impact</span>
              </span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#006948] uppercase tracking-wider">
                Verified Impact
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center text-center shadow-xs">
                <span className="font-['Plus Jakarta Sans'] text-[20px] font-bold text-[#121c2a]">
                  14.8 kg
                </span>
                <span className="font-['Inter'] text-[12px] text-[#3d4a42]">CO₂ Offset</span>
              </div>
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center text-center shadow-xs">
                <span className="font-['Plus Jakarta Sans'] text-[20px] font-bold text-[#121c2a]">
                  12 Trees
                </span>
                <span className="font-['Inter'] text-[12px] text-[#3d4a42]">Planted</span>
              </div>
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center text-center shadow-xs">
                <span className="font-['Plus Jakarta Sans'] text-[20px] font-bold text-[#006948]">
                  0%
                </span>
                <span className="font-['Inter'] text-[12px] text-[#3d4a42]">Plastic Used</span>
              </div>
            </div>
          </div>

          {/* Saved Wishlist Grid */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-['Plus Jakarta Sans'] text-[18px] md:text-[20px] font-bold text-[#121c2a]">
                Saved Artisan Pieces ({wishlistProducts.length})
              </h2>
              <button
                onClick={() => onNavigate('explore-listings')}
                className="text-[13px] font-['Inter'] text-[#006948] font-semibold hover:underline cursor-pointer"
              >
                Find more
              </button>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="p-8 bg-white rounded-3xl text-center border border-[#bccac0]/20 text-[#3d4a42]">
                <span className="material-symbols-outlined text-3xl text-[#6d7a72] mb-2">favorite</span>
                <p className="font-['Inter'] text-[14px]">Your saved list is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#bccac0]/20 p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#eff4ff] cursor-pointer"
                        onClick={() => {
                          onSelectProduct(p);
                          onNavigate('product-details');
                        }}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          aria-label="Remove from wishlist"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(p.id);
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-[#ba1a1a] flex items-center justify-center cursor-pointer"
                        >
                          <span
                            className="material-symbols-outlined text-[15px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      <span className="font-['Inter'] text-[11px] text-[#006948] font-bold uppercase mt-2 block">
                        {p.maker}
                      </span>
                      <h4
                        onClick={() => {
                          onSelectProduct(p);
                          onNavigate('product-details');
                        }}
                        className="font-['Plus Jakarta Sans'] text-[14px] font-semibold text-[#121c2a] truncate cursor-pointer"
                      >
                        {p.name}
                      </h4>
                      <span className="font-['Plus Jakarta Sans'] text-[15px] font-bold text-[#121c2a]">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="mt-3 w-full py-2 rounded-xl bg-[#a6f2cf] text-[#247155] hover:bg-[#006948] hover:text-white font-['Inter'] text-[12px] font-bold transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Order & Followed Studios (Sticky Desktop Sidebar) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
          {/* Active Shipment Tracker */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#bccac0]/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#121c2a]">
                Active Shipment
              </span>
              <span className="font-['Inter'] text-[12px] text-[#006948] font-bold flex items-center gap-1 bg-[#a6f2cf] px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                In Transit
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#eff4ff] rounded-2xl border border-[#bccac0]/20">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC742WoDr36MSBKa42uQmuyaEVpSQLRtzDhxmbcuG9g6vh6sBTNb5D2SM5nYod8QGoFhL3kpm2_sq8P9HFhcWnsa2PrNG2LdQTWQ8qHYDxC1_UnMdqa6N-c12okSBi6fstFbe25R_xHdxJuQu_29fsbj7DHDYxFb0clOliXINgxfcfyMzXNlkFg-MRgcc_ggSu2d58dUXohvAB2Zc6U2Uv2Ry9RQFd1YzYaNEkzsxaVTeLNW6l4cpA"
                  alt="Mug"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold text-[#121c2a]">
                  Matte Sage Ceramic Mug (Batch #4)
                </span>
                <span className="font-['Inter'] text-[12px] text-[#3d4a42]">
                  Shipped via Carbon-Neutral Ground • Arriving Friday
                </span>
              </div>
            </div>
          </div>

          {/* Followed Studios */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#bccac0]/20 flex flex-col gap-4">
            <h3 className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#121c2a]">
              Followed Artisan Studios
            </h3>

            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onNavigate('vendor-hub')}
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#eff4ff]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvHFU89uPuVlBlpN5_iw79HLlBV0baidtDW3-b5hOSaP8zwlQYM_n87IP_-6cWjRYO1kGGqG1wGWkpEEy9abOJIGhgEuZYCCvMMKHXSFdSX6k5DDoiRRMEZCRgrqQ8olUdfiB9eCbs349l2wQsGiMdvRGG7SYccCb9oZCnNf_qt3RHfCOsMdkN_Gj1Cmaf3I--eumqQIn5aO-v0RP8BZGOIQqJgTSVGWkGjgCqWP3inpalssSR0cD7"
                    alt="Earth & Clay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-['Plus Jakarta Sans'] text-[15px] font-bold text-[#121c2a] block">
                    Earth & Clay Studio
                  </span>
                  <span className="font-['Inter'] text-[12px] text-[#3d4a42]">
                    Portland, OR • 52 products
                  </span>
                </div>
              </div>

              <button
                onClick={() => onToggleFollowVendor('earth-and-clay')}
                className="px-4 py-2 rounded-xl text-xs font-['Inter'] font-bold bg-[#eff4ff] text-[#006948] hover:bg-[#a6f2cf] cursor-pointer"
              >
                {followedVendors.includes('earth-and-clay') ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
