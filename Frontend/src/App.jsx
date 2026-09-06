import { useState, useEffect } from 'react';
import { HERO_PRODUCT, ALL_PRODUCTS } from './data';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { StorefrontView } from './components/StorefrontView';
import { ExploreView } from './components/ExploreView';
import { ProductDetailsView } from './components/ProductDetailsView';
import { VendorHubView } from './components/VendorHubView';
import { CartView } from './components/CartView';
import { AccountView } from './components/AccountView';
import { apiService } from './services/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('storefront');
  const [selectedProduct, setSelectedProduct] = useState(HERO_PRODUCT);
  const [cart, setCart] = useState([
    {
      id: 'cart-1',
      product: HERO_PRODUCT,
      quantity: 1,
      selectedFinish: 'Sage Green',
      selectedCapacity: '500ml (2 Cups)',
    },
  ]);
  const [wishlist, setWishlist] = useState([
    'ceramic-pour-over-set',
    'matte-sage-mug',
  ]);
  const [followedVendors, setFollowedVendors] = useState(['earth-and-clay']);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync products or cart from Backend API if connected
  useEffect(() => {
    async function loadBackendData() {
      try {
        const productsData = await apiService.getProducts();
        if (productsData && productsData.products && productsData.products.length > 0) {
          console.log('Backend connected! Found', productsData.products.length, 'products');
        }
      } catch (err) {
        // Fallback to local mock data silently
      }
    }
    loadBackendData();
  }, []);

  // Scroll to top when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-details');
  };

  const handleAddToCart = (
    product,
    quantity = 1,
    finish,
    capacity,
    unitPrice
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedFinish === finish &&
        item.selectedCapacity === capacity
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product: {
          ...product,
          price: unitPrice !== undefined ? unitPrice : product.price,
        },
        quantity,
        selectedFinish: finish || product.finishOptions?.[0]?.name,
        selectedCapacity: capacity || product.capacityOptions?.[0]?.name,
      };
      setCart([newItem, ...cart]);
    }
    showToast(`Added ${quantity}x ${product.name} to cart`);
  };

  const handleUpdateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast('Removed from Wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to your Wishlist');
    }
  };

  const handleToggleFollowVendor = (vendorId) => {
    if (followedVendors.includes(vendorId)) {
      setFollowedVendors(followedVendors.filter((id) => id !== vendorId));
      showToast('Unfollowed Studio');
    } else {
      setFollowedVendors([...followedVendors, vendorId]);
      showToast('Following Studio for batch drops');
    }
  };

  const handleSelectCategory = (category) => {
    setActiveCategoryFilter(category);
    setCurrentScreen('explore-listings');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    } else {
      showToast('Product link ready to share');
    }
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcf9f5] text-[#121c2a] flex flex-col font-['Inter'] antialiased selection:bg-[#a6f2cf] selection:text-[#002115]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onBack={() => handleNavigate('explore-listings')}
        onShare={handleShare}
      />

      {/* Screen Quick-Switcher Bar for Instant Testing Across All Screens */}
      <div className="fixed top-[6.25rem] right-3 z-40 hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-md border border-[#bccac0]/30 text-xs font-['Inter']">
        <span className="font-semibold text-[#006948] px-1">Screens:</span>
        <button
          onClick={() => handleNavigate('storefront')}
          className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'storefront' ? 'bg-[#006948] text-white' : 'hover:bg-[#eff4ff]'
          }`}
        >
          1. Storefront
        </button>
        <button
          onClick={() => handleNavigate('explore-listings')}
          className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'explore-listings' ? 'bg-[#006948] text-white' : 'hover:bg-[#eff4ff]'
          }`}
        >
          2. Explore
        </button>
        <button
          onClick={() => {
            setSelectedProduct(HERO_PRODUCT);
            handleNavigate('product-details');
          }}
          className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'product-details' ? 'bg-[#006948] text-white' : 'hover:bg-[#eff4ff]'
          }`}
        >
          3. Product Details
        </button>
        <button
          onClick={() => handleNavigate('vendor-hub')}
          className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'vendor-hub' ? 'bg-[#006948] text-white' : 'hover:bg-[#eff4ff]'
          }`}
        >
          4. Vendor Hub
        </button>
      </div>

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full ${
          currentScreen === 'product-details' ? 'pt-16' : 'pt-28'
        }`}
      >
        {currentScreen === 'storefront' && (
          <StorefrontView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            followedVendors={followedVendors}
            onToggleFollowVendor={handleToggleFollowVendor}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentScreen === 'explore-listings' && (
          <ExploreView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            activeCategoryFilter={activeCategoryFilter}
          />
        )}

        {currentScreen === 'product-details' && (
          <ProductDetailsView
            product={selectedProduct}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentScreen === 'vendor-hub' && (
          <VendorHubView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            followedVendors={followedVendors}
            onToggleFollowVendor={handleToggleFollowVendor}
          />
        )}

        {currentScreen === 'shopping-cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
          />
        )}

        {currentScreen === 'customer-account' && (
          <AccountView
            onNavigate={handleNavigate}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            followedVendors={followedVendors}
            onToggleFollowVendor={handleToggleFollowVendor}
          />
        )}
      </main>

      {/* Mobile Dock */}
      <div className="md:hidden fixed top-24 right-3 z-40">
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-full shadow-md border border-[#bccac0]/30 flex items-center gap-1">
          <button
            onClick={() => handleNavigate('storefront')}
            title="Home Storefront"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              currentScreen === 'storefront' ? 'bg-[#006948] text-white' : 'text-[#3d4a42]'
            }`}
          >
            1
          </button>
          <button
            onClick={() => handleNavigate('explore-listings')}
            title="Explore Listings"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              currentScreen === 'explore-listings' ? 'bg-[#006948] text-white' : 'text-[#3d4a42]'
            }`}
          >
            2
          </button>
          <button
            onClick={() => {
              setSelectedProduct(HERO_PRODUCT);
              handleNavigate('product-details');
            }}
            title="Product Details"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              currentScreen === 'product-details' ? 'bg-[#006948] text-white' : 'text-[#3d4a42]'
            }`}
          >
            3
          </button>
          <button
            onClick={() => handleNavigate('vendor-hub')}
            title="Vendor Hub"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              currentScreen === 'vendor-hub' ? 'bg-[#006948] text-white' : 'text-[#3d4a42]'
            }`}
          >
            4
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={cartTotalCount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#121c2a] text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-[13px] font-['Inter'] animate-fade-in border border-white/10">
          <span className="material-symbols-outlined text-base text-[#85f8c4]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
