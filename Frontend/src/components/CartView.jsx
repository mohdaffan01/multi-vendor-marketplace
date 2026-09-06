import React, { useState } from 'react';

export const CartView = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const tax = subtotal * 0.08;
  const delivery = subtotal > 50 ? 0 : 4.5;
  const total = subtotal - discountAmount + tax + (cart.length > 0 ? delivery : 0);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === 'verdant10' || promoCode.trim().toLowerCase() === 'eco') {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
  };

  if (checkoutComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center max-w-md mx-auto pb-28">
        <div className="w-16 h-16 rounded-full bg-[#a6f2cf] text-[#247155] flex items-center justify-center mb-4 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-3xl">task_alt</span>
        </div>
        <span className="bg-[#eff4ff] text-[#006948] font-['Inter'] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Order #VM-89241 Confirmed
        </span>
        <h2 className="font-['Plus Jakarta Sans'] text-[24px] font-bold text-[#121c2a] mb-2">
          Thank you for supporting sustainable artisans!
        </h2>
        <p className="font-['Inter'] text-[13px] text-[#3d4a42] mb-6">
          Your order will be hand-packed in 100% biodegradable honeycomb wrap and shipped with carbon
          offset transit.
        </p>

        <div className="w-full bg-white p-4 rounded-2xl shadow-xs border border-[#bccac0]/20 mb-6 flex flex-col gap-2 text-left">
          <div className="flex items-center justify-between text-xs font-['Inter'] text-[#3d4a42]">
            <span>Carbon Saved:</span>
            <span className="font-bold text-[#006948]">2.4 kg CO₂ offset</span>
          </div>
          <div className="flex items-center justify-between text-xs font-['Inter'] text-[#3d4a42]">
            <span>Trees Planted:</span>
            <span className="font-bold text-[#006948]">1 Tree planted via Eden Projects</span>
          </div>
          <div className="flex items-center justify-between text-xs font-['Inter'] text-[#3d4a42]">
            <span>Estimated Arrival:</span>
            <span className="font-bold text-[#121c2a]">Oct 24 – Oct 28</span>
          </div>
        </div>

        <button
          onClick={() => {
            onClearCart();
            setCheckoutComplete(false);
            onNavigate('storefront');
          }}
          className="w-full py-3 rounded-xl bg-[#006948] text-white font-['Inter'] text-[14px] font-bold hover:bg-[#005137] transition-all cursor-pointer shadow-sm"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pb-28 pt-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-['Plus Jakarta Sans'] text-[24px] md:text-[30px] font-bold text-[#121c2a]">
          Your Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </h1>
        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-[13px] font-['Inter'] text-[#ba1a1a] hover:underline cursor-pointer font-semibold"
          >
            Clear cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl p-8 shadow-xs border border-[#bccac0]/20">
          <div className="w-20 h-20 rounded-full bg-[#eff4ff] text-[#3d4a42] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl">shopping_cart</span>
          </div>
          <h2 className="font-['Plus Jakarta Sans'] text-[22px] font-bold text-[#121c2a] mb-2">
            Your cart is empty
          </h2>
          <p className="font-['Inter'] text-[14px] text-[#3d4a42] max-w-sm mb-6">
            Discover thousands of handcrafted, zero-waste pieces from independent makers.
          </p>
          <button
            onClick={() => onNavigate('explore-listings')}
            className="px-6 py-3 rounded-xl bg-[#006948] text-white font-['Inter'] text-[14px] font-bold hover:bg-[#005137] transition-all cursor-pointer shadow-xs"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Progress & Items */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Free Delivery Threshold Bar */}
            <div className="bg-[#a6f2cf] text-[#247155] p-4 rounded-2xl shadow-xs flex flex-col gap-2">
              <div className="flex items-center justify-between font-['Inter'] text-[13px]">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">eco</span>
                  {subtotal >= 50
                    ? 'You unlocked FREE Carbon-Neutral Delivery!'
                    : `Add $${(50 - subtotal).toFixed(2)} more for free eco-delivery`}
                </span>
                <span className="font-semibold text-xs">{subtotal >= 50 ? '100%' : `${Math.min(100, Math.round((subtotal / 50) * 100))}%`}</span>
              </div>
              <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006948] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Item Cards */}
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl shadow-xs border border-[#bccac0]/20 flex gap-4 items-center justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#eff4ff] shrink-0 border border-[#bccac0]/20">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-['Inter'] text-[11px] text-[#006948] font-bold uppercase truncate">
                        {item.product.maker}
                      </span>
                      <h3 className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#121c2a] truncate">
                        {item.product.name}
                      </h3>
                      {(item.selectedFinish || item.selectedCapacity) && (
                        <span className="font-['Inter'] text-[12px] text-[#3d4a42] truncate">
                          {item.selectedFinish} {item.selectedCapacity ? `• ${item.selectedCapacity}` : ''}
                        </span>
                      )}
                      <span className="font-['Plus Jakarta Sans'] text-[16px] font-bold text-[#121c2a] mt-1">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <button
                      aria-label="Remove item"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#6d7a72] hover:text-[#ba1a1a] transition-colors p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>

                    <div className="flex items-center bg-[#eff4ff] rounded-xl p-1 border border-[#bccac0]/20">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#121c2a] hover:bg-white rounded-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-['Inter'] text-[13px] font-bold text-[#121c2a]">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#121c2a] hover:bg-white rounded-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form
              onSubmit={applyPromo}
              className="flex items-center gap-2 bg-white p-2.5 rounded-2xl shadow-xs border border-[#bccac0]/20"
            >
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code (try 'VERDANT10')"
                className="flex-1 px-3 py-2 font-['Inter'] text-[14px] text-[#121c2a] placeholder:text-[#6d7a72] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#006948] hover:bg-[#a6f2cf] font-['Inter'] text-[13px] font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {discountApplied && (
              <div className="flex items-center gap-2 text-[#006948] font-['Inter'] text-[13px] font-semibold px-2">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>10% Earth Month Community Discount Applied!</span>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (Sticky Desktop Sidebar) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#bccac0]/20 flex flex-col gap-4">
              <h4 className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#121c2a]">
                Order Summary
              </h4>

              <div className="flex justify-between text-[14px] font-['Inter'] text-[#3d4a42]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#121c2a]">${subtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-[14px] font-['Inter'] text-[#006948]">
                  <span>Artisan Coupon (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[14px] font-['Inter'] text-[#3d4a42]">
                <span className="flex items-center gap-1.5">
                  <span>Eco Delivery</span>
                  {delivery === 0 && (
                    <span className="bg-[#a6f2cf] text-[#247155] text-[11px] px-2 py-0.5 rounded font-bold">
                      FREE
                    </span>
                  )}
                </span>
                <span className="font-semibold text-[#121c2a]">
                  {delivery === 0 ? '$0.00' : `$${delivery.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-[14px] font-['Inter'] text-[#3d4a42]">
                <span className="flex items-center gap-1.5">
                  <span>Carbon Offset Fee</span>
                  <span className="bg-[#a6f2cf] text-[#247155] text-[11px] px-2 py-0.5 rounded font-bold">
                    Covered
                  </span>
                </span>
                <span className="font-semibold text-[#006948]">$0.00</span>
              </div>

              <div className="flex justify-between text-[14px] font-['Inter'] text-[#3d4a42]">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-semibold text-[#121c2a]">${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-[#eff4ff] pt-4 flex justify-between items-baseline">
                <span className="font-['Plus Jakarta Sans'] text-[18px] font-bold text-[#121c2a]">
                  Total Amount
                </span>
                <span className="font-['Plus Jakarta Sans'] text-[24px] font-bold text-[#006948]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 mt-2 rounded-xl bg-[#006948] text-white font-['Inter'] text-[15px] font-bold hover:bg-[#005137] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">lock</span>
                <span>Secure Checkout • ${total.toFixed(2)}</span>
              </button>

              <p className="font-['Inter'] text-[12px] text-[#6d7a72] text-center mt-1">
                Guaranteed by VerdantMart Buyer Protection & 30-Day Fair Returns
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
