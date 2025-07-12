import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  Target, 
  Star, 
  Lightbulb,
  BarChart3,
  Sparkles,
  Award,
  ArrowRight,
  Calendar,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { Message } from '../types';
import { 
  detectEmotionalPattern, 
  analyzeEmotionalIntensity, 
  getTherapeuticInsights,
  EmotionalState 
} from '../utils/emotionDetection';

interface EmotionInsightsProps {
  messages: Message[];
  currentEmotion: EmotionalState;
  isVisible: boolean;
  onClose: () => void;
}

const EmotionInsights: React.FC<EmotionInsightsProps> = ({ 
  messages, 
  currentEmotion, 
  isVisible, 
  onClose 
}) => {
  const [insights, setInsights] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'patterns' | 'growth' | 'recommendations' | 'safety'>('overview');

  useEffect(() => {
    if (messages.length > 0) {
      const therapeuticInsights = getTherapeuticInsights(messages);
      const emotionalPattern = detectEmotionalPattern(messages);
      
      setInsights({
        therapeutic: therapeuticInsights,
        pattern: emotionalPattern,
        currentState: currentEmotion
      });
    }
  }, [messages, currentEmotion]);

  if (!isVisible || !insights) return null;

  const getEmotionColor = (emotion: string) => {
    const colorMap: { [key: string]: string } = {
      anxious: 'text-orange-600 bg-orange-50 border-orange-200',
      sad: 'text-blue-600 bg-blue-50 border-blue-200',
      angry: 'text-red-600 bg-red-50 border-red-200',
      stressed: 'text-purple-600 bg-purple-50 border-purple-200',
      lonely: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      excited: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      happy: 'text-green-600 bg-green-50 border-green-200',
      calm: 'text-teal-600 bg-teal-50 border-teal-200',
      hopeful: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      positive: 'text-lime-600 bg-lime-50 border-lime-200'
    };
    return colorMap[emotion] || 'text-neutral-600 bg-neutral-50 border-neutral-200';
  };

  const getEmotionEmoji = (emotion: string) => {
    const emojiMap: { [key: string]: string } = {
      anxious: '😰', sad: '😢', angry: '😠', stressed: '😫', lonely: '😔',
      excited: '🤩', happy: '😊', calm: '😌', hopeful: '🌟', positive: '😄'
    };
    return emojiMap[emotion] || '😐';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'declining': return <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />;
      case 'fluctuating': return <Activity className="w-5 h-5 text-orange-600" />;
      default: return <BarChart3 className="w-5 h-5 text-blue-600" />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const renderOverview = () => (
    
    <div className="space-y-6">
      {/* Enhanced Current Emotional State */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-purple-600" />
            Current Emotional State
          </h3>
          <div className="text-3xl">{getEmotionEmoji(currentEmotion)}</div>
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className={`px-4 py-2 rounded-full font-medium border ${getEmotionColor(currentEmotion)}`}>
            {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
          </div>
          <div className="flex items-center space-x-2">
            {getTrendIcon(insights.pattern.trend)}
            <span className="text-sm text-neutral-600 capitalize">{insights.pattern.trend}</span>
          </div>
        </div>
        
        <p className="text-neutral-700 leading-relaxed">
          {insights.therapeutic.emotionalJourney}
        </p>
      </div>

      {/* Risk Assessment Dashboard */}
      {insights.therapeutic.riskAssessment && (
        <div className={`rounded-xl p-6 border ${getRiskLevelColor(insights.therapeutic.riskAssessment.level)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Wellness Assessment
            </h3>
            <div className="flex items-center space-x-2">
              {insights.therapeutic.riskAssessment.level === 'high' ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : insights.therapeutic.riskAssessment.level === 'moderate' ? (
                <Clock className="w-5 h-5 text-orange-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <span className="font-medium capitalize">{insights.therapeutic.riskAssessment.level} Priority</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {insights.therapeutic.riskAssessment.factors.length > 0 && (
              <div>
                <h4 className="font-medium text-neutral-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                  Areas Needing Attention
                </h4>
                <ul className="space-y-1">
                  {insights.therapeutic.riskAssessment.factors.map((factor: string, index: number) => (
                    <li key={index} className="text-sm text-neutral-600 flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {insights.therapeutic.riskAssessment.protectiveFactors.length > 0 && (
              <div>
                <h4 className="font-medium text-neutral-800 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-green-500" />
                  Protective Strengths
                </h4>
                <ul className="space-y-1">
                  {insights.therapeutic.riskAssessment.protectiveFactors.map((factor: string, index: number) => (
                    <li key={index} className="text-sm text-neutral-600 flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mental Health Concerns */}
      {insights.therapeutic.mentalHealthConcerns.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            Mental Health Insights
          </h3>
          
          <div className="space-y-4">
            {insights.therapeutic.mentalHealthConcerns.slice(0, 3).map((concern: any, index: number) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-800">{concern.condition}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      concern.severity === 'severe' ? 'bg-red-100 text-red-700' :
                      concern.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {concern.severity}
                    </span>
                    <span className="text-xs text-blue-600">
                      {Math.round(concern.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-blue-700 mb-2">Key indicators:</p>
                  <div className="flex flex-wrap gap-1">
                    {concern.indicators.slice(0, 3).map((indicator: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-blue-700 mb-2">Recommended approaches:</p>
                  <ul className="space-y-1">
                    {concern.recommendations.slice(0, 2).map((rec: string, i: number) => (
                      <li key={i} className="text-xs text-blue-600 flex items-start">
                        <ArrowRight className="w-3 h-3 mt-0.5 mr-1 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Indicators */}
      {insights.therapeutic.progressIndicators && insights.therapeutic.progressIndicators.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-green-600" />
            Progress & Growth Indicators
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {insights.therapeutic.progressIndicators.map((indicator: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-neutral-700 text-sm">{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emotional Strengths */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-600" />
          Your Emotional Strengths
        </h3>
        
        <div className="space-y-3">
          {insights.therapeutic.strengths.map((strength: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-neutral-700">{strength}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPatterns = () => (
    <div className="space-y-6">
      {/* Enhanced Emotional Triggers */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-orange-600" />
          Emotional Triggers & Patterns
        </h3>
        
        {insights.pattern.triggers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.pattern.triggers.map((trigger: string, index: number) => (
              <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium text-orange-800 capitalize">{trigger}</span>
                </div>
                <p className="text-sm text-orange-700">
                  {trigger === 'work' && "Work-related stress, deadlines, and professional pressure"}
                  {trigger === 'relationships' && "Interpersonal dynamics, conflicts, and connection challenges"}
                  {trigger === 'health' && "Physical well-being, energy levels, and health concerns"}
                  {trigger === 'finances' && "Financial stress, budgeting, and economic security"}
                  {trigger === 'future' && "Uncertainty, planning, and anticipatory anxiety"}
                  {trigger === 'performance' && "Achievement pressure, evaluation, and perfectionism"}
                  {trigger === 'social' && "Social interactions, judgment fears, and group dynamics"}
                  {trigger === 'family' && "Family relationships, dynamics, and responsibilities"}
                  {trigger === 'school' && "Academic pressure, learning challenges, and educational stress"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 italic">No specific triggers identified yet. Continue sharing to build insights.</p>
          </div>
        )}
      </div>

      {/* Enhanced Time-based Patterns */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Temporal Emotional Patterns
        </h3>
        
        <div className="space-y-4">
          {Object.entries(insights.pattern.timePatterns).map(([timeframe, emotions]: [string, any]) => (
            <div key={timeframe} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-purple-800 capitalize flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {timeframe} patterns
                </span>
                <span className="text-sm text-purple-600">{emotions.length} emotions tracked</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {emotions.map((emotion: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-white rounded text-sm text-purple-700 border border-purple-300">
                    {getEmotionEmoji(emotion)} {emotion}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coping Strategies Analysis */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
          Your Coping Strategies
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.therapeutic.copingStrategies.map((strategy: string, index: number) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-neutral-700">{strategy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional Intensity Trends */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Emotional Intensity Analysis
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-800 font-medium">Overall Trend</span>
            <div className="flex items-center space-x-2">
              {getTrendIcon(insights.pattern.trend)}
              <span className="text-green-700 capitalize">{insights.pattern.trend}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="text-2xl font-bold text-neutral-800">{insights.pattern.dominantEmotions.length}</div>
              <div className="text-sm text-neutral-600">Emotions Tracked</div>
            </div>
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="text-2xl font-bold text-neutral-800">{insights.pattern.triggers.length}</div>
              <div className="text-sm text-neutral-600">Triggers Identified</div>
            </div>
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="text-2xl font-bold text-neutral-800">{messages.length}</div>
              <div className="text-sm text-neutral-600">Conversations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-6">
      {/* Enhanced Growth Areas */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Personalized Growth Opportunities
        </h3>
        
        <div className="space-y-4">
          {insights.therapeutic.growthAreas.map((area: string, index: number) => (
            <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-2">{area}</h4>
                  <p className="text-sm text-green-700">
                    {area.includes('Anxiety') && "Developing evidence-based techniques to manage anxiety, including cognitive restructuring, exposure therapy principles, and somatic regulation."}
                    {area.includes('Depression') && "Building skills for mood regulation, behavioral activation, and cognitive flexibility to support emotional recovery."}
                    {area.includes('Stress') && "Learning comprehensive stress management including time management, boundary setting, and resilience building."}
                    {area.includes('Social') && "Developing social skills, confidence building, and strategies for meaningful connection."}
                    {area.includes('Work') && "Creating healthy work-life integration, professional boundary setting, and career stress management."}
                    {area.includes('Relationship') && "Improving communication skills, emotional intelligence, and healthy relationship dynamics."}
                    {area.includes('Performance') && "Building confidence, managing perfectionism, and developing healthy achievement motivation."}
                    {area.includes('Emotional') && "Enhancing emotional awareness, regulation skills, and self-compassion practices."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Progress Tracking */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-600" />
          Your Progress Indicators
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">Emotional Awareness</span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2 mb-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-yellow-700">Developing strong emotional intelligence and self-awareness</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="font-medium text-orange-800">Coping Skills</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2 mb-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-orange-700">Building a comprehensive toolkit of healthy coping strategies</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">Self-Compassion</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 mb-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-green-700">Learning to be kind and patient with yourself</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-800">Resilience</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-blue-700">Building emotional resilience and adaptive capacity</p>
          </div>
        </div>
      </div>

      {/* Skill Development Roadmap */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-purple-600" />
          Skill Development Roadmap
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-purple-800">Foundation Building</h4>
              <p className="text-sm text-purple-700">Emotional awareness, basic coping skills, self-compassion</p>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-800">Skill Integration</h4>
              <p className="text-sm text-blue-700">Advanced coping strategies, relationship skills, stress management</p>
            </div>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="w-8 h-8 bg-neutral-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Mastery & Growth</h4>
              <p className="text-sm text-neutral-700">Leadership, mentoring others, continued personal development</p>
            </div>
            <Target className="w-5 h-5 text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      {/* Enhanced Personalized Recommendations */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
          Personalized Action Plan
        </h3>
        
        <div className="space-y-4">
          {insights.therapeutic.recommendations.map((recommendation: string, index: number) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-neutral-700 mb-2">{recommendation}</p>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    Priority: {index < 2 ? 'High' : index < 4 ? 'Medium' : 'Low'}
                  </span>
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">
                    Timeline: {index < 2 ? 'This week' : index < 4 ? 'This month' : 'Ongoing'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Action Steps */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-green-600" />
          Immediate Action Steps
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <span className="text-2xl">🎯</span>
            <span className="text-neutral-700">Set a daily emotional check-in routine (5 minutes)</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <span className="text-2xl">📝</span>
            <span className="text-neutral-700">Start an emotion journal to track patterns and triggers</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <span className="text-2xl">🧘‍♀️</span>
            <span className="text-neutral-700">Practice one new coping technique this week</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <span className="text-2xl">🤝</span>
            <span className="text-neutral-700">Share insights with a trusted friend or therapist</span>
          </div>
        </div>
      </div>

      {/* Resource Recommendations */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-600" />
          Recommended Resources
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center">
              <Brain className="w-4 h-4 mr-1" />
              Professional Support
            </h4>
            <ul className="space-y-1 text-sm text-purple-700">
              <li>• Consider therapy for ongoing support</li>
              <li>• Explore support groups in your area</li>
              <li>• Consult with a mental health professional</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <Lightbulb className="w-4 h-4 mr-1" />
              Self-Help Tools
            </h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Mindfulness and meditation apps</li>
              <li>• Emotional regulation workbooks</li>
              <li>• Online therapy platforms</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2 flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              Community Support
            </h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Join online mental health communities</li>
              <li>• Connect with local support groups</li>
              <li>• Build your personal support network</li>
            </ul>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2 flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Lifestyle Support
            </h4>
            <ul className="space-y-1 text-sm text-orange-700">
              <li>• Regular exercise and movement</li>
              <li>• Nutrition and sleep optimization</li>
              <li>• Stress reduction activities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Encouragement Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200 text-center">
        <div className="text-4xl mb-4">🌟</div>
        <h3 className="text-lg font-semibold text-purple-800 mb-2">You're Making Incredible Progress!</h3>
        <p className="text-purple-700 leading-relaxed">
          Your commitment to understanding your emotions and seeking support shows remarkable strength and wisdom. 
          Every conversation, every insight, and every step forward is part of your unique healing journey. 
          You have everything within you to continue growing and thriving. Keep going! 💚
        </p>
        <div className="flex justify-center space-x-2 mt-4 text-2xl">
          <span>🌈</span>
          <span>💪</span>
          <span>✨</span>
          <span>🦋</span>
          <span>🌟</span>
        </div>
      </div>
    </div>
  );

  const renderSafety = () => (
    <div className="space-y-6">
      {/* Safety Assessment */}
      <div className={`rounded-xl p-6 border ${getRiskLevelColor(insights.therapeutic.riskAssessment?.level || 'low')}`}>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Safety & Wellness Check
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Current Risk Level</span>
            <div className="flex items-center space-x-2">
              {insights.therapeutic.riskAssessment?.level === 'high' ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : insights.therapeutic.riskAssessment?.level === 'moderate' ? (
                <Clock className="w-5 h-5 text-orange-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <span className="font-medium capitalize">
                {insights.therapeutic.riskAssessment?.level || 'Low'}
              </span>
            </div>
          </div>
          
          {insights.therapeutic.riskAssessment?.needsAttention && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">Attention Needed</h4>
              <p className="text-sm text-orange-700">
                Based on our conversation, it would be beneficial to consider additional support or professional guidance.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Crisis Support Resources
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-red-800">988 Suicide & Crisis Lifeline</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">24/7</span>
            </div>
            <p className="text-sm text-red-700">Call or text 988 for immediate crisis support</p>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-red-800">Crisis Text Line</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">24/7</span>
            </div>
            <p className="text-sm text-red-700">Text HOME to 741741 for crisis counseling</p>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-red-800">Emergency Services</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Emergency</span>
            </div>
            <p className="text-sm text-red-700">Call 911 if you're in immediate danger</p>
          </div>
        </div>
      </div>

      {/* Safety Planning */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Personal Safety Plan
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Warning Signs to Watch For</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Persistent thoughts of self-harm</li>
              <li>• Feeling hopeless or trapped</li>
              <li>• Withdrawing from friends and family</li>
              <li>• Dramatic mood changes</li>
              <li>• Increased substance use</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Coping Strategies</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Practice deep breathing exercises</li>
              <li>• Call a trusted friend or family member</li>
              <li>• Engage in physical activity</li>
              <li>• Use grounding techniques</li>
              <li>• Listen to calming music</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2">Support Network</h4>
            <p className="text-sm text-purple-700 mb-2">People you can reach out to:</p>
            <ul className="space-y-1 text-sm text-purple-700">
              <li>• Trusted friend or family member</li>
              <li>• Mental health professional</li>
              <li>• Crisis hotline counselor</li>
              <li>• Healthcare provider</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Support */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-indigo-600" />
          When to Seek Professional Help
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm text-neutral-700">
                <strong>Persistent symptoms:</strong> When emotional difficulties last for weeks or interfere with daily life
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm text-neutral-700">
                <strong>Relationship impact:</strong> When mental health affects your relationships, work, or school
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm text-neutral-700">
                <strong>Coping difficulties:</strong> When current strategies aren't helping or you need new tools
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm text-neutral-700">
                <strong>Prevention:</strong> Even when feeling okay, therapy can help build resilience and skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Brain className="w-6 h-6 mr-2" />
                Emotional Intelligence Insights
              </h1>
              <p className="text-purple-100 mt-1">Advanced analysis of your emotional patterns and growth</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'overview', label: 'Overview', icon: Heart },
              { id: 'patterns', label: 'Patterns', icon: BarChart3 },
              { id: 'growth', label: 'Growth', icon: TrendingUp },
              { id: 'recommendations', label: 'Action Plan', icon: Lightbulb },
              { id: 'safety', label: 'Safety', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
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

        {/* Enhanced Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'patterns' && renderPatterns()}
          {activeTab === 'growth' && renderGrowth()}
          {activeTab === 'recommendations' && renderRecommendations()}
          {activeTab === 'safety' && renderSafety()}
        </div>
      </div>
    </div>
  );
};

export default EmotionInsights;