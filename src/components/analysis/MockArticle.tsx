import React from 'react';

interface Highlight {
  text: string;
  type: 'sentiment' | 'bias' | 'entity' | 'propaganda' | 'simple' | 'medium' | 'complex';
  color?: string;
}

interface Overlay {
  type: string;
  value: string;
  position?: 'top-right' | 'bottom-left' | 'bottom-right';
}

interface MockArticleProps {
  source: string;
  headline: string;
  content: string;
  highlights?: Highlight[];
  overlays?: Overlay[];
}

const MockArticle: React.FC<MockArticleProps> = ({
  source,
  headline,
  content,
  highlights = [],
  overlays = []
}) => {
  const getHighlightColor = (type: string) => {
    switch (type) {
      case 'sentiment': return 'bg-blue-500/30';
      case 'bias': return 'bg-yellow-500/20';
      case 'entity': return 'bg-purple-500/30';
      case 'propaganda': return 'bg-red-500/40';
      case 'simple': return 'bg-green-500/20';
      case 'medium': return 'bg-yellow-500/20';
      case 'complex': return 'bg-red-500/20';
      default: return 'bg-white/10';
    }
  };

  const renderContentWithHighlights = (text: string) => {
    if (highlights.length === 0) return text;
    
    let result = text;
    highlights.forEach((highlight, index) => {
      const className = getHighlightColor(highlight.type);
      result = result.replace(
        highlight.text,
        `<span class="${className} px-1 rounded" key="${index}">${highlight.text}</span>`
      );
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
      {/* Status Indicators */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
      </div>
      
      {/* Article Content */}
      <div className="text-xs text-gray-400 mb-3">{source} • Breaking News</div>
      
      <h3 className="text-lg font-bold text-white mb-4 relative">
        {renderContentWithHighlights(headline)}
        {overlays.map((overlay, index) => (
          <div 
            key={index}
            className={`absolute -top-2 -right-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full`}
          >
            {overlay.type}: {overlay.value}
          </div>
        ))}
      </h3>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {renderContentWithHighlights(content)}
      </p>
      
      {/* Bottom Metrics */}
      <div className="flex items-center gap-4 text-xs">
        <div className="bg-blue-600/20 px-3 py-1 rounded-full text-blue-400">
          Analyzing...
        </div>
        <div className="bg-green-600/20 px-3 py-1 rounded-full text-green-400">
          Processing...
        </div>
      </div>
    </div>
  );
};

export default MockArticle;