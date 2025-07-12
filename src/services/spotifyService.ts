interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  audio_features?: {
    valence: number; // 0-1 (sad to happy)
    energy: number; // 0-1 (low to high energy)
    danceability: number;
    acousticness: number;
    instrumentalness: number;
    tempo: number;
  };
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

interface EmotionBasedRecommendations {
  emotion: string;
  tracks: SpotifyTrack[];
  playlists: SpotifyPlaylist[];
  audioFeatures: {
    target_valence: number;
    target_energy: number;
    target_acousticness: number;
    target_instrumentalness: number;
  };
}

class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private isAuthenticated: boolean = false;

  constructor() {
    this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';
    
    // Enhanced debugging
    console.log('🎵 Spotify Service Initialization:');
    console.log('- Client ID present:', !!this.clientId);
    console.log('- Client Secret present:', !!this.clientSecret);
    console.log('- Client ID length:', this.clientId.length);
    console.log('- Client Secret length:', this.clientSecret.length);
    
    if (!this.clientId) {
      console.error('❌ VITE_SPOTIFY_CLIENT_ID not found in environment variables');
      console.log('📝 Add this to your .env file: VITE_SPOTIFY_CLIENT_ID=your_client_id_here');
    }
    
    if (!this.clientSecret) {
      console.error('❌ VITE_SPOTIFY_CLIENT_SECRET not found in environment variables');
      console.log('📝 Add this to your .env file: VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here');
    }
    
    if (this.isConfigured()) {
      console.log('✅ Spotify service configured successfully');
    } else {
      console.warn('⚠️ Spotify service not properly configured');
    }
  }

  // Check if Spotify is properly configured
  isConfigured(): boolean {
    return !!this.clientId && !!this.clientSecret && 
           this.clientId.length > 10 && this.clientSecret.length > 10;
  }

  // Get access token using Client Credentials flow (for public data)
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      console.log('🔄 Using cached Spotify access token');
      return this.accessToken;
    }

    if (!this.isConfigured()) {
      const error = 'Spotify credentials not configured properly. Please check your .env file.';
      console.error('❌', error);
      throw new Error(error);
    }

    console.log('🔑 Requesting new Spotify access token...');

    try {
      const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
      console.log('📡 Making request to Spotify token endpoint...');
      
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`
        },
        body: 'grant_type=client_credentials'
      });

      console.log('📥 Spotify token response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Spotify auth failed:', response.status, errorText);
        
        if (response.status === 400) {
          throw new Error('Invalid Spotify credentials. Please check your Client ID and Client Secret.');
        } else if (response.status === 429) {
          throw new Error('Too many requests to Spotify. Please try again in a few minutes.');
        } else {
          throw new Error(`Spotify authentication failed: ${response.status} - ${errorText}`);
        }
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min early
      this.isAuthenticated = true;
      
      console.log('✅ Spotify access token obtained successfully');
      console.log('⏰ Token expires at:', new Date(this.tokenExpiry).toLocaleTimeString());
      
      return this.accessToken;
    } catch (error) {
      console.error('❌ Spotify authentication failed:', error);
      this.isAuthenticated = false;
      throw error;
    }
  }

  // Get emotion-based music recommendations
  async getEmotionBasedRecommendations(emotion: string): Promise<EmotionBasedRecommendations> {
    console.log(`🎯 Getting Spotify recommendations for emotion: ${emotion}`);
    
    try {
      const token = await this.getAccessToken();
      
      // Define audio features for each emotion
      const emotionAudioFeatures = this.getEmotionAudioFeatures(emotion);
      console.log('🎵 Audio features for emotion:', emotionAudioFeatures);
      
      // Get recommendations based on audio features
      console.log('🔍 Fetching track recommendations...');
      const tracks = await this.getRecommendationsByFeatures(token, emotionAudioFeatures);
      
      // Get curated playlists for the emotion
      console.log('📋 Fetching curated playlists...');
      const playlists = await this.getEmotionPlaylists(token, emotion);
      
      console.log(`✅ Successfully retrieved ${tracks.length} tracks and ${playlists.length} playlists`);
      
      return {
        emotion,
        tracks,
        playlists,
        audioFeatures: emotionAudioFeatures
      };
    } catch (error) {
      console.error('❌ Failed to get Spotify recommendations:', error);
      throw error;
    }
  }

  // Define audio features that match different emotions
  private getEmotionAudioFeatures(emotion: string) {
    const emotionFeatures: { [key: string]: any } = {
      anxious: {
        target_valence: 0.3,
        target_energy: 0.2,
        target_acousticness: 0.8,
        target_instrumentalness: 0.7,
        target_tempo: 60,
        seed_genres: 'ambient'
      },
      sad: {
        target_valence: 0.2,
        target_energy: 0.3,
        target_acousticness: 0.7,
        target_instrumentalness: 0.5,
        target_tempo: 70,
        seed_genres: 'classical'
      },
      stressed: {
        target_valence: 0.4,
        target_energy: 0.2,
        target_acousticness: 0.8,
        target_instrumentalness: 0.8,
        target_tempo: 65,
        seed_genres: 'ambient'
      },
      angry: {
        target_valence: 0.6,
        target_energy: 0.4,
        target_acousticness: 0.6,
        target_instrumentalness: 0.6,
        target_tempo: 80,
        seed_genres: 'classical'
      },
      lonely: {
        target_valence: 0.4,
        target_energy: 0.3,
        target_acousticness: 0.7,
        target_instrumentalness: 0.4,
        target_tempo: 75,
        seed_genres: 'folk'
      },
      happy: {
        target_valence: 0.8,
        target_energy: 0.6,
        target_acousticness: 0.4,
        target_instrumentalness: 0.3,
        target_tempo: 120,
        seed_genres: 'pop'
      },
      excited: {
        target_valence: 0.9,
        target_energy: 0.7,
        target_acousticness: 0.3,
        target_instrumentalness: 0.2,
        target_tempo: 130,
        seed_genres: 'pop'
      },
      calm: {
        target_valence: 0.6,
        target_energy: 0.3,
        target_acousticness: 0.8,
        target_instrumentalness: 0.7,
        target_tempo: 70,
        seed_genres: 'ambient'
      },
      overwhelmed: {
        target_valence: 0.3,
        target_energy: 0.1,
        target_acousticness: 0.9,
        target_instrumentalness: 0.9,
        target_tempo: 55,
        seed_genres: 'ambient'
      },
      negative: {
        target_valence: 0.3,
        target_energy: 0.2,
        target_acousticness: 0.8,
        target_instrumentalness: 0.7,
        target_tempo: 65,
        seed_genres: 'ambient'
      },
      positive: {
        target_valence: 0.8,
        target_energy: 0.6,
        target_acousticness: 0.4,
        target_instrumentalness: 0.3,
        target_tempo: 110,
        seed_genres: 'pop'
      },
      neutral: {
        target_valence: 0.5,
        target_energy: 0.4,
        target_acousticness: 0.6,
        target_instrumentalness: 0.5,
        target_tempo: 90,
        seed_genres: 'indie'
      }
    };

    return emotionFeatures[emotion] || emotionFeatures.calm;
  }

  // Get track recommendations based on audio features
  private async getRecommendationsByFeatures(token: string, features: any): Promise<SpotifyTrack[]> {
    const params = new URLSearchParams({
      limit: '20',
      seed_genres: features.seed_genres,
      target_valence: features.target_valence.toString(),
      target_energy: features.target_energy.toString(),
      target_acousticness: features.target_acousticness.toString(),
      target_instrumentalness: features.target_instrumentalness.toString(),
      target_tempo: Math.round(features.target_tempo).toString()
    });

    console.log('🔗 Spotify recommendations URL:', `https://api.spotify.com/v1/recommendations?${params}`);

    const response = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📥 Recommendations response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Spotify recommendations failed:', response.status, errorText);
      throw new Error(`Spotify recommendations failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('📊 Recommendations data:', data);
    
    return data.tracks || [];
  }

  // Get curated playlists for specific emotions
  private async getEmotionPlaylists(token: string, emotion: string): Promise<SpotifyPlaylist[]> {
    const emotionQueries: { [key: string]: string[] } = {
      anxious: ['anxiety relief', 'calm music', 'stress relief', 'meditation'],
      sad: ['sad songs', 'melancholy', 'emotional healing', 'comfort music'],
      stressed: ['stress relief', 'relaxation', 'calm down', 'peaceful'],
      angry: ['anger management', 'calm down', 'peaceful music', 'meditation'],
      lonely: ['comfort music', 'companionship', 'uplifting', 'hope'],
      happy: ['happy music', 'feel good', 'positive vibes', 'uplifting'],
      excited: ['energetic', 'upbeat', 'celebration', 'positive energy'],
      calm: ['peaceful', 'relaxation', 'meditation', 'tranquil'],
      overwhelmed: ['stress relief', 'calm', 'meditation', 'peace'],
      negative: ['healing music', 'comfort', 'emotional support', 'calm'],
      positive: ['feel good', 'happy', 'uplifting', 'positive'],
      neutral: ['chill', 'background music', 'ambient', 'peaceful']
    };

    const queries = emotionQueries[emotion] || emotionQueries.calm;
    const allPlaylists: SpotifyPlaylist[] = [];

    for (const query of queries.slice(0, 2)) { // Limit to 2 queries to avoid rate limits
      try {
        const params = new URLSearchParams({
          q: query,
          type: 'playlist',
          limit: '10'
        });

        console.log(`🔍 Searching playlists for: "${query}"`);

        const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const playlists = data.playlists?.items || [];
          console.log(`📋 Found ${playlists.length} playlists for "${query}"`);
          allPlaylists.push(...playlists);
        } else {
          console.warn(`⚠️ Failed to search for "${query}" playlists:`, response.status);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to search for "${query}" playlists:`, error);
      }
    }

    // Remove duplicates and return top playlists
    const uniquePlaylists = allPlaylists.filter((playlist, index, self) => 
      index === self.findIndex(p => p.id === playlist.id)
    );

    console.log(`✅ Total unique playlists found: ${uniquePlaylists.length}`);
    return uniquePlaylists.slice(0, 8);
  }

  // Search for specific tracks or artists
  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    console.log(`🔍 Searching Spotify for: "${query}"`);
    
    try {
      const token = await this.getAccessToken();
      
      const params = new URLSearchParams({
        q: query,
        type: 'track',
        limit: limit.toString()
      });

      const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📥 Search response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Spotify search failed:', response.status, errorText);
        throw new Error(`Spotify search failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const tracks = data.tracks?.items || [];
      console.log(`🎵 Found ${tracks.length} tracks for "${query}"`);
      
      return tracks;
    } catch (error) {
      console.error('❌ Spotify search failed:', error);
      throw error;
    }
  }

  // Get audio features for tracks (for better emotion matching)
  async getAudioFeatures(trackIds: string[]): Promise<any[]> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Spotify audio features failed: ${response.status}`);
      }

      const data = await response.json();
      return data.audio_features || [];
    } catch (error) {
      console.error('❌ Failed to get audio features:', error);
      return [];
    }
  }

  // Get featured playlists (curated by Spotify)
  async getFeaturedPlaylists(limit: number = 20): Promise<SpotifyPlaylist[]> {
    try {
      const token = await this.getAccessToken();
      
      const params = new URLSearchParams({
        limit: limit.toString()
      });

      const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Spotify featured playlists failed: ${response.status}`);
      }

      const data = await response.json();
      return data.playlists?.items || [];
    } catch (error) {
      console.error('❌ Failed to get featured playlists:', error);
      return [];
    }
  }

  // Convert Spotify track to our Track format
  convertToTrack(spotifyTrack: SpotifyTrack, emotion: string): any {
    return {
      id: `spotify-${spotifyTrack.id}`,
      title: spotifyTrack.name,
      artist: spotifyTrack.artists.map(a => a.name).join(', '),
      emotion: emotion as any,
      url: spotifyTrack.preview_url || spotifyTrack.external_urls.spotify,
      duration: Math.floor(spotifyTrack.duration_ms / 1000),
      description: `${spotifyTrack.album.name} - Spotify recommendation for ${emotion} mood`,
      emoji: this.getEmotionEmoji(emotion),
      category: 'spotify' as any,
      spotifyUrl: spotifyTrack.external_urls.spotify,
      albumArt: spotifyTrack.album.images[0]?.url,
      isSpotify: true
    };
  }

  private getEmotionEmoji(emotion: string): string {
    const emojiMap: { [key: string]: string } = {
      anxious: '😰',
      sad: '😢',
      stressed: '😫',
      angry: '😠',
      lonely: '😔',
      happy: '😊',
      excited: '🤩',
      calm: '😌',
      overwhelmed: '😵',
      negative: '💙',
      positive: '🌟',
      neutral: '🎵'
    };
    return emojiMap[emotion] || '🎵';
  }

  // Debug method
  getDebugInfo() {
    return {
      hasClientId: !!this.clientId,
      hasClientSecret: !!this.clientSecret,
      clientIdLength: this.clientId.length,
      clientSecretLength: this.clientSecret.length,
      isAuthenticated: this.isAuthenticated,
      hasAccessToken: !!this.accessToken,
      tokenExpiry: this.tokenExpiry ? new Date(this.tokenExpiry).toISOString() : 'No token',
      isConfigured: this.isConfigured()
    };
  }
}

export const spotifyService = new SpotifyService();
export default spotifyService;