"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Menu,
  Map,
  Book,
  BarChart2,
  Table,
  Share2,
  Download,
} from "lucide-react";
import { Label } from "./ui/label";

function ViewControls() {
  return (
    <div className="space-y-4 rounded-lg bg-gray-800/50 p-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="map-mode" className="text-xs font-light">
          MAP
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold">FLAT</span>
          <Switch id="map-mode" defaultChecked />
          <span className="text-xs font-bold">GLOBE</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="data-mode" className="text-xs font-light">
          DATA
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold">FILL</span>
          <Switch id="data-mode" />
          <span className="text-xs font-bold">SPIKE</span>
        </div>
      </div>
    </div>
  );
}

const navButtons = [
  { icon: Map, label: "MAP" },
  { icon: Book, label: "STORIES" },
  { icon: BarChart2, label: "CHART" },
  { icon: Table, label: "TABLE" },
];

function NavigationButtons() {
  return (
    <div className="space-y-2">
      {navButtons.map(({ icon: Icon, label }) => (
        <Button
          key={label}
          variant="ghost"
          className="flex w-full flex-col items-center justify-center gap-1 rounded-lg bg-gray-800/50 p-2 text-xs"
          style={{ height: "60px" }}
        >
          <Icon className="size-5" />
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
}

function ColorLegend() {
    return (
        <div className="rounded-lg bg-gray-800/50 p-3 text-xs">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-3 bg-green-500"></div>
                    <span>US-ALIGNED</span>
                </div>
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-3 bg-gray-500"></div>
                    <span>NEUTRAL</span>
                </div>
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-3 bg-red-500"></div>
                    <span>CHINA-ALIGNED</span>
                </div>
            </div>
        </div>
    )
}

function ActionButtons() {
  return (
    <div className="space-y-2">
       <ColorLegend />
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 p-2 text-xs"
      >
        <span>Share</span>
        <Share2 className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 p-2 text-xs"
      >
        <span>Data</span>
        <Download className="size-4" />
      </Button>
    </div>
  );
}

export default function RightNavigationPanel() {
  return (
    <div className="flex h-full flex-col justify-between p-1">
      <div className="space-y-4">
        <div className="flex justify-end">
            <Button size="icon" variant="ghost" className="bg-gray-800/50">
                <Menu />
            </Button>
        </div>
        <ViewControls />
        <NavigationButtons />
      </div>

      <ActionButtons />
    </div>
  );
} 