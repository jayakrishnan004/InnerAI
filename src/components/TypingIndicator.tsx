import React from 'react';
import { Heart } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-xs lg:max-w-md">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-2">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-neutral-600">InnerAI</span>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-md p-4 shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;