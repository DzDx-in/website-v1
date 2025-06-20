import React from 'react';

interface AnalysisCardProps {
  label: string;
  value: string;
  color?: string;
  borderColor?: string;
  description?: string;
  icon?: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  label,
  value,
  color = "gray-300",
  borderColor = "white/20",
  description,
  icon
}) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-${borderColor}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-400">{icon}</div>}
          <span className="text-gray-300">{label}</span>
        </div>
        <span className={`text-${color} font-bold`}>{value}</span>
      </div>
      {description && (
        <div className="text-xs text-gray-400 mt-1">{description}</div>
      )}
    </div>
  );
};

export default AnalysisCard;