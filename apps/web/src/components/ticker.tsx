"use client";

import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { CommodityPrice } from "@/services/apiService";

interface TickerProps {
  commodityPrices: CommodityPrice[];
}

export default function Ticker({ commodityPrices }: TickerProps) {
  if (!commodityPrices || commodityPrices.length === 0) {
    return <div className="bg-black text-white p-2 text-center h-16 flex items-center justify-center">Loading ticker data...</div>;
  }

  const duplicatedItems = [...commodityPrices, ...commodityPrices];

  return (
    <div className="shrink-0 bg-black/50 backdrop-blur-sm overflow-hidden whitespace-nowrap border-t border-gray-700 h-16 flex items-center">
      <div className="animate-ticker-scroll flex">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center mx-4 text-white text-sm">
            <span className="font-semibold">{item.name}:</span>
            <span className="ml-2">${item.price.toFixed(2)}</span>
            <span className={`ml-2 flex items-center ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {item.isUp ? <FaArrowUp /> : <FaArrowDown />}
              <span className="ml-1">{item.change.toFixed(2)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 