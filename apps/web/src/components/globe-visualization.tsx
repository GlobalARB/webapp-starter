"use client";

import React, { useState, useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { Feature as GeoJsonFeature, FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { CountryData, CommodityPrice, fetchCountryData, fetchCommodityPrices } from '@/services/apiService';
import CountryDataPanel from './country-data-panel';
import Ticker from './ticker';
import RightNavigationPanel from './right-navigation-panel';
import FlatMap from './flat-map';
import cn from 'clsx';

const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type ViewMode = "GLOBE" | "FLAT";

type CountryFeature = GeoJsonFeature<Polygon | MultiPolygon> & {
    id: string | number;
    properties: {
        name: string;
        [key: string]: any;
    };
    bbox?: [number, number, number, number];
};

export default function GlobeVisualization() {
    const [countries, setCountries] = useState<CountryFeature[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryFeature | null>(null);
    const [hoveredCountry, setHoveredCountry] = useState<CountryFeature | null>(null);
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [commodityPrices, setCommodityPrices] = useState<CommodityPrice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const globeRef = useRef<GlobeMethods | undefined>();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Fetch data
        fetch(WORLD_ATLAS_URL)
            .then(res => res.json())
            .then((world: Topology) => {
                if (world.objects.countries) {
                    const countryFeatures = feature(world, world.objects.countries) as FeatureCollection<Polygon | MultiPolygon>;
                    setCountries(countryFeatures.features as CountryFeature[]);
                }
            });

        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const pricesRes = await fetchCommodityPrices();
                setCommodityPrices(pricesRes as CommodityPrice[]);
            } catch (err: any) {
                setError(err.message || "Failed to fetch initial data.");
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const getCountryColor = (feature: CountryFeature) => {
        // This is a placeholder for potential future logic
        return "rgba(107, 114, 128, 0.5)";
    };
    
    const handleCountryClick = (country: object) => {
        const typedCountry = country as CountryFeature;

        if (selectedCountry && selectedCountry.id === typedCountry.id) {
            setSelectedCountry(null);
            setCountryData(null);
            if (globeRef.current) {
                globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 1000);
                globeRef.current.controls().autoRotate = true;
            }
        } else {
            setSelectedCountry(typedCountry);
            setIsLoading(true);
            fetchCountryData(typedCountry.properties.name)
                .then(data => setCountryData(data as CountryData))
                .catch(err => {
                    console.error("Failed to fetch country data:", err);
                    setError(`Failed to load data for ${typedCountry.properties.name}`);
                    setCountryData(null);
                }).finally(() => setIsLoading(false));

            if (viewMode === 'GLOBE' && globeRef.current) {
                 const getCountryCenter = (country: CountryFeature) => {
                    if (!country.geometry) return null;
                    if (country.properties.name === 'Russia') return { lat: 60, lon: 100 };
                    if (country.geometry.type === 'Polygon') {
                        const coordinates = country.geometry.coordinates[0];
                        const centroid = coordinates.reduce((acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]], [0, 0]);
                        return { lat: centroid[1] / coordinates.length, lon: centroid[0] / coordinates.length };
                    }
                    if (country.geometry.type === 'MultiPolygon') {
                        let totalLat = 0, totalLon = 0, pointCount = 0;
                        country.geometry.coordinates.forEach(poly => poly[0].forEach(p => { totalLon += p[0]; totalLat += p[1]; pointCount++; }));
                        return { lat: totalLat / pointCount, lon: totalLon / pointCount };
                    }
                    const [lon, lat] = (country.bbox || [0, 0, 0, 0]).slice(0, 2);
                    return { lat, lon };
                };
                const getOptimalAltitude = (country: CountryFeature) => {
                    if (!country || !country.bbox) return 2.5;
                    const [minLon, minLat, maxLon, maxLat] = country.bbox;
                    const maxDiff = Math.max(Math.abs(maxLon - minLon), Math.abs(maxLat - minLat));
                    const altitude = 1.0 - Math.log10(maxDiff / 180) * 0.5;
                    return Math.max(0.2, Math.min(altitude, 2.0));
                };

                const center = getCountryCenter(typedCountry);
                const altitude = getOptimalAltitude(typedCountry);

                if (center) {
                    globeRef.current.pointOfView({ lat: center.lat, lng: center.lon, altitude }, 1000);
                    globeRef.current.controls().autoRotate = false;
                }
            }
        }
    };
    
    return (
        <div className="relative flex h-screen w-screen flex-col bg-black text-white">
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel */}
                <div className="z-10 w-[24rem] shrink-0 border-r border-slate-800 bg-slate-900/70 p-4 backdrop-blur-sm">
                    <CountryDataPanel 
                        countryData={countryData} 
                        selectedCountryName={selectedCountry?.properties.name || null}
                        isLoading={isLoading && !!selectedCountry}
                    />
                </div>

                {/* Main Content (Globe or Map) */}
                <div className="relative flex-1" ref={containerRef}>
                     <div className={cn("absolute inset-0 transition-opacity duration-500", viewMode === "GLOBE" ? "opacity-100" : "opacity-0 pointer-events-none")}>
                        {viewMode === 'GLOBE' && (
                            <Globe
                                ref={globeRef as React.MutableRefObject<GlobeMethods>}
                                width={dimensions.width}
                                height={dimensions.height}
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                backgroundColor="rgba(0,0,0,0)"
                                polygonsData={countries}
                                polygonCapColor={feat => feat === selectedCountry ? 'rgba(59, 130, 246, 0.8)' : feat === hoveredCountry ? 'rgba(167, 139, 250, 0.7)' : getCountryColor(feat as CountryFeature)}
                                polygonSideColor={() => 'rgba(0, 0, 0, 0.05)'}
                                polygonStrokeColor={feat => feat === selectedCountry ? '#3b82f6' : '#6b7280'}
                                onPolygonClick={handleCountryClick}
                                onPolygonHover={country => setHoveredCountry(country as CountryFeature)}
                                polygonsTransitionDuration={300}
                                onGlobeReady={() => {
                                    if (globeRef.current) {
                                        globeRef.current.controls().autoRotate = true;
                                        globeRef.current.controls().autoRotateSpeed = 0.2;
                                        globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
                                    }
                                }}
                            />
                        )}
                    </div>
                    <div className={cn("absolute inset-0 transition-opacity duration-500", viewMode === "FLAT" ? "opacity-100" : "opacity-0 pointer-events-none")}>
                        {viewMode === 'FLAT' && (
                           <FlatMap
                                countries={countries}
                                selectedCountry={selectedCountry}
                                hoveredCountry={hoveredCountry}
                                onCountryClick={handleCountryClick}
                                onCountryHover={country => setHoveredCountry(country as CountryFeature)}
                                getCountryColor={getCountryColor}
                            />
                        )}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="z-10 w-64 shrink-0 border-l border-slate-800 bg-black/50 backdrop-blur-sm">
                    <RightNavigationPanel viewMode={viewMode} onViewChange={setViewMode} />
                </div>
            </div>
            
            <Ticker commodityPrices={commodityPrices} />

             {error && <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white p-4 rounded-md z-50">{error}</div>}
             {isLoading && countries.length === 0 && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl z-50">Loading CMI...</div>}
        </div>
    );
} 