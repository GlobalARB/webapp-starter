"use client";

import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const tickerData = [
  { name: "Chile", mineral: "Lithium", value: -15, change: "+2%" },
  { name: "DRC", mineral: "Cobalt", value: -22, change: "-1.5%" },
  { name: "Australia", mineral: "Iron Ore", value: 30, change: "+0.8%" },
  { name: "China", mineral: "Rare Earths", value: 50, change: "+5%" },
  { name: "Russia", mineral: "Nickel", value: -10, change: "-3%" },
  { name: "South Africa", mineral: "Platinum", value: 5, change: "+1%" },
  { name: "Peru", mineral: "Copper", value: 12, change: "+0.5%" },
  { name: "Canada", mineral: "Potash", value: 8, change: "+0.2%" },
];

const TickerItem = ({ item }: { item: (typeof tickerData)[0] }) => (
  <div className="mx-4 flex items-center space-x-2 text-sm text-white">
    <span className="font-bold">{item.name}</span>
    <span className="text-gray-400">{item.mineral}</span>
    <div
      className={`flex items-center ${
        item.value >= 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {item.value >= 0 ? (
        <FaArrowUp className="mr-1" />
      ) : (
        <FaArrowDown className="mr-1" />
      )}
      <span>{item.value}</span>
    </div>
    <span
      className={`${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
    >
      ({item.change})
    </span>
  </div>
);

export default function Ticker() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-gray-900/70 py-3">
      <div className="animate-ticker-scroll flex w-max">
        {tickerData.map((item, index) => (
          <TickerItem key={index} item={item} />
        ))}
        {tickerData.map((item, index) => (
          <TickerItem key={`duplicate-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
} 