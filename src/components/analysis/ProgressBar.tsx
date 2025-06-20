import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
  showPercentage?: boolean;
  maxValue?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  color,
  showPercentage = true,
  maxValue = 100
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">{label}</span>
        {showPercentage && (
          <span className={`text-${color} font-bold`}>
            {value}{maxValue === 100 ? '%' : ''}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`bg-${color} h-2 rounded-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;