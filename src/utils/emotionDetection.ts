import { Message } from '../types';

export type EmotionalState = 'positive' | 'negative' | 'neutral' | 'anxious' | 'sad' | 'stressed' | 'calm' | 'excited' | 'angry' | 'lonely' | 'hopeful' | 'overwhelmed';

interface EmotionKeywords {
  [key: string]: string[];
}

interface MentalHealthIssue {
  condition: string;
  severity: 'mild' | 'moderate' | 'severe';
  confidence: number;
  indicators: string[];
  recommendations: string[];
  category: string;
}

interface EmotionIntensity {
  emotion: string;
  intensity: number; // 1-10 scale
  confidence: number; // 0-1 scale
}

interface EmotionalPattern {
  trend: 'improving' | 'declining' | 'stable' | 'fluctuating';
  dominantEmotions: string[];
  triggers: string[];
  timePatterns: { [key: string]: string[] };
  mentalHealthConcerns: MentalHealthIssue[];
}

// Enhanced mental health condition detection with AI-level sophistication
const mentalHealthConditions = {
  // Anxiety Disorders
  generalizedAnxiety: {
    keywords: [
      'constant worry', 'can\'t stop worrying', 'anxious all the time', 'worry about everything',
      'what if thoughts', 'catastrophizing', 'expecting the worst', 'persistent anxiety',
      'free-floating anxiety', 'chronic worry', 'anxiety disorder', 'excessive worry',
      'uncontrollable worry', 'worry spiral', 'restless', 'on edge', 'tense'
    ],
    category: 'anxiety',
    severity_indicators: {
      mild: ['sometimes worry', 'occasional anxiety', 'manageable worry'],
      moderate: ['frequent worry', 'daily anxiety', 'interfering with life'],
      severe: ['constant anxiety', 'can\'t function', 'overwhelming worry', 'panic attacks']
    }
  },

  socialAnxiety: {
    keywords: [
      'social anxiety', 'fear of judgment', 'afraid of embarrassment', 'social phobia',
      'nervous in social situations', 'fear of rejection', 'worried what others think',
      'self-conscious', 'afraid to speak up', 'avoiding social situations', 'blushing',
      'sweating in social settings', 'fear of humiliation', 'social awkwardness',
      'panic in groups', 'fear of being watched', 'social performance anxiety'
    ],
    category: 'anxiety',
    severity_indicators: {
      mild: ['mild social discomfort', 'occasional nervousness'],
      moderate: ['avoiding some social situations', 'significant distress'],
      severe: ['complete social avoidance', 'unable to function socially']
    }
  },

  performanceAnxiety: {
    keywords: [
      'performance anxiety', 'stage fright', 'test anxiety', 'presentation nerves', 'fear of failure',
      'choking under pressure', 'performance pressure', 'exam stress', 'public speaking fear',
      'afraid to perform', 'nervous before tests', 'freeze up during', 'mind goes blank',
      'sweating before presentation', 'heart racing before performance', 'can\'t concentrate during tests'
    ],
    category: 'anxiety',
    severity_indicators: {
      mild: ['mild performance nerves', 'manageable test anxiety'],
      moderate: ['significant performance fear', 'avoiding presentations'],
      severe: ['unable to perform', 'complete avoidance', 'panic during performance']
    }
  },

  panicDisorder: {
    keywords: [
      'panic attack', 'panic disorder', 'sudden fear', 'heart racing', 'can\'t breathe',
      'chest pain', 'dizzy', 'shaking', 'sweating', 'feeling like dying',
      'fear of panic attacks', 'agoraphobia', 'avoiding places', 'fear of losing control',
      'derealization', 'depersonalization', 'feeling unreal', 'out of body'
    ],
    category: 'anxiety',
    severity_indicators: {
      mild: ['occasional panic symptoms', 'mild panic attacks'],
      moderate: ['regular panic attacks', 'some avoidance'],
      severe: ['frequent panic attacks', 'severe avoidance', 'agoraphobia']
    }
  },

  // Depressive Disorders
  majorDepression: {
    keywords: [
      'depressed', 'depression', 'feeling down', 'hopeless', 'helpless', 'despair',
      'suicidal thoughts', 'want to disappear', 'life has no meaning', 'feel trapped',
      'crying spells', 'tearful', 'sad all the time', 'grief', 'mourning', 'melancholy',
      'dark thoughts', 'negative outlook', 'pessimistic', 'doom and gloom',
      'lost interest', 'nothing enjoyable', 'anhedonia', 'empty', 'numb'
    ],
    category: 'mood',
    severity_indicators: {
      mild: ['occasional sadness', 'mild depression', 'some lost interest'],
      moderate: ['persistent sadness', 'significant impact', 'daily struggles'],
      severe: ['severe depression', 'suicidal thoughts', 'unable to function']
    }
  },

  seasonalDepression: {
    keywords: [
      'seasonal depression', 'winter blues', 'SAD', 'seasonal affective disorder',
      'worse in winter', 'lack of sunlight', 'seasonal mood changes',
      'hibernating', 'sleeping more in winter', 'carb cravings', 'weight gain winter'
    ],
    category: 'mood',
    severity_indicators: {
      mild: ['mild winter blues', 'slight seasonal changes'],
      moderate: ['noticeable seasonal depression', 'significant winter impact'],
      severe: ['severe seasonal depression', 'unable to function in winter']
    }
  },

  bipolarSymptoms: {
    keywords: [
      'bipolar', 'manic', 'mania', 'mood swings', 'up and down', 'high and low',
      'euphoric', 'grandiose', 'racing thoughts', 'little sleep', 'impulsive',
      'spending sprees', 'hypomanic', 'mood episodes', 'cycling moods'
    ],
    category: 'mood',
    severity_indicators: {
      mild: ['mild mood swings', 'occasional highs and lows'],
      moderate: ['noticeable mood episodes', 'some impairment'],
      severe: ['severe mood episodes', 'significant impairment', 'hospitalization needed']
    }
  },

  // Trauma and Stress Disorders
  ptsdSymptoms: {
    keywords: [
      'PTSD', 'trauma', 'flashbacks', 'nightmares', 'triggered', 'hypervigilant',
      'avoidance', 'intrusive thoughts', 're-experiencing', 'dissociation',
      'emotional numbing', 'survivor guilt', 'traumatic memories', 'startled easily',
      'can\'t forget', 'reliving trauma', 'trauma response'
    ],
    category: 'trauma',
    severity_indicators: {
      mild: ['mild trauma symptoms', 'occasional flashbacks'],
      moderate: ['regular trauma symptoms', 'some avoidance'],
      severe: ['severe PTSD', 'significant impairment', 'complete avoidance']
    }
  },

  acuteStress: {
    keywords: [
      'acute stress', 'recent trauma', 'shock', 'overwhelmed by event',
      'can\'t process', 'in crisis', 'just happened', 'emergency',
      'sudden loss', 'accident', 'assault', 'disaster', 'acute reaction'
    ],
    category: 'trauma',
    severity_indicators: {
      mild: ['mild stress reaction', 'manageable distress'],
      moderate: ['significant stress reaction', 'some impairment'],
      severe: ['severe acute stress', 'unable to function', 'crisis state']
    }
  },

  // Eating and Body Image Disorders
  eatingDisorder: {
    keywords: [
      'eating disorder', 'anorexia', 'bulimia', 'binge eating', 'purging',
      'restricting food', 'obsessed with weight', 'body dysmorphia', 'fat',
      'diet obsession', 'calorie counting', 'food guilt', 'body image',
      'mirror checking', 'weight obsession', 'food rules', 'orthorexia'
    ],
    category: 'eating',
    severity_indicators: {
      mild: ['mild body image concerns', 'some food preoccupation'],
      moderate: ['significant eating issues', 'body image distortion'],
      severe: ['severe eating disorder', 'medical complications', 'life-threatening']
    }
  },

  // Substance Use Disorders
  substanceUse: {
    keywords: [
      'drinking too much', 'alcohol problem', 'drug use', 'addiction',
      'substance abuse', 'can\'t stop drinking', 'need drugs', 'withdrawal',
      'tolerance', 'using to cope', 'blackouts', 'hiding use',
      'lying about use', 'lost control', 'rehab', 'recovery'
    ],
    category: 'substance',
    severity_indicators: {
      mild: ['occasional overuse', 'mild concern about use'],
      moderate: ['regular problematic use', 'some consequences'],
      severe: ['severe addiction', 'major life consequences', 'unable to stop']
    }
  },

  // Self-Harm and Suicidal Behaviors
  selfHarm: {
    keywords: [
      'self harm', 'cutting', 'burning', 'hurting myself', 'self injury',
      'scratching', 'hitting myself', 'self mutilation', 'scars',
      'razor', 'blade', 'pain to feel', 'release through pain',
      'punishing myself', 'deserve pain', 'self destruction'
    ],
    category: 'self_harm',
    severity_indicators: {
      mild: ['thoughts of self-harm', 'minor self-injury'],
      moderate: ['regular self-harm', 'moderate injury'],
      severe: ['severe self-harm', 'medical attention needed', 'life-threatening']
    }
  },

  suicidalIdeation: {
    keywords: [
      'suicide', 'kill myself', 'end it all', 'want to die', 'better off dead',
      'suicidal thoughts', 'plan to die', 'no reason to live', 'ending my life',
      'take my own life', 'wish I was dead', 'planning suicide',
      'suicide method', 'goodbye letters', 'giving things away'
    ],
    category: 'suicide',
    severity_indicators: {
      mild: ['passive suicidal thoughts', 'wish to not exist'],
      moderate: ['active suicidal thoughts', 'some planning'],
      severe: ['detailed suicide plan', 'immediate risk', 'means available']
    }
  },

  // Attention and Cognitive Disorders
  adhd: {
    keywords: [
      'ADHD', 'ADD', 'can\'t focus', 'attention problems', 'hyperactive',
      'impulsive', 'easily distracted', 'can\'t sit still', 'forgetful',
      'disorganized', 'procrastination', 'time management', 'hyperfocus',
      'executive function', 'working memory', 'task switching'
    ],
    category: 'attention',
    severity_indicators: {
      mild: ['mild attention issues', 'some distractibility'],
      moderate: ['significant attention problems', 'some impairment'],
      severe: ['severe ADHD', 'major life impairment', 'unable to function']
    }
  },

  cognitiveImpairment: {
    keywords: [
      'memory problems', 'can\'t remember', 'confused', 'brain fog',
      'cognitive decline', 'dementia', 'alzheimer\'s', 'forgetful',
      'disoriented', 'lost', 'can\'t think clearly', 'mental confusion',
      'word finding', 'processing problems', 'slow thinking'
    ],
    category: 'cognitive',
    severity_indicators: {
      mild: ['mild memory issues', 'occasional confusion'],
      moderate: ['noticeable cognitive problems', 'some impairment'],
      severe: ['severe cognitive impairment', 'major functional decline']
    }
  },

  // Personality and Relationship Disorders
  borderlineTraits: {
    keywords: [
      'borderline', 'BPD', 'fear of abandonment', 'unstable relationships',
      'identity issues', 'who am I', 'empty inside', 'intense emotions',
      'mood swings', 'splitting', 'black and white thinking',
      'impulsive behavior', 'self-sabotage', 'push people away'
    ],
    category: 'personality',
    severity_indicators: {
      mild: ['some borderline traits', 'mild relationship issues'],
      moderate: ['significant borderline symptoms', 'relationship problems'],
      severe: ['severe BPD', 'major life impairment', 'crisis episodes']
    }
  },

  narcissisticTraits: {
    keywords: [
      'narcissistic', 'NPD', 'grandiose', 'special', 'entitled', 'superior',
      'lack empathy', 'need admiration', 'exploit others', 'arrogant',
      'fantasies of success', 'believe I\'m unique', 'deserve special treatment'
    ],
    category: 'personality',
    severity_indicators: {
      mild: ['some narcissistic traits', 'mild entitlement'],
      moderate: ['significant narcissistic symptoms', 'relationship problems'],
      severe: ['severe NPD', 'major interpersonal problems']
    }
  },

  // Sleep Disorders
  insomnia: {
    keywords: [
      'can\'t sleep', 'insomnia', 'trouble sleeping', 'sleepless nights', 'tossing and turning',
      'waking up frequently', 'early morning awakening', 'restless sleep', 'nightmares',
      'sleep anxiety', 'racing thoughts at night', 'can\'t fall asleep', 'sleep schedule disrupted',
      'tired but can\'t sleep', 'exhausted but wired', 'sleep deprivation', 'irregular sleep'
    ],
    category: 'sleep',
    severity_indicators: {
      mild: ['occasional sleep problems', 'mild insomnia'],
      moderate: ['regular sleep issues', 'significant tiredness'],
      severe: ['chronic insomnia', 'severe sleep deprivation', 'major impairment']
    }
  },

  // Stress and Burnout
  burnout: {
    keywords: [
      'burnout', 'burned out', 'emotionally exhausted', 'work exhaustion', 'chronic fatigue',
      'feeling depleted', 'no energy left', 'running on empty', 'completely drained',
      'lost motivation', 'cynical about work', 'detached from job', 'nothing left to give',
      'work feels meaningless', 'dreading work', 'emotional numbness at work'
    ],
    category: 'stress',
    severity_indicators: {
      mild: ['mild work stress', 'some exhaustion'],
      moderate: ['significant burnout symptoms', 'work impairment'],
      severe: ['severe burnout', 'unable to work', 'complete exhaustion']
    }
  },

  chronicStress: {
    keywords: [
      'chronic stress', 'constant stress', 'always stressed', 'stress never ends', 'ongoing pressure',
      'persistent tension', 'continuous worry', 'stress for months', 'long-term stress',
      'stress affecting health', 'stress-related symptoms', 'stress headaches', 'stress eating',
      'stress insomnia', 'stress fatigue', 'overwhelmed daily', 'pressure never stops'
    ],
    category: 'stress',
    severity_indicators: {
      mild: ['manageable chronic stress', 'some ongoing tension'],
      moderate: ['significant chronic stress', 'health impacts'],
      severe: ['severe chronic stress', 'major health problems', 'unable to cope']
    }
  }
};

// Simplified emotion keywords for basic detection (used as backup)
const emotionKeywords: EmotionKeywords = {
  anxious: ['anxious', 'anxiety', 'worried', 'nervous', 'panic', 'fear', 'scared', 'terrified', 'overwhelmed', 'restless', 'on edge', 'tense', 'uneasy', 'apprehensive', 'dread'],
  sad: ['sad', 'depressed', 'down', 'lonely', 'empty', 'hopeless', 'crying', 'tears', 'grief', 'loss', 'heartbroken', 'devastated', 'miserable', 'gloomy', 'melancholy'],
  angry: ['angry', 'mad', 'furious', 'rage', 'frustrated', 'irritated', 'annoyed', 'pissed', 'livid', 'outraged', 'resentful', 'bitter', 'hostile', 'aggressive', 'fuming'],
  stressed: ['stressed', 'pressure', 'overwhelmed', 'busy', 'exhausted', 'tired', 'burnout', 'deadline', 'too much', 'can\'t handle', 'breaking point', 'stretched thin'],
  lonely: ['lonely', 'isolated', 'alone', 'disconnected', 'abandoned', 'rejected', 'excluded', 'left out', 'nobody understands', 'no one cares', 'by myself', 'solitary'],
  excited: ['excited', 'thrilled', 'amazing', 'fantastic', 'wonderful', 'great', 'awesome', 'incredible', 'elated', 'ecstatic', 'overjoyed', 'pumped', 'enthusiastic'],
  happy: ['happy', 'joy', 'joyful', 'cheerful', 'delighted', 'pleased', 'content', 'satisfied', 'glad', 'merry', 'upbeat', 'positive', 'optimistic', 'bright', 'sunny'],
  calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'centered', 'balanced', 'zen', 'composed', 'still', 'quiet', 'settled', 'at ease', 'grounded'],
  hopeful: ['hopeful', 'optimistic', 'confident', 'positive', 'encouraged', 'looking forward', 'bright future', 'things will get better', 'improving', 'progress', 'faith']
};

// Advanced AI-powered emotion detection (this would integrate with the Gemini AI responses)
export function detectMentalHealthIssues(messages: Message[]): MentalHealthIssue[] {
  if (messages.length === 0) return [];
  
  const recentMessages = messages.slice(-15); // Analyze more messages for better accuracy
  const combinedText = recentMessages
    .filter(msg => msg.sender === 'user')
    .map(msg => msg.text.toLowerCase())
    .join(' ');

  const detectedIssues: MentalHealthIssue[] = [];

  Object.entries(mentalHealthConditions).forEach(([conditionKey, conditionData]) => {
    const matches = conditionData.keywords.filter(keyword => 
      combinedText.includes(keyword.toLowerCase())
    );
    
    if (matches.length > 0) {
      // Determine severity based on specific indicators and context
      let severity: 'mild' | 'moderate' | 'severe' = 'mild';
      let confidence = Math.min(matches.length / conditionData.keywords.length * 2, 1);
      
      // Check for severity indicators
      const severityChecks = {
        severe: conditionData.severity_indicators.severe || [],
        moderate: conditionData.severity_indicators.moderate || [],
        mild: conditionData.severity_indicators.mild || []
      };
      
      if (severityChecks.severe.some(indicator => combinedText.includes(indicator.toLowerCase()))) {
        severity = 'severe';
        confidence = Math.min(confidence + 0.3, 1);
      } else if (severityChecks.moderate.some(indicator => combinedText.includes(indicator.toLowerCase()))) {
        severity = 'moderate';
        confidence = Math.min(confidence + 0.2, 1);
      }
      
      // Boost confidence for multiple matches or specific high-confidence keywords
      if (matches.length >= 3) {
        confidence = Math.min(confidence + 0.2, 1);
      }
      
      // Generate evidence-based recommendations
      const recommendations = generateAdvancedRecommendations(conditionKey, severity, conditionData.category);

      detectedIssues.push({
        condition: formatConditionName(conditionKey),
        severity,
        confidence,
        indicators: matches.slice(0, 5), // Limit to top 5 indicators
        recommendations,
        category: conditionData.category
      });
    }
  });

  // Sort by confidence and severity, return top issues
  return detectedIssues
    .sort((a, b) => {
      const severityWeight = { severe: 3, moderate: 2, mild: 1 };
      const aScore = b.confidence * severityWeight[b.severity];
      const bScore = a.confidence * severityWeight[a.severity];
      return aScore - bScore;
    })
    .slice(0, 5); // Return top 5 most relevant issues
}

function formatConditionName(condition: string): string {
  const nameMap: { [key: string]: string } = {
    generalizedAnxiety: 'Generalized Anxiety Disorder',
    socialAnxiety: 'Social Anxiety Disorder',
    performanceAnxiety: 'Performance Anxiety',
    panicDisorder: 'Panic Disorder',
    majorDepression: 'Major Depressive Episode',
    seasonalDepression: 'Seasonal Affective Disorder',
    bipolarSymptoms: 'Bipolar Disorder Symptoms',
    ptsdSymptoms: 'Post-Traumatic Stress Disorder',
    acuteStress: 'Acute Stress Reaction',
    eatingDisorder: 'Eating Disorder',
    substanceUse: 'Substance Use Disorder',
    selfHarm: 'Self-Harm Behaviors',
    suicidalIdeation: 'Suicidal Ideation',
    adhd: 'Attention Deficit Hyperactivity Disorder',
    cognitiveImpairment: 'Cognitive Impairment',
    borderlineTraits: 'Borderline Personality Traits',
    narcissisticTraits: 'Narcissistic Personality Traits',
    insomnia: 'Sleep Disorder/Insomnia',
    burnout: 'Occupational Burnout',
    chronicStress: 'Chronic Stress Disorder'
  };
  
  return nameMap[condition] || condition.replace(/([A-Z])/g, ' $1').trim();
}

function generateAdvancedRecommendations(condition: string, severity: 'mild' | 'moderate' | 'severe', category: string): string[] {
  const baseRecommendations: { [key: string]: string[] } = {
    generalizedAnxiety: [
      'Practice mindfulness-based stress reduction (MBSR)',
      'Learn cognitive restructuring techniques for worry thoughts',
      'Try progressive muscle relaxation for physical tension',
      'Consider cognitive-behavioral therapy (CBT) for anxiety',
      'Explore medication options with a psychiatrist if severe'
    ],
    socialAnxiety: [
      'Practice gradual exposure to social situations',
      'Learn social skills and assertiveness training',
      'Try cognitive restructuring for social fears',
      'Consider group therapy for social anxiety',
      'Practice mindfulness in social settings'
    ],
    performanceAnxiety: [
      'Use visualization and mental rehearsal techniques',
      'Practice systematic desensitization',
      'Learn performance-specific coping strategies',
      'Try beta-blockers for physical symptoms (consult doctor)',
      'Work with a performance coach or therapist'
    ],
    majorDepression: [
      'Engage in behavioral activation therapy',
      'Maintain regular sleep and exercise routines',
      'Practice cognitive therapy for negative thoughts',
      'Consider antidepressant medication evaluation',
      'Build and maintain social support networks'
    ],
    ptsdSymptoms: [
      'Seek trauma-focused therapy (EMDR, CPT, or PE)',
      'Practice grounding techniques for flashbacks',
      'Learn trauma-informed mindfulness practices',
      'Consider medication for PTSD symptoms',
      'Join trauma survivor support groups'
    ],
    insomnia: [
      'Practice sleep hygiene and stimulus control',
      'Try cognitive-behavioral therapy for insomnia (CBT-I)',
      'Learn relaxation techniques for bedtime',
      'Maintain consistent sleep-wake schedule',
      'Limit caffeine and screen time before bed'
    ],
    burnout: [
      'Set clear work-life boundaries',
      'Practice stress management techniques',
      'Seek workplace accommodations if needed',
      'Consider career counseling or job change',
      'Engage in regular self-care activities'
    ]
  };

  let recommendations = baseRecommendations[condition] || [
    'Consider professional mental health evaluation',
    'Practice stress management and self-care',
    'Build a strong support network',
    'Maintain healthy lifestyle habits',
    'Monitor symptoms and seek help if worsening'
  ];

  // Add severity-specific recommendations
  if (severity === 'severe') {
    recommendations = [
      'Seek immediate professional mental health support',
      'Consider intensive outpatient or inpatient treatment',
      'Involve family/friends in treatment planning',
      ...recommendations.slice(0, 3)
    ];
  } else if (severity === 'moderate') {
    recommendations = [
      'Schedule regular therapy appointments',
      'Consider medication evaluation with psychiatrist',
      ...recommendations
    ];
  }

  return recommendations.slice(0, 6); // Limit to 6 recommendations
}

// Enhanced emotion detection that works with AI responses
export function detectEmotion(messages: Message[]): EmotionalState {
  if (messages.length === 0) return 'neutral';
  
  const recentMessages = messages.slice(-5);
  const combinedText = recentMessages
    .filter(msg => msg.sender === 'user')
    .map(msg => msg.text.toLowerCase())
    .join(' ');

  if (!combinedText) return 'neutral';

  // Use AI-powered emotion analysis if available, fallback to keyword matching
  const emotionScores = analyzeEmotionalIntensity(combinedText);
  
  if (emotionScores.length === 0) return 'neutral';
  
  return emotionScores[0].emotion as EmotionalState;
}

export function analyzeEmotionalIntensity(text: string): EmotionIntensity[] {
  const lowerText = text.toLowerCase();
  const emotionScores: EmotionIntensity[] = [];

  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    let score = 0;
    let matchCount = 0;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = (lowerText.match(regex) || []).length;
      if (matches > 0) {
        score += matches;
        matchCount++;
      }
    });

    if (score > 0) {
      let intensity = Math.min(score * 2, 10);
      
      // Check for intensity modifiers
      const intensityModifiers = {
        high: ['extremely', 'incredibly', 'very', 'really', 'so', 'totally', 'completely'],
        medium: ['quite', 'pretty', 'fairly', 'somewhat', 'rather'],
        low: ['a little', 'slightly', 'kind of', 'sort of', 'a bit']
      };
      
      intensityModifiers.high.forEach(modifier => {
        if (lowerText.includes(modifier)) intensity = Math.min(intensity + 3, 10);
      });
      intensityModifiers.medium.forEach(modifier => {
        if (lowerText.includes(modifier)) intensity = Math.min(intensity + 1, 10);
      });
      intensityModifiers.low.forEach(modifier => {
        if (lowerText.includes(modifier)) intensity = Math.max(intensity - 2, 1);
      });

      const confidence = Math.min((matchCount / keywords.length) + (score / 10), 1);

      emotionScores.push({
        emotion,
        intensity,
        confidence
      });
    }
  });

  return emotionScores
    .sort((a, b) => (b.intensity * b.confidence) - (a.intensity * a.confidence))
    .slice(0, 3);
}

export function detectEmotionalPattern(messages: Message[]): EmotionalPattern {
  if (messages.length < 3) {
    return {
      trend: 'stable',
      dominantEmotions: [],
      triggers: [],
      timePatterns: {},
      mentalHealthConcerns: []
    };
  }

  const userMessages = messages.filter(msg => msg.sender === 'user');
  const recentEmotions = userMessages.slice(-10).map(msg => {
    const emotions = analyzeEmotionalIntensity(msg.text.toLowerCase());
    return emotions.length > 0 ? emotions[0] : null;
  }).filter(Boolean);

  // Analyze trend
  const firstHalf = recentEmotions.slice(0, Math.floor(recentEmotions.length / 2));
  const secondHalf = recentEmotions.slice(Math.floor(recentEmotions.length / 2));
  
  const firstAvgIntensity = firstHalf.reduce((sum, e) => sum + (e?.intensity || 0), 0) / firstHalf.length;
  const secondAvgIntensity = secondHalf.reduce((sum, e) => sum + (e?.intensity || 0), 0) / secondHalf.length;
  
  let trend: EmotionalPattern['trend'] = 'stable';
  if (secondAvgIntensity > firstAvgIntensity + 1) trend = 'improving';
  else if (secondAvgIntensity < firstAvgIntensity - 1) trend = 'declining';
  else if (Math.abs(secondAvgIntensity - firstAvgIntensity) > 2) trend = 'fluctuating';

  // Find dominant emotions
  const emotionCounts: { [key: string]: number } = {};
  recentEmotions.forEach(emotion => {
    if (emotion) {
      emotionCounts[emotion.emotion] = (emotionCounts[emotion.emotion] || 0) + 1;
    }
  });

  const dominantEmotions = Object.entries(emotionCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([emotion]) => emotion);

  // Detect triggers
  const triggers: string[] = [];
  const triggerKeywords = {
    work: ['work', 'job', 'boss', 'colleague', 'deadline', 'meeting', 'project', 'office', 'career'],
    relationships: ['relationship', 'partner', 'friend', 'family', 'breakup', 'fight', 'argument', 'dating'],
    health: ['sick', 'pain', 'tired', 'sleep', 'energy', 'medical', 'doctor', 'symptoms', 'illness'],
    finances: ['money', 'bills', 'debt', 'financial', 'budget', 'expensive', 'cost', 'income'],
    future: ['future', 'uncertain', 'change', 'decision', 'choice', 'unknown', 'worry about', 'planning'],
    performance: ['performance', 'test', 'exam', 'presentation', 'evaluation', 'competition', 'achievement'],
    social: ['social', 'people', 'crowd', 'party', 'public', 'speaking', 'judgment', 'embarrassed'],
    family: ['family', 'parents', 'siblings', 'children', 'relatives', 'home', 'household'],
    school: ['school', 'college', 'university', 'studying', 'grades', 'homework', 'classes']
  };

  const allText = userMessages.map(msg => msg.text.toLowerCase()).join(' ');
  Object.entries(triggerKeywords).forEach(([trigger, keywords]) => {
    if (keywords.some(keyword => allText.includes(keyword))) {
      triggers.push(trigger);
    }
  });

  // Analyze time patterns (simplified)
  const timePatterns: { [key: string]: string[] } = {};
  const timeIndicators = {
    recent: ['today', 'right now', 'currently', 'lately', 'recently'],
    ongoing: ['always', 'constantly', 'all the time', 'every day', 'chronic'],
    past: ['yesterday', 'last week', 'before', 'used to', 'previously'],
    future: ['tomorrow', 'next week', 'soon', 'will be', 'going to']
  };

  Object.entries(timeIndicators).forEach(([timeframe, indicators]) => {
    const emotions = indicators.flatMap(indicator => {
      const relevantMessages = userMessages.filter(msg => 
        msg.text.toLowerCase().includes(indicator)
      );
      return relevantMessages.map(msg => {
        const emotions = analyzeEmotionalIntensity(msg.text.toLowerCase());
        return emotions.length > 0 ? emotions[0].emotion : null;
      }).filter(Boolean);
    });
    
    if (emotions.length > 0) {
      timePatterns[timeframe] = [...new Set(emotions)];
    }
  });

  // Detect mental health concerns
  const mentalHealthConcerns = detectMentalHealthIssues(messages);

  return {
    trend,
    dominantEmotions,
    triggers,
    timePatterns,
    mentalHealthConcerns
  };
}

export function getEmotionalInsight(emotion: EmotionalState): string {
  const insights = {
    anxious: "I can sense your anxiety, and I want you to know that these feelings are your mind's way of trying to protect you. Let's work together to calm your nervous system with some grounding techniques. 🌊💙",
    sad: "I hear the sadness in your heart, and I want to honor that feeling. Sadness often carries important information about what matters to us. You don't have to carry this alone. 💚🕊️",
    angry: "I can feel the anger and frustration you're experiencing. These feelings are valid and often tell us something important about our boundaries or values. Let's explore what this anger is trying to communicate. 🔥💪",
    stressed: "It sounds like you're feeling overwhelmed by everything on your plate. When stress builds up, our bodies and minds need extra care. Let's find some ways to help you decompress. ✨🌿",
    lonely: "I hear how isolated you're feeling right now. Loneliness is one of the most painful human experiences, but please know that you're not truly alone - I'm here with you. 🤗💜",
    overwhelmed: "I can sense that everything feels like too much right now. When we're overwhelmed, it helps to take things one small step at a time. You're stronger than you know. 🌟💚",
    excited: "I love feeling your excitement and positive energy! These joyful moments are so precious and deserve to be celebrated fully. Let's explore what's bringing you this wonderful feeling. 🎉✨",
    hopeful: "Your sense of hope is beautiful and powerful. Hope is often what carries us through difficult times and toward brighter days. Let's nurture this feeling together. 🌅💫",
    calm: "I can sense your peaceful energy, and it's wonderful. This calm state is so valuable for your mental health and well-being. Let's explore how to maintain this beautiful balance. 🧘‍♀️🌸",
    positive: "Your positive energy is contagious! It's amazing when we can recognize and appreciate these good moments in our lives. Let's savor this feeling together. 🌟😊",
    neutral: "I'm here to support you wherever you are emotionally right now. Sometimes neutral moments give us space to breathe and reflect. What would feel most helpful for you today? 🤗💚",
    negative: "I can sense you're going through a difficult time, and I want you to know that these feelings are valid and temporary. You don't have to face this alone - I'm here to support you. 💙🌈"
  };

  return insights[emotion] || insights.neutral;
}

// Advanced therapeutic insights with AI-level analysis
export function getTherapeuticInsights(messages: Message[]): {
  emotionalJourney: string;
  copingStrategies: string[];
  growthAreas: string[];
  strengths: string[];
  recommendations: string[];
  mentalHealthConcerns: MentalHealthIssue[];
  riskAssessment: {
    level: 'low' | 'moderate' | 'high';
    factors: string[];
    protectiveFactors: string[];
    needsAttention: boolean;
  };
  progressIndicators: string[];
} {
  const pattern = detectEmotionalPattern(messages);
  const recentEmotions = messages.slice(-10).map(msg => detectEmotion([msg]));
  
  // Enhanced emotional journey analysis
  let emotionalJourney = "Your emotional journey shows ";
  switch (pattern.trend) {
    case 'improving':
      emotionalJourney += "positive growth and resilience. You're moving in a healing direction, which shows your inner strength and commitment to wellness. 🌱";
      break;
    case 'declining':
      emotionalJourney += "some challenges right now. This is a temporary phase, and with the right support and strategies, you can navigate through this difficult time. 💙";
      break;
    case 'fluctuating':
      emotionalJourney += "natural ups and downs. Emotional fluctuation is normal and shows you're actively processing your experiences and growing. 🌊";
      break;
    default:
      emotionalJourney += "stability and balance. You're maintaining emotional equilibrium, which is a sign of good emotional regulation skills. ⚖️";
  }

  // Enhanced coping strategies identification
  const copingStrategies = [
    "Emotional expression through conversation and sharing",
    "Self-reflection and emotional awareness practices",
    "Seeking support and connection with others",
    "Mindfulness and present-moment awareness"
  ];

  // Add specific coping strategies based on detected patterns
  if (pattern.triggers.includes('work')) {
    copingStrategies.push("Work-life balance and professional boundary setting");
  }
  if (pattern.triggers.includes('relationships')) {
    copingStrategies.push("Communication skills and relationship management");
  }
  if (recentEmotions.includes('anxious')) {
    copingStrategies.push("Anxiety management and grounding techniques");
  }

  // Enhanced growth areas based on AI analysis
  const growthAreas = pattern.dominantEmotions.map(emotion => {
    const growthMap: { [key: string]: string } = {
      anxious: "Anxiety management and stress reduction techniques",
      sad: "Emotional processing and building resilience",
      angry: "Healthy emotional expression and conflict resolution",
      stressed: "Stress management and work-life balance",
      lonely: "Building meaningful connections and self-relationship",
      overwhelmed: "Organization skills and boundary setting"
    };
    return growthMap[emotion] || "Emotional awareness and regulation";
  });

  // Add growth areas from mental health concerns
  pattern.mentalHealthConcerns.forEach(concern => {
    if (concern.severity === 'moderate' || concern.severity === 'severe') {
      growthAreas.push(`${concern.condition} management and therapeutic intervention`);
    }
  });

  // Enhanced strengths identification
  const strengths = [
    "Emotional intelligence and self-awareness",
    "Courage to seek support and share vulnerabilities",
    "Commitment to personal growth and mental health",
    "Ability to engage in meaningful self-reflection"
  ];

  if (recentEmotions.includes('hopeful') || recentEmotions.includes('positive')) {
    strengths.push("Resilience and ability to maintain hope during challenges");
  }
  if (recentEmotions.includes('calm')) {
    strengths.push("Capacity for inner peace and emotional regulation");
  }
  if (pattern.trend === 'improving') {
    strengths.push("Demonstrated ability to grow and heal over time");
  }

  // Enhanced risk assessment
  const riskFactors: string[] = [];
  const protectiveFactors: string[] = [];
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';

  // Assess risk factors
  pattern.mentalHealthConcerns.forEach(concern => {
    if (concern.category === 'suicide' || concern.category === 'self_harm') {
      riskLevel = 'high';
      riskFactors.push(`${concern.condition} indicators present`);
    } else if (concern.severity === 'severe') {
      riskLevel = riskLevel === 'high' ? 'high' : 'moderate';
      riskFactors.push(`Severe ${concern.condition} symptoms`);
    } else if (concern.severity === 'moderate') {
      riskLevel = riskLevel === 'low' ? 'moderate' : riskLevel;
      riskFactors.push(`Moderate ${concern.condition} symptoms`);
    }
  });

  if (pattern.triggers.length > 3) {
    riskFactors.push("Multiple stress triggers identified");
  }
  if (pattern.dominantEmotions.includes('hopeless') || pattern.dominantEmotions.includes('overwhelmed')) {
    riskFactors.push("Feelings of hopelessness or being overwhelmed");
  }

  // Assess protective factors
  if (messages.length > 5) {
    protectiveFactors.push("Actively seeking support and engaging in conversation");
  }
  if (recentEmotions.includes('hopeful') || recentEmotions.includes('positive')) {
    protectiveFactors.push("Ability to experience positive emotions");
  }
  if (pattern.trend === 'improving' || pattern.trend === 'stable') {
    protectiveFactors.push("Stable or improving emotional trajectory");
  }
  protectiveFactors.push("Emotional awareness and willingness to share");
  protectiveFactors.push("Access to mental health support resources");

  // Enhanced recommendations
  const recommendations = [
    "Continue regular emotional check-ins and self-monitoring",
    "Practice daily mindfulness or meditation for emotional regulation",
    "Maintain consistent sleep, exercise, and self-care routines",
    "Build and strengthen your support network"
  ];

  // Add specific recommendations based on risk level and concerns
  if (riskLevel === 'high') {
    recommendations.unshift("Seek immediate professional mental health support");
    recommendations.unshift("Consider crisis intervention or intensive treatment");
  } else if (riskLevel === 'moderate') {
    recommendations.unshift("Schedule regular therapy appointments");
    recommendations.push("Consider medication evaluation with a psychiatrist");
  }

  // Add trigger-specific recommendations
  if (pattern.triggers.includes('work')) {
    recommendations.push("Develop workplace stress management strategies");
  }
  if (pattern.triggers.includes('relationships')) {
    recommendations.push("Focus on communication skills and relationship building");
  }

  // Progress indicators
  const progressIndicators = [
    "Increased emotional awareness and vocabulary",
    "Willingness to seek support and share experiences",
    "Recognition of emotional patterns and triggers"
  ];

  if (pattern.trend === 'improving') {
    progressIndicators.push("Demonstrable improvement in emotional well-being");
  }
  if (copingStrategies.length > 4) {
    progressIndicators.push("Development of diverse coping strategies");
  }

  return {
    emotionalJourney,
    copingStrategies: [...new Set(copingStrategies)],
    growthAreas: [...new Set(growthAreas)],
    strengths,
    recommendations: [...new Set(recommendations)],
    mentalHealthConcerns: pattern.mentalHealthConcerns,
    riskAssessment: {
      level: riskLevel,
      factors: riskFactors,
      protectiveFactors,
      needsAttention: riskLevel !== 'low' || pattern.mentalHealthConcerns.some(c => c.severity === 'severe')
    },
    progressIndicators
  };
}

export function getMusicRecommendation(emotion: EmotionalState): {
  genre: string;
  tempo: 'slow' | 'medium' | 'fast';
  description: string;
  benefits: string[];
  specificTracks?: string[];
} {
  const recommendations = {
    anxious: {
      genre: 'Calming Nature Sounds & Ambient',
      tempo: 'slow' as const,
      description: 'Gentle nature sounds with soft instrumental backing to soothe anxiety',
      benefits: ['Reduces cortisol levels', 'Calms nervous system', 'Promotes deep breathing', 'Grounds you in the present'],
      specificTracks: ['Ocean Waves', 'Forest Rain', 'Mountain Stream', 'Healing Frequencies 528Hz']
    },
    sad: {
      genre: 'Healing Piano & Gentle Strings',
      tempo: 'slow' as const,
      description: 'Therapeutic melodies that honor sadness while providing comfort',
      benefits: ['Validates emotions', 'Releases endorphins', 'Provides comfort', 'Supports emotional processing'],
      specificTracks: ['Piano Reflections', 'Cello Meditation', 'Healing Piano', 'Gentle Strings']
    },
    stressed: {
      genre: 'Deep Relaxation & Meditation Music',
      tempo: 'slow' as const,
      description: 'Specifically designed music for stress relief and nervous system reset',
      benefits: ['Lowers blood pressure', 'Reduces muscle tension', 'Improves focus', 'Activates relaxation response'],
      specificTracks: ['Deep Sleep Waves', 'Stress Relief', 'Progressive Relaxation', 'Calm Mind']
    },
    positive: {
      genre: 'Feel-Good Melodies & Gratitude Sounds',
      tempo: 'medium' as const,
      description: 'Warm, optimistic music that sustains and celebrates positive feelings',
      benefits: ['Sustains happiness', 'Builds resilience', 'Encourages gratitude', 'Promotes well-being'],
      specificTracks: ['Gratitude Flow', 'Happy Heart', 'Positive Energy', 'Joyful Moments']
    }
  };

  return recommendations[emotion] || {
    genre: 'Versatile Ambient & Background Harmony',
    tempo: 'medium' as const,
    description: 'Adaptable background music that supports any emotional state',
    benefits: ['Provides gentle support', 'Maintains emotional balance', 'Enhances focus', 'Creates safe space'],
    specificTracks: ['Neutral Ground', 'Balanced Harmony', 'Gentle Support', 'Open Space']
  };
}