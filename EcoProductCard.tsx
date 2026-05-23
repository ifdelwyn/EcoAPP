import React from 'react';
import { motion } from 'motion/react';
import { Star, Plus, Leaf } from 'lucide-react';
import { EcoProduct } from '../types';

interface EcoProductCardProps {
  item: EcoProduct;
  onSelect: (item: EcoProduct) => void;
  onQuickAdd: (item: EcoProduct, e: React.MouseEvent) => void;
}

export default function EcoProductCard({ item, onSelect, onQuickAdd }: EcoProductCardProps) {
  return (
    <motion.div
      id={`product-card-${item.id}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-[#171E19] rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-[#0B0F0C]/40 transition-all border border-[#232F27]/40 group"
      onClick={() => onSelect(item)}
    >
      {/* Thumbnail and Rating */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Rating Overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#0E1511]/80 backdrop-blur-md px-2 py-1 rounded-lg text-white font-semibold text-[11px] shadow-sm">
          <Star className="w-3 h-3 text-[#FBBE21] fill-[#FBBE21]" />
          <span>{item.rating.toFixed(1)}</span>
        </div>

        {/* Impact Overlay Badge */}
        <div className="absolute bottom-2 left-2 max-w-[90%] bg-[#2E7D32]/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold text-white flex items-center gap-1 shadow-sm leading-tight">
          <Leaf className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">{item.impactScore}</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm tracking-tight mb-1 group-hover:text-[#4CAF50] transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-[#98A39C] text-xs line-clamp-1 mb-3">
            {item.subtitle}
          </p>
        </div>

        {/* Pricing Actions */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#98A39C]">Price</span>
            <span className="text-white font-bold text-base md:text-lg">
              <span className="text-[#4CAF50] font-medium">$</span>{item.price.toFixed(2)}
            </span>
          </div>

          <motion.button
            id={`quick-add-${item.id}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => onQuickAdd(item, e)}
            className="p-2 bg-[#2E7D32] hover:bg-[#388E3C] rounded-xl text-white shadow-md shadow-[#2E7D32]/20 transition-colors cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
