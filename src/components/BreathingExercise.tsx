import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Heart } from 'lucide-react';

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  // Emotional support emojis and messages
  const completionEmojis = ['🌟', '💚', '🌸', '✨', '🦋', '🌈', '💙', '🕊️', '🌺', '💫'];
  const supportMessages = [
    "You did amazing! 🌟 Your mind is now calmer and more centered.",
    "Beautiful work! 💚 You've taken a wonderful step for your mental health.",
    "Fantastic! ✨ Feel the peace and tranquility you've created within yourself.",
    "Well done! 🦋 You've given yourself the gift of mindful breathing.",
    "Excellent! 🌈 Your stress has melted away through your dedication."
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const phases = {
      inhale: { duration: 4000, next: 'hold' as const, count: 4 },
      hold: { duration: 7000, next: 'exhale' as const, count: 7 },
      exhale: { duration: 8000, next: 'pause' as const, count: 8 },
      pause: { duration: 1000, next: 'inhale' as const, count: 1 }
    };

    const currentPhase = phases[phase];
    const interval = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      if (phase === 'pause') {
        const newCycle = cycle + 1;
        setCycle(newCycle);
        
        // Show completion celebration after 4 cycles
        if (newCycle >= 4) {
          setIsPlaying(false);
          setShowCompletion(true);
          // Auto-hide completion after 5 seconds
          setTimeout(() => setShowCompletion(false), 5000);
        }
      }
      setPhase(currentPhase.next);
      setCount(phases[currentPhase.next].count);
    }, currentPhase.duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPlaying, phase, cycle]);

  const reset = () => {
    setIsPlaying(false);
    setPhase('inhale');
    setCount(4);
    setCycle(0);
    setShowCompletion(false);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-primary-400 to-primary-600';
      case 'hold': return 'from-secondary-400 to-secondary-600';
      case 'exhale': return 'from-accent-400 to-accent-600';
      case 'pause': return 'from-neutral-300 to-neutral-500';
    }
  };

  const getPhaseScale = () => {
    switch (phase) {
      case 'inhale': return 'scale-110';
      case 'hold': return 'scale-110';
      case 'exhale': return 'scale-90';
      case 'pause': return 'scale-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Floating particles for ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white bg-opacity-20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Completion Celebration Overlay */}
      {showCompletion && (
        <div className="absolute inset-0 flex items-center justify-center z-60 pointer-events-none">
          {/* Floating celebration emojis */}
          {completionEmojis.map((emoji, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              {emoji}
            </div>
          ))}
          
          {/* Celebration message */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-6 shadow-2xl border-4 border-primary-200 animate-pulse-gentle max-w-sm mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-xl font-bold text-primary-600 mb-2">Congratulations!</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                {supportMessages[Math.floor(Math.random() * supportMessages.length)]}
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-2xl">🧘‍♀️</span>
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 opacity-50" />
        
        {/* Stress relief waves */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-200 to-transparent rounded-full opacity-20 animate-pulse-gentle" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-secondary-200 to-transparent rounded-full opacity-20 animate-pulse-gentle" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary-500 mr-2 animate-pulse" />
              <h2 className="text-2xl font-bold text-neutral-800">4-7-8 Breathing</h2>
              <Sparkles className="w-6 h-6 text-secondary-500 ml-2 animate-pulse" />
            </div>
            <p className="text-neutral-600">Let stress melt away with each breath</p>
          </div>

          <div className="flex flex-col items-center mb-8">
            {/* Main breathing circle with enhanced animations */}
            <div className="relative mb-6">
              {/* Outer glow rings */}
              <div className={`absolute inset-0 w-40 h-40 rounded-full bg-gradient-to-r ${getPhaseColor()} opacity-20 ${isPlaying ? 'animate-ping' : ''}`} />
              <div className={`absolute inset-2 w-36 h-36 rounded-full bg-gradient-to-r ${getPhaseColor()} opacity-30 ${isPlaying ? 'animate-pulse' : ''}`} />
              
              {/* Main breathing circle */}
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getPhaseColor()} flex items-center justify-center transition-all duration-1000 transform ${
                isPlaying ? `${getPhaseScale()} shadow-2xl` : 'scale-100 shadow-lg'
              } relative overflow-hidden`}>
                {/* Inner shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
                
                {/* Count display */}
                <span className="text-white text-3xl font-bold relative z-10 drop-shadow-lg">{count}</span>
                
                {/* Breathing particles */}
                {isPlaying && [...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-ping"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-semibold text-neutral-800 mb-2 transition-all duration-500">
                {cycle >= 4 ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Complete! </span>
                    <span className="text-2xl">🎉</span>
                  </div>
                ) : (
                  getPhaseText()
                )}
              </div>
              <div className="text-sm text-neutral-600 flex items-center justify-center">
                <div className="flex space-x-1 mr-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < cycle ? 'bg-primary-500' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                {cycle >= 4 ? (
                  <span className="text-primary-600 font-medium">Exercise Complete! 🌟</span>
                ) : (
                  `Cycle ${cycle} of 4`
                )}
              </div>
            </div>
          </div>

          {/* Enhanced control buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={cycle >= 4}
              className={`flex items-center space-x-2 px-6 py-3 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                cycle >= 4 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
              }`}
            >
              {cycle >= 4 ? (
                <>
                  <span className="text-xl">✅</span>
                  <span className="font-medium">Completed</span>
                </>
              ) : (
                <>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span className="font-medium">{isPlaying ? 'Pause' : 'Start'}</span>
                </>
              )}
            </button>
            
            <button
              onClick={reset}
              className="flex items-center space-x-2 px-4 py-3 border-2 border-neutral-300 rounded-xl hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">Reset</span>
            </button>
          </div>

          {/* Stress relief progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
              <span>Stress Relief Progress</span>
              <span className="flex items-center space-x-1">
                <span>{Math.min(cycle * 25, 100)}%</span>
                {cycle >= 4 && <span className="text-lg">🎯</span>}
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  cycle >= 4 
                    ? 'bg-gradient-to-r from-green-400 to-green-600' 
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                }`}
                style={{ width: `${Math.min(cycle * 25, 100)}%` }}
              />
            </div>
          </div>

          {/* Motivational message with emojis */}
          <div className="text-center mb-4">
            <p className="text-sm text-neutral-600 italic flex items-center justify-center space-x-2">
              {cycle === 0 && (
                <>
                  <span>🧘‍♀️</span>
                  <span>Take a moment to center yourself</span>
                </>
              )}
              {cycle === 1 && (
                <>
                  <span>🌊</span>
                  <span>Feel the tension beginning to release</span>
                </>
              )}
              {cycle === 2 && (
                <>
                  <span>🕊️</span>
                  <span>Your mind is becoming calmer</span>
                </>
              )}
              {cycle === 3 && (
                <>
                  <span>✨</span>
                  <span>Stress is melting away with each breath</span>
                </>
              )}
              {cycle >= 4 && (
                <>
                  <span>🌟</span>
                  <span>You've achieved a state of calm and peace</span>
                  <span>💚</span>
                </>
              )}
            </p>
          </div>

          {/* Completion celebration message */}
          {cycle >= 4 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4 border border-green-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🎉 🌟 🎉</div>
                <p className="text-green-700 font-medium text-sm">
                  Wonderful job! You've completed your breathing exercise and taken a meaningful step toward better mental health.
                </p>
                <div className="flex justify-center space-x-2 mt-2 text-xl">
                  <span>💚</span>
                  <span>🧘‍♀️</span>
                  <span>✨</span>
                  <span>🌈</span>
                  <span>💙</span>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={onClose}
              className="text-neutral-600 hover:text-neutral-800 transition-colors font-medium"
            >
              Close Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;