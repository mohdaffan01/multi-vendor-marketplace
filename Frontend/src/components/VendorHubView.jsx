import React, { useState } from 'react';
import { ALL_PRODUCTS, EARTH_AND_CLAY_VENDOR } from '../data';

export const VendorHubView = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  followedVendors,
  onToggleFollowVendor,
}) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All Creations');
  const [isFollowed, setIsFollowed] = useState(followedVendors.includes('earth-and-clay'));
  const [followerCount, setFollowerCount] = useState(4280);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const vendorProducts = ALL_PRODUCTS.filter((p) =>
    [
      'ceramic-pour-over-set',
      'matte-sage-mug',
      'speckled-dinner-plate',
      'matcha-whisk-bowl',
      'organic-glaze-vase',
      'everyday-ceramic-mug',
    ].includes(p.id)
  );

  const filteredProducts =
    selectedCategoryTab === 'All Creations'
      ? vendorProducts
      : selectedCategoryTab === 'Coffee & Tea'
      ? vendorProducts.filter((p) =>
          ['ceramic-pour-over-set', 'matte-sage-mug', 'matcha-whisk-bowl'].includes(p.id)
        )
      : selectedCategoryTab === 'Tableware & Mugs'
      ? vendorProducts.filter((p) =>
          ['speckled-dinner-plate', 'matte-sage-mug', 'everyday-ceramic-mug'].includes(p.id)
        )
      : vendorProducts.filter((p) => ['organic-glaze-vase'].includes(p.id));

  const toggleFollow = () => {
    onToggleFollowVendor('earth-and-clay');
    if (!isFollowed) {
      setFollowerCount((prev) => prev + 1);
      setIsFollowed(true);
    } else {
      setFollowerCount((prev) => prev - 1);
      setIsFollowed(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pb-28">
      {/* Studio Banner Image */}
      <div className="relative w-full h-52 md:h-72 bg-[#121c2a] rounded-3xl overflow-hidden shadow-sm">
        <img
          src={EARTH_AND_CLAY_VENDOR.bannerImage}
          alt="Earth & Clay Studio Workshop"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121c2a]/80 via-transparent to-black/30"></div>

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-white/95 backdrop-blur-md text-[#1b6b4f] px-3 py-1 rounded-full font-['Inter'] text-[12px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-sm">verified</span>
            Verified Master Artisan Studio
          </span>
        </div>
      </div>

      {/* Vendor Profile Header Card */}
      <div className="px-2 md:px-6 -mt-14 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-md border border-[#bccac0]/20 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={EARTH_AND_CLAY_VENDOR.logoImage}
                  alt={EARTH_AND_CLAY_VENDOR.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover ring-4 ring-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#006948] text-white p-1 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">eco</span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-['Plus Jakarta Sans'] text-[22px] md:text-[28px] font-bold text-[#121c2a]">
                    {EARTH_AND_CLAY_VENDOR.name}
                  </h1>
                  <span
                    className="material-symbols-outlined text-[#006948] text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="font-['Inter'] text-[14px] text-[#3d4a42]">
                  {EARTH_AND_CLAY_VENDOR.location} • Est. {EARTH_AND_CLAY_VENDOR.sinceYear}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[#825100]">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-['Inter'] text-[13px] font-bold text-[#121c2a]">
                      {EARTH_AND_CLAY_VENDOR.rating}
                    </span>
                  </div>
                  <span className="text-[#6d7a72]">•</span>
                  <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
                    {followerCount.toLocaleString()} followers
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
              <button
                onClick={toggleFollow}
                className={`px-5 py-2.5 rounded-xl font-['Inter'] text-[13px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer ${
                  isFollowed
                    ? 'bg-[#a6f2cf] text-[#247155] border border-[#00855d]/30'
                    : 'bg-[#006948] text-white hover:bg-[#005137]'
                }`}
              >
                {isFollowed ? 'Following' : 'Follow Studio'}
              </button>
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#eff4ff] text-[#006948] hover:bg-[#d9e3f6] font-['Inter'] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                <span>Contact</span>
              </button>
            </div>
          </div>

          <p className="font-['Inter'] text-[14px] text-[#3d4a42] leading-relaxed border-t border-[#eff4ff] pt-3">
            "{EARTH_AND_CLAY_VENDOR.philosophy}"
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#eff4ff]">
              <span className="material-symbols-outlined text-[#006948] text-xl">solar_power</span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                100% Solar Fired
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#eff4ff]">
              <span className="material-symbols-outlined text-[#006948] text-xl">water_drop</span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                Greywater Filtered
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#eff4ff]">
              <span className="material-symbols-outlined text-[#006948] text-xl">recycling</span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                Zero Waste Clay
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#eff4ff]">
              <span className="material-symbols-outlined text-[#006948] text-xl">handshake</span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                Fair Wages Certified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <section className="pt-6 pb-3">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {['All Creations', 'Coffee & Tea', 'Tableware & Mugs', 'Home Accents'].map((tab) => {
            const isActive = selectedCategoryTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedCategoryTab(tab)}
                className={`px-5 py-2 rounded-full font-['Inter'] text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-[#006948] text-white'
                    : 'bg-white text-[#3d4a42] border border-[#bccac0]/20 hover:bg-[#eff4ff]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-2">
        <div className="flex items-center justify-between mb-4">
          <span className="font-['Plus Jakarta Sans'] text-[20px] font-bold text-[#121c2a]">
            Studio Catalog ({filteredProducts.length})
          </span>
          <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
            Hand-thrown small batches
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isFav = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs border border-[#bccac0]/20 hover:shadow-md transition-all justify-between"
              >
                <div>
                  <div
                    className="relative aspect-square w-full bg-[#eff4ff] overflow-hidden cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onNavigate('product-details');
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />

                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#006948] text-white font-['Inter'] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    <button
                      aria-label="Save item"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#3d4a42] hover:text-[#ba1a1a] transition-colors cursor-pointer"
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
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onNavigate('product-details');
                      }}
                      className="font-['Plus Jakarta Sans'] text-[15px] font-semibold text-[#121c2a] line-clamp-1 cursor-pointer hover:text-[#006948]"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-xs text-[#825100]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                        {product.rating}
                      </span>
                    </div>

                    <span className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#006948] mt-1">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-[#eff4ff] hover:bg-[#006948] hover:text-white text-[#006948] py-2 rounded-xl font-['Inter'] text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meet the Maker Story & Policies */}
      <section className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#eff4ff] rounded-3xl p-6 shadow-xs border border-[#bccac0]/20 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvHFU89uPuVlBlpN5_iw79HLlBV0baidtDW3-b5hOSaP8zwlQYM_n87IP_-6cWjRYO1kGGqG1wGWkpEEy9abOJIGhgEuZYCCvMMKHXSFdSX6k5DDoiRRMEZCRgrqQ8olUdfiB9eCbs349l2wQsGiMdvRGG7SYccCb9oZCnNf_qt3RHfCOsMdkN_Gj1Cmaf3I--eumqQIn5aO-v0RP8BZGOIQqJgTSVGWkGjgCqWP3inpalssSR0cD7"
              alt="Elena Vance, Master Potter"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#006948] font-bold uppercase tracking-wider">
                Behind the Wheel
              </span>
              <h3 className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#121c2a]">
                Meet Artisan Elena Vance
              </h3>
              <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
                14 years of wood-fired pottery craftsmanship
              </span>
            </div>
          </div>

          <p className="font-['Inter'] text-[14px] text-[#3d4a42] leading-relaxed">
            "Pottery is tactile meditation. Our clay is mined right here in the Pacific Northwest,
            mixed with mineral deposits for natural speckled textures, and finished with glazes
            derived from cedar ash and feldspar."
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl shadow-xs border border-[#bccac0]/20 flex flex-col gap-4">
          <h4 className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#121c2a]">
            Earth & Clay Studio Policies
          </h4>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] text-2xl">inventory_2</span>
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[14px] font-bold text-[#121c2a]">
                Zero-Plastic Honeycomb Packaging
              </span>
              <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
                Packed in expanding recycled paper honeycomb wrap, paper tape, and dissolvable corn
                starch peanuts.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] text-2xl">schedule</span>
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[14px] font-bold text-[#121c2a]">
                Handmade Dispatch Time
              </span>
              <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
                In-stock items ship within 24–48 hours. Custom glazed requests take 7–10 days.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Studio Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#27313f]/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-[#bccac0]/20 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <h3 className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#121c2a]">
                Contact Earth & Clay Studio
              </h3>
              <button
                onClick={() => setContactModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#3d4a42]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {contactSent ? (
              <div className="py-6 flex flex-col items-center gap-2 text-center text-[#006948]">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <span className="font-['Plus Jakarta Sans'] font-bold text-base">
                  Inquiry Dispatched!
                </span>
                <p className="font-['Inter'] text-xs text-[#3d4a42]">
                  Elena will reply to your registered account within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSent(true);
                  setTimeout(() => {
                    setContactSent(false);
                    setContactModalOpen(false);
                  }, 1800);
                }}
                className="flex flex-col gap-3"
              >
                <div>
                  <label className="font-['Inter'] text-xs font-bold text-[#121c2a] block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    defaultValue="Studio Commission / Batch Inquiry"
                    className="w-full p-3 bg-[#eff4ff] rounded-xl text-[13px] font-['Inter'] text-[#121c2a]"
                  />
                </div>

                <div>
                  <label className="font-['Inter'] text-xs font-bold text-[#121c2a] block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your request..."
                    className="w-full p-3 bg-[#eff4ff] rounded-xl text-[13px] font-['Inter'] text-[#121c2a]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#006948] text-white font-['Inter'] text-[14px] font-bold hover:bg-[#005137]"
                >
                  Send to Studio
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
