"use client";

import { useEffect, useMemo, useState } from "react";
import Globe from "react-globe.gl";

// Define type for a country feature
interface CountryFeature {
  properties: {
    ISO_A2: string;
    ADMIN: string;
  };
  // Add other properties if they exist in your GeoJSON
}

interface GlobeComponentProps {
    setSelectedCountry: (country: CountryFeature | undefined) => void;
}

const GlobeComponent = ({setSelectedCountry}: GlobeComponentProps) => {
  const [countries, setCountries] = useState<{ features: CountryFeature[] }>({ features: [] });
  const [hoverD, setHoverD] = useState<CountryFeature | undefined>();

  useEffect(() => {
    // load data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => setCountries(data as { features: CountryFeature[] }));
  }, []);

  const colorScale = (d: CountryFeature) => {
      //dummy data
    if(d.properties.ISO_A2 === 'US' || d.properties.ISO_A2 === 'CA' || d.properties.ISO_A2 === 'AU' || d.properties.ISO_A2 === 'GB') return 'rgba(0, 255, 0, 0.7)';
    if(d.properties.ISO_A2 === 'CN' || d.properties.ISO_A2 === 'RU') return 'rgba(255, 0, 0, 0.7)';
    return 'rgba(255, 255, 0, 0.7)';
  }

  const handlePolygonClick = (d: CountryFeature) => {
    setSelectedCountry(d);
    // You can also add logic here to zoom into the country, etc.
  }

  return <Globe
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
    
    polygonsData={countries.features}
    polygonCapColor={d => d === hoverD ? 'rgba(0, 0, 255, 1)' : colorScale(d as CountryFeature)}
    polygonSideColor={() => 'rgba(0, 0, 0, 0.05)'}
    polygonStrokeColor={() => '#333'}
    onPolygonHover={(d) => setHoverD(d as CountryFeature)}
    onPolygonClick={handlePolygonClick}
    polygonsTransitionDuration={300}

    polygonLabel={(d) => {
        const country = d as CountryFeature;
        return `
        <b>${country.properties.ADMIN}</b> <br />
      `}}
  />;
};

export default GlobeComponent; 