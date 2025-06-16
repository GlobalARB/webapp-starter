"use client";

import React from "react";
import { CountryData } from '@/services/apiService';
import DataList from './data-list';

interface CountryDataPanelProps {
  countryData: CountryData | null;
  selectedCountryName: string | null;
  isLoading: boolean;
}

export default function CountryDataPanel({ countryData, selectedCountryName, isLoading }: CountryDataPanelProps) {
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold">{selectedCountryName}</h2>
          <p className="text-gray-400 mt-2">Loading data...</p>
        </div>
      );
    }

    if (countryData) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">{countryData.name}</h2>
          <div className="space-y-6">
            <DataList data={countryData.reserves} />
            <DataList data={countryData.exports} />
            <DataList data={countryData.production} />
          </div>
        </>
      );
    }

    if (selectedCountryName) {
         return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">{selectedCountryName}</h2>
                <p className="text-gray-400 mt-2">No detailed data available.</p>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h2 className="text-xl font-semibold">Select a country</h2>
            <p className="text-gray-400 mt-2">Click on a country to see its critical minerals intelligence data.</p>
        </div>
    );
  };

  return (
    <div className="h-full p-4 text-white">
      {renderContent()}
    </div>
  );
} 