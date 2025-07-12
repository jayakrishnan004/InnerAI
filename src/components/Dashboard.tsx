import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Target, 
  Award, 
  TrendingUp, 
  Heart, 
  Wind, 
  Book, 
  Activity,
  Star,
  Flame,
  Trophy,
  CheckCircle,
  Clock,
  BarChart3,
  Sparkles,
  Medal,
  Zap
} from 'lucide-react';
import { Achievement, Goal, DashboardStats, UserProgress } from '../types';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'achievements' | 'goals'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalSessions: 47,
    currentStreak: 12,
    longestStreak: 18,
    totalMinutes: 340,
    averageMood: 7.2,
    weeklyProgress: [3, 5, 2, 6, 4, 7, 5],
    monthlyGoalsCompleted: 8
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first breathing exercise',
      icon: '🌱',
      category: 'milestone',
      requirement: 1,
      unlocked: true,
      unlockedDate: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      category: 'streak',
      requirement: 7,
      unlocked: true,
      unlockedDate: new Date('2024-01-22')
    },
    {
      id: '3',
      title: 'Mindful Warrior',
      description: 'Complete 25 breathing exercises',
      icon: '🧘‍♀️',
      category: 'exercise',
      requirement: 25,
      unlocked: true,
      unlockedDate: new Date('2024-02-01')
    },
    {
      id: '4',
      title: 'Mood Tracker',
      description: 'Log your mood for 14 consecutive days',
      icon: '📊',
      category: 'mood',
      requirement: 14,
      unlocked: false
    },
    {
      id: '5',
      title: 'Zen Master',
      description: 'Complete 100 total exercises',
      icon: '🏆',
      category: 'milestone',
      requirement: 100,
      unlocked: false
    },
    {
      id: '6',
      title: 'Journal Enthusiast',
      description: 'Write 30 journal entries',
      icon: '📝',
      category: 'exercise',
      requirement: 30,
      unlocked: false
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Breathing',
      description: 'Complete 1 breathing exercise daily',
      type: 'daily',
      target: 1,
      current: 1,
      category: 'breathing',
      deadline: new Date(),
      completed: true
    },
    {
      id: '2',
      title: 'Weekly Mindfulness',
      description: 'Practice mindfulness 5 times this week',
      type: 'weekly',
      target: 5,
      current: 3,
      category: 'exercises',
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      completed: false
    },
    {
      id: '3',
      title: 'Monthly Journal',
      description: 'Write 20 journal entries this month',
      type: 'monthly',
      target: 20,
      current: 12,
      category: 'journaling',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      completed: false
    }
  ]);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (!isOpen) return null;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-6 h-6 text-primary-600" />
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-2xl font-bold text-primary-700">{stats.currentStreak}</div>
          <div className="text-sm text-primary-600">Day Streak</div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-4 border border-secondary-200">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-secondary-600" />
            <span className="text-2xl">💪</span>
          </div>
          <div className="text-2xl font-bold text-secondary-700">{stats.totalSessions}</div>
          <div className="text-sm text-secondary-600">Total Sessions</div>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4 border border-accent-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6 text-accent-600" />
            <span className="text-2xl">⏰</span>
          </div>
          <div className="text-2xl font-bold text-accent-700">{stats.totalMinutes}</div>
          <div className="text-sm text-accent-600">Minutes</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-6 h-6 text-orange-600" />
            <span className="text-2xl">😊</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">{stats.averageMood}/10</div>
          <div className="text-sm text-orange-600">Avg Mood</div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
            Weekly Progress
          </h3>
          <span className="text-2xl">📈</span>
        </div>
        <div className="flex items-end justify-between space-x-2 h-32">
          {stats.weeklyProgress.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-600 hover:to-primary-500"
                style={{ height: `${(value / 7) * 100}%`, minHeight: '8px' }}
              />
              <div className="text-xs text-neutral-600 mt-2">{weekDays[index]}</div>
              <div className="text-xs font-medium text-neutral-800">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
            Recent Achievements
          </h3>
          <span className="text-2xl">🏆</span>
        </div>
        <div className="space-y-3">
          {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">{achievement.title}</div>
                <div className="text-sm text-neutral-600">{achievement.description}</div>
              </div>
              <div className="text-xs text-neutral-500">
                {achievement.unlockedDate?.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Streak Calendar */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-600" />
            Activity Calendar
          </h3>
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-neutral-700">{stats.currentStreak} day streak</span>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-neutral-600 py-2">
              {day}
            </div>
          ))}
          {[...Array(35)].map((_, i) => {
            const isActive = Math.random() > 0.3;
            const intensity = Math.floor(Math.random() * 4) + 1;
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                  isActive 
                    ? `bg-primary-${intensity * 100 + 100} border-primary-${intensity * 100 + 200}` 
                    : 'bg-neutral-100 border-neutral-200'
                }`}
                title={isActive ? `${intensity} activities` : 'No activity'}
              />
            );
          })}
        </div>
        
        <div className="flex items-center justify-between mt-4 text-xs text-neutral-600">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-neutral-200 rounded"></div>
            <div className="w-3 h-3 bg-primary-200 rounded"></div>
            <div className="w-3 h-3 bg-primary-400 rounded"></div>
            <div className="w-3 h-3 bg-primary-600 rounded"></div>
            <div className="w-3 h-3 bg-primary-800 rounded"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Monthly Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-primary-600" />
                <span className="text-sm text-neutral-700">Breathing Exercises</span>
              </div>
              <span className="font-medium text-neutral-800">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Book className="w-4 h-4 text-secondary-600" />
                <span className="text-sm text-neutral-700">Journal Entries</span>
              </div>
              <span className="font-medium text-neutral-800">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-600" />
                <span className="text-sm text-neutral-700">Mood Logs</span>
              </div>
              <span className="font-medium text-neutral-800">28</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-600" />
            Personal Bests
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Longest Streak</span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-neutral-800">{stats.longestStreak} days</span>
                <span className="text-lg">🔥</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Best Mood Week</span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-neutral-800">8.5/10</span>
                <span className="text-lg">😊</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Most Active Day</span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-neutral-800">7 exercises</span>
                <span className="text-lg">💪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Achievement Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {['milestone', 'streak', 'exercise', 'mood'].map((category) => {
          const categoryAchievements = achievements.filter(a => a.category === category);
          const unlockedCount = categoryAchievements.filter(a => a.unlocked).length;
          
          return (
            <div key={category} className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm text-center">
              <div className="text-2xl mb-2">
                {category === 'milestone' && '🏆'}
                {category === 'streak' && '🔥'}
                {category === 'exercise' && '🧘‍♀️'}
                {category === 'mood' && '😊'}
              </div>
              <div className="text-lg font-bold text-neutral-800">{unlockedCount}/{categoryAchievements.length}</div>
              <div className="text-sm text-neutral-600 capitalize">{category}</div>
            </div>
          );
        })}
      </div>

      {/* All Achievements */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Medal className="w-5 h-5 mr-2 text-yellow-600" />
          All Achievements
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-md' 
                  : 'bg-neutral-50 border-neutral-200 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-3xl ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-neutral-800">{achievement.title}</h4>
                    {achievement.unlocked && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">{achievement.description}</p>
                  {achievement.unlocked ? (
                    <div className="text-xs text-green-600 font-medium">
                      Unlocked {achievement.unlockedDate?.toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-xs text-neutral-500">
                      Progress: 0/{achievement.requirement}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      {/* Goal Categories */}
      <div className="grid grid-cols-3 gap-4">
        {['daily', 'weekly', 'monthly'].map((type) => {
          const typeGoals = goals.filter(g => g.type === type);
          const completedCount = typeGoals.filter(g => g.completed).length;
          
          return (
            <div key={type} className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm text-center">
              <div className="text-2xl mb-2">
                {type === 'daily' && '📅'}
                {type === 'weekly' && '📊'}
                {type === 'monthly' && '🎯'}
              </div>
              <div className="text-lg font-bold text-neutral-800">{completedCount}/{typeGoals.length}</div>
              <div className="text-sm text-neutral-600 capitalize">{type} Goals</div>
            </div>
          );
        })}
      </div>

      {/* Active Goals */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary-600" />
          Active Goals
        </h3>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const isCompleted = goal.completed;
            
            return (
              <div 
                key={goal.id} 
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                    : 'bg-white border-neutral-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-neutral-800">{goal.title}</h4>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.type === 'daily' ? 'bg-blue-100 text-blue-700' :
                        goal.type === 'weekly' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {goal.type}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{goal.description}</p>
                    <div className="text-xs text-neutral-500">
                      Due: {goal.deadline.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl mb-1">
                      {goal.category === 'breathing' && '🫁'}
                      {goal.category === 'journaling' && '📝'}
                      {goal.category === 'mood' && '😊'}
                      {goal.category === 'exercises' && '🧘‍♀️'}
                    </div>
                    <div className="text-sm font-medium text-neutral-800">
                      {goal.current}/{goal.target}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-neutral-600">{Math.round(progress)}% complete</span>
                  {isCompleted && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-xs font-medium">Completed!</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goal Suggestions */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-primary-600" />
          Suggested Goals
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">🎯</span>
              <h4 className="font-medium text-neutral-800">Consistency Challenge</h4>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Practice mindfulness for 21 consecutive days</p>
            <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
              Set Goal
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">📈</span>
              <h4 className="font-medium text-neutral-800">Mood Improvement</h4>
            </div>
            <p className="text-sm text-neutral-600 mb-3">Achieve an average mood rating of 8+ this month</p>
            <button className="w-full bg-secondary-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-secondary-600 transition-colors">
              Set Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Your Dashboard
              </h1>
              <p className="text-primary-100 mt-1">Track your mental wellness journey</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'goals', label: 'Goals', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm border border-primary-200'
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'progress' && renderProgress()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'goals' && renderGoals()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;