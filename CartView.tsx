import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, MapPin, Ticket, HardDrive, ChevronRight, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (details: {
    deliveryMode: 'Deliver' | 'Pick Up';
    address: string;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    paymentMethod: string;
  }) => void;
}

export default function CartView({ cart, onBack, onUpdateQuantity, onRemoveItem, onPlaceOrder }: CartViewProps) {
  const [deliveryMode, setDeliveryMode] = useState<'Deliver' | 'Pick Up'>('Deliver');
  const [addressChoice, setAddressChoice] = useState<'Home' | 'Office'>('Home');
  const [customAddress, setCustomAddress] = useState('142 Tran Hung Dao, District 1, Ho Chi Minh City');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(customAddress);
  const [promoCode, setPromoCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Wallet' | 'Credit Card' | 'COD'>('Wallet');

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const deliveryFee = deliveryMode === 'Deliver' ? (subtotal > 0 ? 3.50 : 0) : 0; // adjusted for product package shipping
  
  // Voucher computation
  let discount = 0;
  if (couponApplied === 'GREEN20') {
    discount = subtotal * 0.20; // 20% off
  } else if (couponApplied === 'ECOFRIEND') {
    discount = Math.min(subtotal, 5.00); // flat $5.00 off
  }
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'GREEN20') {
      setCouponApplied('GREEN20');
      setPromoCode('');
    } else if (code === 'ECOFRIEND') {
      setCouponApplied('ECOFRIEND');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon. Try "GREEN20" or "ECOFRIEND"!');
    }
  };

  const handleAddressSave = () => {
    setCustomAddress(tempAddress);
    setIsEditingAddress(false);
  };

  const handleTriggerCheckout = () => {
    onPlaceOrder({
      deliveryMode,
      address: deliveryMode === 'Deliver' ? customAddress : 'EcoShop Flagship Hub (District 1)',
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod
    });
  };

  return (
    <div id="cart-container" className="min-h-screen bg-[#0E1511] text-white pb-36 font-sans">
      {/* Top Header Row */}
      <div className="sticky top-0 z-30 bg-[#0E1511]/90 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-[#232F27]/30">
        <button
          id="btn-cart-back"
          onClick={onBack}
          className="p-2.5 bg-[#171E19] hover:bg-[#232F27] rounded-xl text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-bold">Your Green Bag</span>
        <div className="w-10 h-10 flex items-center justify-center bg-[#171E19]/50 rounded-xl border border-[#232F27]/30">
          <ShoppingBag className="w-5 h-5 text-[#4CAF50]" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 mt-6">
        
        {/* Toggle Mode: Deliver or Pick Up */}
        <div className="bg-[#171E19] p-1 rounded-2xl flex items-center mb-6 border border-[#232F27]/20">
          <button
            id="tab-mode-deliver"
            onClick={() => setDeliveryMode('Deliver')}
            className={`flex-grow py-3 rounded-xl font-bold text-sm transition-all text-center cursor-pointer ${
              deliveryMode === 'Deliver'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#98A39C] hover:text-white'
            }`}
          >
            Sustain-Ship
          </button>
          <button
            id="tab-mode-pickup"
            onClick={() => setDeliveryMode('Pick Up')}
            className={`flex-grow py-3 rounded-xl font-bold text-sm transition-all text-center cursor-pointer ${
              deliveryMode === 'Pick Up'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#98A39C] hover:text-white'
            }`}
          >
            Hub Pick-Up
          </button>
        </div>

        {/* Dynamic Delivery Address Card */}
        {deliveryMode === 'Deliver' && (
          <div className="bg-[#171E19] rounded-2xl p-5 mb-6 border border-[#232F27]/30 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-white tracking-wide">Shipment Destination</span>
              <button
                id="btn-edit-address"
                onClick={() => {
                  if (isEditingAddress) {
                    handleAddressSave();
                  } else {
                    setTempAddress(customAddress);
                    setIsEditingAddress(true);
                  }
                }}
                className="text-xs font-semibold text-[#4CAF50] hover:text-[#81C784] transition-colors cursor-pointer"
              >
                {isEditingAddress ? 'Save Hub' : 'Edit Location'}
              </button>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#232F27] text-[#4CAF50] rounded-xl self-start">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                {isEditingAddress ? (
                  <div className="flex flex-col gap-2 mt-1">
                    <textarea
                      value={tempAddress}
                      onChange={(e) => setTempAddress(e.target.value)}
                      className="w-full bg-[#0E1511] border border-[#232F27] hover:border-[#388E3C] focus:border-[#4CAF50] outline-none text-white text-sm p-2.5 rounded-xl resize-none h-20 font-sans"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setAddressChoice('Home');
                          setTempAddress('142 Tran Hung Dao, District 1, Ho Chi Minh City');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${addressChoice === 'Home' ? 'bg-[#2E7D32] text-white' : 'bg-[#232F27] text-[#98A39C]'}`}
                      >
                        Home
                      </button>
                      <button
                        onClick={() => {
                          setAddressChoice('Office');
                          setTempAddress('Mezzanine Tower, 37 Ton Duc Thang, District 1, Ho Chi Minh City');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${addressChoice === 'Office' ? 'bg-[#2E7D32] text-white' : 'bg-[#232F27] text-[#98A39C]'}`}
                      >
                        Office
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="block font-bold text-sm text-[#EFEFEF] mb-0.5">
                      {addressChoice === 'Home' ? 'Residential Eco Home' : 'HQ Sustainability Tower'}
                    </span>
                    <span className="block text-xs text-[#98A39C] leading-relaxed">
                      {customAddress}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Selected Product Items List */}
        <h2 className="text-base font-bold text-white mb-3">Eco Audit Summary</h2>
        <div className="flex flex-col gap-3.5 mb-6">
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#171E19]/40 border border-dashed border-[#232F27]/60 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3"
              >
                <div className="bg-[#171E19] p-4 rounded-full text-[#5D6B60]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-[#98A39C] text-sm">Your green shopping bag is empty.</p>
                <button
                  onClick={onBack}
                  className="mt-2 text-sm font-semibold text-[#4CAF50] hover:underline cursor-pointer"
                >
                  Browse Green Products
                </button>
              </motion.div>
            ) : (
              cart.map(item => (
                <motion.div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="bg-[#171E19] rounded-2xl p-4 flex items-center justify-between border border-[#232F27]/30 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{item.product.name}</h3>
                      <p className="text-[11px] text-[#98A39C] mt-0.5">
                        Tier/Size: <span className="text-white font-semibold">{item.option}</span>
                      </p>
                      {item.addOns.length > 0 && (
                        <p className="text-[9px] text-[#4CAF50] line-clamp-1 mt-0.5 leading-snug">
                          + {item.addOns.map(a => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Actions & Price */}
                  <div className="flex flex-col items-end justify-between gap-3 flex-shrink-0">
                    <span className="text-sm font-bold text-[#4CAF50]">
                      ${(item.totalPrice * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-3.5 bg-[#0E1511] border border-[#232F27]/30 px-2.5 py-1.5 rounded-xl">
                      <button
                        id={`btn-qty-minus-${item.id}`}
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.id, item.quantity - 1);
                          } else {
                            onRemoveItem(item.id);
                          }
                        }}
                        className="p-1 hover:text-[#4CAF50] transition-colors cursor-pointer"
                      >
                        {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-white">{item.quantity}</span>
                      <button
                        id={`btn-qty-plus-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[#4CAF50] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Promo Voucher Section */}
        {cart.length > 0 && (
          <div className="bg-[#171E19] rounded-2xl p-4.5 border border-[#232F27]/20 mb-6 shadow-sm">
            <span className="block text-xs font-bold text-white mb-2.5 uppercase tracking-wider">Eco Coupons Available</span>
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Ticket className="absolute left-3.5 top-3 w-4 h-4 text-[#4CAF50]" />
                <input
                  id="inp-promo"
                  type="text"
                  placeholder="Enter GREEN20 or ECOFRIEND"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#0E1511] border border-[#232F27]/60 hover:border-[#3A473E] focus:border-[#4CAF50] outline-none text-white text-xs pl-10 pr-4 py-3.5 rounded-xl font-sans"
                />
              </div>
              <button
                id="btn-apply-promo"
                onClick={handleApplyPromo}
                className="bg-[#2E7D32] hover:bg-[#388E3C] text-white px-5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            {promoError && (
              <p className="text-red-400 text-[11px] font-medium mt-1.5 px-1">{promoError}</p>
            )}

            {couponApplied && (
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl mt-3 text-emerald-400">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Eco Promo Active: {couponApplied}
                </span>
                <button
                  onClick={() => setCouponApplied(null)}
                  className="text-[10px] underline font-bold hover:text-white transition-all cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        {/* Payment Methods */}
        {cart.length > 0 && (
          <div className="bg-[#171E19] rounded-2xl p-4.5 border border-[#232F27]/20 mb-6 shadow-sm">
            <span className="block text-xs font-bold text-white mb-3 uppercase tracking-wider">Carbon-Calculated Payment</span>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Wallet', 'Credit Card', 'COD'] as const).map(method => (
                <button
                  id={`pay-method-${method.toLowerCase().replace(/ /g, '-')}`}
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-3 rounded-xl border text-center font-bold text-xs transition-colors cursor-pointer ${
                    paymentMethod === method
                      ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#4CAF50]'
                      : 'bg-[#0E1511] border-[#232F27]/40 text-[#98A39C] hover:border-[#232F27]'
                  }`}
                >
                  {method === 'Wallet' && 'Green Wallet'}
                  {method === 'Credit Card' && 'Eco Card'}
                  {method === 'COD' && 'Cash'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Drawer bottom panel */}
      {cart.length > 0 && (
        <div 
          id="cart-checkout-drawer"
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#171E19]/95 backdrop-blur-lg border-t border-[#232F27]/60 px-6 py-5 shadow-2xl"
        >
          <div className="max-w-xl mx-auto w-full">
            {/* Financial Invoice List */}
            <div className="flex flex-col gap-2 border-b border-[#232F27]/30 pb-4 mb-4 font-sans text-xs">
              <div className="flex items-center justify-between text-[#98A39C]">
                <span>Items Subtotal</span>
                <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[#98A39C]">
                <span>Sustainable Dispatch Fee</span>
                <span className="text-white font-semibold">
                  {deliveryMode === 'Deliver' ? `$${deliveryFee.toFixed(2)}` : 'Free Hub Pick'}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Green Promotion Savings</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 text-[#EFEFEF]">
                <span className="font-bold">Total Green Amount</span>
                <span className="font-extrabold text-[#4CAF50] text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Execution CTA Button */}
            <motion.button
              id="btn-place-order"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTriggerCheckout}
              className="w-full flex items-center justify-center gap-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white py-4 rounded-xl font-bold text-base transition-colors duration-300 shadow-md shadow-[#2E7D32]/20 cursor-pointer"
            >
              Confirm Checkout & Place Order
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
