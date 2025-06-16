import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface DataItem {
    title: string;
    percentage: number;
    tons: number;
    change: number;
    color: string;
}

interface DataListProps {
    data: DataItem;
}

export default function DataList({ data }: DataListProps) {
    const isUp = data.change >= 0;
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{data.title}</h3>
                <span className={`text-2xl font-bold ${data.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                    {data.percentage}%
                </span>
            </div>
            <div className="flex justify-between items-center mt-1 text-gray-400">
                <span>{data.tons.toLocaleString()} tons</span>
                <div className={`flex items-center ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {isUp ? <FaArrowUp /> : <FaArrowDown />}
                    <span className="ml-1">{data.change}%</span>
                </div>
            </div>
        </div>
    );
} 