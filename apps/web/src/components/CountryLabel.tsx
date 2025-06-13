"use client";

import React from 'react';
import Image from 'next/image';
import { Feature } from 'geojson';

export interface CountryFeature extends Feature {
  properties: {
    ADMIN: string;
    ISO_A2: string;
    [key: string]: any;
  };
  data?: {
    [key: string]: any;
  }
}

interface CountryLabelProps {
  countryData: CountryFeature | null;
}

const CountryLabel: React.FC<CountryLabelProps> = ({ countryData }) => {
  if (!countryData) {
    return null;
  }

  const flagUrl = countryData.properties.ISO_A2
    ? `https://flagcdn.com/w40/${countryData.properties.ISO_A2.toLowerCase()}.png`
    : '/placeholder-flag.png';

  return (
    <div className="bg-black/50 backdrop-blur-sm p-2 rounded-lg text-white flex items-center space-x-2 text-sm">
      <Image src={flagUrl} alt={`${countryData.properties.ADMIN} flag`} width={24} height={16} className="rounded-sm" />
      <span>{countryData.properties.ADMIN}</span>
    </div>
  );
};

export default CountryLabel;