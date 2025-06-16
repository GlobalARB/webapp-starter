"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ZoomControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export default function ZoomControls({ onZoomIn, onZoomOut }: ZoomControlsProps) {
    return (
        <div className="flex flex-col space-y-2">
            <Button size="icon" onClick={onZoomIn} className="bg-gray-800/50">
                <Plus className="size-5" />
            </Button>
            <Button size="icon" onClick={onZoomOut} className="bg-gray-800/50">
                <Minus className="size-5" />
            </Button>
        </div>
    );
} 