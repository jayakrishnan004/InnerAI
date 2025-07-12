import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Wind, Book, User, Menu, X, ArrowLeft, BarChart3, Sparkles, Heart, Star, Brain, Music, Info } from 'lucide-react';
import { Message } from './types';
import { generateAIResponse, detectCrisis } from './utils/aiResponses';
import { getRandomExercise } from './utils/exercises';
import { detectEmotion, getEmotionalInsight } from './utils/emotionDetection';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import WelcomeMessage from './components/WelcomeMessage';
import BreathingExercise from './components/BreathingExercise';
import Dashboard from './components/Dashboard';
import MusicPlayer from './components/MusicPlayer';
import EmotionInsights from './components/EmotionInsights';
import Journal from './components/Journal';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';
import anime from 'animejs';

function App() {
  const { actualTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showEmotionInsights, setShowEmotionInsights] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'positive' | 'negative' | 'neutral'>('neutral');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [crisisInfo, setCrisisInfo] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Enhanced emotion detection with AI insights
  useEffect(() => {
    const detectedEmotion = detectEmotion(messages);
    let simplifiedEmotion: 'positive' | 'negative' | 'neutral' = 'neutral';
    
    if (['anxious', 'sad', 'stressed', 'angry', 'lonely', 'overwhelmed'].includes(detectedEmotion)) {
      simplifiedEmotion = 'negative';
    } else if (['excited', 'positive', 'happy', 'hopeful'].includes(detectedEmotion)) {
      simplifiedEmotion = 'positive';
    }
    
    if (simplifiedEmotion !== currentEmotion) {
      setCurrentEmotion(simplifiedEmotion);
      
      // Auto-show music player when negative emotions are detected
      if (simplifiedEmotion === 'negative' && messages.length > 0) {
        setShowMusicPlayer(true);
        
        // Show emotional insight with enhanced AI understanding
        setTimeout(() => {
          const insight = getEmotionalInsight(detectedEmotion);
          addMessage(insight, 'ai', ['Play calming music', 'Try breathing exercise', 'View emotion insights', 'Start journaling']);
        }, 1500);
      }
    }
  }, [messages, currentEmotion]);

  useEffect(() => {
    // Header entrance animation
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
      });
    }

    // Logo breathing animation
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        duration: 3000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Bot name typing animation
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const text = 'InnerAI';
      titleElement.innerHTML = '';
      
      // Create spans for each letter
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.className = 'letter-animation';
        titleElement.appendChild(span);
      });

      // Animate each letter
      anime({
        targets: '.letter-animation',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.8, 1.2, 1],
        duration: 600,
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutElastic(1, .8)'
      });

      // Continuous color animation for the title
      anime({
        targets: '.letter-animation',
        color: [
          '#FFFFFF', // white
          '#FEF3C7', // warm yellow
          '#FDE68A', // light yellow
          '#F59E0B', // golden yellow
          '#FBBF24', // bright yellow
          '#FFFFFF'  // back to white
        ],
        duration: 4000,
        loop: true,
        easing: 'easeInOutQuad',
        delay: anime.stagger(200)
      });
    }

    // Floating sparkles animation
    const createFloatingSparkles = () => {
      const sparkles = document.querySelectorAll('.floating-sparkle');
      sparkles.forEach((sparkle, index) => {
        anime({
          targets: sparkle,
          translateY: [
            { value: -15, duration: 1500 },
            { value: 0, duration: 1500 }
          ],
          translateX: [
            { value: 10, duration: 1000 },
            { value: -10, duration: 1000 },
            { value: 0, duration: 1000 }
          ],
          rotate: [0, 360],
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
          duration: 2000,
          delay: index * 300,
          loop: true,
          easing: 'easeInOutSine'
        });
      });
    };

    setTimeout(createFloatingSparkles, 1000);

  }, []);

  const addMessage = (text: string, sender: 'user' | 'ai', suggestions?: string[], mood?: 'positive' | 'negative' | 'neutral') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      suggestions,
      mood
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Check for crisis indicators first
    const crisis = detectCrisis(text);
    if (crisis.isCrisis) {
      setCrisisInfo(crisis);
      setShowCrisisAlert(true);
    }

    addMessage(text, 'user');
    setInputValue('');
    setIsTyping(true);

    try {
      // Use enhanced AI response with Gemini integration and emotion analysis
      const aiResult = await generateAIResponse(text, messages);
      
      // Store AI insights for emotion analysis
      if (aiResult.emotionAnalysis) {
        setAiInsights(aiResult);
      }
      
      // Add a slight delay for more natural conversation flow
      setTimeout(() => {
        addMessage(aiResult.response, 'ai', aiResult.suggestions, aiResult.mood);
        setIsTyping(false);
        
        // Show therapeutic focus if available
        if (aiResult.therapeuticFocus) {
          console.log('Therapeutic focus:', aiResult.therapeuticFocus);
        }
        
        // Show AI confidence indicator if available
        if (aiResult.confidence && aiResult.confidence < 0.7) {
          console.log('AI response confidence:', aiResult.confidence);
        }
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Enhanced fallback response with emotion awareness
      setTimeout(() => {
        addMessage(
          "I'm having trouble connecting right now, but I'm still here for you. Sometimes taking a moment to breathe can help us both. Your emotions are valid, and I want to support you through this. 💚", 
          'ai', 
          ['Try deep breathing', 'Take a short break', 'Practice mindfulness', 'View emotion insights']
        );
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.toLowerCase().includes('breathing')) {
      setShowBreathingExercise(true);
    } else if (suggestion.toLowerCase().includes('music') || suggestion.toLowerCase().includes('calming')) {
      setShowMusicPlayer(true);
    } else if (suggestion.toLowerCase().includes('emotion insights') || suggestion.toLowerCase().includes('view emotion')) {
      setShowEmotionInsights(true);
    } else if (suggestion.toLowerCase().includes('journal')) {
      setShowJournal(true);
    } else if (suggestion.toLowerCase().includes('exercise') || suggestion.toLowerCase().includes('walk')) {
      const exercise = getRandomExercise('movement');
      addMessage(`Here's a ${exercise.title} exercise for you: ${exercise.description}. ${exercise.instructions.join(' → ')}`, 'ai');
    } else if (suggestion.toLowerCase().includes('grounding')) {
      const exercise = getRandomExercise('mindfulness');
      addMessage(`Let's do a ${exercise.title} exercise: ${exercise.description}. ${exercise.instructions.join(' → ')}`, 'ai');
    } else {
      handleSendMessage(suggestion);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToHome = () => {
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
    setIsMobileMenuOpen(false);
    setCurrentEmotion('neutral');
    setAiInsights(null);
  };

  const handleLogoClick = () => {
    // Fun logo click animation
    anime({
      targets: logoRef.current,
      scale: [1, 1.3, 1],
      rotate: [0, 360],
      duration: 800,
      easing: 'easeOutElastic(1, .8)'
    });

    // Title celebration animation
    anime({
      targets: '.letter-animation',
      scale: [1, 1.4, 1],
      rotate: [0, 15, -15, 0],
      duration: 600,
      delay: anime.stagger(50),
      easing: 'easeOutElastic(1, .8)'
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      actualTheme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'
    }`}>
      {/* Crisis Alert Modal */}
      {showCrisisAlert && crisisInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full shadow-2xl border-l-4 border-red-500 ${
            actualTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
          }`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${actualTheme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>We're Here for You</h3>
                <p className={`text-sm ${actualTheme === 'dark' ? 'text-gray-300' : 'text-neutral-600'}`}>Immediate support available</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className={`mb-4 ${actualTheme === 'dark' ? 'text-gray-300' : 'text-neutral-700'}`}>{crisisInfo.response}</p>
              
              {crisisInfo.resources && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Immediate Resources:</h4>
                  <ul className="space-y-2">
                    {crisisInfo.resources.map((resource: string, index: number) => (
                      <li key={index} className="text-sm text-red-700 dark:text-red-300 flex items-start">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCrisisAlert(false)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                I Understand
              </button>
              <button
                onClick={() => {
                  window.open('tel:988', '_blank');
                  setShowCrisisAlert(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Call 988 Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Header with Theme Support */}
      <header 
        ref={headerRef}
        className={`relative border-b-2 sticky top-0 z-40 shadow-xl overflow-hidden transition-colors duration-300 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-gray-600' 
            : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600'
        }`}
      >
        {/* Subtle Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gentle floating shapes */}
          <div className="absolute top-3 left-1/4 w-6 h-6 bg-white bg-opacity-10 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-4 right-1/3 w-4 h-4 bg-yellow-300 bg-opacity-20 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-3 left-1/3 w-3 h-3 bg-blue-300 bg-opacity-20 rotate-45 animate-wiggle"></div>
          
          {/* Subtle sparkles */}
          <Sparkles className="floating-sparkle absolute top-4 left-20 w-4 h-4 text-yellow-300 opacity-50" />
          <Star className="floating-sparkle absolute top-3 right-24 w-3 h-3 text-blue-300 opacity-40" />
          <Sparkles className="floating-sparkle absolute bottom-4 left-1/2 w-4 h-4 text-purple-300 opacity-50" />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-wave"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {messages.length > 0 && (
              <button
                onClick={handleBackToHome}
                className="group p-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-110"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
              </button>
            )}
            
            {/* Enhanced Logo with Emotion Indicator */}
            <div 
              ref={logoRef}
              onClick={handleLogoClick}
              className="relative cursor-pointer group"
            >
              {/* Emotion-based glow effect */}
              <div className={`absolute inset-0 w-12 h-12 rounded-full opacity-20 animate-pulse ${
                currentEmotion === 'positive' ? 'bg-gradient-to-r from-green-400 to-blue-400' :
                currentEmotion === 'negative' ? 'bg-gradient-to-r from-red-400 to-orange-400' :
                'bg-gradient-to-r from-blue-400 to-purple-400'
              }`}></div>
              
              {/* Main logo */}
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:border-yellow-300 transition-all duration-300 ${
                currentEmotion === 'positive' ? 'bg-gradient-to-r from-green-500 to-blue-600' :
                currentEmotion === 'negative' ? 'bg-gradient-to-r from-red-500 to-orange-600' :
                'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <Heart className="w-6 h-6 text-white animate-heartbeat drop-shadow-sm" />
              </div>
            </div>
            
            {/* Enhanced Title Section */}
            <div className="relative">
              {/* Title with high contrast white/yellow animation */}
              <h1 
                ref={titleRef}
                className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-wide"
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {/* Letters will be dynamically added here */}
              </h1>
              
              {/* Enhanced subtitle with emotion awareness */}
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-slate-200 drop-shadow-sm font-medium">
                  Your emotional intelligence companion
                </p>
                <div className="flex space-x-1">
                  <span className="text-sm animate-bounce" style={{ animationDelay: '0s' }}>🧠</span>
                  <span className="text-sm animate-bounce" style={{ animationDelay: '0.2s' }}>💚</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setShowMusicPlayer(true)}
              className="group flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
            >
              <Music className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium text-sm">Music</span>
              <span className="text-sm group-hover:animate-bounce">🎵</span>
            </button>
            <button
              onClick={() => setShowDashboard(true)}
              className="group flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
            >
              <BarChart3 className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium text-sm">Dashboard</span>
              <span className="text-sm group-hover:animate-bounce">📊</span>
            </button>
            <button
              onClick={() => setShowBreathingExercise(true)}
              className="group flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
            >
              <Wind className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium text-sm">Breathing</span>
              <span className="text-sm group-hover:animate-bounce">🫁</span>
            </button>
            <button 
              onClick={() => setShowJournal(true)}
              className="group flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
            >
              <Book className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium text-sm">Journal</span>
              <span className="text-sm group-hover:animate-bounce">📝</span>
            </button>
            <button 
              onClick={() => setShowAboutUs(true)}
              className="group flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
            >
              <Info className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium text-sm">About</span>
              <span className="text-sm group-hover:animate-bounce">ℹ️</span>
            </button>
            <button 
              onClick={() => setShowProfile(true)}
              className="group flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
            >
              <User className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium text-sm">Profile</span>
              <span className="text-sm group-hover:animate-bounce">👤</span>
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-110"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t px-4 py-4 space-y-2 transition-colors duration-300 ${
            actualTheme === 'dark' 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-slate-700 border-slate-600'
          }`}>
            {messages.length > 0 && (
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Home</span>
                <span className="text-sm">🏠</span>
              </button>
            )}
            <button
              onClick={() => {
                setShowMusicPlayer(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <Music className="w-4 h-4" />
              <span className="font-medium">Music Player</span>
              <span className="text-sm">🎵</span>
            </button>
            <button
              onClick={() => {
                setShowDashboard(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
              <span className="text-sm">📊</span>
            </button>
            <button
              onClick={() => {
                setShowBreathingExercise(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <Wind className="w-4 h-4" />
              <span className="font-medium">Breathing Exercise</span>
              <span className="text-sm">🫁</span>
            </button>
            <button 
              onClick={() => {
                setShowJournal(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <Book className="w-4 h-4" />
              <span className="font-medium">Journal</span>
              <span className="text-sm">📝</span>
            </button>
            <button 
              onClick={() => {
                setShowAboutUs(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <Info className="w-4 h-4" />
              <span className="font-medium">About Us</span>
              <span className="text-sm">ℹ️</span>
            </button>
            <button 
              onClick={() => {
                setShowProfile(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-white hover:text-yellow-300 transition-all duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Profile</span>
              <span className="text-sm">👤</span>
            </button>
          </div>
        )}

        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-60"></div>
      </header>

      {/* Main Content with Fixed Layout */}
      <div className="flex flex-col h-screen">
        {/* Messages Area - Takes remaining space above fixed input */}
        <div className="flex-1 overflow-y-auto px-4 py-6" style={{ paddingBottom: '140px' }}>
          {messages.length === 0 ? (
            <WelcomeMessage onQuickStart={handleSendMessage} />
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Chat Input Bar - Always Visible at Bottom */}
        <div className={`fixed bottom-0 left-0 right-0 border-t p-4 transition-colors duration-300 z-30 ${
          actualTheme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-neutral-200'
        }`}>
          {/* Emotion Context Bar - Only show during conversations */}
          {messages.length > 0 && (
            <div className={`flex items-center justify-between mb-3 p-2 rounded-lg transition-colors duration-300 ${
              actualTheme === 'dark' ? 'bg-gray-700' : 'bg-neutral-50'
            }`}>
              <div className={`flex items-center space-x-2 text-sm ${
                actualTheme === 'dark' ? 'text-gray-300' : 'text-neutral-600'
              }`}>
                <Brain className="w-4 h-4" />
                <span>Current mood: </span>
                <span className={`font-medium ${
                  currentEmotion === 'positive' ? 'text-green-600' :
                  currentEmotion === 'negative' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {currentEmotion === 'positive' ? '😊 Positive' :
                   currentEmotion === 'negative' ? '😔 Needs support' :
                   '😐 Neutral'}
                </span>
              </div>
              <button
                onClick={() => setShowEmotionInsights(true)}
                className="text-xs text-purple-600 hover:text-purple-800 font-medium"
              >
                View insights →
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to understand and support you 💚"
              className={`flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300 ${
                actualTheme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
              }`}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className={`text-xs mt-2 text-center transition-colors duration-300 ${
            actualTheme === 'dark' ? 'text-gray-400' : 'text-neutral-500'
          }`}>
            Remember: I'm here to support you with emotional intelligence, but I'm not a replacement for professional mental health care.
          </p>
        </div>
      </div>

      {/* Floating Music Button - Always Visible on Front Page */}
      {messages.length === 0 && (
        <button
          onClick={() => setShowMusicPlayer(true)}
          className="fixed bottom-32 left-6 z-30 w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center group border-4 border-white/20 backdrop-blur-sm"
          title="Open Music Therapy"
        >
          <Music className="w-7 h-7 group-hover:animate-pulse drop-shadow-lg" />
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-white/20 animate-ping"></div>
          <div className="absolute inset-1 w-14 h-14 rounded-full bg-white/10 animate-pulse"></div>
          
          {/* Music note indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-sm">🎵</span>
          </div>
          
          {/* Floating sparkles around button */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-300/80 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 -left-2 w-2 h-2 bg-pink-300/70 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </button>
      )}

      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Music Player */}
      <MusicPlayer
        currentEmotion={currentEmotion}
        isVisible={showMusicPlayer}
        onToggleVisibility={() => setShowMusicPlayer(!showMusicPlayer)}
      />

      {/* Breathing Exercise Modal */}
      <BreathingExercise
        isOpen={showBreathingExercise}
        onClose={() => setShowBreathingExercise(false)}
      />

      {/* Dashboard Modal */}
      <Dashboard
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
      />

      {/* Emotion Insights Modal */}
      <EmotionInsights
        messages={messages}
        currentEmotion={detectEmotion(messages)}
        isVisible={showEmotionInsights}
        onClose={() => setShowEmotionInsights(false)}
      />

      {/* Journal Modal */}
      <Journal
        isOpen={showJournal}
        onClose={() => setShowJournal(false)}
      />

      {/* About Us Modal */}
      <AboutUs
        isOpen={showAboutUs}
        onClose={() => setShowAboutUs(false)}
      />

      {/* Profile Modal */}
      <Profile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}

export default App;