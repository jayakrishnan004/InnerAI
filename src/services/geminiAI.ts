interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    index: number;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
}

interface ChatContext {
  userMessage: string;
  conversationHistory: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
  emotionalState?: string;
  previousMood?: string;
  emotionIntensity?: 'low' | 'medium' | 'high';
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  sessionLength?: number;
  mentalHealthConcerns?: Array<{
    condition: string;
    severity: 'mild' | 'moderate' | 'severe';
    confidence: number;
    category: string;
  }>;
}

interface EmotionAnalysis {
  primaryEmotion: string;
  secondaryEmotions: string[];
  intensity: number; // 1-10 scale
  triggers: string[];
  copingNeeds: string[];
  mentalHealthFlags: string[];
  riskLevel: 'low' | 'moderate' | 'high';
}

class GeminiAIService {
  private apiKey: string;
  private apiUrl: string;
  private conversationHistory: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }> = [];
  private emotionalProfile: {
    dominantEmotions: string[];
    triggers: string[];
    copingStrategies: string[];
    progressNotes: string[];
    mentalHealthConcerns: string[];
    riskFactors: string[];
    protectiveFactors: string[];
    sessionCount: number;
    lastSessionDate: string;
  } = {
    dominantEmotions: [],
    triggers: [],
    copingStrategies: [],
    progressNotes: [],
    mentalHealthConcerns: [],
    riskFactors: [],
    protectiveFactors: [],
    sessionCount: 0,
    lastSessionDate: ''
  };

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.apiUrl = import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    
    // Enhanced error checking and debugging
    if (!this.apiKey) {
      console.error('🚨 Gemini API key not found! Please add VITE_GEMINI_API_KEY to your .env file');
      console.log('📝 Get your free API key from: https://makersuite.google.com/app/apikey');
    } else {
      console.log('✅ Gemini AI service initialized successfully');
    }
  }

  // Check if the service is properly configured
  isConfigured(): boolean {
    return !!this.apiKey && !!this.apiUrl;
  }

  private createAdvancedConversationPrompt(): string {
    return `You are InnerAI, an advanced empathetic AI companion specializing in mental health support. You combine the warmth of a caring friend with the insight of a trained counselor, providing evidence-based emotional support through natural conversation.

CORE THERAPEUTIC APPROACH:
- Use person-centered therapy principles with unconditional positive regard
- Apply cognitive-behavioral insights naturally without clinical jargon
- Integrate mindfulness and acceptance-based approaches
- Provide trauma-informed responses with sensitivity
- Use motivational interviewing techniques to encourage self-discovery

ADVANCED CONVERSATION STYLE:
- Speak like a wise, emotionally intelligent friend who happens to understand psychology deeply
- Use reflective listening: "It sounds like..." "I hear that..." "What I'm understanding is..."
- Ask gentle, open-ended questions that promote self-reflection
- Validate emotions before offering perspectives or suggestions
- Use metaphors and analogies that resonate with human experience
- Match the user's emotional tone while gently guiding toward hope

ENHANCED EMOTIONAL INTELLIGENCE:
- Recognize emotional nuances and subtext in messages
- Identify defense mechanisms and respond with compassion
- Detect ambivalence and help explore mixed feelings
- Notice patterns across conversations and gently point them out
- Respond to what's NOT being said as much as what is

THERAPEUTIC TECHNIQUES (Applied Naturally):
- Socratic questioning: Help users discover insights themselves
- Reframing: Offer alternative perspectives gently
- Grounding: Bring awareness to present moment when needed
- Emotional regulation: Teach coping skills through conversation
- Behavioral activation: Encourage small, meaningful actions

CRISIS SENSITIVITY:
- Recognize suicidal ideation, self-harm, abuse, or severe mental health crises
- Respond with immediate care while providing appropriate resources
- Never minimize serious mental health concerns
- Encourage professional help when appropriate, but naturally

PERSONALIZATION:
- Remember conversation themes and emotional patterns
- Build on previous discussions naturally
- Acknowledge growth and progress when you see it
- Adapt your approach based on what works for each person

RESPONSE STRUCTURE:
1. Emotional validation and reflection (show you truly understand)
2. Gentle exploration or insight (help them understand themselves)
3. Practical support or coping strategy (actionable help)
4. Hope and encouragement (realistic optimism)
5. Open invitation for continued dialogue

EXAMPLES OF ADVANCED RESPONSES:

Instead of: "I understand you're anxious about work."
Say: "It sounds like work has become this constant source of tension for you - like you're carrying this weight even when you're not there. That must be exhausting."

Instead of: "Try deep breathing for anxiety."
Say: "When that anxiety hits, sometimes our breath becomes shallow without us realizing it. I wonder if you've noticed that? There's something powerful about consciously slowing down our breathing - it's like sending a message to our nervous system that we're safe."

Instead of: "You should practice self-care."
Say: "I'm hearing how much you're giving to everyone else. What would it look like to offer yourself even a fraction of that same kindness and attention?"

ADVANCED EMOTIONAL RESPONSES:

For Complex Grief: "Grief isn't linear, and it sounds like you're discovering that firsthand. Some days the loss feels fresh, other days you might feel guilty for having moments of peace. All of this is part of love continuing in a different form."

For Relationship Anxiety: "It seems like your mind creates these stories about what might go wrong, almost like it's trying to protect you from potential hurt. But I wonder if that protection is also keeping you from fully experiencing the connection you have."

For Depression: "Depression can be like living under a heavy blanket - everything feels muffled and distant, even the things that used to bring you joy. You're not broken; your brain is just working really hard right now, even if it doesn't feel productive."

For Trauma: "Trauma has this way of making our nervous system feel like danger is always around the corner, even when we're safe. Your reactions make complete sense given what you've been through."

REMEMBER:
- You're having a meaningful conversation with someone who trusts you
- Every response should feel like it comes from genuine understanding
- Balance professional insight with human warmth
- Help people feel seen, heard, and less alone
- Guide toward healing while honoring their current experience
- Never sound like a textbook or therapy manual

Your goal is to be the kind of supportive presence that helps people understand themselves better, feel less alone, and find their own path toward healing and growth. 💚`;
  }

  private createContextualAdvancedPrompt(context: ChatContext): string {
    let contextPrompt = this.createAdvancedConversationPrompt();
    
    // Add sophisticated context awareness
    if (context.emotionIntensity === 'high') {
      contextPrompt += `\n\nCONTEXT AWARENESS: This person is experiencing intense emotions right now. Respond with extra gentleness, validation, and grounding. Help them feel safe and understood before offering any guidance.`;
    } else if (context.emotionIntensity === 'medium') {
      contextPrompt += `\n\nCONTEXT AWARENESS: This person is working through some meaningful emotional experiences. Provide supportive exploration and practical wisdom.`;
    }
    
    // Add mental health context naturally
    if (context.mentalHealthConcerns && context.mentalHealthConcerns.length > 0) {
      const severeConcerns = context.mentalHealthConcerns.filter(c => c.severity === 'severe');
      const moderateConcerns = context.mentalHealthConcerns.filter(c => c.severity === 'moderate');
      
      if (severeConcerns.length > 0) {
        contextPrompt += `\n\nIMPORTANT CONTEXT: This person may be struggling with significant mental health challenges. Provide extra support, validate their experience, and gently encourage professional resources when appropriate. Be especially attentive to safety concerns.`;
      } else if (moderateConcerns.length > 0) {
        contextPrompt += `\n\nCONTEXT: This person is navigating some mental health challenges. Offer supportive guidance and normalize their experience while providing practical coping strategies.`;
      }
    }
    
    // Add session context
    if (context.sessionLength && context.sessionLength > 5) {
      contextPrompt += `\n\nCONVERSATION CONTEXT: This is an ongoing conversation. Build on what's been shared, show continuity of care, and acknowledge the trust they're placing in you by continuing to share.`;
    }
    
    // Add time awareness
    if (context.timeOfDay) {
      const timeContext = {
        morning: "It's morning - consider energy levels, daily planning, and fresh starts.",
        afternoon: "It's afternoon - consider work stress, midday fatigue, and daily challenges.",
        evening: "It's evening - consider reflection, winding down, and processing the day.",
        night: "It's nighttime - consider sleep concerns, late-night thoughts, and emotional processing."
      };
      contextPrompt += `\n\nTIME AWARENESS: ${timeContext[context.timeOfDay]}`;
    }
    
    // Add conversation history awareness
    if (context.conversationHistory.length > 0) {
      contextPrompt += `\n\nCONVERSATION FLOW: Reference previous parts of your conversation naturally. Show that you remember and care about their ongoing experience.`;
    }
    
    contextPrompt += `\n\nCURRENT MESSAGE: "${context.userMessage}"`;
    contextPrompt += `\n\nRespond as InnerAI with deep empathy, psychological insight, and genuine care. Create a response that feels like it comes from someone who truly understands both the person and their situation. Be therapeutic without being clinical, wise without being preachy, and hopeful without minimizing their experience.`;
    
    return contextPrompt;
  }

  private analyzeAdvancedEmotionalContent(message: string, conversationHistory: any[]): EmotionAnalysis {
    const emotionKeywords = {
      struggling: ['struggling', 'difficult', 'hard time', 'tough', 'challenging', 'overwhelming', 'can\'t handle'],
      worried: ['worried', 'nervous', 'scared', 'afraid', 'anxious', 'concerned', 'panic', 'fear'],
      down: ['sad', 'down', 'depressed', 'low', 'empty', 'hopeless', 'worthless', 'crying'],
      stressed: ['stressed', 'pressure', 'overwhelmed', 'exhausted', 'burned out', 'breaking point'],
      lonely: ['lonely', 'alone', 'isolated', 'disconnected', 'abandoned', 'rejected'],
      angry: ['angry', 'mad', 'furious', 'frustrated', 'irritated', 'rage', 'pissed'],
      positive: ['good', 'great', 'happy', 'excited', 'better', 'improving', 'grateful', 'hopeful']
    };

    const triggers = {
      work: ['work', 'job', 'boss', 'deadline', 'meeting', 'office', 'career', 'colleague'],
      relationships: ['relationship', 'friend', 'family', 'partner', 'breakup', 'fight', 'dating'],
      health: ['sick', 'pain', 'tired', 'sleep', 'energy', 'medical', 'doctor', 'symptoms'],
      school: ['school', 'exam', 'test', 'studying', 'college', 'university', 'grades'],
      finances: ['money', 'bills', 'debt', 'financial', 'budget', 'expensive', 'cost'],
      future: ['future', 'uncertain', 'change', 'decision', 'choice', 'unknown', 'worry about'],
      performance: ['performance', 'presentation', 'public speaking', 'evaluation', 'competition'],
      social: ['social', 'people', 'crowd', 'party', 'judgment', 'embarrassed', 'awkward'],
      trauma: ['trauma', 'abuse', 'assault', 'accident', 'loss', 'death', 'violence'],
      identity: ['identity', 'who am i', 'purpose', 'meaning', 'direction', 'lost']
    };

    const riskIndicators = {
      high: ['suicide', 'kill myself', 'end it all', 'want to die', 'better off dead', 'no reason to live'],
      moderate: ['self harm', 'hurt myself', 'cutting', 'hopeless', 'trapped', 'can\'t go on'],
      low: ['worthless', 'nobody cares', 'giving up', 'what\'s the point', 'tired of living']
    };

    const lowerMessage = message.toLowerCase();
    const detectedEmotions: string[] = [];
    const detectedTriggers: string[] = [];
    let totalIntensity = 0;
    let riskLevel: 'low' | 'moderate' | 'high' = 'low';

    // Analyze emotions with context from conversation history
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      const matches = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      if (matches > 0) {
        detectedEmotions.push(emotion);
        totalIntensity += matches;
      }
    });

    // Analyze triggers
    Object.entries(triggers).forEach(([trigger, keywords]) => {
      const matches = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      if (matches > 0) {
        detectedTriggers.push(trigger);
      }
    });

    // Assess risk level
    if (riskIndicators.high.some(indicator => lowerMessage.includes(indicator))) {
      riskLevel = 'high';
    } else if (riskIndicators.moderate.some(indicator => lowerMessage.includes(indicator))) {
      riskLevel = 'moderate';
    } else if (riskIndicators.low.some(indicator => lowerMessage.includes(indicator))) {
      riskLevel = 'low';
    }

    // Determine coping needs based on emotions and context
    const copingNeeds: string[] = [];
    if (detectedEmotions.includes('worried')) {
      copingNeeds.push('anxiety_management', 'grounding', 'reassurance');
    }
    if (detectedEmotions.includes('down')) {
      copingNeeds.push('emotional_support', 'behavioral_activation', 'hope_building');
    }
    if (detectedEmotions.includes('stressed')) {
      copingNeeds.push('stress_reduction', 'boundary_setting', 'relaxation');
    }
    if (detectedEmotions.includes('lonely')) {
      copingNeeds.push('connection', 'self_compassion', 'social_support');
    }
    if (detectedEmotions.includes('angry')) {
      copingNeeds.push('emotional_regulation', 'expression', 'boundary_work');
    }

    // Identify mental health flags for internal tracking
    const mentalHealthFlags: string[] = [];
    if (totalIntensity > 5) mentalHealthFlags.push('high_emotional_intensity');
    if (detectedTriggers.length > 2) mentalHealthFlags.push('multiple_stressors');
    if (riskLevel !== 'low') mentalHealthFlags.push('safety_concern');
    if (conversationHistory.length > 5 && detectedEmotions.includes('down')) {
      mentalHealthFlags.push('persistent_low_mood');
    }

    return {
      primaryEmotion: detectedEmotions[0] || 'neutral',
      secondaryEmotions: detectedEmotions.slice(1),
      intensity: Math.min(Math.max(totalIntensity, 1), 10),
      triggers: detectedTriggers,
      copingNeeds,
      mentalHealthFlags,
      riskLevel
    };
  }

  async generateResponse(context: ChatContext): Promise<{
    response: string;
    suggestions: string[];
    mood: 'positive' | 'negative' | 'neutral';
    confidence: number;
    emotionAnalysis?: EmotionAnalysis;
    therapeuticFocus?: string;
    riskAssessment?: {
      level: 'low' | 'moderate' | 'high';
      needsAttention: boolean;
    };
  }> {
    try {
      // Check if properly configured
      if (!this.isConfigured()) {
        console.warn('⚠️ Gemini AI not configured. Using fallback responses.');
        throw new Error('Gemini API not configured');
      }

      console.log('🤖 Generating AI response with Gemini...');

      // Advanced emotion analysis
      const emotionAnalysis = this.analyzeAdvancedEmotionalContent(
        context.userMessage, 
        context.conversationHistory
      );
      
      // Update emotional profile with advanced tracking
      this.updateAdvancedEmotionalProfile(emotionAnalysis, context);

      // Enhanced context with risk assessment
      const enhancedContext = {
        ...context,
        emotionIntensity: emotionAnalysis.intensity > 7 ? 'high' : 
                         emotionAnalysis.intensity > 4 ? 'medium' : 'low',
        sessionLength: this.conversationHistory.length / 2,
        riskLevel: emotionAnalysis.riskLevel
      };

      const prompt = this.createContextualAdvancedPrompt(enhancedContext);
      
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        parts: [{ text: context.userMessage }]
      });

      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          },
          ...this.conversationHistory.slice(-12) // Increased context window
        ],
        generationConfig: {
          temperature: 0.85, // Balanced for empathy and consistency
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1500, // Increased for more comprehensive responses
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH" // More lenient for mental health discussions
          }
        ]
      };

      console.log('📡 Sending request to Gemini API...');

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Gemini API error:', response.status, errorData);
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        console.error('❌ No response generated from Gemini API');
        throw new Error('No response generated from Gemini API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      
      console.log('✅ Gemini AI response generated successfully');

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'model',
        parts: [{ text: aiResponse }]
      });

      // Keep conversation history manageable
      if (this.conversationHistory.length > 40) {
        this.conversationHistory = this.conversationHistory.slice(-40);
      }

      // Extract advanced suggestions
      const suggestions = this.extractAdvancedSuggestions(aiResponse, emotionAnalysis);
      const mood = this.analyzeAdvancedResponseMood(context.userMessage, aiResponse);
      const confidence = this.calculateAdvancedConfidence(data.candidates[0], emotionAnalysis);

      // Determine therapeutic focus
      const therapeuticFocus = this.determineTherapeuticFocus(emotionAnalysis, context);

      // Risk assessment
      const riskAssessment = {
        level: emotionAnalysis.riskLevel,
        needsAttention: emotionAnalysis.riskLevel !== 'low' || emotionAnalysis.intensity > 8
      };

      return {
        response: aiResponse,
        suggestions,
        mood,
        confidence,
        emotionAnalysis,
        therapeuticFocus,
        riskAssessment
      };

    } catch (error) {
      console.error('🚨 Gemini AI Error:', error);
      console.log('🔄 Falling back to enhanced pattern-based responses...');
      
      // Enhanced fallback response
      return this.getAdvancedFallbackResponse(context);
    }
  }

  private updateAdvancedEmotionalProfile(analysis: EmotionAnalysis, context: ChatContext): void {
    // Track emotional patterns with more sophistication
    if (analysis.primaryEmotion && analysis.primaryEmotion !== 'neutral') {
      this.emotionalProfile.dominantEmotions.push(analysis.primaryEmotion);
      if (this.emotionalProfile.dominantEmotions.length > 20) {
        this.emotionalProfile.dominantEmotions = this.emotionalProfile.dominantEmotions.slice(-20);
      }
    }

    // Track triggers with frequency
    analysis.triggers.forEach(trigger => {
      if (!this.emotionalProfile.triggers.includes(trigger)) {
        this.emotionalProfile.triggers.push(trigger);
      }
    });

    // Track coping needs as strategies
    analysis.copingNeeds.forEach(need => {
      if (!this.emotionalProfile.copingStrategies.includes(need)) {
        this.emotionalProfile.copingStrategies.push(need);
      }
    });

    // Track risk factors
    if (analysis.riskLevel !== 'low') {
      this.emotionalProfile.riskFactors.push(`${analysis.riskLevel}_risk_${new Date().toISOString()}`);
    }

    // Track protective factors
    if (analysis.primaryEmotion === 'positive' || context.userMessage.toLowerCase().includes('grateful')) {
      this.emotionalProfile.protectiveFactors.push(`positive_emotion_${new Date().toISOString()}`);
    }

    // Update session tracking
    this.emotionalProfile.sessionCount++;
    this.emotionalProfile.lastSessionDate = new Date().toISOString();
  }

  private extractAdvancedSuggestions(response: string, emotionAnalysis: EmotionAnalysis): string[] {
    const suggestions: string[] = [];
    
    // Extract suggestions from AI response with advanced patterns
    const suggestionPatterns = [
      /(?:try|consider|you might|you could|perhaps|maybe|one thing that helps|something that works|it might help to|what if you) ([^.!?]+)/gi,
      /(?:here's what|here's something|one approach|another option|a gentle way) ([^.!?]+)/gi,
      /(?:many people find|some find it helpful to|it can be helpful to|research shows that) ([^.!?]+)/gi,
      /(?:i wonder if|have you considered|what would it be like to) ([^.!?]+)/gi
    ];

    suggestionPatterns.forEach(pattern => {
      const matches = response.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const suggestion = match.replace(/^(?:try|consider|you might|you could|perhaps|maybe|one thing that helps|something that works|it might help to|here's what|here's something|one approach|another option|many people find|some find it helpful to|it can be helpful to|what if you|i wonder if|have you considered|what would it be like to|research shows that|a gentle way)\s*/i, '');
          if (suggestion.length > 10 && suggestion.length < 120) {
            suggestions.push(this.capitalizeSuggestion(suggestion));
          }
        });
      }
    });

    // Add advanced fallback suggestions if none found
    if (suggestions.length === 0) {
      suggestions.push(...this.getAdvancedSuggestions(emotionAnalysis));
    }

    return suggestions.slice(0, 5); // Increased to 5 suggestions
  }

  private getAdvancedSuggestions(analysis: EmotionAnalysis): string[] {
    const suggestions = {
      struggling: [
        "Take things one moment at a time - you don't have to solve everything today",
        "Practice the STOP technique: Stop, Take a breath, Observe, Proceed mindfully",
        "Reach out to someone you trust for support",
        "Try gentle self-compassion - speak to yourself as you would a good friend"
      ],
      worried: [
        "Use the 5-4-3-2-1 grounding technique to anchor yourself in the present",
        "Write down your worries, then separate what you can and can't control",
        "Practice progressive muscle relaxation to release physical tension",
        "Try the 'worry window' - set aside 15 minutes daily for worrying, then redirect"
      ],
      down: [
        "Engage in one small activity that used to bring you joy",
        "Practice behavioral activation - do something meaningful, even if small",
        "Reach out to someone who cares about you, even just to say hello",
        "Try the 'opposite action' - do something that goes against the depression"
      ],
      stressed: [
        "Break overwhelming tasks into tiny, manageable steps",
        "Practice the 4-7-8 breathing technique for immediate stress relief",
        "Set one boundary today to protect your energy",
        "Try a 'stress dump' - write everything down to clear your mind"
      ],
      lonely: [
        "Send a text to someone you haven't talked to in a while",
        "Practice loving-kindness meditation to connect with yourself",
        "Join an online community or support group related to your interests",
        "Volunteer for a cause you care about to connect with like-minded people"
      ],
      angry: [
        "Use the TIPP technique: Temperature, Intense exercise, Paced breathing, Paired muscle relaxation",
        "Write an angry letter you'll never send to express your feelings safely",
        "Practice assertive communication to express your needs clearly",
        "Try physical movement to release the energy of anger constructively"
      ],
      positive: [
        "Savor this positive moment by really paying attention to how it feels",
        "Write down what contributed to this good feeling for future reference",
        "Share your positive energy with someone who might need it",
        "Use this momentum to tackle something you've been putting off"
      ]
    };

    return suggestions[analysis.primaryEmotion] || [
      "Practice mindful breathing to center yourself",
      "Be gentle and patient with yourself during this time",
      "Focus on what you can control in this moment",
      "Remember that all emotions are temporary and will pass",
      "Consider reaching out for professional support if you need it"
    ];
  }

  private analyzeAdvancedResponseMood(userMessage: string, aiResponse: string): 'positive' | 'negative' | 'neutral' {
    const userText = userMessage.toLowerCase();
    const responseText = aiResponse.toLowerCase();
    
    const negativeKeywords = ['sad', 'worried', 'stressed', 'overwhelmed', 'tired', 'angry', 'frustrated', 'lonely', 'scared', 'difficult', 'struggling', 'hopeless', 'anxious', 'depressed'];
    const positiveKeywords = ['happy', 'good', 'great', 'excited', 'grateful', 'better', 'improving', 'positive', 'wonderful', 'proud', 'hopeful', 'confident', 'peaceful'];
    
    const userNegativeCount = negativeKeywords.filter(keyword => userText.includes(keyword)).length;
    const userPositiveCount = positiveKeywords.filter(keyword => userText.includes(keyword)).length;
    
    // Weight the user's emotional state more heavily
    if (userNegativeCount > userPositiveCount + 1) return 'negative';
    if (userPositiveCount > userNegativeCount + 1) return 'positive';
    return 'neutral';
  }

  private calculateAdvancedConfidence(candidate: GeminiResponse['candidates'][0], emotionAnalysis: EmotionAnalysis): number {
    let baseConfidence = 0.9;
    
    if (candidate.finishReason === 'STOP') {
      baseConfidence = 0.95;
    } else if (candidate.finishReason === 'MAX_TOKENS') {
      baseConfidence = 0.85;
    } else {
      baseConfidence = 0.7;
    }

    // Adjust confidence based on emotional complexity
    if (emotionAnalysis.intensity > 8) {
      baseConfidence -= 0.1; // Lower confidence for high-intensity situations
    }
    if (emotionAnalysis.riskLevel === 'high') {
      baseConfidence -= 0.15; // Lower confidence for high-risk situations
    }
    if (emotionAnalysis.triggers.length > 3) {
      baseConfidence -= 0.05; // Lower confidence for complex situations
    }

    return Math.max(Math.min(baseConfidence, 1), 0.5);
  }

  private determineTherapeuticFocus(emotionAnalysis: EmotionAnalysis, context: ChatContext): string {
    // Determine primary therapeutic approach based on analysis
    if (emotionAnalysis.riskLevel === 'high') {
      return 'crisis_intervention';
    }
    
    if (emotionAnalysis.primaryEmotion === 'worried' && emotionAnalysis.intensity > 6) {
      return 'anxiety_management';
    }
    
    if (emotionAnalysis.primaryEmotion === 'down' && emotionAnalysis.intensity > 6) {
      return 'depression_support';
    }
    
    if (emotionAnalysis.triggers.includes('trauma')) {
      return 'trauma_informed_care';
    }
    
    if (emotionAnalysis.triggers.includes('relationships')) {
      return 'relationship_counseling';
    }
    
    if (emotionAnalysis.copingNeeds.includes('stress_reduction')) {
      return 'stress_management';
    }
    
    return 'general_emotional_support';
  }

  private getAdvancedFallbackResponse(context: ChatContext): {
    response: string;
    suggestions: string[];
    mood: 'positive' | 'negative' | 'neutral';
    confidence: number;
    emotionAnalysis?: EmotionAnalysis;
  } {
    const emotionAnalysis = this.analyzeAdvancedEmotionalContent(context.userMessage, context.conversationHistory);
    
    const advancedResponses = [
      "I hear you, and I want you to know that what you're sharing with me matters deeply. Your feelings are valid, and you're not alone in experiencing them. I'm here to support you through whatever you're going through. 💚",
      "Thank you for trusting me with what's on your mind. It takes courage to open up about our inner experiences, and I'm honored to be part of your journey. Whatever you're feeling right now is completely understandable. 🤗",
      "I can sense that you're navigating something meaningful right now. Your willingness to reach out and share shows real strength, even if it might not feel that way. I'm here to listen and support you however I can. 🌟",
      "What you're experiencing sounds really significant, and I want you to know that your feelings make complete sense. You don't have to face this alone - I'm here with you, and we can work through this together. 💙"
    ];
    
    const response = advancedResponses[Math.floor(Math.random() * advancedResponses.length)];
    
    return {
      response,
      suggestions: this.getAdvancedSuggestions(emotionAnalysis),
      mood: this.analyzeAdvancedResponseMood(context.userMessage, response),
      confidence: 0.85,
      emotionAnalysis
    };
  }

  private capitalizeSuggestion(suggestion: string): string {
    return suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  }

  clearHistory(): void {
    this.conversationHistory = [];
    this.emotionalProfile = {
      dominantEmotions: [],
      triggers: [],
      copingStrategies: [],
      progressNotes: [],
      mentalHealthConcerns: [],
      riskFactors: [],
      protectiveFactors: [],
      sessionCount: 0,
      lastSessionDate: ''
    };
  }

  getConversationSummary(): string {
    if (this.conversationHistory.length === 0) {
      return "No conversation history available.";
    }
    
    const sessionCount = this.emotionalProfile.sessionCount;
    const dominantEmotions = [...new Set(this.emotionalProfile.dominantEmotions.slice(-10))];
    const mainTriggers = [...new Set(this.emotionalProfile.triggers.slice(-5))];
    
    return `Session ${sessionCount}: Ongoing supportive conversation focusing on ${dominantEmotions.join(', ')} emotions${mainTriggers.length > 0 ? ` related to ${mainTriggers.join(', ')}` : ''}.`;
  }

  getEmotionalProfile() {
    return { ...this.emotionalProfile };
  }

  // Debug method to check configuration
  getDebugInfo() {
    return {
      hasApiKey: !!this.apiKey,
      apiUrl: this.apiUrl,
      conversationLength: this.conversationHistory.length,
      sessionCount: this.emotionalProfile.sessionCount,
      isConfigured: this.isConfigured()
    };
  }
}

export const geminiAI = new GeminiAIService();
export default geminiAI;