import React from 'react';
import type { WeatherCardProps } from '../types';

const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center justify-center gap-2">
      <div className="text-white/60">{title}</div>
      <div className="text-2xl font-semibold text-white flex items-center gap-2">
        {icon}
        {value}
      </div>
    </div>
  );
};

export default WeatherCard;