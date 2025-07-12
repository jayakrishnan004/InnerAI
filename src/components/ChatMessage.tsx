import React from 'react';
import { Heart, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-neutral-600">InnerAI</span>
              {/* AI Status Indicator */}
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">AI Active</span>
              </div>
            </div>
          </div>
        )}
        
        <div className={`p-4 rounded-2xl ${
          isUser 
            ? 'bg-primary-500 text-white' 
            : 'bg-white border border-neutral-200 text-neutral-800 shadow-sm'
        } ${!isUser ? 'rounded-tl-md' : 'rounded-tr-md'}`}>
          <p className="leading-relaxed">{message.text}</p>
        </div>

        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-neutral-600 mb-2">
              <Lightbulb className="w-4 h-4 mr-1" />
              <span>AI-powered suggestions:</span>
            </div>
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="block w-full text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm text-neutral-700 hover:text-neutral-900 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-2 text-xs text-neutral-500 flex items-center justify-between">
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {!isUser && (
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-green-600">AI Enhanced</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;