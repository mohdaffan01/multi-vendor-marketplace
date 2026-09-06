import React, { useState } from 'react';
import { ALL_PRODUCTS } from '../data';

export const ExploreView = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('Glazed Stoneware');
  const [activeFilters, setActiveFilters] = useState([
    'Glazed Stoneware',
    'Under $50',
    'Rating 4★+',
  ]);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [ecoCertifiedOnly, setEcoCertifiedOnly] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedVendors, setSelectedVendors] = useState([
    'Earth & Clay',
    'Nordic Wood',
  ]);
  const [selectedFinish, setSelectedFinish] = useState('Glazed Stoneware');
  const [selectedMinRating, setSelectedMinRating] = useState('4★ +');

  const exploreProductIds = [
    'matte-sage-mug',
    'speckled-dinner-plate',
    'matcha-whisk-bowl',
    'olive-wood-spoon-set',
    'organic-glaze-vase',
    'terracotta-planter',
  ];

  let displayProducts = ALL_PRODUCTS.filter((p) => exploreProductIds.includes(p.id));

  if (sortBy === 'Price: Low to High') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'Top Rated') {
    displayProducts.sort((a, b) => b.rating - a.rating);
  }

  const removeFilter = (filterName) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterName));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const toggleVendorCheckbox = (vendor) => {
    if (selectedVendors.includes(vendor)) {
      setSelectedVendors(selectedVendors.filter((v) => v !== vendor));
    } else {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };

  const handleApplyFilters = () => {
    const newFilters = [];
    if (selectedFinish) newFilters.push(selectedFinish);
    if (selectedMinRating) newFilters.push(`Rating ${selectedMinRating}`);
    if (selectedVendors.length > 0) newFilters.push(`${selectedVendors.length} Vendors`);
    setActiveFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedVendors([]);
    setSelectedFinish('');
    setSelectedMinRating('');
    setActiveFilters([]);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pb-28">
      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-[13px] font-['Inter'] text-[#3d4a42] overflow-x-auto whitespace-nowrap py-2 no-scrollbar"
      >
        <button
          onClick={() => onNavigate('storefront')}
          className="hover:text-[#006948] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          <span>Home</span>
        </button>
        <span className="material-symbols-outlined text-xs text-[#bccac0]">chevron_right</span>
        <button
          onClick={() => onNavigate('explore-listings')}
          className="hover:text-[#006948] transition-colors cursor-pointer"
        >
          Home & Living
        </button>
        <span className="material-symbols-outlined text-xs text-[#bccac0]">chevron_right</span>
        <span className="text-[#121c2a] font-['Plus Jakarta Sans'] font-semibold">
          Handcrafted Ceramics
        </span>
      </nav>

      {/* Category Title & Header */}
      <header className="flex flex-col mt-1 mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-[#a6f2cf] text-[#247155] px-2.5 py-0.5 rounded-full font-['Inter'] text-[11px] font-bold uppercase flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">verified</span>
            Curated Market
          </span>
          <span className="text-[#3d4a42] text-[13px] font-medium font-['Inter']">
            28 Verified Vendors
          </span>
        </div>
        <h1 className="font-['Plus Jakarta Sans'] text-[28px] md:text-[34px] text-[#121c2a] tracking-tight font-bold">
          Handcrafted Ceramics & Tableware
        </h1>
        <p className="font-['Inter'] text-[14px] text-[#3d4a42] mt-1">
          Showing <span className="text-[#121c2a] font-semibold">324 sustainably crafted pieces</span>{' '}
          from local workshops & independent potters.
        </p>
      </header>

      {/* Main Desktop 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Desktop Sidebar Filter */}
        <aside className="hidden md:flex flex-col gap-5 bg-white p-5 rounded-2xl border border-[#bccac0]/20 shadow-xs md:col-span-1 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
            <span className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#121c2a]">
              Filter Catalog
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[#006948] font-['Inter'] text-[12px] font-semibold hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2">
            <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold text-[#121c2a]">
              Price Range
            </span>
            <div className="flex items-center justify-between text-[12px] font-['Inter'] text-[#3d4a42] mb-1">
              <span>$0</span>
              <span className="font-bold text-[#006948]">$15 - $50</span>
              <span>$200+</span>
            </div>
            <div className="w-full h-2 bg-[#eff4ff] rounded-full relative">
              <div className="absolute left-[15%] right-[40%] h-full bg-[#006948] rounded-full"></div>
              <div className="absolute left-[15%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#006948] rounded-full shadow-md"></div>
              <div className="absolute right-[40%] top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-[#006948] rounded-full shadow-md"></div>
            </div>
          </div>

          {/* Vendors */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#eff4ff]">
            <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold text-[#121c2a]">
              Verified Vendors
            </span>
            <div className="flex flex-col gap-2">
              {['Earth & Clay', 'Nordic Wood', 'Zen Artisan', 'Flora Studio'].map((vendor) => (
                <label
                  key={vendor}
                  className="flex items-center gap-2 text-[#121c2a] cursor-pointer text-[13px] font-['Inter'] hover:text-[#006948]"
                >
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(vendor)}
                    onChange={() => toggleVendorCheckbox(vendor)}
                    className="accent-[#006948] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="truncate">{vendor}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ceramic Finish */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#eff4ff]">
            <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold text-[#121c2a]">
              Ceramic Finish
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Glazed Stoneware', 'Matte Raw', 'Terracotta', 'Porcelain'].map((finish) => {
                const isSelected = selectedFinish === finish;
                return (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(isSelected ? '' : finish)}
                    className={`px-3 py-1 rounded-full text-[12px] font-['Inter'] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#006948] text-white'
                        : 'bg-[#eff4ff] text-[#121c2a] hover:bg-[#d9e3f6]'
                    }`}
                  >
                    {finish}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#eff4ff]">
            <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold text-[#121c2a]">
              Minimum Rating
            </span>
            <div className="flex items-center gap-2">
              {['4★ +', '4.5★ +', '5.0★'].map((rating) => {
                const isSelected = selectedMinRating === rating;
                return (
                  <button
                    key={rating}
                    onClick={() => setSelectedMinRating(isSelected ? '' : rating)}
                    className={`flex-1 py-1.5 rounded-lg font-['Inter'] text-[12px] font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#a6f2cf] text-[#247155] border border-[#00855d]/30'
                        : 'bg-[#eff4ff] text-[#121c2a] hover:bg-[#d9e3f6]'
                    }`}
                  >
                    <span>{rating}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full py-2.5 rounded-xl bg-[#006948] text-white font-['Inter'] text-[13px] font-semibold hover:bg-[#005137] transition-colors shadow-sm cursor-pointer mt-2"
          >
            Apply Filters
          </button>
        </aside>

        {/* Right Main Catalog Content */}
        <div className="md:col-span-3 flex flex-col gap-4">
          {/* Active Query & Search Form Bar */}
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center w-full bg-white rounded-xl shadow-xs border border-[#bccac0]/20">
              <span className="material-symbols-outlined absolute left-3 text-[#006948] text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search within tableware..."
                className="w-full pl-10 pr-10 py-3 bg-transparent font-['Inter'] text-[14px] text-[#121c2a] placeholder:text-[#bccac0] focus:outline-none"
              />
              {searchQuery && (
                <button
                  aria-label="Clear search input"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-full bg-[#eff4ff] text-[#3d4a42] hover:text-[#121c2a] text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            {/* Active Filter Dismissible Pills */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                {activeFilters.map((filter, index) => {
                  const isPrimary = index === 0;
                  return (
                    <div
                      key={filter}
                      className={`flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full font-['Inter'] text-[12px] shrink-0 shadow-xs ${
                        isPrimary
                          ? 'bg-[#006948] text-white'
                          : 'bg-[#a6f2cf] text-[#247155]'
                      }`}
                    >
                      <span>{filter}</span>
                      <button
                        aria-label={`Remove ${filter}`}
                        onClick={() => removeFilter(filter)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={clearAllFilters}
                  className="text-[#006948] font-['Inter'] text-[12px] font-semibold px-2 py-1 hover:underline shrink-0 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-3 bg-[#eff4ff] p-2.5 rounded-xl border border-[#bccac0]/20">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="md:hidden flex items-center gap-1.5 bg-white text-[#121c2a] px-3 py-2 rounded-lg shadow-xs border border-[#bccac0]/20 font-['Inter'] text-[13px] font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#006948] text-lg">tune</span>
              <span>Filters ({activeFilters.length})</span>
            </button>

            <span className="hidden md:inline-block font-['Inter'] text-[13px] text-[#3d4a42]">
              Showing <strong className="text-[#121c2a]">{displayProducts.length}</strong> items
            </span>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-white rounded-lg px-3 py-1.5 shadow-xs border border-[#bccac0]/20 ml-auto">
              <span className="material-symbols-outlined text-[#3d4a42] text-base mr-1.5">sort</span>
              <span className="text-[#3d4a42] font-['Inter'] text-[12px] mr-1.5">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-['Plus Jakarta Sans'] text-[13px] font-semibold text-[#006948] focus:outline-none appearance-none pr-5 cursor-pointer"
              >
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <span className="material-symbols-outlined absolute right-1.5 pointer-events-none text-[#3d4a42] text-sm">
                expand_more
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayProducts.map((product) => {
              const isFav = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs border border-[#bccac0]/20 hover:shadow-md transition-all group relative justify-between"
                >
                  <div>
                    <div
                      className="relative aspect-square w-full bg-[#eff4ff] overflow-hidden cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <div
                          className={`absolute top-2.5 left-2.5 font-['Inter'] text-[10px] uppercase px-2 py-0.5 rounded-md font-bold shadow-xs ${
                            product.badge === '-20%'
                              ? 'bg-[#ba1a1a] text-white'
                              : product.badge === 'Best Rated'
                              ? 'bg-[#1b6b4f] text-white'
                              : 'bg-[#006948] text-white'
                          }`}
                        >
                          {product.badge}
                        </div>
                      )}

                      <button
                        aria-label="Save to Wishlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#3d4a42] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                      >
                        <span
                          className={`material-symbols-outlined text-lg ${
                            isFav ? 'text-[#ba1a1a]' : ''
                          }`}
                          style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          favorite
                        </span>
                      </button>

                      {product.inStock && (
                        <span className="absolute bottom-2.5 left-2.5 bg-[#a6f2cf]/95 text-[#247155] font-['Inter'] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
                          <span className="material-symbols-outlined text-[10px]">inventory_2</span>
                          <span>In Stock</span>
                        </span>
                      )}
                    </div>

                    <div className="p-3 flex flex-col justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-1 text-[#3d4a42] text-[12px] font-['Inter']">
                          <span className="truncate">{product.maker}</span>
                          <span
                            className="material-symbols-outlined text-[14px] text-[#006948]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                        </div>

                        <h2
                          onClick={() => onSelectProduct(product)}
                          className="font-['Plus Jakarta Sans'] text-[15px] text-[#121c2a] font-semibold line-clamp-2 mt-0.5 cursor-pointer hover:text-[#006948]"
                        >
                          {product.name}
                        </h2>

                        <div className="flex items-center gap-1 mt-1">
                          <span
                            className="material-symbols-outlined text-amber-500 text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="font-['Inter'] text-[12px] font-bold text-[#121c2a]">
                            {product.rating}
                          </span>
                          <span className="text-[#3d4a42] font-['Inter'] text-[11px]">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 pt-0 flex flex-col gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-['Plus Jakarta Sans'] text-[17px] text-[#006948] font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="font-['Inter'] text-[12px] line-through text-[#bccac0]">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-[#006948] hover:bg-[#005137] text-white py-2 rounded-xl font-['Inter'] text-[12px] font-semibold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">shopping_bag</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-xs border border-[#bccac0]/20 mt-2">
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#eff4ff] text-[#3d4a42] hover:bg-[#d9e3f6] font-['Inter'] text-[12px] font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg font-['Inter'] text-[12px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#006948] text-white shadow-xs'
                        : 'bg-[#eff4ff] text-[#121c2a] hover:bg-[#d9e3f6]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                disabled={currentPage === 3}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#006948] text-white hover:bg-[#005137] font-['Inter'] text-[12px] font-medium transition-colors cursor-pointer"
              >
                <span>Next</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bottom Sheet Modal (Mobile) */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#27313f]/40 backdrop-blur-xs flex flex-col justify-end md:hidden"
          onClick={() => setIsFilterModalOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-6 shadow-xl max-h-[85vh] flex flex-col border-t border-[#bccac0]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <span className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#121c2a]">
                Filter Products
              </span>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#3d4a42]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto py-3 pr-1 no-scrollbar">
              <div className="flex flex-col gap-2">
                <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold text-[#121c2a]">
                  Verified Vendors
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {['Earth & Clay', 'Nordic Wood', 'Zen Artisan', 'Flora Studio'].map((vendor) => (
                    <label
                      key={vendor}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[#eff4ff] text-[#121c2a] text-[13px] font-['Inter']"
                    >
                      <input
                        type="checkbox"
                        checked={selectedVendors.includes(vendor)}
                        onChange={() => toggleVendorCheckbox(vendor)}
                        className="accent-[#006948] w-4 h-4 rounded"
                      />
                      <span>{vendor}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-[#eff4ff]">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-xl bg-[#eff4ff] text-[#121c2a] font-['Inter'] text-[14px] font-semibold"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-[2] py-3 rounded-xl bg-[#006948] text-white font-['Inter'] text-[14px] font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
