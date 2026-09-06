import React, { useState } from 'react';
import {
  FEATURED_CATEGORIES,
  ALL_PRODUCTS,
  RECENTLY_VIEWED,
  NORDIC_WOODCRAFT_VENDOR,
} from '../data';

export const StorefrontView = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  followedVendors,
  onToggleFollowVendor,
  onSelectCategory,
  products = ALL_PRODUCTS,
  categories = FEATURED_CATEGORIES,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyViewedItems, setRecentlyViewedItems] = useState(RECENTLY_VIEWED);
  const [voiceActive, setVoiceActive] = useState(false);

  const displayProducts = products && products.length > 0 ? products : ALL_PRODUCTS;
  const displayCategories = categories && categories.length > 0 ? categories : FEATURED_CATEGORIES;

  // Quick categories
  const quickCategories = [
    { name: 'Groceries', icon: 'local_florist', bg: 'bg-[#a6f2cf]', text: 'text-[#002115]' },
    { name: 'Artisan Decor', icon: 'cottage', bg: 'bg-white', text: 'text-[#006948]' },
    { name: 'Clean Beauty', icon: 'spa', bg: 'bg-white', text: 'text-[#006948]' },
    { name: 'Zero-Waste', icon: 'recycling', bg: 'bg-white', text: 'text-[#006948]' },
    { name: 'Apparel', icon: 'checkroom', bg: 'bg-white', text: 'text-[#006948]' },
    { name: 'Specialty Tea', icon: 'emoji_food_beverage', bg: 'bg-white', text: 'text-[#006948]' },
  ];

  // Filter specific product subsets
  const trendingProducts = displayProducts.slice(0, 3);
  const bestSellerProducts = displayProducts.slice(1, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectCategory(searchQuery.trim());
      onNavigate('explore-listings');
    }
  };

  const toggleVoice = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setSearchQuery('Glazed Stoneware');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pb-28">
      {/* Search Bar with Voice Input & Filter Button */}
      <section className="pt-2 pb-4">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-3">
          <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-xs border border-[#bccac0]/20 px-4 h-12 md:h-14">
            <span className="material-symbols-outlined text-[#006948] text-xl md:text-2xl select-none mr-3">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 12,000+ eco-friendly goods..."
              className="w-full bg-transparent font-['Inter'] text-[14px] md:text-[16px] text-[#121c2a] placeholder:text-[#6d7a72] focus:outline-none"
            />
            <button
              type="button"
              aria-label="Voice search"
              onClick={toggleVoice}
              className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${
                voiceActive
                  ? 'text-[#006948] bg-[#a6f2cf]'
                  : 'text-[#3d4a42] hover:text-[#006948]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>
          </div>

          <button
            type="button"
            aria-label="Filter products"
            onClick={() => onNavigate('explore-listings')}
            className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs border border-[#bccac0]/20 text-[#121c2a] hover:text-[#006948] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">tune</span>
            <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-[#006948] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          </button>
        </form>
      </section>

      {/* Quick Category Carousel */}
      <section className="pt-1 pb-4">
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar select-none">
          {quickCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('explore-listings');
              }}
              className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer"
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${cat.bg} ${cat.text} flex items-center justify-center shadow-xs border border-[#bccac0]/20 group-hover:bg-[#006948] group-hover:text-white transition-all duration-200`}
              >
                <span className="material-symbols-outlined text-2xl md:text-3xl">{cat.icon}</span>
              </div>
              <span className="font-['Inter'] text-[12px] md:text-[13px] font-medium text-[#121c2a] text-center whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Hero Promotional Banner */}
      <section className="py-2">
        <div className="relative overflow-hidden rounded-3xl bg-[#eff4ff] shadow-sm p-6 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[280px] border border-[#a6f2cf]/30">
          <div className="absolute -right-8 -bottom-8 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#a6f2cf]/40 blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 top-6 w-40 h-40 md:w-60 md:h-60 rounded-full bg-[#85f8c4]/30 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm self-start px-3 py-1 rounded-full shadow-xs border border-[#a6f2cf]/30">
              <span
                className="material-symbols-outlined text-xs text-[#006948]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-['Inter'] text-[11px] md:text-[12px] font-bold text-[#121c2a] uppercase tracking-wider">
                Independent Makers
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <h2 className="font-['Plus Jakarta Sans'] text-[26px] sm:text-[32px] md:text-[40px] text-[#121c2a] leading-tight font-bold max-w-xl">
                Handcrafted & Sustainable Goods
              </h2>
              <p className="font-['Inter'] text-[14px] md:text-[16px] text-[#3d4a42] font-medium max-w-lg">
                Up to 30% off artisan cookware, organic textiles, and zero-waste kitchen pottery
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-6 pt-2">
            <button
              onClick={() => onNavigate('explore-listings')}
              className="bg-[#006948] text-white font-['Inter'] text-[14px] md:text-[15px] font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md active:scale-95 hover:bg-[#005137] transition-all cursor-pointer"
            >
              <span>Shop Curated Vendors</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="w-6 h-2 rounded-full bg-[#006948]"></span>
              <span className="w-2 h-2 rounded-full bg-[#bccac0]"></span>
              <span className="w-2 h-2 rounded-full bg-[#bccac0]"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-['Plus Jakarta Sans'] text-[20px] md:text-[24px] text-[#121c2a] font-bold">
              Featured Categories
            </h3>
            <p className="font-['Inter'] text-[13px] md:text-[14px] text-[#3d4a42]">
              Handpicked ethical craft sectors
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore-listings')}
            className="font-['Inter'] text-[13px] md:text-[14px] text-[#006948] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>View all</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.title);
                onNavigate('explore-listings');
              }}
              className="relative rounded-2xl overflow-hidden bg-white shadow-xs border border-[#bccac0]/20 flex flex-col group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eff4ff]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#121c2a] font-['Inter'] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {cat.makers}
                </span>
              </div>
              <div className="p-3 flex flex-col">
                <span className="font-['Plus Jakarta Sans'] text-[15px] md:text-[16px] text-[#121c2a] font-bold truncate">
                  {cat.title}
                </span>
                <span className="font-['Inter'] text-[12px] md:text-[13px] text-[#3d4a42] truncate">
                  {cat.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products Feed */}
      <section className="py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006948] text-lg">bolt</span>
              <h3 className="font-['Plus Jakarta Sans'] text-[20px] md:text-[24px] text-[#121c2a] font-bold">
                Trending This Week
              </h3>
            </div>
            <p className="font-['Inter'] text-[13px] md:text-[14px] text-[#3d4a42]">
              Loved by conscious shoppers
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore-listings')}
            className="font-['Inter'] text-[13px] md:text-[14px] text-[#006948] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>Explore</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product) => {
            const isFav = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="flex flex-col bg-white rounded-2xl shadow-xs border border-[#bccac0]/20 overflow-hidden justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div
                    className="relative w-full aspect-square bg-[#eff4ff] overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#1b6b4f] text-white font-['Inter'] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    <button
                      aria-label="Save to Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#3d4a42] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                    >
                      <span
                        className={`material-symbols-outlined text-base ${
                          isFav ? 'text-[#ba1a1a]' : ''
                        }`}
                        style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="p-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-['Inter'] text-[11px] text-[#006948] font-bold uppercase truncate">
                        {product.maker}
                      </span>
                      <div className="flex items-center gap-0.5 text-[#825100]">
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-['Inter'] text-[11px] font-bold">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <h4
                      onClick={() => onSelectProduct(product)}
                      className="font-['Plus Jakarta Sans'] text-[15px] text-[#121c2a] font-semibold line-clamp-1 cursor-pointer hover:text-[#006948]"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="font-['Inter'] text-[12px] text-[#6d7a72] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-[#a6f2cf] hover:bg-[#006948] hover:text-white text-[#247155] font-['Inter'] text-[13px] font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top-Rated Artisans Showcase */}
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-['Plus Jakarta Sans'] text-[20px] md:text-[24px] text-[#121c2a] font-bold">
              Top-Rated Artisans
            </h3>
            <p className="font-['Inter'] text-[13px] md:text-[14px] text-[#3d4a42]">
              Verified community craft studios
            </p>
          </div>
          <button
            onClick={() => onNavigate('vendor-hub')}
            className="font-['Inter'] text-[13px] md:text-[14px] text-[#006948] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>Browse all</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vendor Card 1: Nordic Woodcraft */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#bccac0]/20 flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-3.5 min-w-0 cursor-pointer"
              onClick={() => onNavigate('vendor-hub')}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#eff4ff] flex-shrink-0">
                <img
                  src={NORDIC_WOODCRAFT_VENDOR.image}
                  alt={NORDIC_WOODCRAFT_VENDOR.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold truncate">
                    {NORDIC_WOODCRAFT_VENDOR.name}
                  </span>
                  <span
                    className="material-symbols-outlined text-[#006948] text-base flex-shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="bg-[#a6f2cf] text-[#247155] font-['Inter'] text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                    {NORDIC_WOODCRAFT_VENDOR.badge}
                  </span>
                  <span className="font-['Inter'] text-[12px] text-[#3d4a42]">
                    {NORDIC_WOODCRAFT_VENDOR.productCount} products
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[#3d4a42]">
                  <span
                    className="material-symbols-outlined text-xs text-[#825100]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                    {NORDIC_WOODCRAFT_VENDOR.rating}
                  </span>
                  <span className="font-['Inter'] text-[12px] text-[#6d7a72]">
                    ({NORDIC_WOODCRAFT_VENDOR.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggleFollowVendor('nordic-woodcraft')}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-['Inter'] text-[13px] font-semibold transition-all cursor-pointer ${
                followedVendors.includes('nordic-woodcraft')
                  ? 'bg-[#006948] text-white'
                  : 'bg-[#eff4ff] text-[#006948] hover:bg-[#a6f2cf]'
              }`}
            >
              {followedVendors.includes('nordic-woodcraft') ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Vendor Card 2: Earth & Clay */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#bccac0]/20 flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-3.5 min-w-0 cursor-pointer"
              onClick={() => onNavigate('vendor-hub')}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#eff4ff] flex-shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC742WoDr36MSBKa42uQmuyaEVpSQLRtzDhxmbcuG9g6vh6sBTNb5D2SM5nYod8QGoFhL3kpm2_sq8P9HFhcWnsa2PrNG2LdQTWQ8qHYDxC1_UnMdqa6N-c12okSBi6fstFbe25R_xHdxJuQu_29fsbj7DHDYxFb0clOliXINgxfcfyMzXNlkFg-MRgcc_ggSu2d58dUXohvAB2Zc6U2Uv2Ry9RQFd1YzYaNEkzsxaVTeLNW6l4cpA"
                  alt="Earth & Clay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold truncate">
                    Earth & Clay
                  </span>
                  <span
                    className="material-symbols-outlined text-[#006948] text-base flex-shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="bg-[#006948] text-white font-['Inter'] text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                    Top Seller
                  </span>
                  <span className="font-['Inter'] text-[12px] text-[#3d4a42]">52 products</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[#3d4a42]">
                  <span
                    className="material-symbols-outlined text-xs text-[#825100]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">5.0</span>
                  <span className="font-['Inter'] text-[12px] text-[#6d7a72]">(310 reviews)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggleFollowVendor('earth-and-clay')}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-['Inter'] text-[13px] font-semibold transition-all cursor-pointer ${
                followedVendors.includes('earth-and-clay')
                  ? 'bg-[#006948] text-white'
                  : 'bg-[#eff4ff] text-[#006948] hover:bg-[#a6f2cf]'
              }`}
            >
              {followedVendors.includes('earth-and-clay') ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Feature Banner */}
      <section className="py-4">
        <div className="rounded-3xl bg-[#a6f2cf] text-[#247155] p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948] text-xl">
                verified_user
              </span>
              <span className="font-['Inter'] text-[12px] font-bold uppercase tracking-wider text-[#006948]">
                Verdant Guarantee
              </span>
            </div>
            <h3 className="font-['Plus Jakarta Sans'] text-[22px] md:text-[28px] font-bold leading-snug text-[#121c2a]">
              Direct from Independent Makers — 0% Plastic Guarantee
            </h3>
            <p className="font-['Inter'] text-[14px] text-[#247155]">
              Every piece ships in 100% biodegradable corrugated wrap with carbon-offset transit.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center w-full md:w-auto">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/80 backdrop-blur-xs min-w-[100px]">
              <span className="material-symbols-outlined text-[#006948] text-xl">box</span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                100% Recycled
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/80 backdrop-blur-xs min-w-[100px]">
              <span className="material-symbols-outlined text-[#006948] text-xl">
                energy_savings_leaf
              </span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                Carbon Offset
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/80 backdrop-blur-xs min-w-[100px]">
              <span className="material-symbols-outlined text-[#006948] text-xl">handshake</span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                Fair Returns
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Best-Selling Products Grid */}
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-['Plus Jakarta Sans'] text-[20px] md:text-[24px] text-[#121c2a] font-bold">
              Best Sellers
            </h3>
            <p className="font-['Inter'] text-[13px] md:text-[14px] text-[#3d4a42]">
              Top-performing marketplace items
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore-listings')}
            className="font-['Inter'] text-[13px] md:text-[14px] text-[#006948] font-semibold hover:underline cursor-pointer"
          >
            See catalog
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellerProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white rounded-2xl shadow-xs border border-[#bccac0]/20 overflow-hidden justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div
                  className="relative w-full aspect-square bg-[#eff4ff] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span
                      className={`absolute top-2.5 left-2.5 font-['Inter'] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                        product.badgeType === 'eco'
                          ? 'bg-[#a6f2cf] text-[#247155]'
                          : product.badgeType === 'staff'
                          ? 'bg-[#1b6b4f] text-white'
                          : 'bg-[#006948] text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <span className="font-['Inter'] text-[11px] text-[#3d4a42] uppercase truncate">
                    {product.maker}
                  </span>
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-['Plus Jakarta Sans'] text-[15px] text-[#121c2a] font-semibold truncate cursor-pointer hover:text-[#006948]"
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className="material-symbols-outlined text-xs text-[#825100]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-['Inter'] text-[11px] font-bold text-[#121c2a]">
                      {product.rating}
                    </span>
                    <span className="font-['Inter'] text-[11px] text-[#6d7a72]">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <span className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold mt-1">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-3 pt-0">
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-[#a6f2cf] hover:bg-[#006948] hover:text-white text-[#247155] font-['Inter'] text-[13px] font-semibold py-2 px-3 rounded-xl transition-colors cursor-pointer active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Viewed Tray */}
      {recentlyViewedItems.length > 0 && (
        <section className="py-3">
          <div className="bg-[#eff4ff] rounded-2xl p-4 shadow-xs border border-[#bccac0]/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold">
                Recently Viewed
              </span>
              <button
                onClick={() => setRecentlyViewedItems([])}
                className="font-['Inter'] text-[12px] text-[#3d4a42] hover:text-[#006948] cursor-pointer"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
              {recentlyViewedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('explore-listings')}
                  className="flex items-center gap-3 bg-white p-2 pr-4 rounded-xl flex-shrink-0 shadow-xs border border-[#bccac0]/20 cursor-pointer hover:border-[#006948]/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#eff4ff] flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Inter'] text-[13px] text-[#121c2a] font-semibold truncate max-w-[120px]">
                      {item.name}
                    </span>
                    <span className="font-['Inter'] text-[12px] text-[#006948] font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Marketplace Trust Signals & Footer */}
      <section className="pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center py-4 bg-white rounded-2xl border border-[#bccac0]/20 p-6 shadow-xs">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#a6f2cf] text-[#247155] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
            <span className="font-['Inter'] text-[14px] font-bold text-[#121c2a]">
              Carbon-Neutral Delivery
            </span>
            <span className="font-['Inter'] text-[12px] text-[#3d4a42] text-center max-w-xs">
              100% offset transit with biodegradable packaging on all orders
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#a6f2cf] text-[#247155] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">published_with_changes</span>
            </div>
            <span className="font-['Inter'] text-[14px] font-bold text-[#121c2a]">
              30-Day Fair Returns
            </span>
            <span className="font-['Inter'] text-[12px] text-[#3d4a42] text-center max-w-xs">
              Hassle-free replacement if damaged or if not deeply in love
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#a6f2cf] text-[#247155] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">lock</span>
            </div>
            <span className="font-['Inter'] text-[14px] font-bold text-[#121c2a]">Escrow Protection</span>
            <span className="font-['Inter'] text-[12px] text-[#3d4a42] text-center max-w-xs">
              Funds securely held until you confirm delivery satisfaction
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-[#3d4a42]">
          <span className="material-symbols-outlined text-base text-[#006948]">eco</span>
          <span className="font-['Inter'] text-[13px]">
            Curated with love by VerdantMart for a greener future
          </span>
        </div>
      </section>
    </div>
  );
};
