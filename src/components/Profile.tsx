import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Settings, 
  Heart, 
  Brain, 
  Calendar, 
  Award, 
  Target, 
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Edit3,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Cake,
  Briefcase,
  GraduationCap,
  Star,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Sparkles
} from 'lucide-react';
import anime from 'animejs';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: Date;
  location: string;
  age: number;
  occupation: string;
  education: string;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  mentalHealthGoals: string[];
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    soundEffects: boolean;
    musicAutoplay: boolean;
    privacyMode: boolean;
    language: string;
    timezone: string;
  };
  stats: {
    totalSessions: number;
    currentStreak: number;
    longestStreak: number;
    totalMinutes: number;
    averageMood: number;
    journalEntries: number;
    breathingExercises: number;
    musicListened: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedDate: Date;
    category: string;
  }>;
  mentalHealthProfile: {
    primaryConcerns: string[];
    copingStrategies: string[];
    triggers: string[];
    supportSystem: string[];
    therapyHistory: boolean;
    medicationHistory: boolean;
    crisisContacts: Array<{
      name: string;
      phone: string;
      type: 'therapist' | 'doctor' | 'emergency' | 'friend' | 'family';
    }>;
  };
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'mental-health' | 'privacy' | 'achievements'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Sample user profile data (in real app, this would come from a database)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-123',
    name: 'JACKIE CHAN',
    email: 'Jackie123@email.com',
    avatar: '👤',
    bio: 'Mental health advocate and wellness enthusiast. Passionate about mindfulness and personal growth.',
    joinDate: new Date('2024-01-15'),
    location: 'china, CA',
    age: 28,
    occupation: 'Software Developer',
    education: 'Bachelor\'s in Computer Science',
    phone: '+1 (555) 123-4567',
    emergencyContact: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      relationship: 'Sister'
    },
    mentalHealthGoals: [
      'Reduce daily anxiety',
      'Improve sleep quality',
      'Build emotional resilience',
      'Practice mindfulness daily'
    ],
    preferences: {
      theme: 'auto',
      notifications: true,
      soundEffects: true,
      musicAutoplay: false,
      privacyMode: false,
      language: 'English',
      timezone: 'PST'
    },
    stats: {
      totalSessions: 47,
      currentStreak: 12,
      longestStreak: 18,
      totalMinutes: 340,
      averageMood: 7.2,
      journalEntries: 23,
      breathingExercises: 156,
      musicListened: 89
    },
    achievements: [
      {
        id: 'first-week',
        title: 'First Week Warrior',
        description: 'Completed your first week of daily check-ins',
        icon: '🌱',
        unlockedDate: new Date('2024-01-22'),
        category: 'milestone'
      },
      {
        id: 'breathing-master',
        title: 'Breathing Master',
        description: 'Completed 100 breathing exercises',
        icon: '🫁',
        unlockedDate: new Date('2024-02-15'),
        category: 'exercise'
      },
      {
        id: 'journal-enthusiast',
        title: 'Journal Enthusiast',
        description: 'Wrote 20 journal entries',
        icon: '📝',
        unlockedDate: new Date('2024-03-01'),
        category: 'journaling'
      }
    ],
    mentalHealthProfile: {
      primaryConcerns: ['Anxiety', 'Work Stress', 'Sleep Issues'],
      copingStrategies: ['Deep Breathing', 'Journaling', 'Music Therapy', 'Exercise'],
      triggers: ['Work Deadlines', 'Social Situations', 'Lack of Sleep'],
      supportSystem: ['Family', 'Close Friends', 'Therapist', 'InnerAI Community'],
      therapyHistory: true,
      medicationHistory: false,
      crisisContacts: [
        {
          name: 'Dr. Emily Chen',
          phone: '+1 (555) 234-5678',
          type: 'therapist'
        },
        {
          name: 'Crisis Hotline',
          phone: '988',
          type: 'emergency'
        }
      ]
    }
  });

  useEffect(() => {
    if (isOpen) {
      // Profile entrance animation
      if (profileRef.current) {
        anime({
          targets: profileRef.current,
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutElastic(1, .8)'
        });
      }

      // Tabs animation
      if (tabsRef.current) {
        anime({
          targets: tabsRef.current.children,
          translateY: [-20, 0],
          opacity: [0, 1],
          duration: 400,
          delay: anime.stagger(100, {start: 200}),
          easing: 'easeOutCubic'
        });
      }
    }
  }, [isOpen]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In real app, save to database
    console.log('Profile saved:', userProfile);
  };

  const handleAvatarChange = () => {
    // In real app, this would open file picker or avatar selector
    const avatars = ['👤', '👨', '👩', '🧑', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '🧑‍🔬', '👨‍⚕️', '👩‍⚕️'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setUserProfile(prev => ({ ...prev, avatar: randomAvatar }));
  };

  if (!isOpen) return null;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
              {userProfile.avatar}
            </div>
            <button
              onClick={handleAvatarChange}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-purple-200 hover:bg-purple-50 transition-colors"
            >
              <Camera className="w-4 h-4 text-purple-600" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-neutral-800">{userProfile.name}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{userProfile.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {userProfile.joinDate.toLocaleDateString()}</span>
              </div>
            </div>
            
            <p className="text-neutral-700 mt-3 leading-relaxed">{userProfile.bio}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">{userProfile.stats.totalSessions}</div>
          <div className="text-sm text-neutral-600">Total Sessions</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">{userProfile.stats.currentStreak}</div>
          <div className="text-sm text-neutral-600">Day Streak</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">{userProfile.stats.totalMinutes}</div>
          <div className="text-sm text-neutral-600">Minutes</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">{userProfile.stats.averageMood}/10</div>
          <div className="text-sm text-neutral-600">Avg Mood</div>
        </div>
      </div>

      {/* Mental Health Goals */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Mental Health Goals
          </h3>
          <span className="text-2xl">🎯</span>
        </div>
        <div className="space-y-3">
          {userProfile.mentalHealthGoals.map((goal, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-neutral-700">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            Recent Achievements
          </h3>
          <span className="text-2xl">🏆</span>
        </div>
        <div className="space-y-3">
          {userProfile.achievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">{achievement.title}</div>
                <div className="text-sm text-neutral-600">{achievement.description}</div>
              </div>
              <div className="text-xs text-neutral-500">
                {achievement.unlockedDate.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-purple-600" />
          Appearance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                {userProfile.preferences.theme === 'light' ? <Sun className="w-5 h-5 text-white" /> :
                 userProfile.preferences.theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> :
                 <Monitor className="w-5 h-5 text-white" />}
              </div>
              <div>
                <div className="font-medium text-neutral-800">Theme</div>
                <div className="text-sm text-neutral-600">Choose your preferred theme</div>
              </div>
            </div>
            <select
              value={userProfile.preferences.theme}
              onChange={(e) => setUserProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences, theme: e.target.value as any }
              }))}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-neutral-800">Push Notifications</div>
                <div className="text-sm text-neutral-600">Daily reminders and check-ins</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userProfile.preferences.notifications}
                onChange={(e) => setUserProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, notifications: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                {userProfile.preferences.soundEffects ? <Volume2 className="w-5 h-5 text-green-600" /> : <VolumeX className="w-5 h-5 text-green-600" />}
              </div>
              <div>
                <div className="font-medium text-neutral-800">Sound Effects</div>
                <div className="text-sm text-neutral-600">Button clicks and notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userProfile.preferences.soundEffects}
                onChange={(e) => setUserProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, soundEffects: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-neutral-800">Music Autoplay</div>
                <div className="text-sm text-neutral-600">Automatically play therapeutic music</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userProfile.preferences.musicAutoplay}
                onChange={(e) => setUserProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, musicAutoplay: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-green-600" />
          Language & Region
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
            <select
              value={userProfile.preferences.language}
              onChange={(e) => setUserProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences, language: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="German">Deutsch</option>
              <option value="Chinese">中文</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
            <select
              value={userProfile.preferences.timezone}
              onChange={(e) => setUserProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences, timezone: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="PST">Pacific Standard Time</option>
              <option value="MST">Mountain Standard Time</option>
              <option value="CST">Central Standard Time</option>
              <option value="EST">Eastern Standard Time</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMentalHealth = () => (
    <div className="space-y-6">
      {/* Mental Health Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            Mental Health Profile
          </h3>
          <span className="text-2xl">🧠</span>
        </div>
        <p className="text-neutral-700 mb-4">
          This information helps InnerAI provide more personalized support and recommendations.
        </p>
        <div className="flex items-center space-x-2 text-sm text-blue-700">
          <Shield className="w-4 h-4" />
          <span>All information is kept private and secure</span>
        </div>
      </div>

      {/* Primary Concerns */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
          Primary Concerns
        </h4>
        <div className="flex flex-wrap gap-2">
          {userProfile.mentalHealthProfile.primaryConcerns.map((concern, index) => (
            <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm border border-orange-200">
              {concern}
            </span>
          ))}
        </div>
      </div>

      {/* Coping Strategies */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-green-600" />
          Coping Strategies
        </h4>
        <div className="flex flex-wrap gap-2">
          {userProfile.mentalHealthProfile.copingStrategies.map((strategy, index) => (
            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm border border-green-200">
              {strategy}
            </span>
          ))}
        </div>
      </div>

      {/* Triggers */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-red-600" />
          Known Triggers
        </h4>
        <div className="flex flex-wrap gap-2">
          {userProfile.mentalHealthProfile.triggers.map((trigger, index) => (
            <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200">
              {trigger}
            </span>
          ))}
        </div>
      </div>

      {/* Support System */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-600" />
          Support System
        </h4>
        <div className="flex flex-wrap gap-2">
          {userProfile.mentalHealthProfile.supportSystem.map((support, index) => (
            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200">
              {support}
            </span>
          ))}
        </div>
      </div>

      {/* Crisis Contacts */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-blue-600" />
          Crisis Contacts
        </h4>
        <div className="space-y-3">
          {userProfile.mentalHealthProfile.crisisContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <div className="font-medium text-neutral-800">{contact.name}</div>
                <div className="text-sm text-neutral-600 capitalize">{contact.type}</div>
              </div>
              <div className="text-blue-600 font-mono">{contact.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      {/* Privacy Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Privacy & Security
          </h3>
          <span className="text-2xl">🔒</span>
        </div>
        <p className="text-neutral-700">
          Your privacy and data security are our top priorities. Control how your information is used and shared.
        </p>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4">Privacy Controls</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                {userProfile.preferences.privacyMode ? <EyeOff className="w-5 h-5 text-purple-600" /> : <Eye className="w-5 h-5 text-purple-600" />}
              </div>
              <div>
                <div className="font-medium text-neutral-800">Privacy Mode</div>
                <div className="text-sm text-neutral-600">Hide sensitive information from others</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userProfile.preferences.privacyMode}
                onChange={(e) => setUserProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, privacyMode: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4">Data Management</h4>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-neutral-800">Download My Data</div>
                <div className="text-sm text-neutral-600">Export all your personal data</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-orange-600" />
              <div className="text-left">
                <div className="font-medium text-neutral-800">Delete Account</div>
                <div className="text-sm text-neutral-600">Permanently remove your account</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-orange-600" />
          </button>
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-green-600" />
          Security Features
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-neutral-700">End-to-end encryption for all conversations</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-neutral-700">No conversation data stored on servers</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-neutral-700">HIPAA-compliant data handling</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-neutral-700">Regular security audits and updates</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Achievements Overview */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            Your Achievements
          </h3>
          <span className="text-2xl">🏆</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-600">{userProfile.achievements.length}</div>
            <div className="text-sm text-neutral-600">Unlocked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-neutral-600">Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">75%</div>
            <div className="text-sm text-neutral-600">Progress</div>
          </div>
        </div>
      </div>

      {/* Achievement Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Unlocked Achievements */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-600" />
            Unlocked Achievements
          </h4>
          <div className="space-y-3">
            {userProfile.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-neutral-800">{achievement.title}</div>
                  <div className="text-sm text-neutral-600">{achievement.description}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Unlocked {achievement.unlockedDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Achievements */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-neutral-600" />
            Locked Achievements
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 opacity-60">
              <div className="text-2xl">🔒</div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">Meditation Master</div>
                <div className="text-sm text-neutral-600">Complete 50 meditation sessions</div>
                <div className="text-xs text-neutral-500 mt-1">Progress: 23/50</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 opacity-60">
              <div className="text-2xl">🔒</div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">Mood Tracker Pro</div>
                <div className="text-sm text-neutral-600">Log mood for 30 consecutive days</div>
                <div className="text-xs text-neutral-500 mt-1">Progress: 12/30</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 opacity-60">
              <div className="text-2xl">🔒</div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">Community Helper</div>
                <div className="text-sm text-neutral-600">Help 10 community members</div>
                <div className="text-xs text-neutral-500 mt-1">Progress: 3/10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div ref={profileRef} className="bg-white rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl border-2 border-neutral-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">My Profile</h1>
                  <p className="text-purple-100 mt-1">Manage your mental wellness journey</p>
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
          <Sparkles className="absolute top-4 right-20 w-6 h-6 text-yellow-300 animate-pulse" />
          <Heart className="absolute bottom-6 left-20 w-5 h-5 text-pink-300 animate-bounce" />
        </div>

        {/* Navigation Tabs */}
        <div ref={tabsRef} className="border-b border-neutral-200 bg-neutral-50">
          <div className="flex space-x-1 p-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'mental-health', label: 'Mental Health', icon: Brain },
              { id: 'privacy', label: 'Privacy', icon: Shield },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-sm border border-purple-200'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-250px)]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'mental-health' && renderMentalHealth()}
          {activeTab === 'privacy' && renderPrivacy()}
          {activeTab === 'achievements' && renderAchievements()}
        </div>
      </div>
    </div>
  );
};

export default Profile;