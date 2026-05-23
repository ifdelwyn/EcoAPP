import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Heart, 
  ShoppingBag, 
  History, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  ChevronDown, 
  Bell, 
  Star,
  CheckCircle,
  X,
  Leaf
} from 'lucide-react';

import { ECO_PRODUCTS } from './data';
import { EcoProduct, CartItem } from './types';

// Importing Custom Views
import SplashView from './components/SplashView';
import EcoProductCard from './components/EcoProductCard';
import DetailView from './components/DetailView';
import CartView from './components/CartView';
import OrderTrackingView from './components/OrderTrackingView';

export default function App() {
  // Page / Screen states
  const [viewState, setViewState] = useState<'splash' | 'explore' | 'detail' | 'cart' | 'tracking'>('splash');
  const [selectedItem, setSelectedItem] = useState<EcoProduct | null>(null);
  
  // Shopping Cart & Favorites Core lists
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favoritedItemIds, setFavoritedItemIds] = useState<string[]>([]);
  
  // Last checked-out order details mapping
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    deliveryMode: 'Deliver' | 'Pick Up';
    address: string;
    total: number;
    paymentMethod: string;
  } | null>(null);

  // Home Screen Filter States
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavbarTab, setActiveNavbarTab] = useState<'home' | 'favorites' | 'cart' | 'history'>('home');

  // Custom visual Toast Alert States
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show customized floating toast alerts
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add Item to Shopping Cart
  const handleAddToBag = (cartItem: CartItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === cartItem.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += cartItem.quantity;
        return updated;
      }
      return [...prev, cartItem];
    });
    showToast(`Added ${cartItem.product.name} (${cartItem.option}) to your Bag!`);
    setViewState('explore');
  };

  // Quick Addition of Eco product from Home Cards (defaults to Single option, no add-ons)
  const handleQuickAdd = (item: EcoProduct, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering full details page selection
    const cartItemId = `${item.id}-Single`;
    const cartItem: CartItem = {
      id: cartItemId,
      product: item,
      option: 'Single',
      quantity: 1,
      addOns: [],
      totalPrice: item.price
    };
    
    setCart(prev => {
      const existingIdx = prev.findIndex(c => c.id === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, cartItem];
    });
    showToast(`Added ${item.name} into your Bag!`);
  };

  // Update Item Quantity inside the Basket
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  // Remove Item fully from Basket
  const handleRemoveItem = (id: string) => {
    const itemToRemove = cart.find(c => c.id === id);
    setCart(prev => prev.filter(item => item.id !== id));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.product.name} from your Basket.`);
    }
  };

  // Place final Order & start tracking
  const handlePlaceOrderComplete = (details: {
    deliveryMode: 'Deliver' | 'Pick Up';
    address: string;
    total: number;
    paymentMethod: string;
  }) => {
    setLastOrderDetails(details);
    setCart([]); // Clean cart
    setViewState('tracking');
    setActiveNavbarTab('history');
  };

  // Handle Favorite Star Toggle
  const handleToggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritedItemIds(prev => {
      const isFav = prev.includes(itemId);
      if (isFav) {
        showToast('Removed product from Favorites.');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Added product to Favorites!');
        return [...prev, itemId];
      }
    });
  };

  // Filter products by search terms and active headers category
  const categories = ['All', 'Recycled', 'Organic', 'Sustainable Fashion', 'Energy Saver'];
  
  const filteredEcoItems = ECO_PRODUCTS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get only Favorited items
  const favoritedEcoItems = ECO_PRODUCTS.filter(item => favoritedItemIds.includes(item.id));

  return (
    <div className="min-h-screen bg-[#070907] flex justify-center items-center p-0 md:p-4">
      
      {/* Container Device Wrapper Chassis mockup */}
      <div 
        id="app-container-frame"
        className="w-full max-w-[480px] bg-[#0E1511] min-h-screen md:min-h-[850px] md:max-h-[920px] md:rounded-[40px] relative overflow-y-auto flex flex-col justify-between shadow-2xl border-0 md:border-8 border-[#1A251D] scrollbar-thin overflow-x-hidden"
      >
        
        {/* Floating Custom Toast alert notifier */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="absolute top-4 inset-x-4 z-50 bg-[#171E19] border border-[#2E7D32]/40 px-4 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-[#8F9A92] hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Display Rendering Engine */}
        <div className="flex-grow flex flex-col justify-start">
          {viewState === 'splash' && (
            <SplashView onStart={() => setViewState('explore')} />
          )}

          {viewState === 'explore' && (
            <div className="flex flex-col pb-24 font-sans text-white">
              
              {/* Home Header Section */}
              <div className="bg-[#171E19]/30 px-6 pt-7 pb-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#98A39C] font-sans">Hub Dispatch Location</span>
                    <button className="flex items-center gap-1.5 mt-1 font-bold text-sm text-[#EFEFEF] text-left">
                      <MapPin className="text-[#4CAF50] w-4.5 h-4.5" />
                      EcoShop Hub, District 1
                      <ChevronDown className="w-4 h-4 text-[#8F9A92]" />
                    </button>
                  </div>
                  
                  {/* Avatar Profile */}
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 bg-[#171E19] hover:bg-[#232F27] border border-[#232F27]/40 rounded-xl relative text-[#8F9A92] hover:text-white transition-colors cursor-pointer">
                      <Bell className="w-4.5 h-4.5" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-[#4CAF50] rounded-full" />
                    </button>
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-cover bg-center border border-[#4CAF50]/40" 
                         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150")' }} 
                    />
                  </div>
                </div>

                {/* Styled Active Search Box Wrapper */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-[#5D6B60]" />
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search bamboo, organic, solar cells..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#171E19] hover:bg-[#202922] focus:bg-[#171E19] border border-[#232F27]/40 focus:border-[#4CAF50] text-white text-xs pl-11 pr-4 py-3.5 rounded-2xl outline-none transition-colors font-sans placeholder-[#5D6B60]"
                    />
                  </div>
                  <button className="p-3.5 bg-[#2E7D32] text-white rounded-2xl hover:bg-[#388E3C] transition-colors shadow-md shadow-[#2E7D32]/10 cursor-pointer">
                    <SlidersHorizontal className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {activeNavbarTab === 'home' && (
                <>
                  {/* Dynamic Green Promo Card Banner */}
                  <div className="px-6 mt-4.5">
                    <div className="relative bg-gradient-to-r from-[#171E19] to-[#232F27] rounded-[28px] p-5 overflow-hidden border border-[#232F27]/40 shadow-lg">
                      {/* background overlay circle */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2E7D32]/15 rounded-full blur-2xl" />
                      
                      <span className="bg-emerald-600 text-[10px] font-extrabold tracking-wider text-white px-2.5 py-1 rounded-md uppercase">
                        Green Offer
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mt-3.5 tracking-tight leading-tight max-w-[200px]">
                        Save 20% Off <br />Recycled Items
                      </h3>
                      <p className="text-[#98A39C] text-[10px] mt-2 font-mono">Use Promo Code: <span className="text-[#4CAF50] font-bold">GREEN20</span></p>
                      
                      {/* Banner Image placement offset */}
                      <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-44 h-44 pointer-events-none drop-shadow-2xl brightness-110">
                        <img 
                          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" 
                          alt="Promo banner green" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-full mix-blend-lighten" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Filter Categories Tabs */}
                  <div className="mt-6">
                    <div className="flex gap-2.5 overflow-x-auto px-6 pb-2.5 scrollbar-none">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setSearchQuery(''); // Clean search on category switch
                          }}
                          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                            activeCategory === cat
                              ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/15'
                              : 'bg-[#171E19] border-[#232F27]/20 text-[#8F9A92] hover:text-white hover:border-[#303E34]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Eco Items Interactive Cards Grid */}
                  <div className="px-6 mt-4 mb-4">
                    {filteredEcoItems.length === 0 ? (
                      <div className="text-center py-16 text-[#5D6B60] bg-[#121612]/30 border border-dashed border-[#232F27]/40 rounded-3xl flex flex-col items-center justify-center gap-3">
                        <Leaf className="w-10 h-10 text-[#232F27]" />
                        <span className="text-sm font-semibold">No eco products matched your request.</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {filteredEcoItems.map(item => (
                          <div key={item.id} className="relative">
                            <EcoProductCard
                              item={item}
                              onSelect={() => {
                                setSelectedItem(item);
                                setViewState('detail');
                              }}
                              onQuickAdd={handleQuickAdd}
                            />
                            {/* Favorite micro icon toggle */}
                            <button
                              onClick={(e) => handleToggleFavorite(item.id, e)}
                              className="absolute top-5 right-5 p-1.5 bg-[#121612]/40 hover:bg-[#121612]/80 backdrop-blur-md rounded-lg transition-colors cursor-pointer"
                            >
                              <Star 
                                className={`w-3.5 h-3.5 ${
                                  favoritedItemIds.includes(item.id) 
                                    ? 'text-[#FBBE21] fill-[#FBBE21]' 
                                    : 'text-[#EFEFEF]'
                                }`} 
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeNavbarTab === 'favorites' && (
                <div className="px-6 mt-4">
                  <h2 className="text-xl font-bold text-white mb-4.5 tracking-tight">Your Favorites Collection</h2>
                  
                  {favoritedEcoItems.length === 0 ? (
                    <div className="text-center py-20 text-[#5D6B60] bg-[#121612]/30 border border-dashed border-[#232F27]/40 rounded-3xl flex flex-col items-center justify-center gap-3">
                      <Heart className="w-10 h-10 text-[#232F27]" />
                      <span className="text-sm font-semibold">No favorites selected yet.</span>
                      <button
                        onClick={() => setActiveNavbarTab('home')}
                        className="text-xs text-[#4CAF50] font-bold hover:underline cursor-pointer"
                      >
                        Browse and tap the Star!
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {favoritedEcoItems.map(item => (
                        <div key={item.id} className="relative">
                          <EcoProductCard
                            item={item}
                            onSelect={() => {
                              setSelectedItem(item);
                              setViewState('detail');
                            }}
                            onQuickAdd={handleQuickAdd}
                          />
                          <button
                            onClick={(e) => handleToggleFavorite(item.id, e)}
                            className="absolute top-5 right-5 p-1.5 bg-[#121612]/40 hover:bg-[#121612]/80 backdrop-blur-md rounded-lg transition-colors cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 text-[#FBBE21] fill-[#FBBE21]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeNavbarTab === 'cart' && (
                <div className="px-6 mt-4">
                  {/* Redirect directly into the dedicated, full checkout flow screen */}
                  <div className="bg-[#171E19] p-6 rounded-3xl border border-[#232F27]/30 text-center flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-[#2E7D32]/10 rounded-full text-[#4CAF50]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">Full Bag Checkout Flow</h3>
                      <p className="text-xs text-[#98A39C] leading-relaxed mt-1.5 px-3">
                        Interact with bundle pack levels, eco vouchers, carbon-neutral mapping, and electric dispatch trackers.
                      </p>
                    </div>
                    <button
                      id="btn-nav-checkout"
                      onClick={() => setViewState('cart')}
                      className="w-full mt-2 bg-[#2E7D32] text-white hover:bg-[#388E3C] py-3 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      Proceed to Checkout ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
                    </button>
                  </div>
                </div>
              )}

              {activeNavbarTab === 'history' && (
                <div className="px-6 mt-4">
                  <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Active Deliveries</h2>
                  
                  {lastOrderDetails ? (
                    <div className="bg-[#171E19] p-5 rounded-3xl border border-[#232F27]/30 shadow-sm flex flex-col justify-between gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-[#2E7D32]/15 text-[#4CAF50] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">In Transit</span>
                        <span className="text-[10px] text-[#5D6B60] font-sans">Active LiveGPS Route</span>
                      </div>
                      
                      <div className="text-xs text-[#98A39C] flex flex-col gap-1">
                        <span>Delivery Option: <strong className="text-white font-medium">{lastOrderDetails.deliveryMode}</strong></span>
                        <span className="line-clamp-1">Address: <strong className="text-white font-medium">{lastOrderDetails.address}</strong></span>
                        <span>Grand Bill Total: <span className="text-[#4CAF50] font-bold">${lastOrderDetails.total.toFixed(2)}</span></span>
                      </div>

                      <button
                        id="btn-resume-tracking"
                        onClick={() => setViewState('tracking')}
                        className="w-full text-center bg-[#2E7D32] hover:bg-[#388E3C] text-white py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Open Live Tracker
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-[#5D6B60] bg-[#121612]/30 border border-dashed border-[#232F27]/40 rounded-3xl flex flex-col items-center justify-center gap-3">
                      <History className="w-10 h-10 text-[#232F27]" />
                      <span className="text-sm font-semibold">No active eco order tracking found.</span>
                      <button
                        onClick={() => setActiveNavbarTab('home')}
                        className="text-xs text-[#4CAF50] font-bold hover:underline cursor-pointer"
                      >
                        Shop your first circular good today!
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {viewState === 'detail' && selectedItem && (
            <DetailView
              item={selectedItem}
              onBack={() => {
                setViewState('explore');
                setSelectedItem(null);
              }}
              onAddToBag={handleAddToBag}
            />
          )}

          {viewState === 'cart' && (
            <CartView
              cart={cart}
              onBack={() => setViewState('explore')}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onPlaceOrder={handlePlaceOrderComplete}
            />
          )}

          {viewState === 'tracking' && lastOrderDetails && (
            <OrderTrackingView
              orderDetails={lastOrderDetails}
              onBackToHome={() => {
                setViewState('explore');
                setActiveNavbarTab('home');
              }}
            />
          )}
        </div>

        {/* Persistent Bottom Layout Navigation Bar Chassis */}
        {viewState === 'explore' && (
          <div 
            id="global-navbar"
            className="absolute bottom-0 inset-x-0 z-40 bg-[#121612]/95 backdrop-blur-md border-t border-[#232F27] px-7 py-4.5 flex items-center justify-between"
          >
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'favorites', icon: Heart, label: 'Favorites' },
              { id: 'cart', icon: ShoppingBag, label: 'Bag' },
              { id: 'history', icon: History, label: 'History' }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeNavbarTab === tab.id;
              
              return (
                <button
                  id={`nav-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => {
                    setActiveNavbarTab(tab.id as any);
                    setSearchQuery('');
                  }}
                  className="flex flex-col items-center gap-1.5 relative group tracking-wide cursor-pointer text-center"
                >
                  <Icon 
                    className={`w-5.5 h-5.5 transition-colors duration-200 ${
                      active ? 'text-[#4CAF50]' : 'text-[#8F9A92] group-hover:text-white'
                    }`} 
                  />
                  
                  {/* Sub text badge label indicator */}
                  <span className={`text-[10px] font-sans font-medium transition-opacity ${active ? 'text-[#4CAF50]' : 'text-[#8F9A92]'}`}>
                    {tab.label}
                  </span>

                  {/* Red bubble counts notification for the Basket tag */}
                  {tab.id === 'cart' && cart.length > 0 && (
                    <span className="absolute -top-1.5 right-1 px-1.5 py-0.5 bg-[#2E7D32] text-white font-extrabold text-[8px] rounded-full min-w-4 h-4 text-center select-none shadow">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}

                  {/* Active navigation track line */}
                  {active && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute -bottom-1.5 w-6 h-1.5 bg-[#4CAF50] rounded-full" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
