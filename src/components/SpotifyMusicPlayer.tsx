import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Play, 
  ExternalLink, 
  Heart, 
  Search, 
  Loader, 
  AlertCircle,
  Sparkles,
  Headphones,
  Volume2,
  Clock,
  User,
  Album,
  Shuffle,
  SkipForward,
  RefreshCw
} from 'lucide-react';
import spotifyService from '../services/spotifyService';

interface SpotifyMusicPlayerProps {
  currentEmotion: string;
  isVisible: boolean;
  onClose: () => void;
}

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  emotion: string;
  url: string;
  duration: number;
  description: string;
  emoji: string;
  category: string;
  spotifyUrl: string;
  albumArt?: string;
  isSpotify: boolean;
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: { total: number };
  external_urls: { spotify: string };
}

const SpotifyMusicPlayer: React.FC<SpotifyMusicPlayerProps> = ({ 
  currentEmotion, 
  isVisible, 
  onClose 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<{
    tracks: SpotifyTrack[];
    playlists: SpotifyPlaylist[];
  }>({ tracks: [], playlists: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'playlists' | 'search'>('recommendations');
  const [isSearching, setIsSearching] = useState(false);

  // Load emotion-based recommendations when component mounts or emotion changes
  useEffect(() => {
    if (isVisible && currentEmotion) {
      loadEmotionRecommendations();
    }
  }, [isVisible, currentEmotion]);

  const loadEmotionRecommendations = async () => {
    if (!spotifyService.isConfigured()) {
      setError('Spotify integration not configured. Please add your Spotify credentials to the .env file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await spotifyService.getEmotionBasedRecommendations(currentEmotion);
      
      const tracks = result.tracks.map(track => 
        spotifyService.convertToTrack(track, currentEmotion)
      );
      
      setRecommendations({
        tracks,
        playlists: result.playlists
      });
    } catch (err) {
      console.error('Failed to load Spotify recommendations:', err);
      setError('Unable to load Spotify recommendations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await spotifyService.searchTracks(searchQuery);
      const tracks = results.map(track => 
        spotifyService.convertToTrack(track, 'neutral')
      );
      setSearchResults(tracks);
      setActiveTab('search');
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const openSpotifyTrack = (spotifyUrl: string) => {
    window.open(spotifyUrl, '_blank');
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionMessage = () => {
    const messages: { [key: string]: string } = {
      anxious: 'Calming music to ease your anxiety 🌊',
      sad: 'Gentle melodies for emotional healing 💙',
      stressed: 'Relaxing sounds to reduce stress 🕊️',
      angry: 'Peaceful music to find inner calm 🌸',
      lonely: 'Comforting songs to feel connected 🤗',
      happy: 'Uplifting music to celebrate your joy 🌟',
      excited: 'Energetic tracks to match your vibe ⚡',
      calm: 'Serene sounds to maintain your peace 🧘‍♀️',
      overwhelmed: 'Soothing music to clear your mind ✨'
    };
    return messages[currentEmotion] || 'Personalized music for your mood 🎵';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-neutral-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Music className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    Spotify Music Therapy
                    <Sparkles className="w-6 h-6 ml-2 animate-pulse" />
                  </h1>
                  <p className="text-green-100 mt-1">{getEmotionMessage()}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
              >
                <span className="text-3xl">✕</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for songs, artists, or albums..."
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm disabled:opacity-50 flex items-center space-x-2"
              >
                {isSearching ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'recommendations', label: 'For Your Mood', icon: Heart, count: recommendations.tracks.length },
              { id: 'playlists', label: 'Curated Playlists', icon: Album, count: recommendations.playlists.length },
              { id: 'search', label: 'Search Results', icon: Search, count: searchResults.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-green-600 shadow-sm border border-green-200'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Connection Issue</h3>
                <p className="text-neutral-600 mb-4">{error}</p>
                <button
                  onClick={loadEmotionRecommendations}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <Loader className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Finding Perfect Music</h3>
                <p className="text-neutral-600">Analyzing your emotional state and curating personalized recommendations...</p>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && !isLoading && !error && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Music Curated for Your {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)} Mood
                </h3>
                <p className="text-neutral-600">
                  These tracks are scientifically selected based on audio features that match your emotional state
                </p>
              </div>

              {recommendations.tracks.length === 0 ? (
                <div className="text-center py-8">
                  <Music className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No recommendations available. Try refreshing or check your connection.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {recommendations.tracks.map((track, index) => (
                    <div key={track.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0">
                        {track.albumArt ? (
                          <img 
                            src={track.albumArt} 
                            alt={track.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-800 truncate group-hover:text-green-700 transition-colors">
                          {track.title}
                        </h4>
                        <p className="text-neutral-600 truncate flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {track.artist}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-neutral-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDuration(track.duration)}
                          </span>
                          <span className="flex items-center">
                            <Headphones className="w-3 h-3 mr-1" />
                            Spotify
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{track.emoji}</span>
                        <button
                          onClick={() => openSpotifyTrack(track.spotifyUrl)}
                          className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                          title="Open in Spotify"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Playlists Tab */}
          {activeTab === 'playlists' && !isLoading && !error && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Curated Playlists</h3>
                <p className="text-neutral-600">
                  Professionally curated playlists that match your emotional needs
                </p>
              </div>

              {recommendations.playlists.length === 0 ? (
                <div className="text-center py-8">
                  <Album className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No playlists found. Try a different emotion or refresh.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.playlists.map((playlist) => (
                    <div key={playlist.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                      <div className="relative">
                        {playlist.images[0] ? (
                          <img 
                            src={playlist.images[0].url} 
                            alt={playlist.name}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                            <Album className="w-16 h-16 text-white" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <button
                            onClick={() => window.open(playlist.external_urls.spotify, '_blank')}
                            className="opacity-0 group-hover:opacity-100 p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform scale-90 group-hover:scale-100"
                          >
                            <Play className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-neutral-800 mb-2 line-clamp-2">{playlist.name}</h4>
                        <p className="text-neutral-600 text-sm mb-3 line-clamp-3">{playlist.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-500 flex items-center">
                            <Music className="w-4 h-4 mr-1" />
                            {playlist.tracks.total} tracks
                          </span>
                          <button
                            onClick={() => window.open(playlist.external_urls.spotify, '_blank')}
                            className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1"
                          >
                            <span>Open in Spotify</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Search Results Tab */}
          {activeTab === 'search' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Search Results</h3>
                {searchQuery && (
                  <p className="text-neutral-600">Results for "{searchQuery}"</p>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">
                    {searchQuery ? 'No results found. Try a different search term.' : 'Search for your favorite music above.'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {searchResults.map((track) => (
                    <div key={track.id} className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-neutral-200 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0">
                        {track.albumArt ? (
                          <img 
                            src={track.albumArt} 
                            alt={track.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-800 truncate group-hover:text-blue-700 transition-colors">
                          {track.title}
                        </h4>
                        <p className="text-neutral-600 truncate flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {track.artist}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-neutral-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDuration(track.duration)}
                          </span>
                          <span className="flex items-center">
                            <Headphones className="w-3 h-3 mr-1" />
                            Spotify
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openSpotifyTrack(track.spotifyUrl)}
                        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        title="Open in Spotify"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-t border-neutral-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-neutral-600">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span>Powered by Spotify's music intelligence</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadEmotionRecommendations}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-600">Emotion: {currentEmotion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyMusicPlayer;