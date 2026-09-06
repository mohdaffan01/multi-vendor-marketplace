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
import { AuthView } from './components/AuthView';
import { apiService } from './services/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(HERO_PRODUCT);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [followedVendors, setFollowedVendors] = useState(['earth-and-clay']);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  // Sync products, categories, and vendors from MongoDB Backend API
  useEffect(() => {
    async function loadBackendData() {
      try {
        const [productsData, categoriesData, vendorsData] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories(),
          apiService.getVendors(),
        ]);

        if (productsData && productsData.products && productsData.products.length > 0) {
          const formattedProducts = productsData.products.map((p) => ({
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            rating: p.ratings || 4.9,
            reviewCount: p.numReviews || 12,
            category: p.category?.name || 'Handmade Ceramics',
            maker: p.vendor?.storeName || p.sellerUser?.name || 'Earth & Clay Studio',
            makerVerified: true,
            inStock: (p.stock || 0) > 0,
            image: p.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB75pvqsIQz67iL1jCeDpgNEzx5cjxV2DuwD62PXJGmlRRtCfz1RH6ZPRcat8KNc6Nx48S6JPw6saBUr8YRmnkfJlnlY_lFIukpZhAz0GngN1NyiaPgGOLq4t2jGzyEDYha0RzCbRYU6zUxYsZhkKUuwUvI4hY7moJL7aEpmOMXUHz1DpR8O1KzfAlIecHA3tbcq-zn3YPzs_2W8DHbg-r-AYcUxZ8QwyCpM2GJNqirzdZ_E5LvbGRS',
            images: p.images && p.images.length > 0 ? p.images : [p.images?.[0]],
          }));
          setProducts(formattedProducts);
          setSelectedProduct(formattedProducts[0]);
        }

        if (categoriesData && categoriesData.categories && categoriesData.categories.length > 0) {
          const formattedCategories = categoriesData.categories.map((c) => ({
            id: c._id,
            title: c.name,
            subtitle: c.description || 'Artisanal Collection',
            image: c.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyURz0T_bro2kn6iN8AquSb8Bns3qqOgkjjyk82O0wEfZz65uD9ZC5GcdWaxPTZ93wwmzxG1Ajj3wwAj4kQT4yFKERv6oDXsS1K7RDrhsrO6L8BhmFFMtXiRx5Ib0lcWzFEndebAdrakzQMw7RvKr8Pi8U0EOTAZMMIk9_zelMJNie_Oadh4RDZyHRJAMc-LXJJ5tU7vUDzrC1yvYCNPcfBqFhFKwdTL-U6MGhxZtG_JNtk8v-GPRk',
            makers: 'Verified Makers',
          }));
          setCategories(formattedCategories);
        }

        if (vendorsData && vendorsData.vendors) {
          setVendors(vendorsData.vendors);
        }
      } catch (err) {
        console.warn('Backend API connection fallback to local:', err);
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

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name || 'Artisan'}!`);
    setCurrentScreen('storefront');
  };

  const handleGuestAccess = () => {
    showToast('Browsing as Guest');
    setCurrentScreen('storefront');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    apiService.logout().catch(() => {});
    showToast('Signed out successfully');
    setCurrentScreen('auth');
  };

  const handleProductCreated = async () => {
    try {
      const productsData = await apiService.getProducts();
      if (productsData && productsData.products && productsData.products.length > 0) {
        const formattedProducts = productsData.products.map((p) => ({
          id: p._id,
          name: p.name,
          description: p.description,
          price: p.price,
          rating: p.ratings || 4.9,
          reviewCount: p.numReviews || 12,
          category: p.category?.name || 'Handmade Ceramics',
          maker: p.vendor?.storeName || p.sellerUser?.name || 'Earth & Clay Studio',
          makerVerified: true,
          inStock: (p.stock || 0) > 0,
          image: p.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB75pvqsIQz67iL1jCeDpgNEzx5cjxV2DuwD62PXJGmlRRtCfz1RH6ZPRcat8KNc6Nx48S6JPw6saBUr8YRmnkfJlnlY_lFIukpZhAz0GngN1NyiaPgGOLq4t2jGzyEDYha0RzCbRYU6zUxYsZhkKUuwUvI4hY7moJL7aEpmOMXUHz1DpR8O1KzfAlIecHA3tbcq-zn3YPzs_2W8DHbg-r-AYcUxZ8QwyCpM2GJNqirzdZ_E5LvbGRS',
          images: p.images && p.images.length > 0 ? p.images : [p.images?.[0]],
        }));
        setProducts(formattedProducts);
        showToast('Live catalog refreshed from MongoDB!');
      }
    } catch (err) {
      console.warn('Failed to refresh products:', err);
    }
  };

  const handleNavigate = (screen) => {
    if (screen === 'shopping-cart' && !currentUser) {
      showToast('Please sign in to view your shopping cart');
      setCurrentScreen('auth');
      return;
    }
    if (screen === 'customer-account' && !currentUser) {
      showToast('Please sign in to view your account');
      setCurrentScreen('auth');
      return;
    }
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
    if (!currentUser) {
      showToast('Please sign in to add items to your cart');
      setCurrentScreen('auth');
      return;
    }

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
    if (!currentUser) {
      showToast('Please sign in to save items to your wishlist');
      setCurrentScreen('auth');
      return;
    }

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
      <div className="fixed top-[7.25rem] right-4 z-40 hidden md:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#bccac0]/40 text-xs font-['Inter'] transition-all">
        <span className="font-semibold text-[#006948] px-1">Screens:</span>
        <button
          onClick={() => handleNavigate('auth')}
          className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'auth' ? 'bg-[#006948] text-white' : 'hover:bg-[#eff4ff]'
          }`}
        >
          0. Login/Signup
        </button>
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
        {currentScreen === 'auth' && (
          <AuthView
            onLoginSuccess={handleLoginSuccess}
            onGuestAccess={handleGuestAccess}
          />
        )}

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
            products={products}
            categories={categories}
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
            products={products}
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
            currentUser={currentUser}
            onLogout={handleLogout}
            onProductCreated={handleProductCreated}
          />
        )}
      </main>

      {/* Mobile Dock */}
      <div className="md:hidden fixed top-[7.25rem] right-3 z-40">
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-full shadow-md border border-[#bccac0]/30 flex items-center gap-1">
          <button
            onClick={() => handleNavigate('auth')}
            title="Login / Signup"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              currentScreen === 'auth' ? 'bg-[#006948] text-white' : 'text-[#3d4a42]'
            }`}
          >
            0
          </button>
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
