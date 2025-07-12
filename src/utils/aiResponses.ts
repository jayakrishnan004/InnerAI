import { Message } from '../types';
import geminiAI from '../services/geminiAI';
import { detectEmotion, detectMentalHealthIssues } from './emotionDetection';

interface ResponsePattern {
  keywords: string[];
  responses: string[];
  suggestions?: string[];
  mood: 'positive' | 'negative' | 'neutral';
}

// Enhanced natural, conversational fallback patterns with more sophisticated responses
const naturalFallbackPatterns: ResponsePattern[] = [
  // Work/Performance Stress - Enhanced
  {
    keywords: ['work stress', 'job pressure', 'deadline', 'performance review', 'presentation', 'meeting anxiety', 'work overwhelm', 'boss', 'colleague conflict', 'workload'],
    responses: [
      "Work can feel really overwhelming sometimes, especially when there's a lot of pressure. It sounds like you're dealing with quite a bit right now. I want you to know that your feelings are completely valid - work stress affects so many people. 💙",
      "I hear you - work stress can affect everything else in our lives. It's completely understandable to feel this way when there's so much on your plate. You're not alone in struggling with workplace pressures. 🤗",
      "That sounds like a lot to handle at work. It's tough when the pressure feels constant and you're trying to keep up with everything. Your mental health matters more than any deadline. 🌟",
      "Work environments can be really challenging, and it sounds like you're navigating some difficult situations. Remember that you're more than your job performance, and it's okay to feel stressed about these things. 💚"
    ],
    suggestions: [
      "Try breaking big tasks into smaller, manageable steps",
      "Take short breaks throughout your day, even just 5 minutes",
      "Practice some deep breathing before stressful meetings",
      "Set boundaries where you can with your time and energy",
      "Consider talking to HR or a supervisor about workload concerns",
      "Practice the 'good enough' mindset instead of perfectionism"
    ],
    mood: 'negative'
  },

  // Sleep Issues - Enhanced
  {
    keywords: ['can\'t sleep', 'trouble sleeping', 'insomnia', 'tired', 'exhausted', 'sleepless', 'restless nights', 'waking up', 'nightmares', 'sleep anxiety'],
    responses: [
      "Sleep troubles can be so frustrating, especially when you're tired but your mind just won't quiet down. Sleep is so important for our mental health, and when it's disrupted, everything feels harder. You're definitely not alone in this. 😴💙",
      "I understand how exhausting it is when sleep doesn't come easily. It affects everything else during the day too - your mood, energy, and ability to cope with stress. Your sleep struggles are real and valid. 🌙",
      "That sounds really difficult - when we can't get good rest, everything else feels harder to manage. Sleep issues often come with anxiety or stress, creating a cycle that's hard to break. 💚",
      "Sleep problems can be one of the most frustrating experiences because you know you need rest, but your body or mind won't cooperate. This is more common than you might think, and there are ways to improve it. ✨"
    ],
    suggestions: [
      "Try creating a calming bedtime routine 30 minutes before sleep",
      "Write down tomorrow's worries to help clear your mind",
      "Practice some gentle stretching or relaxation before bed",
      "Keep your bedroom cool, dark, and quiet for better sleep",
      "Avoid screens for at least an hour before bedtime",
      "Consider trying progressive muscle relaxation",
      "If you can't sleep after 20 minutes, get up and do a quiet activity"
    ],
    mood: 'negative'
  },

  // Feeling Overwhelmed - Enhanced
  {
    keywords: ['overwhelmed', 'too much', 'can\'t handle', 'everything at once', 'drowning', 'stressed out', 'breaking point', 'falling apart'],
    responses: [
      "When everything feels like too much at once, it's completely natural to feel overwhelmed. You're handling more than anyone should have to, and it's okay to acknowledge that this is hard. 🌊💙",
      "I hear you - that feeling of everything piling up can be really intense. It's okay to feel overwhelmed when you're dealing with so much. Sometimes life throws more at us than we feel equipped to handle. 🤗",
      "It sounds like you're carrying a really heavy load right now. That overwhelmed feeling makes complete sense given everything you're managing. You don't have to carry it all alone. ✨",
      "Being overwhelmed is your mind and body's way of telling you that you're at capacity. It's not a weakness - it's a signal that you need support and perhaps some strategies to manage everything that's on your plate. 💚"
    ],
    suggestions: [
      "Focus on just one thing at a time today",
      "Take a few deep breaths when it feels like too much",
      "Ask for help with something, even something small",
      "Remember that you don't have to solve everything right now",
      "Make a list and prioritize only the most urgent items",
      "Practice saying 'no' to new commitments",
      "Take a 10-minute break to step outside or listen to music"
    ],
    mood: 'negative'
  },

  // Social Situations - Enhanced
  {
    keywords: ['social anxiety', 'nervous around people', 'afraid of judgment', 'embarrassed', 'awkward', 'social situations', 'public speaking', 'meeting new people'],
    responses: [
      "Social situations can feel really intense sometimes. That worry about what others might think is more common than you might realize - so many people struggle with social anxiety. 🤗💙",
      "I understand how nerve-wracking social interactions can be. It takes courage to put yourself out there when it feels uncomfortable. Your feelings about social situations are completely valid. 🌟",
      "Being around people can feel overwhelming, especially when you're worried about how you're coming across. You're not alone in feeling this way - social anxiety affects many people. 💚",
      "Social anxiety can make even simple interactions feel exhausting. It's your mind trying to protect you, but sometimes that protection can feel limiting. There are gentle ways to work with these feelings. ✨"
    ],
    suggestions: [
      "Start with small, comfortable social interactions",
      "Focus on listening to others rather than worrying about yourself",
      "Practice the 5-4-3-2-1 grounding technique if you feel anxious",
      "Remember that most people are focused on themselves, not judging you",
      "Prepare a few conversation topics or questions in advance",
      "Give yourself permission to leave early if you need to",
      "Practice self-compassion - you're doing your best"
    ],
    mood: 'negative'
  },

  // Feeling Down/Sad - Enhanced
  {
    keywords: ['depressed', 'sad', 'down', 'hopeless', 'empty', 'nothing matters', 'lost interest', 'crying', 'tearful', 'grief'],
    responses: [
      "I hear how difficult things are for you right now. When everything feels heavy and empty, it can be hard to see a way forward. Your feelings are valid, and you matter deeply. These feelings won't last forever. 💙🌈",
      "It sounds like you're going through a really tough time. That emptiness and sadness are real, and it's okay to feel this way. Depression can make everything feel colorless, but you don't have to carry this alone. 💚",
      "I can sense how much you're struggling right now. When life feels this heavy, even small things can seem impossible. Please know that you're not alone in this, and there is hope even when you can't see it. 🤗✨",
      "Depression can feel like being in a deep, dark hole where nothing seems to matter. These feelings are real and valid. While it might not feel like it right now, there are ways to gradually climb out of this darkness. 🕊️"
    ],
    suggestions: [
      "Try to do one small thing that used to bring you comfort",
      "Reach out to someone you trust, even just to say hello",
      "Take things one day at a time, or even one hour at a time",
      "Consider talking to a counselor who can provide additional support",
      "Try to maintain basic self-care - eating, sleeping, hygiene",
      "Spend a few minutes outside if possible, even just by a window",
      "Remember that seeking help is a sign of strength, not weakness"
    ],
    mood: 'negative'
  },

  // Relationship Issues - Enhanced
  {
    keywords: ['relationship problems', 'fighting', 'breakup', 'lonely', 'misunderstood', 'conflict', 'argument', 'partner', 'family issues', 'friendship'],
    responses: [
      "Relationship challenges can be really painful, especially when you're not feeling understood or connected. These situations are never easy to navigate, and your feelings about them are completely valid. 💙",
      "I hear how difficult this is for you. When relationships feel strained or broken, it affects so much more than just that connection - it can impact your whole sense of well-being. 🤗",
      "That sounds really hard to deal with. Relationship conflicts can leave us feeling isolated and hurt, even when we care deeply about the other person. You deserve to feel heard and valued. 💚",
      "Relationships are one of the most important parts of our lives, so when they're struggling, it makes sense that you'd feel deeply affected. Whether it's family, friends, or romantic relationships, these challenges are real. ✨"
    ],
    suggestions: [
      "Take some time to process your feelings before responding",
      "Try to communicate your needs clearly and kindly",
      "Focus on what you can control in the situation",
      "Consider whether some space might help both of you",
      "Practice active listening when you do talk",
      "Remember that healthy relationships require work from both people",
      "Consider couples or family therapy if appropriate"
    ],
    mood: 'negative'
  },

  // Anxiety and Panic - Enhanced
  {
    keywords: ['anxiety', 'panic', 'panic attack', 'racing heart', 'can\'t breathe', 'chest tight', 'dizzy', 'shaking', 'fear', 'worried'],
    responses: [
      "Anxiety can feel so overwhelming, especially when it shows up in your body with physical symptoms. What you're experiencing is real, and it's your nervous system trying to protect you. You're going to be okay. 🌊💙",
      "Panic and anxiety can be terrifying experiences. When your body goes into fight-or-flight mode, it can feel like you're in real danger even when you're safe. These feelings will pass. 🤗",
      "I can hear how intense your anxiety is right now. Those physical symptoms - racing heart, tight chest, difficulty breathing - are your body's alarm system activated. Let's work on calming it down together. ✨",
      "Anxiety disorders are incredibly common, and what you're experiencing is a real medical condition, not a character flaw. Your nervous system is just very sensitive right now, and that's something we can work with. 💚"
    ],
    suggestions: [
      "Try the 4-7-8 breathing technique: inhale 4, hold 7, exhale 8",
      "Use the 5-4-3-2-1 grounding technique to stay present",
      "Place your hand on your chest and feel your heartbeat slow down",
      "Remind yourself: 'This feeling will pass, I am safe right now'",
      "Try progressive muscle relaxation starting with your toes",
      "Consider speaking with a doctor about anxiety management",
      "Practice mindfulness meditation when you're feeling calm"
    ],
    mood: 'negative'
  },

  // Positive States - Enhanced
  {
    keywords: ['good', 'great', 'happy', 'excited', 'positive', 'better', 'improving', 'grateful', 'accomplished', 'proud', 'successful'],
    responses: [
      "I'm so glad to hear you're feeling good! It's wonderful when we can recognize and appreciate these positive moments. These feelings are just as important to acknowledge as the difficult ones. 🌟😊",
      "That's fantastic! It sounds like things are looking up for you. These good feelings are so important to celebrate and savor - they're fuel for getting through tougher times. ☀️💚",
      "I love hearing the positivity in your message! It's beautiful when we can feel grateful and hopeful about life. You deserve these good feelings. 🎉✨",
      "It's so wonderful to hear you feeling positive! These moments of joy, gratitude, or accomplishment are precious. They remind us of our resilience and capacity for happiness. 🌈💙"
    ],
    suggestions: [
      "Take a moment to really savor this good feeling",
      "Write down what you're grateful for today",
      "Share your positive energy with someone you care about",
      "Plan something you're looking forward to",
      "Take a mental snapshot of this moment to remember later",
      "Consider what contributed to feeling this way",
      "Use this positive energy to tackle something you've been putting off"
    ],
    mood: 'positive'
  },

  // Self-Doubt and Low Self-Esteem - Enhanced
  {
    keywords: ['not good enough', 'failure', 'worthless', 'stupid', 'hate myself', 'inadequate', 'comparing myself', 'imposter', 'don\'t deserve'],
    responses: [
      "I hear how harshly you're speaking about yourself, and it breaks my heart because I can tell you're in pain. The way you're talking to yourself isn't the truth about who you are - it's the voice of self-doubt. 💙",
      "Those thoughts about not being good enough are so painful, and I want you to know that they're not facts - they're feelings. You are worthy of love and respect, especially from yourself. 🤗",
      "Self-criticism can be one of the cruelest forms of suffering because it comes from inside us. But just like we can learn to be kinder to others, we can learn to be kinder to ourselves. 💚",
      "Comparing ourselves to others is one of the fastest ways to feel inadequate, but you're seeing everyone else's highlight reel while living your behind-the-scenes. You are enough, exactly as you are. ✨"
    ],
    suggestions: [
      "Try speaking to yourself like you would a good friend",
      "Write down three things you did well today, no matter how small",
      "Challenge negative self-talk by asking 'Is this really true?'",
      "Practice self-compassion - treat yourself with kindness",
      "Remember that everyone struggles and makes mistakes",
      "Focus on your effort and growth, not just outcomes",
      "Consider therapy to work on self-esteem and negative thought patterns"
    ],
    mood: 'negative'
  }
];

const defaultResponses = [
  "Thank you for sharing that with me. I'm here to listen and support you however I can. Your feelings matter deeply, and I want you to know that you're not alone in whatever you're experiencing. 💚",
  "I appreciate you opening up about what you're going through. It takes courage to share, and I'm honored to be part of your journey. Whatever you're feeling right now is valid and important. 🤗",
  "I hear you, and I want you to know that whatever you're experiencing, you don't have to face it alone. Let's work through this together, one step at a time. 🌟",
  "Your willingness to share what's on your mind shows real strength. I'm here to provide support and understanding as you navigate whatever challenges you're facing. 💙"
];

const defaultSuggestions = [
  "Take a few deep, calming breaths",
  "Be gentle and patient with yourself",
  "Focus on what you can control right now",
  "Remember that difficult feelings are temporary",
  "Consider reaching out to someone you trust",
  "Practice one small act of self-care today"
];

// Enhanced AI response generation with natural conversation
export async function generateAIResponse(
  userMessage: string, 
  conversationHistory: Message[] = []
): Promise<{ 
  response: string; 
  suggestions: string[]; 
  mood: 'positive' | 'negative' | 'neutral';
  isAIGenerated: boolean;
  confidence?: number;
  emotionAnalysis?: any;
  therapeuticFocus?: string;
}> {
  try {
    // Detect emotional state and mental health concerns for internal understanding
    const emotionalState = detectEmotion(conversationHistory);
    const mentalHealthConcerns = detectMentalHealthIssues([...conversationHistory, {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    const previousMood = conversationHistory.length > 0 
      ? conversationHistory[conversationHistory.length - 1].mood 
      : undefined;

    // Prepare enhanced context for Gemini AI
    const context = {
      userMessage,
      conversationHistory: conversationHistory.slice(-8).map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.text }]
      })),
      emotionalState,
      previousMood,
      mentalHealthConcerns
    };

    // Try to get response from Gemini AI
    const aiResult = await geminiAI.generateResponse(context);
    
    // Determine therapeutic focus based on detected concerns
    let therapeuticFocus = 'general_support';
    if (mentalHealthConcerns.length > 0) {
      const primaryConcern = mentalHealthConcerns[0];
      therapeuticFocus = primaryConcern.condition.toLowerCase().replace(/\s+/g, '_');
    }
    
    return {
      response: aiResult.response,
      suggestions: aiResult.suggestions,
      mood: aiResult.mood,
      isAIGenerated: true,
      confidence: aiResult.confidence,
      emotionAnalysis: aiResult.emotionAnalysis,
      therapeuticFocus
    };

  } catch (error) {
    console.warn('Gemini AI unavailable, using enhanced fallback responses:', error);
    
    // Fallback to enhanced pattern-based responses
    return generateEnhancedFallbackResponse(userMessage, conversationHistory);
  }
}

// Enhanced fallback response generation with better pattern matching
function generateEnhancedFallbackResponse(
  userMessage: string, 
  conversationHistory: Message[] = []
): {
  response: string;
  suggestions: string[];
  mood: 'positive' | 'negative' | 'neutral';
  isAIGenerated: boolean;
  therapeuticFocus?: string;
} {
  const message = userMessage.toLowerCase();
  
  // Enhanced pattern matching with scoring
  let bestMatch = null;
  let highestScore = 0;
  
  for (const pattern of naturalFallbackPatterns) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (message.includes(keyword.toLowerCase())) {
        // Weight longer, more specific keywords higher
        score += keyword.length;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = pattern;
    }
  }
  
  // If we found a good match, use it
  if (bestMatch && highestScore > 0) {
    const randomResponse = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
    return {
      response: randomResponse,
      suggestions: bestMatch.suggestions || defaultSuggestions,
      mood: bestMatch.mood,
      isAIGenerated: false,
      therapeuticFocus: 'pattern_matched'
    };
  }
  
  // Enhanced default response with conversation context
  let contextualResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  
  // Add context if this is part of an ongoing conversation
  if (conversationHistory.length > 0) {
    contextualResponse += " I notice we've been talking, and I want you to know that I'm here to continue supporting you through whatever you're experiencing.";
  }
  
  return {
    response: contextualResponse,
    suggestions: defaultSuggestions,
    mood: 'neutral',
    isAIGenerated: false,
    therapeuticFocus: 'general_support'
  };
}

// Enhanced crisis detection with more nuanced responses
export function detectCrisis(message: string): {
  isCrisis: boolean;
  severity: 'low' | 'medium' | 'high';
  response?: string;
  resources?: string[];
  immediateActions?: string[];
} {
  const crisisKeywords = {
    high: [
      'suicide', 'kill myself', 'end it all', 'not worth living', 'want to die',
      'better off dead', 'ending my life', 'suicidal thoughts', 'plan to die',
      'no reason to live', 'everyone would be better without me', 'take my own life',
      'don\'t want to be alive', 'wish I was dead', 'planning to hurt myself'
    ],
    medium: [
      'self harm', 'hurt myself', 'cutting', 'can\'t go on', 'hopeless',
      'no way out', 'trapped', 'can\'t take it anymore', 'giving up',
      'nothing matters', 'life is pointless', 'want to disappear',
      'feel like dying', 'wish I could just sleep forever', 'everything is meaningless'
    ],
    low: [
      'worthless', 'nobody cares', 'feel like giving up', 'what\'s the point',
      'tired of living', 'don\'t want to be here', 'feel empty inside',
      'life has no meaning', 'feel like a burden', 'everyone hates me'
    ]
  };

  const lowerMessage = message.toLowerCase();
  
  // Check for high-severity crisis indicators
  if (crisisKeywords.high.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isCrisis: true,
      severity: 'high',
      response: "I'm really concerned about you right now, and I want you to know that what you're feeling matters deeply to me. The pain you're experiencing is real, but you don't have to face this alone. There are people who care about you and want to help you through this difficult time. 💚🆘",
      resources: [
        "🆘 Call 988 (Suicide & Crisis Lifeline) - Available 24/7, free and confidential",
        "📱 Text 'HELLO' to 741741 (Crisis Text Line) - Free crisis counseling via text",
        "🏥 Go to your nearest emergency room if you're in immediate danger",
        "🚨 Call 911 if you need immediate emergency assistance",
        "👥 Reach out to a trusted friend, family member, or mental health professional",
        "🌐 Visit suicidepreventionlifeline.org for additional resources"
      ],
      immediateActions: [
        "Stay with someone you trust or call someone to be with you",
        "Remove any means of self-harm from your immediate environment",
        "Create a safety plan with specific people to contact",
        "Go to a safe, public place if you're alone"
      ]
    };
  }
  
  // Check for medium-severity indicators
  if (crisisKeywords.medium.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isCrisis: true,
      severity: 'medium',
      response: "I'm worried about you and can hear how much pain you're in right now. These feelings are overwhelming, but they are temporary. You deserve support and care during this difficult time, and there are people who want to help you. 🤗💙",
      resources: [
        "📞 Call 988 (Suicide & Crisis Lifeline) for immediate support",
        "💬 Text 'HELLO' to 741741 (Crisis Text Line) for confidential help",
        "👨‍⚕️ Contact your doctor, therapist, or mental health provider",
        "👨‍👩‍👧‍👦 Reach out to a trusted friend or family member",
        "🏥 Consider going to an urgent care center or emergency room",
        "🧠 Look into local mental health crisis services in your area"
      ],
      immediateActions: [
        "Reach out to someone you trust right now",
        "Make a plan for the next 24 hours to stay safe",
        "Engage in grounding techniques like deep breathing",
        "Avoid alcohol or substances that might worsen your mood"
      ]
    };
  }
  
  // Check for low-severity indicators
  if (crisisKeywords.low.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isCrisis: true,
      severity: 'low',
      response: "I can hear that you're going through a really difficult time right now. These feelings are valid and understandable, and I want you to know that you matter deeply. There are people who care about you and want to support you through this. 💙🌟",
      resources: [
        "🗣️ Consider talking to a counselor, therapist, or mental health professional",
        "👥 Reach out to a trusted friend or family member for support",
        "📞 Call 988 if you need someone to talk to right away",
        "🧘‍♀️ Practice grounding techniques to help with overwhelming feelings",
        "💭 Remember that difficult emotions are temporary and can improve with support",
        "📚 Look into local support groups or mental health resources"
      ],
      immediateActions: [
        "Practice self-care activities that usually help you feel better",
        "Connect with someone who cares about you",
        "Engage in gentle physical activity like walking",
        "Try journaling or expressing your feelings creatively"
      ]
    };
  }

  return {
    isCrisis: false,
    severity: 'low'
  };
}

// Export the enhanced response generator as default
export default generateAIResponse;