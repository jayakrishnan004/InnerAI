export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: 'positive' | 'negative' | 'neutral';
  suggestions?: string[];
}

export interface MoodEntry {
  id: string;
  mood: number; // 1-10 scale
  note: string;
  timestamp: Date;
}

export interface Exercise {
  id: string;
  type: 'breathing' | 'journaling' | 'mindfulness' | 'movement';
  title: string;
  description: string;
  duration: number; // in minutes
  instructions: string[];
}

export interface UserProgress {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  exercisesCompleted: number;
  breathingMinutes: number;
  journalEntries: number;
  moodRating: number;
  streakCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'exercise' | 'mood' | 'milestone';
  requirement: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  current: number;
  category: 'breathing' | 'journaling' | 'mood' | 'exercises';
  deadline: Date;
  completed: boolean;
}

export interface DashboardStats {
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  totalMinutes: number;
  averageMood: number;
  weeklyProgress: number[];
  monthlyGoalsCompleted: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  emotion: 'calm' | 'uplifting' | 'healing' | 'energizing' | 'peaceful';
  url: string;
  duration: number;
  description: string;
  emoji: string;
}

export type EmotionalState = 'positive' | 'negative' | 'neutral' | 'anxious' | 'sad' | 'stressed' | 'calm' | 'excited';