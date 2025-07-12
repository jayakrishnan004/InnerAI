import React, { useState, useRef, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Heart,
  Shuffle,
  Repeat,
  List,
  Upload,
  X,
  ChevronUp,
  ChevronDown,
  Headphones,
  Sparkles,
  ArrowLeft,
  Download,
  Star,
  Clock,
  Waves,
  Zap
} from 'lucide-react';
import MusicUploader from './MusicUploader';
import SpotifyMusicPlayer from './SpotifyMusicPlayer';

export interface Track {
  id: string;
  title: string;
  artist: string;
  emotion: 'calm' | 'uplifting' | 'healing' | 'energizing' | 'peaceful' | 'focus' | 'sleep';
  url: string;
  duration: number;
  description: string;
  emoji: string;
  category: 'nature' | 'instrumental' | 'ambient' | 'classical' | 'meditation';
}

interface MusicPlayerProps {
  currentEmotion: 'positive' | 'negative' | 'neutral';
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentEmotion, 
  isVisible, 
  onToggleVisibility 
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [currentView, setCurrentView] = useState<'main' | 'categories' | 'playlist' | 'upload' | 'spotify'>('main');
  const [showUploader, setShowUploader] = useState(false);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userTracks, setUserTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Enhanced music library with therapeutic tracks
  const builtInTracks: Track[] = [
    // Nature Sounds - Therapeutic Collection
    {
      id: 'nature-1',
      title: 'Ocean Waves & Seagulls',
      artist: 'Nature Therapy',
      emotion: 'calm',
      url: '/audio/ocean-waves.mp3',
      duration: 600,
      description: 'Gentle ocean waves with distant seagulls for deep relaxation and anxiety relief',
      emoji: '🌊',
      category: 'nature'
    },
    {
      id: 'nature-2',
      title: 'Forest Rain & Thunder',
      artist: 'Nature Therapy',
      emotion: 'peaceful',
      url: '/audio/forest-rain.mp3',
      duration: 480,
      description: 'Soft rain in a forest with distant thunder for stress relief',
      emoji: '🌧️',
      category: 'nature'
    },
    {
      id: 'nature-3',
      title: 'Mountain Stream Flow',
      artist: 'Nature Therapy',
      emotion: 'focus',
      url: '/audio/mountain-stream.mp3',
      duration: 720,
      description: 'Flowing water sounds for concentration and mental clarity',
      emoji: '🏔️',
      category: 'nature'
    },
    {
      id: 'nature-4',
      title: 'Birds at Dawn',
      artist: 'Nature Therapy',
      emotion: 'uplifting',
      url: '/audio/birds-dawn.mp3',
      duration: 540,
      description: 'Morning bird songs to lift your spirits and inspire hope',
      emoji: '🐦',
      category: 'nature'
    },
    
    // Instrumental - Healing Collection
    {
      id: 'instrumental-1',
      title: 'Piano Meditation',
      artist: 'Peaceful Piano',
      emotion: 'healing',
      url: '/audio/piano-meditation.mp3',
      duration: 420,
      description: 'Gentle piano melodies for emotional healing and inner peace',
      emoji: '🎹',
      category: 'instrumental'
    },
    {
      id: 'instrumental-2',
      title: 'Guitar Serenity',
      artist: 'Acoustic Healing',
      emotion: 'calm',
      url: '/audio/guitar-serenity.mp3',
      duration: 380,
      description: 'Soft acoustic guitar for relaxation and mindfulness',
      emoji: '🎸',
      category: 'instrumental'
    },
    {
      id: 'instrumental-3',
      title: 'Violin Healing',
      artist: 'String Therapy',
      emotion: 'healing',
      url: '/audio/violin-healing.mp3',
      duration: 450,
      description: 'Soothing violin melodies for emotional restoration',
      emoji: '🎻',
      category: 'instrumental'
    },
    
    // Meditation & Binaural Beats
    {
      id: 'meditation-1',
      title: '528Hz Healing Frequency',
      artist: 'Binaural Beats',
      emotion: 'healing',
      url: '/audio/528hz-healing.mp3',
      duration: 900,
      description: 'DNA repair frequency for deep healing and transformation',
      emoji: '✨',
      category: 'meditation'
    },
    {
      id: 'meditation-2',
      title: 'Deep Sleep Waves',
      artist: 'Sleep Therapy',
      emotion: 'sleep',
      url: '/audio/deep-sleep.mp3',
      duration: 1800,
      description: 'Delta waves for deep, restorative sleep',
      emoji: '😴',
      category: 'meditation'
    },
    {
      id: 'meditation-3',
      title: 'Focus Enhancement',
      artist: 'Concentration Sounds',
      emotion: 'focus',
      url: '/audio/focus-enhancement.mp3',
      duration: 600,
      description: 'Alpha waves to enhance concentration and mental clarity',
      emoji: '🧠',
      category: 'meditation'
    },
    
    // Ambient - Atmospheric Collection
    {
      id: 'ambient-1',
      title: 'Cosmic Drift',
      artist: 'Space Ambient',
      emotion: 'peaceful',
      url: '/audio/cosmic-drift.mp3',
      duration: 720,
      description: 'Ethereal soundscapes for deep meditation and introspection',
      emoji: '🌌',
      category: 'ambient'
    },
    {
      id: 'ambient-2',
      title: 'Digital Zen',
      artist: 'Modern Meditation',
      emotion: 'calm',
      url: '/audio/digital-zen.mp3',
      duration: 540,
      description: 'Modern ambient sounds for contemporary mindfulness',
      emoji: '💫',
      category: 'ambient'
    },
    
    // Classical - Therapeutic Selection
    {
      id: 'classical-1',
      title: 'Cello Meditation',
      artist: 'Classical Therapy',
      emotion: 'healing',
      url: '/audio/cello-meditation.mp3',
      duration: 480,
      description: 'Peaceful cello pieces for emotional healing',
      emoji: '🎼',
      category: 'classical'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Music', emoji: '🎵', description: 'Complete therapeutic collection' },
    { id: 'recommended', name: 'For You', emoji: '💝', description: 'Based on your current mood' },
    { id: 'spotify', name: 'Spotify', emoji: '🎧', description: 'Emotion-based Spotify recommendations' },
    { id: 'nature', name: 'Nature Sounds', emoji: '🌿', description: 'Natural healing sounds' },
    { id: 'instrumental', name: 'Instrumental', emoji: '🎹', description: 'Peaceful melodies' },
    { id: 'meditation', name: 'Meditation', emoji: '🧘‍♀️', description: 'Mindfulness & frequencies' },
    { id: 'ambient', name: 'Ambient', emoji: '🌌', description: 'Atmospheric soundscapes' },
    { id: 'classical', name: 'Classical', emoji: '🎼', description: 'Timeless compositions' },
    { id: 'favorites', name: 'Favorites', emoji: '⭐', description: 'Your loved tracks' }
  ];

  // Get all available tracks
  const getAllTracks = (): Track[] => {
    return [...builtInTracks, ...userTracks];
  };

  // Get filtered tracks based on category
  const getFilteredTracks = (): Track[] => {
    const allTracks = getAllTracks();
    
    switch (selectedCategory) {
      case 'all':
        return allTracks;
      case 'recommended':
        return getRecommendedTracks();
      case 'spotify':
        // This will open Spotify player instead
        return [];
      case 'favorites':
        return allTracks.filter(track => favorites.includes(track.id));
      default:
        return allTracks.filter(track => track.category === selectedCategory);
    }
  };

  // Get emotion-based recommendations
  const getRecommendedTracks = (): Track[] => {
    const allTracks = getAllTracks();
    const emotionMap = {
      negative: ['calm', 'healing', 'peaceful', 'sleep'],
      positive: ['uplifting', 'energizing'],
      neutral: ['focus', 'calm', 'peaceful']
    };
    
    const targetEmotions = emotionMap[currentEmotion];
    return allTracks.filter(track => targetEmotions.includes(track.emotion));
  };

  // Auto-select appropriate track based on emotion
  useEffect(() => {
    if (!currentTrack && isVisible) {
      const recommendedTracks = getRecommendedTracks();
      if (recommendedTracks.length > 0) {
        setCurrentTrack(recommendedTracks[0]);
      }
    }
  }, [currentEmotion, currentTrack, isVisible]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      handleNextTrack();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, repeatMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!currentTrack) {
      const recommended = getRecommendedTracks();
      if (recommended.length > 0) {
        setCurrentTrack(recommended[0]);
      }
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    const tracks = getFilteredTracks();
    if (tracks.length === 0) return;

    if (repeatMode === 'one') {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (isPlaying) audioRef.current.play();
      }
      return;
    }

    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    let nextIndex;

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentIndex + 1) % tracks.length;
    }

    setCurrentTrack(tracks[nextIndex]);
    setCurrentTime(0);
  };

  const handlePrevTrack = () => {
    const tracks = getFilteredTracks();
    if (tracks.length === 0) return;

    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    let prevIndex;

    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * tracks.length);
    } else {
      prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    }

    setCurrentTrack(tracks[prevIndex]);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack || !audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * currentTrack.duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const toggleFavorite = (trackId: string) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleTrackAdded = (track: Track) => {
    setUserTracks(prev => [...prev, track]);
    setCurrentTrack(track);
    setShowUploader(false);
  };

  const getEmotionColor = () => {
    switch (currentEmotion) {
      case 'negative':
        return 'from-blue-500 via-purple-500 to-indigo-600';
      case 'positive':
        return 'from-yellow-500 via-orange-500 to-red-500';
      default:
        return 'from-green-500 via-teal-500 to-blue-500';
    }
  };

  const getEmotionMessage = () => {
    switch (currentEmotion) {
      case 'negative':
        return 'Soothing sounds to help you find peace 🕊️';
      case 'positive':
        return 'Uplifting melodies to celebrate your joy 🌟';
      default:
        return 'Balanced tones for mindful presence 🧘‍♀️';
    }
  };

  const handleBackNavigation = () => {
    if (currentView === 'playlist') {
      setCurrentView('categories');
    } else if (currentView === 'categories') {
      setCurrentView('main');
    } else if (currentView === 'upload') {
      setCurrentView('main');
    } else if (currentView === 'spotify') {
      setCurrentView('categories');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'spotify') {
      setShowSpotifyPlayer(true);
    } else {
      setSelectedCategory(categoryId);
      setCurrentView('playlist');
    }
  };

  // Compact floating widget when not visible
  if (!isVisible) {
    return null;
  }

  // Compact player when not expanded
  if (!isExpanded) {
    return (
      <>
        {/* Compact Music Widget - Perfect size and positioning */}
        <div className="fixed bottom-20 right-4 z-30 transition-all duration-500 transform hover:scale-105">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-neutral-200 p-4 max-w-sm backdrop-blur-sm">
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${getEmotionColor()} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Music className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-800">Music Therapy</h3>
                  <p className="text-xs text-neutral-600">{getEmotionMessage()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-200 group"
                  title="Expand player"
                >
                  <ChevronUp className="w-4 h-4 text-neutral-600 group-hover:text-primary-600" />
                </button>
                <button
                  onClick={onToggleVisibility}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-200 group"
                  title="Close player"
                >
                  <X className="w-4 h-4 text-neutral-600 group-hover:text-red-500" />
                </button>
              </div>
            </div>

            {/* Current Track Info - Compact */}
            {currentTrack && (
              <div className="mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl animate-bounce">{currentTrack.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">{currentTrack.title}</p>
                    <p className="text-xs text-neutral-600 truncate">{currentTrack.artist}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentTrack.id)}
                    className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(currentTrack.id) ? 'text-red-500 fill-current' : 'text-neutral-400'}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Progress Bar - Compact & Interactive */}
            {currentTrack && (
              <div className="mb-3">
                <div 
                  className="w-full bg-neutral-200 rounded-full h-2 cursor-pointer group"
                  onClick={handleSeek}
                >
                  <div 
                    className={`h-full bg-gradient-to-r ${getEmotionColor()} rounded-full transition-all duration-300 group-hover:shadow-lg relative`}
                    style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
              </div>
            )}

            {/* Compact Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevTrack}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-200 group"
                  title="Previous track"
                >
                  <SkipBack className="w-4 h-4 text-neutral-600 group-hover:text-primary-600" />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  disabled={isLoading}
                  className={`w-10 h-10 bg-gradient-to-r ${getEmotionColor()} text-white rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                
                <button
                  onClick={handleNextTrack}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-200 group"
                  title="Next track"
                >
                  <SkipForward className="w-4 h-4 text-neutral-600 group-hover:text-primary-600" />
                </button>
              </div>
              
              {/* Volume & Browse Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('categories')}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-200 group"
                  title="Browse music"
                >
                  <List className="w-4 h-4 text-neutral-600 group-hover:text-primary-600" />
                </button>
                
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-200 group"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-neutral-600 group-hover:text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-neutral-600 group-hover:text-primary-600" />
                  )}
                </button>
                
                <div className="w-16">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => setCurrentView('categories')}
                className="flex-1 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-xs font-medium text-neutral-700 flex items-center justify-center space-x-1"
              >
                <List className="w-3 h-3" />
                <span>Browse</span>
              </button>
              <button
                onClick={() => setShowSpotifyPlayer(true)}
                className="flex-1 p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors text-xs font-medium text-green-700 flex items-center justify-center space-x-1"
              >
                <Headphones className="w-3 h-3" />
                <span>Spotify</span>
              </button>
              <button
                onClick={() => setShowUploader(true)}
                className="flex-1 p-2 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors text-xs font-medium text-primary-700 flex items-center justify-center space-x-1"
              >
                <Upload className="w-3 h-3" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.url}
            volume={isMuted ? 0 : volume}
            onLoadedData={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = currentTime;
              }
            }}
          />
        )}

        {/* Enhanced Category/Playlist Modal */}
        {(currentView === 'categories' || currentView === 'playlist') && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl border-2 border-neutral-200">
              {/* Enhanced Header */}
              <div className={`bg-gradient-to-r ${getEmotionColor()} p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {currentView === 'playlist' && (
                        <button
                          onClick={() => setCurrentView('categories')}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                      )}
                      <Headphones className="w-6 h-6" />
                      <div>
                        <h3 className="text-xl font-bold">
                          {currentView === 'categories' ? 'Music Therapy Categories' : 'Track Selection'}
                        </h3>
                        <p className="text-sm opacity-90">
                          {currentView === 'categories' 
                            ? 'Choose your therapeutic music category' 
                            : `${getFilteredTracks().length} tracks available`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentView('main')}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories View */}
              {currentView === 'categories' && (
                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((category) => {
                      const trackCount = category.id === 'all' 
                        ? getAllTracks().length 
                        : category.id === 'recommended'
                        ? getRecommendedTracks().length
                        : category.id === 'favorites'
                        ? favorites.length
                        : category.id === 'spotify'
                        ? '∞'
                        : getAllTracks().filter(t => t.category === category.id).length;

                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className="p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-primary-50 hover:to-primary-100 rounded-xl transition-all duration-300 border border-neutral-200 hover:border-primary-300 text-left group hover:shadow-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl group-hover:scale-110 transition-transform">
                              {category.emoji}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-neutral-800 group-hover:text-primary-700">
                                {category.name}
                              </div>
                              <div className="text-sm text-neutral-600 mt-1">
                                {category.description}
                              </div>
                              <div className="text-xs text-neutral-500 mt-1 flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{trackCount} tracks</span>
                              </div>
                            </div>
                            <div className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronUp className="w-5 h-5 rotate-90" />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    
                    {/* Upload Option */}
                    <button
                      onClick={() => setShowUploader(true)}
                      className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 rounded-xl transition-all duration-300 border-2 border-dashed border-primary-300 hover:border-primary-400 text-left group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-primary-700">Upload Your Music</div>
                          <div className="text-sm text-primary-600 mt-1">
                            Add your personal therapeutic tracks
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Enhanced Track List */}
              {currentView === 'playlist' && (
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 bg-neutral-50 border-b border-neutral-200 sticky top-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-800 flex items-center">
                        <span className="text-xl mr-2">
                          {categories.find(c => c.id === selectedCategory)?.emoji}
                        </span>
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </h4>
                      <span className="text-xs text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full">
                        {getFilteredTracks().length} tracks
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-neutral-100">
                    {getFilteredTracks().map((track) => (
                      <button
                        key={track.id}
                        onClick={() => {
                          selectTrack(track);
                          setCurrentView('main');
                        }}
                        className={`w-full p-4 text-left hover:bg-neutral-50 transition-all duration-200 group ${
                          currentTrack?.id === track.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl group-hover:scale-110 transition-transform">
                            {track.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-neutral-800 truncate group-hover:text-primary-700">
                              {track.title}
                            </div>
                            <div className="text-sm text-neutral-600 truncate">
                              {track.artist} • {formatTime(track.duration)}
                            </div>
                            <div className="text-xs text-neutral-500 mt-1 line-clamp-2">
                              {track.description}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(track.id);
                              }}
                              className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(track.id) ? 'text-red-500 fill-current' : 'text-neutral-400'}`} />
                            </button>
                            {currentTrack?.id === track.id && isPlaying && (
                              <div className="flex space-x-1">
                                <div className="w-1 h-4 bg-primary-500 animate-pulse"></div>
                                <div className="w-1 h-4 bg-primary-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-1 h-4 bg-primary-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Therapeutic Benefits Footer */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-neutral-200">
                <div className="flex items-center space-x-2 text-xs text-neutral-600">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="font-semibold">Music Therapy Benefits:</div>
                    <div>Reduces stress • Improves mood • Enhances focus • Promotes healing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spotify Music Player Modal */}
        <SpotifyMusicPlayer
          currentEmotion={currentEmotion}
          isVisible={showSpotifyPlayer}
          onClose={() => setShowSpotifyPlayer(false)}
        />

        {/* Music Uploader Modal */}
        <MusicUploader
          isOpen={showUploader}
          onClose={() => setShowUploader(false)}
          onTrackAdded={handleTrackAdded}
        />

        {/* Custom Slider Styles */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </>
    );
  }

  // Expanded player would go here (for future enhancement)
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-neutral-200 p-6 w-96">
        <div className="text-center text-neutral-600">
          <Music className="w-12 h-12 mx-auto mb-4" />
          <p>Expanded player coming soon...</p>
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Compact
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;