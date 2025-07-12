# InnerAI - Mental Health Companion

## 🤖 **Advanced AI-Powered Mental Health Support**

InnerAI is a sophisticated mental health companion that uses **Google's Gemini AI** to provide intelligent, empathetic, and therapeutic-quality conversations for emotional support and mental wellness.

## 🧠 **AI Intelligence Features**

### **Gemini AI Integration**
- **Advanced Natural Language Understanding**: Goes beyond keyword matching to understand context, nuance, and emotional subtext
- **Therapeutic-Grade Responses**: Uses evidence-based therapy principles (CBT, DBT, person-centered therapy)
- **Conversation Memory**: Maintains context across conversations for personalized support
- **Risk Assessment**: Intelligent detection of mental health concerns and crisis situations

### **Emotional Intelligence**
- **20+ Mental Health Conditions** detected with AI-level accuracy
- **Sophisticated emotion analysis** that understands intensity, triggers, and patterns
- **Personalized therapeutic recommendations** based on individual needs
- **Real-time mood tracking** and emotional journey analysis

### **🎵 Spotify Music Therapy Integration**
- **Emotion-Based Recommendations**: AI analyzes your emotional state and curates Spotify playlists
- **Audio Feature Matching**: Uses Spotify's audio analysis (valence, energy, acousticness) to match music to your mood
- **Therapeutic Playlists**: Access to professionally curated playlists for mental health
- **Real-time Music Suggestions**: Dynamic recommendations that adapt to your emotional journey

### **Smart Features**
- **Crisis Detection**: Automatic identification of high-risk situations with appropriate resources
- **Music Therapy**: AI-recommended therapeutic music based on emotional state
- **Breathing Exercises**: Guided mindfulness and stress relief techniques
- **Progress Tracking**: Comprehensive dashboard with insights and growth metrics

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- A Google Gemini API key (free tier available)
- Spotify Developer Account (for music therapy features)

### **Setup Instructions**

1. **Clone and Install**
```bash
git clone <repository-url>
cd innerai
npm install
```

2. **Configure API Keys**
   - Copy `.env.example` to `.env`
   - Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Get your Spotify credentials from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Update your `.env` file:

```env
# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent

# Spotify Integration
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

3. **Start the Application**
```bash
npm run dev
```

4. **Verify Integrations**
   - The app will show "AI Active" indicators when Gemini is connected
   - Spotify integration will be available in the Music Therapy section
   - Check browser console for connection status

## 🎯 **Core Features**

### **1. Intelligent Conversations**
- **Natural dialogue** that feels like talking to an understanding friend
- **Therapeutic insights** woven naturally into conversations
- **Personalized responses** based on your emotional patterns and history
- **Crisis-sensitive** with appropriate safety resources

### **2. Emotional Analysis**
- **Real-time emotion detection** from your messages
- **Pattern recognition** for triggers, coping strategies, and growth areas
- **Mental health screening** for 20+ conditions with confidence scoring
- **Progress tracking** over time with detailed insights

### **3. Spotify Music Therapy**
- **Emotion-based music curation** using Spotify's vast library
- **Audio feature analysis** to match music to your emotional needs
- **Therapeutic playlists** professionally curated for mental health
- **Real-time recommendations** that adapt as your mood changes
- **Search functionality** to find specific songs or artists
- **Seamless Spotify integration** with direct links to play music

### **4. Therapeutic Tools**
- **4-7-8 Breathing Exercise** with guided animation and progress tracking
- **Local Music Library** with emotion-based recommendations
- **Grounding Techniques** for anxiety and overwhelm
- **Mindfulness Exercises** integrated into conversations

### **5. Safety & Support**
- **Crisis detection** with immediate resource provision
- **Risk assessment** with protective factor identification
- **Professional referral** recommendations when appropriate
- **24/7 crisis hotline** integration (988, Crisis Text Line)

### **6. Progress Dashboard**
- **Emotional journey** visualization and trends
- **Achievement system** with meaningful milestones
- **Goal setting** and progress tracking
- **Comprehensive insights** for personal growth

## 🔧 **Technical Architecture**

### **AI-Powered Backend**
- **Gemini 1.5 Flash** for natural language processing
- **Advanced prompt engineering** for therapeutic responses
- **Conversation memory** with context preservation
- **Fallback systems** for reliability

### **Spotify Integration**
- **Client Credentials Flow** for accessing Spotify's API
- **Audio Features Analysis** for emotion-based matching
- **Recommendation Engine** using Spotify's machine learning
- **Real-time search** and playlist curation

### **Frontend Technologies**
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive, beautiful design
- **Lucide React** for consistent iconography
- **Anime.js** for smooth animations and micro-interactions

### **Mental Health Features**
- **Evidence-based** therapeutic techniques
- **HIPAA-conscious** design (no data storage)
- **Crisis intervention** protocols
- **Professional-grade** mental health screening

## 🎵 **Spotify Music Therapy Setup**

### **1. Create Spotify App**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in app details:
   - **App Name**: InnerAI Music Therapy
   - **App Description**: Mental health music therapy integration
   - **Redirect URI**: `http://localhost:5173` (for development)
4. Save your **Client ID** and **Client Secret**

### **2. Configure Environment**
Add your Spotify credentials to `.env`:
```env
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### **3. How It Works**
- **Emotion Detection**: AI analyzes your emotional state from conversations
- **Audio Feature Mapping**: Each emotion maps to specific audio characteristics:
  - **Anxious**: Low energy, high acousticness, slow tempo
  - **Happy**: High valence, medium energy, upbeat tempo
  - **Sad**: Low valence, low energy, acoustic instruments
- **Spotify API**: Fetches recommendations based on these audio features
- **Curated Playlists**: Searches for professionally made therapeutic playlists
- **Real-time Updates**: Recommendations update as your emotional state changes

### **4. Features Available**
- ✅ **Emotion-based track recommendations**
- ✅ **Curated therapeutic playlists**
- ✅ **Search functionality**
- ✅ **Direct Spotify links**
- ✅ **Audio feature analysis**
- ✅ **Real-time mood adaptation**

## 🛡️ **Privacy & Safety**

### **Data Privacy**
- **No conversation storage** - conversations are not saved
- **Local processing** - emotional analysis happens in your browser
- **No tracking** - your privacy is completely protected
- **Spotify data** - Only public data accessed, no personal playlists

### **Mental Health Safety**
- **Crisis detection** with immediate resource provision
- **Professional referrals** when appropriate
- **Clear disclaimers** about AI limitations
- **Emergency resources** always accessible

### **API Safety**
- **Secure token management** for Spotify integration
- **Rate limiting** to prevent API abuse
- **Error handling** with graceful fallbacks
- **No sensitive data storage**

## 🚀 **Deployment**

### **Development**
```bash
npm run dev
```

### **Production Build**
```bash
npm run build
npm run preview
```

### **Environment Variables**
```env
# Required for AI features
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent

# Required for Spotify music therapy
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

## 🤝 **Contributing**

We welcome contributions that improve mental health support and AI capabilities:

1. **Fork the repository**
2. **Create a feature branch**
3. **Add your improvements**
4. **Test thoroughly** (especially mental health features)
5. **Submit a pull request**

### **Areas for Contribution**
- Additional therapeutic techniques
- Enhanced AI prompts and responses
- New mental health screening tools
- Accessibility improvements
- Multi-language support
- Additional music service integrations

## 📚 **Resources**

### **Mental Health**
- [National Suicide Prevention Lifeline](https://suicidepreventionlifeline.org/) - 988
- [Crisis Text Line](https://www.crisistextline.org/) - Text HOME to 741741
- [NAMI (National Alliance on Mental Illness)](https://www.nami.org/)

### **AI & Development**
- [Google Gemini AI Documentation](https://ai.google.dev/)
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## ⚠️ **Important Disclaimers**

- **Not a replacement** for professional mental health care
- **Emergency situations** require immediate professional help (call 911)
- **AI limitations** - responses are generated, not from human therapists
- **Spotify integration** - requires active Spotify account for full functionality
- **Seek professional help** for persistent or severe mental health concerns

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Google Gemini AI** for advanced language understanding
- **Spotify** for music intelligence and therapeutic audio access
- **Mental health professionals** who informed our therapeutic approaches
- **Open source community** for the tools and libraries that make this possible
- **Users** who trust us with their mental health journey

---

**Remember**: Your mental health matters. This tool is here to support you, but professional help is always available when you need it. You're not alone. 💚

## 🔍 **Troubleshooting**

### **AI Not Responding Intelligently?**
1. Check that `VITE_GEMINI_API_KEY` is set in your `.env` file
2. Verify your API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Check browser console for error messages
4. Ensure you have internet connectivity

### **Spotify Integration Not Working?**
1. Verify `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET` are set
2. Check your Spotify app settings at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
3. Ensure your app has the correct redirect URIs configured
4. Check browser console for Spotify API errors
5. Verify your Spotify app is not in development mode restrictions

### **Music Not Playing?**
1. Check that audio files are in `public/audio/` directory
2. Verify file paths in `musicLibrary.ts` are correct
3. Ensure audio files are in supported formats (MP3, WAV, OGG, M4A)
4. For Spotify tracks, ensure you have an active Spotify account
5. Check browser console for loading errors

### **Performance Issues?**
1. Reduce audio file sizes (compress to 128-192 kbps)
2. Limit conversation history length
3. Clear browser cache and reload
4. Check for browser compatibility issues
5. Monitor network usage for Spotify API calls

For more help, check the browser console for detailed error messages or create an issue in the repository.