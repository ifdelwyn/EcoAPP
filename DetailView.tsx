import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Heart, Leaf, ShieldAlert, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { EcoProduct, CartItem } from '../types';
import { ADD_ONS } from '../data';

interface DetailViewProps {
  item: EcoProduct;
  onBack: () => void;
  onAddToBag: (cartItem: CartItem) => void;
}

export default function DetailView({ item, onBack, onAddToBag }: DetailViewProps) {
  const [option, setOption] = useState<'Single' | 'Double Pack' | 'Family Saver'>('Single');
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Pack multipliers
  const optionMultipliers = {
    'Single': 0,
    'Double Pack': item.price * 0.8, // 80% more for double
    'Family Saver': item.price * 1.5 // 150% more for triple/family
  };

  const currentBasePrice = item.price + optionMultipliers[option];
  const addOnsCost = selectedAddOns.reduce((acc, current) => acc + current.price, 0);
  const totalItemPrice = currentBasePrice + addOnsCost;

  const handleAddOnToggle = (addOn: { name: string; price: number }) => {
    setSelectedAddOns(prev => {
      const alreadySelected = prev.find(p => p.name === addOn.name);
      if (alreadySelected) {
        return prev.filter(p => p.name !== addOn.name);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const handleCommitToBag = () => {
    const uniqueId = `${item.id}-${option}-${selectedAddOns.map(a => a.name).join('-')}`;
    const cartItem: CartItem = {
      id: uniqueId,
      product: item,
      option,
      quantity: 1,
      addOns: selectedAddOns,
      totalPrice: totalItemPrice
    };
    onAddToBag(cartItem);
  };

  return (
    <div 
      id="detail-container"
      className="min-h-screen bg-[#0E1511] text-white pb-32 font-sans"
    >
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-[#0E1511]/95 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-[#232F27]/30">
        <button
          id="btn-detail-back"
          onClick={onBack}
          className="p-2.5 bg-[#171E19] hover:bg-[#232F27] rounded-xl text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-bold">Product Details</span>
        <button
          id="btn-detail-fav"
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2.5 bg-[#171E19] hover:bg-[#232F27] rounded-xl text-white transition-colors cursor-pointer"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-[#8F9A92]'}`} 
          />
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6">
        {/* Hero image showcase */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-6">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Attributes floating badge */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-lime-300" /> Eco Certified
            </span>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#232F27]/40 pb-5 mb-5 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5">{item.name}</h1>
            <p className="text-[#98A39C] text-sm mb-3">{item.subtitle}</p>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-[#FBBE21] fill-[#FBBE21]" />
                <span className="font-bold text-base">{item.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-[#5D6B60] font-sans">({item.reviews} organic reviews)</span>
            </div>
          </div>

          {/* Quick Specs Blocks */}
          <div className="flex items-center gap-3.5 pt-1">
            <div className="bg-[#171E19] border border-[#232F27]/40 p-3 rounded-2xl flex flex-col items-center gap-1 w-20 text-center">
              <Leaf className="w-5 h-5 text-[#4CAF50]" />
              <span className="text-[9px] text-[#98A39C] font-sans">Material</span>
              <span className="text-[10px] font-bold text-white truncate w-full">Organic/Recy</span>
            </div>
            <div className="bg-[#171E19] border border-[#232F27]/40 p-3 rounded-2xl flex flex-col items-center gap-1 w-20 text-center">
              <AlertCircle className="w-5 h-5 text-[#4CAF50]" />
              <span className="text-[9px] text-[#98A39C] font-sans">Logistics</span>
              <span className="text-[10px] font-bold text-white truncate w-full">Carbon-Neu</span>
            </div>
          </div>
        </div>

        {/* Environmental impact highlight box */}
        <div className="bg-[#171E19]/60 border border-dashed border-[#2E7D32]/30 p-4.5 rounded-2xl mb-6 flex items-center gap-3.5">
          <div className="p-2.5 bg-[#2E7D32]/20 text-[#4CAF50] rounded-xl">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-[#4CAF50] uppercase font-bold tracking-wider">ECOLOGICAL IMPACT SAVINGS</span>
            <span className="text-xs text-white font-medium block mt-0.5">{item.impactScore} compared to low-sustainability equivalents.</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-white mb-2">Sustainability Narrative</h2>
          <p className="text-[#98A39C] text-sm leading-relaxed text-justify">
            {item.description}
          </p>
        </div>

        {/* Pack Option Selection */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-white mb-3 font-sans">Buying Option / Package Bundle</h2>
          <div className="grid grid-cols-3 gap-3">
            {(['Single', 'Double Pack', 'Family Saver'] as const).map(opt => (
              <button
                id={`btn-option-${opt.toLowerCase().replace(/ /g, '-')}`}
                key={opt}
                onClick={() => setOption(opt)}
                className={`py-3.5 px-2 rounded-2xl font-semibold text-center text-xs transition-all border cursor-pointer ${
                  option === opt
                    ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#4CAF50] shadow-md shadow-[#2E7D32]/5'
                    : 'bg-[#171E19] border-[#232F27]/40 text-[#8F9A92] hover:border-[#303E34]'
                }`}
              >
                <span>{opt}</span>
                <span className="block text-[10px] opacity-75 font-normal mt-1 text-[#98A39C]">
                  {opt === 'Single' && '1x Standard'}
                  {opt === 'Double Pack' && `+$${(item.price * 0.8).toFixed(2)}`}
                  {opt === 'Family Saver' && `+$${(item.price * 1.5).toFixed(2)}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Eco Options Customize Add-ons Section */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-white mb-3">Green Packaging & Shipping Customs</h2>
          <div className="flex flex-col gap-2.5">
            {ADD_ONS.map(addOn => {
              const checked = !!selectedAddOns.find(a => a.name === addOn.name);
              return (
                <div
                  id={`addon-${addOn.name.toLowerCase().replace(/ /g, '-')}`}
                  key={addOn.name}
                  onClick={() => handleAddOnToggle(addOn)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    checked
                      ? 'bg-[#171E19]/90 border-[#2E7D32]/60 text-white'
                      : 'bg-[#171E19]/40 border-[#232F27]/20 text-[#8F9A92] hover:border-[#232F27]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="accent-[#2E7D32] rounded pointer-events-none w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium">{addOn.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#4CAF50]">
                    +${addOn.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Drawer */}
      <div 
        id="detail-action-drawer"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#171E19]/95 backdrop-blur-lg border-t border-[#232F27]/60 px-6 py-5 flex items-center justify-between"
      >
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-[#98A39C]">Total Cart Value</span>
            <span className="text-2xl font-extrabold text-[#4CAF50] tracking-tight">
              ${totalItemPrice.toFixed(2)}
            </span>
          </div>

          <motion.button
            id="btn-add-to-bag"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCommitToBag}
            className="flex-grow max-w-sm flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#388E3C] text-white py-4 rounded-xl font-bold text-base transition-colors duration-300 shadow-md shadow-[#2E7D32]/10 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Bag
          </motion.button>
        </div>
      </div>
    </div>
  );
}
