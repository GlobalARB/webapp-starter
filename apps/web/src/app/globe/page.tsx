"use client";
import dynamic from 'next/dynamic';

const GlobeVisualization = dynamic(
    () => import('@/components/globe-visualization'),
    { 
        ssr: false,
        loading: () => <div className="w-full h-screen bg-black flex items-center justify-center text-white">Loading Globe...</div>
    }
);

export default function GlobePage() {
  return <GlobeVisualization />;
} 