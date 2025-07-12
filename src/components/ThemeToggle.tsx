import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import anime from 'animejs';

const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const themes = [
    {
      id: 'light' as const,
      name: 'Light',
      icon: Sun,
      description: 'Bright and clean',
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'dark' as const,
      name: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes',
      gradient: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'auto' as const,
      name: 'Auto',
      icon: Monitor,
      description: 'Follows system',
      gradient: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    }
  ];

  const currentThemeData = themes.find(t => t.id === theme) || themes[0];

  useEffect(() => {
    if (isOpen && menuRef.current) {
      anime({
        targets: menuRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        easing: 'easeOutBack'
      });

      anime({
        targets: menuRef.current.querySelectorAll('.theme-option'),
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 200,
        delay: anime.stagger(50, {start: 100}),
        easing: 'easeOutCubic'
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
    setIsOpen(false);
    
    // Button animation
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        duration: 600,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  const getCurrentIcon = () => {
    if (theme === 'auto') {
      return actualTheme === 'dark' ? Moon : Sun;
    }
    return currentThemeData.icon;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Theme Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-gray-700 p-4 min-w-[280px] backdrop-blur-sm"
        >
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-neutral-800 dark:text-white">Choose Theme</h3>
            </div>
            <p className="text-sm text-neutral-600 dark:text-gray-300">
              Customize your InnerAI experience
            </p>
          </div>

          <div className="space-y-2">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isSelected = theme === themeOption.id;
              
              return (
                <button
                  key={themeOption.id}
                  onClick={() => handleThemeChange(themeOption.id)}
                  className={`theme-option w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                    isSelected 
                      ? `${themeOption.bgColor} ${themeOption.borderColor} border-2 shadow-md` 
                      : 'hover:bg-neutral-50 dark:hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${themeOption.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className={`font-medium ${isSelected ? themeOption.textColor : 'text-neutral-800 dark:text-white'}`}>
                      {themeOption.name}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-gray-300">
                      {themeOption.description}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${themeOption.gradient} flex items-center justify-center`}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current Status */}
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-gray-300">Current:</span>
              <div className="flex items-center space-x-2">
                <CurrentIcon className="w-4 h-4 text-neutral-600 dark:text-gray-300" />
                <span className="font-medium text-neutral-800 dark:text-white">
                  {theme === 'auto' ? `Auto (${actualTheme})` : currentThemeData.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${currentThemeData.gradient} text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group border-4 border-white/20 backdrop-blur-sm relative overflow-hidden`}
        title="Change Theme"
      >
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
        
        {/* Icon */}
        <CurrentIcon className="w-6 h-6 relative z-10 group-hover:animate-pulse drop-shadow-lg" />
        
        {/* Pulsing rings */}
        <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-white/20 animate-ping"></div>
        <div className="absolute inset-1 w-12 h-12 rounded-xl bg-white/10 animate-pulse"></div>
        
        {/* Theme indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xs font-bold text-neutral-700">
            {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🔄'}
          </span>
        </div>
        
        {/* Floating sparkles around button */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-300/80 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -left-2 w-2 h-2 bg-pink-300/70 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </button>
    </div>
  );
};

export default ThemeToggle;