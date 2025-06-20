import React from 'react';

interface SourceBadgeProps {
  name: string;
  grade: string;
  credibility: number;
  type: 'primary' | 'secondary' | 'opinion';
  description?: string;
}

const SourceBadge: React.FC<SourceBadgeProps> = ({
  name,
  grade,
  credibility,
  description
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-600';
      case 'B': return 'bg-yellow-600';
      case 'C': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-black/20 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 ${getGradeColor(grade)} rounded text-white text-xs flex items-center justify-center font-bold`}>
            {grade}
          </div>
          <span className="text-white text-sm">{name}</span>
        </div>
        <span className={`${getCredibilityColor(credibility)} text-xs`}>
          Credibility: {credibility}/10
        </span>
      </div>
      {description && (
        <div className="text-xs text-gray-400">{description}</div>
      )}
    </div>
  );
};

export default SourceBadge;