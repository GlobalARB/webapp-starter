"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryFeature {
  properties: {
    ISO_A2: string;
    ADMIN: string;
  };
}

interface LeftSidebarProps {
    selectedCountry: CountryFeature | undefined;
}

export function LeftSidebar({selectedCountry}: LeftSidebarProps) {
  return (
    <div className="flex flex-col space-y-4 p-4 text-white bg-[#1a2f44] h-full">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-300 rounded-full" />
        <h1 className="text-lg font-bold">GLOBAL INFLUENCE INDEX <span className="text-sm font-normal">by CESI</span></h1>
      </div>
      <p className="text-sm">
        The Global Influence Index (GII) measures the influence of both the U.S. and China in 191 countries. The GII uses 28 measures of influence across the economic, political, and security spectrums to track the U.S.-China competitive landscape.
      </p>
      <div className="flex space-x-2">
        <Button variant="outline">ABOUT</Button>
        <Button variant="outline">STORIES</Button>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">EXPLORE THE DATA</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Overall Influence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overall">Overall Influence</SelectItem>
            <SelectItem value="economic">Economic</SelectItem>
            <SelectItem value="political">Political</SelectItem>
            <SelectItem value="security">Security</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">{selectedCountry ? selectedCountry.properties.ADMIN : 'SELECT A COUNTRY ...'}</h3>
        <div className="bg-[#0d1a2b] p-4 rounded-md">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-red-500 font-bold">CH</span>
            <span className="text-green-500 font-bold">US</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Economic</span>
            <span className="text-xs">0</span>
            <div className="w-20 h-1 bg-gray-600"><div className="h-1 bg-red-500" style={{width: '50%'}}></div></div>
            <span className="text-xs">0</span>
            <span className="text-xs">Economic</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Political</span>
            <span className="text-xs">0</span>
            <div className="w-20 h-1 bg-gray-600"><div className="h-1 bg-red-500" style={{width: '50%'}}></div></div>
            <span className="text-xs">0</span>
            <span className="text-xs">Political</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Security</span>
            <span className="text-xs">0</span>
            <div className="w-20 h-1 bg-gray-600"><div className="h-1 bg-red-500" style={{width: '50%'}}></div></div>
            <span className="text-xs">0</span>
            <span className="text-xs">Security</span>
          </div>
        </div>
      </div>
      <Button variant="default">SELECT A COUNTRY</Button>
    </div>
  );
} 