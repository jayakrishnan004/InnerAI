import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, Shield, Star, Wind, Sun, Moon } from 'lucide-react';
import anime from 'animejs';

interface WelcomeMessageProps {
  onQuickStart: (message: string) => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onQuickStart }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quickStartRef = useRef<HTMLDivElement>(null);
  const floatingEmojisRef = useRef<HTMLDivElement>(null);

  const quickStarters = [
    { text: "I'm feeling overwhelmed with work", emoji: "😰", color: "from-red-400 to-pink-500" },
    { text: "I haven't been sleeping well", emoji: "😴", color: "from-purple-400 to-indigo-500" },
    { text: "I'm not feeling motivated lately", emoji: "😔", color: "from-blue-400 to-cyan-500" },
    { text: "I'm dealing with anxiety today", emoji: "😟", color: "from-orange-400 to-yellow-500" }
  ];

  const floatingEmojis = ['🌸', '🦋', '✨', '🌟', '💫', '🌈', '🕊️', '🌺', '💚', '🧘‍♀️', '🌙', '☀️'];

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      anime({
        targets: heroRef.current.children,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .8)'
      });
    }

    // Feature cards animation
    if (cardsRef.current) {
      anime({
        targets: cardsRef.current.children,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150, {start: 600}),
        easing: 'easeOutBack'
      });
    }

    // Quick start buttons animation
    if (quickStartRef.current) {
      anime({
        targets: quickStartRef.current.children,
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100, {start: 1200}),
        easing: 'easeOutCubic'
      });
    }

    // Floating emojis animation
    if (floatingEmojisRef.current) {
      const emojis = floatingEmojisRef.current.children;
      
      // Initial positioning
      Array.from(emojis).forEach((emoji, index) => {
        anime.set(emoji, {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.7
        });
      });

      // Continuous floating animation
      anime({
        targets: emojis,
        translateY: [
          { value: -20, duration: 2000 },
          { value: 0, duration: 2000 }
        ],
        translateX: [
          { value: 10, duration: 1500 },
          { value: -10, duration: 1500 },
          { value: 0, duration: 1500 }
        ],
        rotate: [
          { value: 5, duration: 1000 },
          { value: -5, duration: 1000 },
          { value: 0, duration: 1000 }
        ],
        scale: [
          { value: 1.1, duration: 1500 },
          { value: 1, duration: 1500 }
        ],
        delay: anime.stagger(200),
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Breathing animation for main logo
    anime({
      targets: '.breathing-logo',
      scale: [1, 1.1, 1],
      duration: 3000,
      loop: true,
      easing: 'easeInOutSine'
    });

    // Sparkle animation
    anime({
      targets: '.sparkle',
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      duration: 2000,
      delay: anime.stagger(300),
      loop: true,
      easing: 'easeInOutQuad'
    });

    // Gradient background animation
    anime({
      targets: '.gradient-bg',
      background: [
        'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
      ],
      duration: 8000,
      loop: true,
      easing: 'easeInOutQuad'
    });

  }, []);

  const handleQuickStartClick = (starter: typeof quickStarters[0]) => {
    // Button click animation
    anime({
      targets: event?.currentTarget,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: 'easeInOutQuad',
      complete: () => onQuickStart(starter.text)
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      {/* Floating Emojis */}
      <div ref={floatingEmojisRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingEmojis.map((emoji, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-60 select-none"
            style={{
              fontSize: `${1.5 + Math.random() * 1}rem`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center py-12 px-4">
        {/* Hero Section */}
        <div ref={heroRef} className="mb-12">
          {/* Main Logo with Breathing Animation */}
          <div className="breathing-logo w-24 h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Heart className="w-12 h-12 text-white drop-shadow-lg" />
          </div>

          {/* Sparkles around logo */}
          <div className="relative mb-8">
            <Sparkles className="sparkle absolute -top-4 -left-8 w-6 h-6 text-yellow-400" />
            <Sparkles className="sparkle absolute -top-2 right-4 w-4 h-4 text-pink-400" />
            <Sparkles className="sparkle absolute top-2 -right-6 w-5 h-5 text-blue-400" />
            <Star className="sparkle absolute -bottom-2 -left-4 w-5 h-5 text-purple-400" />
            <Star className="sparkle absolute bottom-0 right-8 w-4 h-4 text-green-400" />
          </div>

          {/* Main Title with Gradient Text */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Welcome to InnerAI 🌟
          </h1>
          
          {/* Subtitle with Emojis */}
          <p className="text-xl md:text-2xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Your compassionate AI companion for mental health support 💚<br/>
            <span className="text-lg text-neutral-600 mt-2 block">
              Where healing begins with understanding 🤗✨
            </span>
          </p>

          {/* Emotional Support Message */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 max-w-md mx-auto shadow-lg">
            <div className="text-3xl mb-2">🫂</div>
            <p className="text-sm text-neutral-700 italic">
              "You are not alone in this journey. Every step forward, no matter how small, is a victory worth celebrating." 🌈
            </p>
          </div>
        </div>

        {/* Feature Cards with Enhanced Animations */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="group bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl mb-3">💝</div>
            <h3 className="font-bold text-xl text-neutral-800 mb-3">Empathetic Listening</h3>
            <p className="text-neutral-600 leading-relaxed">
              I'm here to listen without judgment and provide caring support 🤗 Your feelings matter, and so do you! 💙
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-xl text-neutral-800 mb-3">Personalized Guidance</h3>
            <p className="text-neutral-600 leading-relaxed">
              Tailored exercises and techniques for your unique needs ✨ Your journey is special, just like you! 🌟
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-bold text-xl text-neutral-800 mb-3">Safe Space</h3>
            <p className="text-neutral-600 leading-relaxed">
              Your privacy and emotional safety are my top priorities 🔒 This is your sanctuary of peace! 🕊️
            </p>
          </div>
        </div>

        {/* Quick Start Section with Enhanced Design */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4 flex items-center justify-center">
              <span className="mr-3">🌸</span>
              How are you feeling today?
              <span className="ml-3">🌸</span>
            </h2>
            <p className="text-neutral-600 text-lg">
              Choose what resonates with your heart right now 💭
            </p>
          </div>

          <div ref={quickStartRef} className="space-y-4">
            {quickStarters.map((starter, index) => (
              <button
                key={index}
                onClick={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: [1, 0.95, 1],
                    duration: 200,
                    easing: 'easeInOutQuad',
                    complete: () => onQuickStart(starter.text)
                  });
                }}
                className={`group w-full p-6 text-left bg-gradient-to-r ${starter.color} rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 border-2 border-white shadow-lg`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {starter.emoji}
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-medium text-lg drop-shadow-sm">
                      {starter.text}
                    </span>
                    <div className="text-white text-sm opacity-90 mt-1">
                      Tap to share your feelings 💬
                    </div>
                  </div>
                  <div className="text-white opacity-80 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-6 h-6" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Message Prompt */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
            <div className="text-2xl mb-3">💭</div>
            <p className="text-neutral-700 font-medium mb-2">
              Or share something else that's on your mind...
            </p>
            <p className="text-sm text-neutral-600">
              Type your own message below to get started 🌟 I'm here to listen and support you! 🤗
            </p>
          </div>

          {/* Motivational Quote */}
          <div className="mt-12 p-8 bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 rounded-3xl border-2 border-yellow-200 shadow-lg">
            <div className="text-4xl mb-4">🌅</div>
            <blockquote className="text-lg font-medium text-neutral-800 italic mb-3">
              "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives."
            </blockquote>
            <cite className="text-neutral-600 text-sm">— William James</cite>
            <div className="flex justify-center space-x-2 mt-4 text-2xl">
              <span>🌟</span>
              <span>💚</span>
              <span>🦋</span>
              <span>✨</span>
              <span>🌈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-100 to-transparent pointer-events-none"></div>
      
      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 space-y-4 z-20">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce cursor-pointer hover:scale-110 transition-transform">
          <Wind className="w-6 h-6 text-white" />
        </div>
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-transform">
          <Sun className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;