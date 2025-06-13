"use client";

import React, { useState, useEffect, useRef } from "react";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import type { FeatureCollection, Feature } from "geojson";

// Dynamically import the Globe component
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

import Ticker from "./ticker";
import CountryDataPanel from "./country-data-panel";
import { syntheticCountryData } from "@/lib/synthetic-data";
import RightNavigationPanel from "./right-navigation-panel";

const WORLD_ATLAS_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryFeature = Feature & {
  properties: {
    name: string;
  };
};

export default function GlobeVisualization() {
  const [countries, setCountries] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const [hoveredCountry, setHoveredCountry] = useState<CountryFeature | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryFeature | null>(
    null
  );
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const countryData = selectedCountry
    ? syntheticCountryData[selectedCountry.id as string]
    : null;

  useEffect(() => {
    // Load country polygons
    fetch(WORLD_ATLAS_URL)
      .then((res) => res.json())
      .then((world) => {
        const typedWorld = world as Topology;
        if (typedWorld.objects.countries) {
          const countries = feature(
            typedWorld,
            typedWorld.objects.countries
          ) as unknown as FeatureCollection;
          setCountries(countries);
        }
      });
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    if (selectedCountry) {
      globe.controls().autoRotate = false;

      // Calculate the bounding box
      const bbox = (country: CountryFeature) => {
        let minLon = Infinity,
          maxLon = -Infinity,
          minLat = Infinity,
          maxLat = -Infinity;
        
        if (!("coordinates" in country.geometry)) {
          return { minLon, maxLon, minLat, maxLat };
        }

        const coords = country.geometry.coordinates;

        const processPolygon = (polygon: any) => {
          polygon.forEach((ring: any) => {
            ring.forEach((point: any) => {
              const [lon, lat] = point;
              if (lon < minLon) minLon = lon;
              if (lon > maxLon) maxLon = lon;
              if (lat < minLat) minLat = lat;
              if (lat > maxLat) maxLat = lat;
            });
          });
        };

        if (country.geometry.type === "Polygon") {
          processPolygon(coords);
        } else if (country.geometry.type === "MultiPolygon") {
          coords.forEach(processPolygon);
        }
        return { minLon, maxLon, minLat, maxLat };
      };

      const { minLon, maxLon, minLat, maxLat } = bbox(selectedCountry);

      // Correct center calculation for antimeridian-crossing polygons
      let centerLon = (minLon + maxLon) / 2;
      let centerLat = (minLat + maxLat) / 2;
      
      const lonDiff = maxLon - minLon;
      
      // Special case for Russia
      if (selectedCountry.properties.name === "Russia") {
        centerLon = 100;
        centerLat = 60;
      } else if (lonDiff < -180 || lonDiff > 180) { // Generic antimeridian cross
        centerLon += 180;
        if(centerLon > 180) centerLon -= 360;
      }

      // Adjust altitude calculation
      const latDiff = Math.abs(maxLat - minLat);
      const maxDiff = Math.max(Math.abs(lonDiff), latDiff);
      const altitude = Math.min(1.0 + (maxDiff / 180) * 1.5, 3.0);

      globe.pointOfView(
        { lat: centerLat, lng: centerLon, altitude },
        1000
      );
    } else {
      // Zoom out to default view
      globe.pointOfView({ lat: 20, lng: 0, altitude: 2.0 }, 1500);
      globe.controls().autoRotate = true;
    }
  }, [selectedCountry]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCountryClick = (country: object) => {
    const typedCountry = country as CountryFeature;
    if (selectedCountry && selectedCountry.id === typedCountry.id) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(typedCountry);
    }
  };

  const handlePolygonHover = (country: object | null) => {
    setHoveredCountry(country as CountryFeature | null);
  };

  return (
    <div className="relative flex h-screen w-screen bg-black text-white">
      {/* Left Panel */}
      <div className="z-10 w-1/3 shrink-0 border-r border-slate-800 bg-slate-900/70 p-4 backdrop-blur-sm">
        {selectedCountry ? (
          <CountryDataPanel
            selectedCountry={selectedCountry}
            countryData={countryData}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">Select a country to see details.</p>
          </div>
        )}
      </div>

      {/* Main Content (Globe) */}
      <div className="relative flex-1" ref={containerRef}>
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          onGlobeReady={() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = true;
              globeRef.current.controls().autoRotateSpeed = 0.2;
            }
          }}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          polygonsData={countries.features}
          polygonCapColor={(feat: object) =>
            feat === hoveredCountry
              ? "rgba(255, 165, 0, 0.9)"
              : "rgba(255, 165, 0, 0.5)"
          }
          polygonSideColor={(feat: object) =>
            feat === selectedCountry ? "#ffffff" : "rgba(0, 0, 0, 0.05)"
          }
          polygonStrokeColor={(feat: object) =>
            feat === selectedCountry ? "#a0d1ff" : "#665e5e"
          }
          onPolygonHover={handlePolygonHover}
          onPolygonClick={handleCountryClick}
        />
      </div>

      {/* Right Panel */}
      <div className="z-10 w-64 shrink-0 border-l border-slate-800 bg-black/50 p-4 backdrop-blur-sm">
        <RightNavigationPanel />
      </div>

      <Ticker />
    </div>
  );
} 