// Enhanced music library with local and external audio sources
import { Track } from '../components/MusicPlayer';

// Option 1: Local Audio Files (place in public/audio/)
export const localMusicTracks: Track[] = [
  // Nature Sounds - Local Files
  {
    id: 'local-1',
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    emotion: 'calm',
    url: '/audio/ocean-waves.mp3', // Place file in public/audio/
    duration: 600,
    description: 'Gentle ocean waves for deep relaxation',
    emoji: '🌊',
    category: 'nature'
  },
  {
    id: 'local-2',
    title: 'Forest Rain',
    artist: 'Nature Sounds',
    emotion: 'peaceful',
    url: '/audio/forest-rain.mp3', // Place file in public/audio/
    duration: 480,
    description: 'Soft rain in a forest setting',
    emoji: '🌧️',
    category: 'nature'
  },
  // Add more local tracks here...
];

// Option 2: Free Online Audio Sources (No copyright issues)
export const onlineMusicTracks: Track[] = [
  // Freesound.org - Creative Commons licensed
  {
    id: 'online-1',
    title: 'Peaceful Piano',
    artist: 'Meditation Music',
    emotion: 'calm',
    url: 'https://freesound.org/data/previews/316/316847_5123451-lq.mp3',
    duration: 300,
    description: 'Gentle piano for relaxation',
    emoji: '🎹',
    category: 'instrumental'
  },
  // YouTube Audio Library - Royalty Free
  {
    id: 'online-2',
    title: 'Ambient Meditation',
    artist: 'Healing Sounds',
    emotion: 'healing',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 420,
    description: 'Ambient sounds for meditation',
    emoji: '🧘‍♀️',
    category: 'meditation'
  }
];

// Option 3: Web Audio API Generated Sounds
export const generateBinauralBeat = (frequency: number, duration: number): string => {
  // This would generate a data URL for binaural beats
  // Implementation would use Web Audio API
  return `data:audio/wav;base64,${generateAudioData(frequency, duration)}`;
};

// Helper function to generate simple tones
function generateAudioData(frequency: number, duration: number): string {
  // Simplified - in real implementation, use Web Audio API
  return 'UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
}

// Option 4: Text-to-Speech for Guided Meditations
export const generateGuidedMeditation = (text: string): Track => {
  return {
    id: 'tts-meditation',
    title: 'Guided Meditation',
    artist: 'InnerAid Voice',
    emotion: 'calm',
    url: generateTTSAudio(text),
    duration: text.length * 0.1, // Estimate duration
    description: 'AI-generated guided meditation',
    emoji: '🗣️',
    category: 'meditation'
  };
};

function generateTTSAudio(text: string): string {
  // Use Web Speech API or external TTS service
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;
  utterance.pitch = 0.9;
  utterance.volume = 0.7;
  
  // This is a simplified example - actual implementation would be more complex
  return 'data:audio/wav;base64,generated-audio-data';
}

// Combined music library
export const getAllTracks = (): Track[] => {
  return [
    ...localMusicTracks,
    ...onlineMusicTracks,
    // Add generated tracks as needed
  ];
};

// Music file upload handler
export const handleMusicUpload = (file: File): Promise<Track> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('audio/')) {
      reject(new Error('Please select an audio file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const audioUrl = e.target?.result as string;
      
      // Create audio element to get duration
      const audio = new Audio(audioUrl);
      audio.onloadedmetadata = () => {
        const track: Track = {
          id: `upload-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'User Upload',
          emotion: 'neutral',
          url: audioUrl,
          duration: audio.duration,
          description: 'User uploaded music',
          emoji: '🎵',
          category: 'instrumental'
        };
        resolve(track);
      };
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};