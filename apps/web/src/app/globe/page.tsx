"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { BottomBar } from "@/components/BottomBar";

const Globe = dynamic(() => import("@/components/globe"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

// Define type for a country feature
interface CountryFeature {
  properties: {
    ISO_A2: string;
    ADMIN: string;
  };
}

export default function GlobePage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryFeature | undefined>();

  return (
    <div className="relative flex h-screen bg-[#0d1a2b]">
      {/* Left Sidebar */}
      <div className="w-1/5">
        <LeftSidebar selectedCountry={selectedCountry} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Globe setSelectedCountry={setSelectedCountry} />
      </div>

      {/* Right Sidebar */}
      <div className="w-1/5">
        <RightSidebar />
      </div>
      <BottomBar />
    </div>
  );
} 