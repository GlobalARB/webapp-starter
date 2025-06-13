// @ts-nocheck
"use client";

import React, { memo, useMemo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { type Feature } from "geojson";
import { geoCentroid } from "d3-geo";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

type CountryFeature = Feature & {
  properties: {
    name: string;
  };
};

interface FlatMapProps {
  selectedCountry: CountryFeature | null;
  hoveredCountry: CountryFeature | null;
  onCountryClick: (geo: object) => void;
  onCountryHover: (geo: object | null) => void;
  getCountryColor: (geo: object) => string;
}

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

export default function FlatMap({
  selectedCountry,
  hoveredCountry,
  onCountryClick,
  onCountryHover,
  getCountryColor,
}: FlatMapProps) {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  useEffect(() => {
    if (selectedCountry) {
        const { minLon, maxLon, minLat, maxLat } = bbox(selectedCountry);
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

        const latDiff = Math.abs(maxLat - minLat);
        const maxDiff = Math.max(Math.abs(lonDiff), latDiff);
        
        const zoom = Math.min(Math.max(360 / maxDiff / 2, 1), 8);

        setPosition({ coordinates: [centerLon, centerLat], zoom });
    } else {
        setPosition({ coordinates: [0, 20], zoom: 1 });
    }
  }, [selectedCountry]);

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleZoomIn() {
    if (position.zoom >= 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  }

  return (
    <div className="relative size-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20],
        }}
        width={800}
        height={500}
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          maxZoom={8}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountry?.id === geo.id;
                const isHovered = hoveredCountry?.id === geo.id;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onCountryClick(geo)}
                    onMouseEnter={() => onCountryHover(geo)}
                    onMouseLeave={() => onCountryHover(null)}
                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        outline: "none",
                        stroke: "#FFC533",
                        strokeWidth: 0.75,
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                    fill={getCountryColor(geo)}
                    stroke={isSelected ? "#FFFFFF" : "#665e5e"}
                    strokeWidth={isSelected ? 0.5 : 0.25}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="absolute bottom-4 right-4 z-10 flex flex-col space-y-2">
        <Button size="icon" onClick={handleZoomIn} variant="outline" className="bg-slate-800 text-white">
          <PlusIcon className="size-4" />
        </Button>
        <Button size="icon" onClick={handleZoomOut} variant="outline" className="bg-slate-800 text-white">
          <MinusIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
} 