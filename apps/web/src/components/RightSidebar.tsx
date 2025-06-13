"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Menu, Map, BarChart2, Table, Share2, Download } from 'lucide-react';

export function RightSidebar() {
  return (
    <div className="flex flex-col justify-between p-4 text-white bg-[#1a2f44] h-full">
      <div>
        <div className="flex justify-end mb-4">
            <Button variant="ghost" size="icon">
                <Menu />
            </Button>
        </div>
        <div className="space-y-4">
            <div className="bg-[#0d1a2b] p-2 rounded-md">
                <ToggleGroup type="single" defaultValue="globe" variant="outline">
                    <ToggleGroupItem value="map">MAP</ToggleGroupItem>
                    <ToggleGroupItem value="flat">FLAT</ToggleGroupItem>
                    <ToggleGroupItem value="globe">GLOBE</ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" defaultValue="fill" variant="outline" className="mt-2">
                    <ToggleGroupItem value="data">DATA</ToggleGroupItem>
                    <ToggleGroupItem value="fill">FILL</ToggleGroupItem>
                    <ToggleGroupItem value="spike">SPIKE</ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="flex flex-col items-center space-y-2">
                <Button variant="ghost" className="w-full flex flex-col items-center h-auto">
                    <Map size={24}/>
                    <span className="text-xs">MAP</span>
                </Button>
                <Button variant="ghost" className="w-full flex flex-col items-center h-auto">
                    <BarChart2 size={24}/>
                    <span className="text-xs">CHART</span>
                </Button>
                <Button variant="ghost" className="w-full flex flex-col items-center h-auto">
                    <Table size={24}/>
                    <span className="text-xs">TABLE</span>
                </Button>
            </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Data
            </Button>
        </div>
        <div className="bg-[#0d1a2b] p-2 rounded-md text-xs">
            <ul>
                <li className="flex items-center"><span className="w-3 h-3 bg-green-500 mr-2"></span> US-ALIGNED</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-yellow-500 mr-2"></span> NEUTRAL</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-red-500 mr-2"></span> CHINA-ALIGNED</li>
            </ul>
        </div>
      </div>
    </div>
  );
} 