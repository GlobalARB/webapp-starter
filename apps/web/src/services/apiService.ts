const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787/api';

const MOCK_COUNTRY_DATA: { [key: string]: any } = {
    "Russia": {
        name: "RUSSIA",
        reserves: { title: "Reserves", percentage: 7.2, tons: 2300, change: -1.5, color: "red" },
        exports: { title: "Exports", percentage: 14.9, tons: 3800, change: 2.1, color: "green" },
        production: { title: "Production", percentage: 9.8, tons: 2900, change: 0.5, color: "green" }
    },
    "Canada": {
        name: "CANADA",
        reserves: { title: "Reserves", percentage: 5.1, tons: 1800, change: 0.8, color: "green" },
        exports: { title: "Exports", percentage: 8.2, tons: 2500, change: -0.5, color: "red" },
        production: { title: "Production", percentage: 6.5, tons: 2100, change: 1.2, color: "green" }
    },
    "China": {
        name: "CHINA",
        reserves: { title: "Reserves", percentage: 12.5, tons: 4000, change: 3.5, color: "green" },
        exports: { title: "Exports", percentage: 22.1, tons: 6500, change: 4.0, color: "green" },
        production: { title: "Production", percentage: 18.7, tons: 5800, change: 2.8, color: "green" }
    },
    "United States": {
        name: "USA",
        reserves: { title: "Reserves", percentage: 8.0, tons: 2800, change: 1.1, color: "green" },
        exports: { title: "Exports", percentage: 10.5, tons: 3200, change: -0.2, color: "red" },
        production: { title: "Production", percentage: 9.1, tons: 3000, change: 0.9, color: "green" }
    }
    // Add more mock countries as needed
};

const MOCK_COMMODITY_PRICES = [
    { name: "Gold", price: 2350, change: 1.2, isUp: true },
    { name: "Silver", price: 28.5, change: -0.8, isUp: false },
    { name: "Copper", price: 4.5, change: 2.5, isUp: true },
    { name: "Lithium", price: 14.2, change: -3.1, isUp: false },
    { name: "Crude Oil", price: 85.0, change: 0.5, isUp: true },
    { name: "Natural Gas", price: 2.9, change: 1.8, isUp: true },
    { name: "Platinum", price: 1050, change: -0.2, isUp: false },
    { name: "Palladium", price: 1250, change: 3.0, isUp: true },
    { name: "Uranium", price: 90.0, change: 0.9, isUp: true },
    { name: "Cobalt", price: 25000, change: -1.2, isUp: false },
];

export const fetchCountryData = async (countryName: string) => {
    console.log(`Fetching data for ${countryName}...`);
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = MOCK_COUNTRY_DATA[countryName];
            if (data) {
                resolve(data);
            } else {
                // If no data is found, reject the promise
                reject(new Error(`No data found for ${countryName}`));
            }
        }, 800);
    });
};

export const fetchCommodityPrices = async () => {
    console.log('Fetching commodity prices...');
    return new Promise(resolve => setTimeout(() => resolve(MOCK_COMMODITY_PRICES), 1200));
};

export type CountryData = typeof MOCK_COUNTRY_DATA["Russia"];
export type CommodityPrice = typeof MOCK_COMMODITY_PRICES[0]; 