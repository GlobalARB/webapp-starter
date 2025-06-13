"use client";

const countries = [
  { name: 'KP', score: -53, flag: '🇰🇵' },
  { name: 'MK', score: 26, flag: '🇲🇰' },
  { name: 'NO', score: 44, flag: '🇳🇴' },
  { name: 'OM', score: -3, flag: '🇴🇲' },
  { name: 'PK', score: -35, flag: '🇵🇰' },
  { name: 'PW', score: 24, flag: '🇵🇼' },
  { name: 'PS', score: -4, flag: '🇵🇸' },
  { name: 'PA', score: 22, flag: '🇵🇦' },
  { name: 'PG', score: -1, flag: '🇵🇬' },
  { name: 'PY', score: 16, flag: '🇵🇾' },
  { name: 'PE', score: 4, flag: '🇵🇪' },
  { name: 'PH', score: 7, flag: '🇵🇭' },
  { name: 'PL', score: 39, flag: '🇵🇱' },
  { name: 'PT', score: 36, flag: '🇵🇹' },
  { name: 'QA', score: 12, flag: '🇶🇦' },
  { name: 'RO', score: 45, flag: '🇷🇴' },
  { name: 'RU', score: -45, flag: '🇷🇺' },
];

export function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#0d1a2b] bg-opacity-80 backdrop-blur-sm p-2 text-white">
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap">
        {countries.map((country) => (
          <div key={country.name} className="flex items-center space-x-2">
            <span>{country.flag}</span>
            <span className="font-bold">{country.name}</span>
            <span className={country.score > 0 ? 'text-green-400' : 'text-red-400'}>{country.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 