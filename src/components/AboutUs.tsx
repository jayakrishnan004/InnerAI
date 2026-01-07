import React, { useEffect, useRef } from 'react';
import { 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  Sparkles, 
  Target, 
  Award, 
  Lightbulb,
  Music,
  Book,
  Wind,
  BarChart3,
  Star,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Github,
  Mail,
  Twitter,
  Linkedin
} from 'lucide-react';
import anime from 'animejs';

interface AboutUsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ isOpen, onClose }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Hero section animation
      if (heroRef.current) {
        anime({
          targets: heroRef.current.children,
          translateY: [-50, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(200),
          easing: 'easeOutElastic(1, .8)'
        });
      }

      // Features animation
      if (featuresRef.current) {
        anime({
          targets: featuresRef.current.querySelectorAll('.feature-card'),
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 600,
          delay: anime.stagger(100, {start: 400}),
          easing: 'easeOutBack'
        });
      }

      // Mission animation
      if (missionRef.current) {
        anime({
          targets: missionRef.current.children,
          translateX: [-100, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(150, {start: 600}),
          easing: 'easeOutCubic'
        });
      }

      // Team animation
      if (teamRef.current) {
        anime({
          targets: teamRef.current.querySelectorAll('.team-card'),
          rotateY: [90, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(200, {start: 800}),
          easing: 'easeOutBack'
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Conversations',
      description: 'Advanced Gemini AI provides empathetic, therapeutic-quality responses',
      color: 'from-purple-500 to-indigo-600',
      emoji: '🧠'
    },
    {
      icon: Heart,
      title: 'Emotion Intelligence',
      description: 'Real-time emotion detection and personalized mental health insights',
      color: 'from-pink-500 to-red-500',
      emoji: '💚'
    },
    {
      icon: Music,
      title: 'Music Therapy',
      description: 'Curated therapeutic music based on your emotional state',
      color: 'from-blue-500 to-cyan-500',
      emoji: '🎵'
    },
    {
      icon: Wind,
      title: 'Breathing Exercises',
      description: '4-7-8 breathing technique with guided animations for stress relief',
      color: 'from-green-500 to-teal-500',
      emoji: '🫁'
    },
    {
      icon: Book,
      title: 'Personal Journal',
      description: 'Private journaling with mood tracking and gratitude practice',
      color: 'from-orange-500 to-yellow-500',
      emoji: '📝'
    },
    {
      icon: BarChart3,
      title: 'Progress Dashboard',
      description: 'Track your mental wellness journey with detailed insights',
      color: 'from-violet-500 to-purple-500',
      emoji: '📊'
    }
  ];

  const teamMembers = [
    {
      name: 'Ron Thomas Roy',
      role: 'AI Developer',
      bio: 'Specializes in backend development.',
      avatar: '/images/team/ron-thomas-roy.jpg',
      expertise: ['Clinical Psychology', 'AI Ethics', 'Digital Health']
    },
    {
      name: 'Jayakrishnan K V',
      role: 'Lead AI Engineer',
      bio: 'Expert in natural language processing and machine learning.',
      avatar: '/images/team/jayakrishnan-kv.jpg',
      expertise: ['Machine Learning', 'NLP', 'AI Safety']
    },
    {
      name: 'Jeswin Cheriyan Priji',
      role: 'UX/UI Designer',
      bio: 'Designs compassionate user experiences that prioritize accessibility and emotional safety.',
      avatar: '/images/team/jeswin-cheriyan-priji.jpg',
      expertise: ['UX Design', 'Accessibility', 'Mental Health Advocacy']
    },
    {
      name: 'Sebin K Thomas',
      role: 'AI Developer',
      bio: 'focussing on software integrations',
      avatar: '/images/team/sebin-k-thomas.jpg',
      expertise: ['Psychiatry', 'Digital Medicine', 'Crisis Intervention']
    }
  ];

  const stats = [
    { number: '50K+', label: 'Users Supported', icon: Users },
    { number: '1M+', label: 'Conversations', icon: Heart },
    { number: '95%', label: 'User Satisfaction', icon: Star },
    { number: '24/7', label: 'Available Support', icon: Shield }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl border-2 border-neutral-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-8 h-8 text-white animate-heartbeat" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">About InnerAI</h1>
                  <p className="text-xl text-purple-100 mt-2">Your Compassionate Mental Health Companion</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
              >
                <span className="text-3xl">✕</span>
              </button>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-20 w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-6 left-20 w-6 h-6 bg-yellow-300/30 rounded-full animate-pulse"></div>
          <Sparkles className="absolute top-8 left-1/3 w-6 h-6 text-yellow-300 animate-pulse" />
          <Star className="absolute bottom-8 right-1/3 w-5 h-5 text-pink-300 animate-bounce" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          
          {/* Hero Section */}
          <div ref={heroRef} className="p-8 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-6xl mb-6">🌟</div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                Revolutionizing Mental Health Support with AI
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                InnerAI combines cutting-edge artificial intelligence with evidence-based therapeutic approaches 
                to provide accessible, empathetic mental health support. Our mission is to make quality mental 
                health care available to everyone, everywhere, at any time.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-neutral-200">
                    <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-neutral-800">{stat.number}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div ref={missionRef} className="p-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Mission & Vision</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">Our Mission</h3>
                  </div>
                  <p className="text-blue-700 leading-relaxed">
                    To democratize mental health support by providing AI-powered, evidence-based therapeutic 
                    conversations that are accessible, affordable, and available 24/7. We believe everyone 
                    deserves compassionate mental health care.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800">Our Vision</h3>
                  </div>
                  <p className="text-purple-700 leading-relaxed">
                    A world where mental health support is as accessible as checking the weather. We envision 
                    AI companions that understand, empathize, and provide meaningful support while working 
                    alongside human professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div ref={featuresRef} className="p-8 bg-gradient-to-br from-neutral-50 to-purple-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Comprehensive Mental Health Tools</h2>
                <p className="text-lg text-neutral-600">
                  Everything you need for your mental wellness journey in one place
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card group">
                    <div className="p-6 bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl mb-3">{feature.emoji}</div>
                      <h3 className="text-xl font-bold text-neutral-800 mb-3">{feature.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div ref={teamRef} className="p-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Meet Our Team</h2>
                <p className="text-lg text-neutral-600">
                  Mental health professionals, AI experts, and advocates working together
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-card">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
                        <img 
                          src={member.avatar} 
                          alt={`${member.name} - ${member.role}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to a placeholder if image fails to load
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAyNUMzNS44MTYgMjUgMjUgMzUuODE2IDI1IDUwQzI1IDY0LjE4NCAzNS44MTYgNzUgNTAgNzVDNjQuMTg0IDc1IDc1IDY0LjE4NCA3NSA1MEM3NSAzNS44MTYgNjQuMTg0IDI1IDUwIDI1Wk01MCA2NkM0MC4wNTkgNjYgMzIgNTcuOTQxIDMyIDQ4QzMyIDM4LjA1OSA0MC4wNTkgMzAgNTAgMzBDNTkuOTQxIDMwIDY4IDM4LjA1OSA2OCA0OEM2OCA1Ny45NDEgNTkuOTQxIDY2IDUwIDY2WiIgZmlsbD0iIzk0QTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-800 mb-2">{member.name}</h3>
                      <p className="text-sm font-medium text-purple-600 mb-3">{member.role}</p>
                      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{member.bio}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology & Safety */}
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Technology & Safety</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-blue-200">
                  <div className="flex items-center mb-4">
                    <Brain className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-blue-800">Advanced AI Technology</h3>
                  </div>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Google Gemini AI for natural language understanding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Evidence-based therapeutic response generation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Real-time emotion detection and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Crisis detection and intervention protocols</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-blue-200">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-green-800">Privacy & Safety</h3>
                  </div>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No conversation data stored or tracked</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>End-to-end encryption for all communications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>HIPAA-compliant design principles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>24/7 crisis support resource integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Community */}
          <div className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <Globe className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-xl text-purple-100 mb-8">
                Connect with us and be part of the mental health revolution
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Contact Us</h3>
                  <p className="text-sm text-purple-100">hello@innerai.com</p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Github className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Open Source</h3>
                  <p className="text-sm text-purple-100">Contribute on GitHub</p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Heart className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Support</h3>
                  <p className="text-sm text-purple-100">24/7 Community Help</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Twitter className="w-6 h-6" />
                </button>
                <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Linkedin className="w-6 h-6" />
                </button>
                <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Github className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-neutral-800 text-white text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm">Made with love for mental health</span>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-xs text-neutral-400">
              © 2024 InnerAI. Empowering mental wellness through technology. 
              Remember: This is a supportive tool, not a replacement for professional mental health care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;