"use client";

import React from "react";
import type { CountryData } from "@/lib/synthetic-data";
import type { Feature } from "geojson";

type CountryFeature = Feature & {
  properties: {
    name: string;
  };
};

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass: string;
}

function ProgressBar({ value, max, colorClass }: ProgressBarProps) {
  const percentage = (value / max) * 100;
  return (
    <div className="h-2 w-full rounded-full bg-gray-700">
      <div
        className={`h-2 rounded-full ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

interface DataSectionProps {
  title: string;
  data: { name: string; value: number; max: number }[];
  colorClass: string;
}

function DataSection({ title, data, colorClass }: DataSectionProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>
            <ProgressBar
              value={item.value}
              max={item.max}
              colorClass={colorClass}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface CountryDataPanelProps {
  countryData: CountryData | null | undefined;
  selectedCountry: CountryFeature;
}

export default function CountryDataPanel({ countryData, selectedCountry }: CountryDataPanelProps) {
  return (
    <div className="flex h-full flex-col space-y-6 rounded-lg bg-gray-900/50 p-6 text-white">
      <h2 className="text-2xl font-bold">{selectedCountry.properties.name.toUpperCase()}</h2>
      {countryData ? (
        <>
          <div className="rounded-md bg-gray-800 p-3 text-center">
            <span className="text-lg font-medium text-blue-300">
              {countryData.score_title}
            </span>
          </div>
          <DataSection
            title="Reserves"
            data={countryData.reserves}
            colorClass="bg-red-500"
          />
          <DataSection
            title="Exports"
            data={countryData.exports}
            colorClass="bg-green-500"
          />
          <DataSection
            title="Production / Companies"
            data={countryData.production}
            colorClass="bg-blue-500"
          />
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">No detailed data available for {selectedCountry.properties.name}.</p>
        </div>
      )}
    </div>
  );
} 