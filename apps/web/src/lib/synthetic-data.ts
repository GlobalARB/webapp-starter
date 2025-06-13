export interface CountryData {
  iso: string;
  name: string;
  score_title: string;
  reserves: { name: string; value: number; max: number }[];
  exports: { name: string; value: number; max: number }[];
  production: { name: string; value: number; max: number }[];
}

export const syntheticCountryData: Record<string, CountryData> = {
  "840": {
    iso: "USA",
    name: "United States",
    score_title: "Moderate Cobalt Reserves",
    reserves: [
      { name: "Lithium", value: 1000, max: 10000 },
      { name: "Cobalt", value: 500, max: 2000 },
      { name: "Nickel", value: 300, max: 5000 },
    ],
    exports: [
      { name: "Copper", value: 1200, max: 3000 },
      { name: "Bauxite", value: 400, max: 1500 },
      { name: "Iron Ore", value: 8000, max: 20000 },
    ],
    production: [
      { name: "Rare Earths", value: 600, max: 2500 },
      { name: "Platinum", value: 100, max: 500 },
    ],
  },
  "124": {
    iso: "CAN",
    name: "Canada",
    score_title: "High Potash Production",
    reserves: [
        { name: "Potash", value: 9000, max: 10000 },
        { name: "Nickel", value: 4500, max: 5000 },
        { name: "Uranium", value: 6000, max: 8000 },
    ],
    exports: [
        { name: "Potash", value: 8500, max: 10000 },
        { name: "Uranium", value: 5000, max: 8000 },
    ],
    production: [
        { name: "Potash", value: 9500, max: 10000 },
        { name: "Diamonds", value: 1500, max: 2000 },
    ],
  },
  "643": {
    iso: "RUS",
    name: "Russia",
    score_title: "Major Nickel Exporter",
    reserves: [
        { name: "Nickel", value: 4800, max: 5000 },
        { name: "Palladium", value: 9500, max: 10000 },
        { name: "Diamonds", value: 1800, max: 2000 },
    ],
    exports: [
        { name: "Nickel", value: 4900, max: 5000 },
        { name: "Palladium", value: 9800, max: 10000 },
    ],
    production: [
        { name: "Natural Gas", value: 10000, max: 10000 },
        { name: "Oil", value: 9000, max: 10000 },
    ],
  },
  "156": {
    iso: "CHN",
    name: "China",
    score_title: "Dominant Rare Earths Producer",
    reserves: [
        { name: "Rare Earths", value: 9800, max: 10000 },
        { name: "Gold", value: 2000, max: 5000 },
        { name: "Coal", value: 10000, max: 10000 },
    ],
    exports: [
        { name: "Rare Earths", value: 9900, max: 10000 },
        { name: "Electronics", value: 9500, max: 10000 },
    ],
    production: [
        { name: "Rare Earths", value: 9950, max: 10000 },
        { name: "Steel", value: 9800, max: 10000 },
    ],
  },
}; 