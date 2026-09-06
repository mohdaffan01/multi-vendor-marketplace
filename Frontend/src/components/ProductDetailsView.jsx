import React, { useState } from 'react';
import { HERO_PRODUCT, PRODUCT_REVIEWS, ALL_PRODUCTS } from '../data';

export const ProductDetailsView = ({
  product = HERO_PRODUCT,
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishOptions?.[0]?.name || 'Sage Green'
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    product.capacityOptions?.[0]?.name || '500ml (2 Cups)'
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const isFavorite = wishlist.includes(product.id);

  // Price calculations
  const capacityOption = product.capacityOptions?.find((c) => c.name === selectedCapacity);
  const priceDelta = capacityOption?.priceDelta || 0;
  const currentUnitPrice = product.price + priceDelta;
  const originalUnitPrice = (product.originalPrice || product.price * 1.25) + priceDelta;
  const totalPrice = currentUnitPrice * quantity;

  const relatedProducts = ALL_PRODUCTS.filter((p) =>
    ['everyday-ceramic-mug', 'airtight-bean-vault', 'washed-linen-towels'].includes(p.id)
  );

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedFinish, selectedCapacity, currentUnitPrice);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 1800);
  };

  const handleInstantCheckout = () => {
    onAddToCart(product, quantity, selectedFinish, selectedCapacity, currentUnitPrice);
    onNavigate('shopping-cart');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setIsMessageOpen(false);
      setMessageText('');
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pb-28">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="pt-3 pb-4">
        <ol className="flex items-center gap-1.5 overflow-x-auto text-[#3d4a42] font-['Inter'] text-[13px] no-scrollbar py-1">
          <li className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('storefront')}
              className="hover:text-[#006948] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#6d7a72]">
              chevron_right
            </span>
          </li>
          <li className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('explore-listings')}
              className="hover:text-[#006948] transition-colors cursor-pointer"
            >
              Kitchen
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#6d7a72]">
              chevron_right
            </span>
          </li>
          <li className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('explore-listings')}
              className="hover:text-[#006948] transition-colors cursor-pointer"
            >
              Coffee & Tea
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#6d7a72]">
              chevron_right
            </span>
          </li>
          <li className="text-[#121c2a] font-semibold truncate shrink-0">Pour-Over Sets</li>
        </ol>
      </nav>

      {/* Main Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery, Specifications, Reviews */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Gallery */}
          <section className="flex flex-col gap-3">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#eff4ff] shadow-sm group border border-[#bccac0]/20">
              <img
                id="main-product-img"
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm text-[#1b6b4f]">
                <span className="material-symbols-outlined text-[18px]">eco</span>
                <span className="font-['Inter'] text-[11px] tracking-wider text-[#1b6b4f] uppercase font-bold">
                  Eco-Friendly Clay
                </span>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  aria-label="Favorite item"
                  onClick={() => onToggleWishlist(product.id)}
                  className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#3d4a42] shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isFavorite ? 'text-[#ba1a1a]' : ''
                    }`}
                    style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    favorite
                  </span>
                </button>

                <button
                  aria-label="Zoom image"
                  onClick={() => setActiveImageIndex((activeImageIndex + 1) % images.length)}
                  className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#121c2a] shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-xs">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`rounded-full transition-all ${
                      activeImageIndex === idx ? 'w-3 h-1.5 bg-[#006948]' : 'w-1.5 h-1.5 bg-[#bccac0]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-[#eff4ff] shadow-xs p-0.5 relative group active:scale-95 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'ring-2 ring-[#006948] opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Specifications Accordion */}
          <section className="flex flex-col gap-3 pt-2">
            <h3 className="font-['Plus Jakarta Sans'] text-[20px] text-[#121c2a] font-bold">
              Artisan Specifications
            </h3>

            <div className="flex flex-col gap-2">
              <details className="group bg-white rounded-2xl shadow-xs border border-[#bccac0]/20 overflow-hidden" open>
                <summary className="p-4 flex items-center justify-between cursor-pointer font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-semibold select-none list-none">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-[20px]">
                      square_foot
                    </span>
                    <span>Dimensions & Capacity</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#6d7a72] group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-[14px] font-['Inter'] text-[#3d4a42] flex flex-col gap-2">
                  <div className="flex justify-between py-1.5 bg-[#eff4ff] px-3 rounded-lg">
                    <span>Dripper Diameter:</span>
                    <span className="font-semibold text-[#121c2a]">11.5 cm / 4.5 in</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-3">
                    <span>Carafe Height:</span>
                    <span className="font-semibold text-[#121c2a]">14.0 cm / 5.5 in</span>
                  </div>
                  <div className="flex justify-between py-1.5 bg-[#eff4ff] px-3 rounded-lg">
                    <span>Total Weight:</span>
                    <span className="font-semibold text-[#121c2a]">620g (unfilled)</span>
                  </div>
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-xs border border-[#bccac0]/20 overflow-hidden">
                <summary className="p-4 flex items-center justify-between cursor-pointer font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-semibold select-none list-none">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-[20px]">
                      palette
                    </span>
                    <span>Clay Type & Glaze</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#6d7a72] group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-[14px] font-['Inter'] text-[#3d4a42] flex flex-col gap-3">
                  <p>
                    Hand-thrown from local Willamette Valley stoneware clay, high-fired to cone 10 for
                    maximum thermal heat retention and chip resistance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#a6f2cf]/40 text-[#247155] px-3 py-1 rounded-md font-['Inter'] text-[12px] font-semibold">
                      100% Lead-Free
                    </span>
                    <span className="bg-[#a6f2cf]/40 text-[#247155] px-3 py-1 rounded-md font-['Inter'] text-[12px] font-semibold">
                      Food-Safe Glaze
                    </span>
                    <span className="bg-[#a6f2cf]/40 text-[#247155] px-3 py-1 rounded-md font-['Inter'] text-[12px] font-semibold">
                      Dishwasher Safe
                    </span>
                  </div>
                </div>
              </details>
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="flex flex-col gap-4 pt-2" id="reviews">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Plus Jakarta Sans'] text-[20px] text-[#121c2a] font-bold">
                  Customer Reviews
                </h3>
                <p className="text-[13px] font-['Inter'] text-[#3d4a42]">142 community ratings</p>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="text-[#006948] font-['Inter'] text-[14px] font-semibold hover:underline cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#bccac0]/20 flex items-center gap-6">
              <div className="flex flex-col items-center justify-center shrink-0 pr-4 border-r border-[#eff4ff]">
                <span className="font-['Plus Jakarta Sans'] text-[42px] text-[#121c2a] font-bold leading-none">
                  4.9
                </span>
                <div className="flex text-[#825100] my-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="font-['Inter'] text-[12px] text-[#3d4a42]">97% recommend</span>
              </div>

              <div className="flex-1 flex flex-col gap-2 font-['Inter'] text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 text-right">5</span>
                  <div className="flex-1 h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                    <div className="h-full bg-[#006948] rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="w-8 text-[#3d4a42] text-right">88%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 text-right">4</span>
                  <div className="flex-1 h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                    <div className="h-full bg-[#006948] rounded-full" style={{ width: '9%' }}></div>
                  </div>
                  <span className="w-8 text-[#3d4a42] text-right">9%</span>
                </div>
              </div>
            </div>

            {PRODUCT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-2xl bg-white shadow-xs border border-[#bccac0]/20 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.userAvatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#a6f2cf]"
                    />
                    <div>
                      <h4 className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold leading-tight">
                        {review.author}
                      </h4>
                      <div className="flex items-center gap-1 text-[#006948] font-['Inter'] text-[12px] font-bold">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        <span>Verified Buyer</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-['Inter'] text-[13px] text-[#3d4a42]">{review.date}</span>
                </div>

                <div className="flex text-[#825100]">
                  {[...Array(review.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                <p className="font-['Inter'] text-[14px] text-[#3d4a42] leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column: Title, Purchase Options, Maker Card (Sticky Desktop Sidebar) */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-28">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#bccac0]/20 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="bg-[#a6f2cf] text-[#247155] font-['Inter'] text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                Bestseller
              </span>
              <span className="text-[#3d4a42] font-['Inter'] text-[13px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#006948]">verified</span>
                Ethically Made
              </span>
            </div>

            <h1 className="font-['Plus Jakarta Sans'] text-[24px] md:text-[28px] text-[#121c2a] leading-tight font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-[14px] font-['Inter']">
              <div className="flex items-center gap-1 text-[#825100]">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-bold text-[#121c2a]">{product.rating}</span>
              </div>
              <span className="text-[#6d7a72]">•</span>
              <a href="#reviews" className="text-[#006948] font-medium hover:underline">
                {product.reviewCount} verified reviews
              </a>
            </div>

            {/* Pricing Box */}
            <div className="bg-[#eff4ff] p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-['Plus Jakarta Sans'] text-[32px] text-[#121c2a] font-bold tracking-tight">
                  ${currentUnitPrice.toFixed(2)}
                </span>
                <span className="text-[#6d7a72] line-through font-['Plus Jakarta Sans'] text-[18px]">
                  ${originalUnitPrice.toFixed(2)}
                </span>
                <span className="bg-[#ffdad6] text-[#93000a] font-['Inter'] text-[12px] px-2.5 py-0.5 rounded-md font-bold ml-auto">
                  -20% OFF
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[#006948] font-['Inter'] text-[13px] font-semibold">
                <span className="material-symbols-outlined text-[18px]">savings</span>
                <span>Save $17.00 today on direct maker batch pricing</span>
              </div>
            </div>

            {/* Variant Finish */}
            <div className="flex flex-col gap-2">
              <span className="font-['Plus Jakarta Sans'] text-[15px] font-bold text-[#121c2a]">
                Finish: <span className="text-[#006948] font-normal">{selectedFinish}</span>
              </span>

              <div className="grid grid-cols-4 gap-2">
                {product.finishOptions?.map((finish) => {
                  const isSelected = selectedFinish === finish.name;
                  return (
                    <button
                      key={finish.name}
                      onClick={() => setSelectedFinish(finish.name)}
                      className={`p-2 rounded-xl bg-white border flex flex-col items-center gap-1 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#006948] bg-[#a6f2cf]/30 ring-1 ring-[#006948]'
                          : 'border-[#bccac0]/20 hover:bg-[#eff4ff]'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: finish.colorHex }}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-white text-[14px]">
                            check
                          </span>
                        )}
                      </div>
                      <span className="font-['Inter'] text-[11px] truncate w-full">
                        {finish.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Capacity Variant */}
            <div className="flex flex-col gap-2">
              <span className="font-['Plus Jakarta Sans'] text-[15px] font-bold text-[#121c2a]">
                Capacity: <span className="text-[#006948] font-normal">{selectedCapacity}</span>
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {product.capacityOptions?.map((cap) => {
                  const isSelected = selectedCapacity === cap.name;
                  return (
                    <button
                      key={cap.name}
                      onClick={() => setSelectedCapacity(cap.name)}
                      className={`p-3 rounded-xl border flex flex-col items-start transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#006948] text-white border-[#006948]'
                          : 'bg-white text-[#121c2a] border-[#bccac0]/20 hover:bg-[#eff4ff]'
                      }`}
                    >
                      <span className="font-['Plus Jakarta Sans'] text-[14px] font-bold">
                        {cap.name}
                      </span>
                      <span className={`font-['Inter'] text-[11px] ${isSelected ? 'opacity-90' : 'text-[#3d4a42]'}`}>
                        {cap.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 p-3 bg-[#a6f2cf]/40 rounded-xl text-[#247155] border border-[#00855d]/20">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006948] animate-ping"></span>
              <span className="font-['Inter'] text-[13px] font-semibold">
                In Stock • Only {product.stockLeft || 7} left from this studio batch
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#eff4ff] rounded-xl border border-[#bccac0]/20 p-1">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[#121c2a] hover:bg-white transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#121c2a]">
                    {quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(Math.min(7, quantity + 1))}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[#121c2a] hover:bg-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-xl font-['Inter'] text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer ${
                    addedToast
                      ? 'bg-[#00855d] text-white'
                      : 'bg-[#a6f2cf] text-[#247155] hover:bg-[#85f8c4]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {addedToast ? 'check' : 'shopping_bag'}
                  </span>
                  <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>
              </div>

              <button
                onClick={handleInstantCheckout}
                className="w-full h-12 rounded-xl bg-[#006948] text-white font-['Inter'] text-[14px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#005137] active:scale-98 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Instant Checkout • ${totalPrice.toFixed(2)}</span>
              </button>
            </div>
          </div>

          {/* Maker Card */}
          <div className="bg-white p-5 rounded-3xl shadow-xs border border-[#bccac0]/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onNavigate('vendor-hub')}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvHFU89uPuVlBlpN5_iw79HLlBV0baidtDW3-b5hOSaP8zwlQYM_n87IP_-6cWjRYO1kGGqG1wGWkpEEy9abOJIGhgEuZYCCvMMKHXSFdSX6k5DDoiRRMEZCRgrqQ8olUdfiB9eCbs349l2wQsGiMdvRGG7SYccCb9oZCnNf_qt3RHfCOsMdkN_Gj1Cmaf3I--eumqQIn5aO-v0RP8BZGOIQqJgTSVGWkGjgCqWP3inpalssSR0cD7"
                  alt="Earth & Clay Studio"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <h3 className="font-['Plus Jakarta Sans'] text-[16px] text-[#121c2a] font-bold">
                      Earth & Clay Studio
                    </h3>
                    <span className="material-symbols-outlined text-[#006948] text-[16px]">
                      verified
                    </span>
                  </div>
                  <span className="font-['Inter'] text-[13px] text-[#3d4a42]">
                    Portland, OR
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('vendor-hub')}
                className="px-3.5 py-1.5 rounded-xl bg-[#eff4ff] text-[#006948] font-['Inter'] text-[12px] font-bold hover:bg-[#d9e3f6] cursor-pointer"
              >
                Visit Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
