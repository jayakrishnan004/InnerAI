import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Plus, 
  Calendar, 
  Heart, 
  Smile, 
  Meh, 
  Frown, 
  Save, 
  Edit3, 
  Trash2, 
  Search,
  Filter,
  Star,
  Clock,
  Tag,
  Sparkles,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  tags: string[];
  date: Date;
  isPrivate: boolean;
  gratitude?: string[];
  goals?: string[];
}

interface JournalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Journal: React.FC<JournalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string>('all');
  const [showPrivateEntries, setShowPrivateEntries] = useState(true);
  const [activeView, setActiveView] = useState<'list' | 'write' | 'insights'>('list');

  // Sample entries for demonstration
  useEffect(() => {
    const sampleEntries: JournalEntry[] = [
      {
        id: '1',
        title: 'A Good Day at Work',
        content: 'Today was surprisingly productive. I managed to finish the project I\'ve been working on for weeks. Feeling accomplished and grateful for my team\'s support.',
        mood: 'good',
        tags: ['work', 'productivity', 'gratitude'],
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isPrivate: false,
        gratitude: ['Supportive team', 'Completing my project', 'Good health'],
        goals: ['Start the new project next week', 'Take a proper lunch break']
      },
      {
        id: '2',
        title: 'Feeling Overwhelmed',
        content: 'Everything feels like too much today. Work deadlines, family responsibilities, and I haven\'t had time for myself. Need to remember that it\'s okay to take breaks.',
        mood: 'bad',
        tags: ['stress', 'overwhelm', 'self-care'],
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isPrivate: true,
        gratitude: ['Having a roof over my head', 'Family who cares'],
        goals: ['Schedule 30 minutes for myself daily', 'Practice saying no']
      }
    ];
    setEntries(sampleEntries);
  }, []);

  const moodEmojis = {
    great: { emoji: '😄', color: 'text-green-600 bg-green-50 border-green-200' },
    good: { emoji: '😊', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    okay: { emoji: '😐', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    bad: { emoji: '😔', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    terrible: { emoji: '😢', color: 'text-red-600 bg-red-50 border-red-200' }
  };

  const createNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: '',
      content: '',
      mood: 'okay',
      tags: [],
      date: new Date(),
      isPrivate: false,
      gratitude: ['', '', ''],
      goals: ['', '']
    };
    setCurrentEntry(newEntry);
    setIsWriting(true);
    setActiveView('write');
  };

  const saveEntry = () => {
    if (!currentEntry) return;
    
    if (currentEntry.title.trim() === '' || currentEntry.content.trim() === '') {
      alert('Please fill in both title and content');
      return;
    }

    const existingIndex = entries.findIndex(e => e.id === currentEntry.id);
    if (existingIndex >= 0) {
      const updatedEntries = [...entries];
      updatedEntries[existingIndex] = currentEntry;
      setEntries(updatedEntries);
    } else {
      setEntries([currentEntry, ...entries]);
    }
    
    setCurrentEntry(null);
    setIsWriting(false);
    setActiveView('list');
  };

  const deleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const editEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setIsWriting(true);
    setActiveView('write');
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = selectedMoodFilter === 'all' || entry.mood === selectedMoodFilter;
    const matchesPrivacy = showPrivateEntries || !entry.isPrivate;
    
    return matchesSearch && matchesMood && matchesPrivacy;
  });

  const addTag = (tag: string) => {
    if (!currentEntry || !tag.trim()) return;
    const newTags = [...currentEntry.tags, tag.trim()];
    setCurrentEntry({ ...currentEntry, tags: [...new Set(newTags)] });
  };

  const removeTag = (tagToRemove: string) => {
    if (!currentEntry) return;
    setCurrentEntry({
      ...currentEntry,
      tags: currentEntry.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (!isOpen) return null;

  const renderWriteView = () => (
    <div className="space-y-6">
      {/* Entry Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-neutral-800">
          {isWriting && currentEntry?.id && entries.find(e => e.id === currentEntry.id) ? 'Edit Entry' : 'New Journal Entry'}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('list')}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveEntry}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Entry</span>
          </button>
        </div>
      </div>

      {/* Entry Form */}
      <div className="space-y-6">
        {/* Title and Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Entry Title
            </label>
            <input
              type="text"
              value={currentEntry?.title || ''}
              onChange={(e) => setCurrentEntry(prev => prev ? { ...prev, title: e.target.value } : null)}
              placeholder="Give your entry a meaningful title..."
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={currentEntry?.date.toISOString().split('T')[0] || ''}
              onChange={(e) => setCurrentEntry(prev => prev ? { ...prev, date: new Date(e.target.value) } : null)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mood and Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              How are you feeling?
            </label>
            <div className="flex space-x-2">
              {Object.entries(moodEmojis).map(([mood, { emoji, color }]) => (
                <button
                  key={mood}
                  onClick={() => setCurrentEntry(prev => prev ? { ...prev, mood: mood as any } : null)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
                    currentEntry?.mood === mood ? color : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="text-xs font-medium capitalize">{mood}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Privacy Settings
            </label>
            <div className="flex items-center space-x-4 p-3 border border-neutral-300 rounded-lg">
              <button
                onClick={() => setCurrentEntry(prev => prev ? { ...prev, isPrivate: false } : null)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  !currentEntry?.isPrivate ? 'bg-blue-100 text-blue-700' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Shareable</span>
              </button>
              <button
                onClick={() => setCurrentEntry(prev => prev ? { ...prev, isPrivate: true } : null)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentEntry?.isPrivate ? 'bg-purple-100 text-purple-700' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <EyeOff className="w-4 h-4" />
                <span>Private</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            What's on your mind? 💭
          </label>
          <textarea
            value={currentEntry?.content || ''}
            onChange={(e) => setCurrentEntry(prev => prev ? { ...prev, content: e.target.value } : null)}
            placeholder="Write about your thoughts, feelings, experiences, or anything that matters to you today..."
            rows={8}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
          <div className="text-xs text-neutral-500 mt-1">
            {currentEntry?.content.length || 0} characters
          </div>
        </div>

        {/* Gratitude Section */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-medium text-green-800 mb-3 flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Three Things I'm Grateful For Today
          </h4>
          <div className="space-y-3">
            {currentEntry?.gratitude?.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => {
                  const newGratitude = [...(currentEntry.gratitude || [])];
                  newGratitude[index] = e.target.value;
                  setCurrentEntry(prev => prev ? { ...prev, gratitude: newGratitude } : null);
                }}
                placeholder={`Gratitude ${index + 1}...`}
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-3 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Goals for Tomorrow
          </h4>
          <div className="space-y-3">
            {currentEntry?.goals?.map((goal, index) => (
              <input
                key={index}
                type="text"
                value={goal}
                onChange={(e) => {
                  const newGoals = [...(currentEntry.goals || [])];
                  newGoals[index] = e.target.value;
                  setCurrentEntry(prev => prev ? { ...prev, goals: newGoals } : null);
                }}
                placeholder={`Goal ${index + 1}...`}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tags (press Enter to add)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {currentEntry?.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-purple-500 hover:text-purple-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tags like 'work', 'family', 'goals'..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTag(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h3 className="text-xl font-semibold text-neutral-800">Your Journal Entries</h3>
          <p className="text-neutral-600">Reflect on your thoughts and track your emotional journey</p>
        </div>
        <button
          onClick={createNewEntry}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search entries, tags, or content..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={selectedMoodFilter}
            onChange={(e) => setSelectedMoodFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Moods</option>
            {Object.keys(moodEmojis).map(mood => (
              <option key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowPrivateEntries(!showPrivateEntries)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              showPrivateEntries ? 'bg-purple-100 text-purple-700' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {showPrivateEntries ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showPrivateEntries ? 'Hide Private' : 'Show Private'}</span>
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-neutral-600 mb-2">No entries found</h4>
            <p className="text-neutral-500 mb-4">
              {entries.length === 0 
                ? "Start your journaling journey by creating your first entry"
                : "Try adjusting your search or filters"
              }
            </p>
            <button
              onClick={createNewEntry}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Entry</span>
            </button>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-neutral-800">{entry.title}</h4>
                    <div className={`px-2 py-1 rounded-full border ${moodEmojis[entry.mood].color}`}>
                      <span className="text-sm">{moodEmojis[entry.mood].emoji}</span>
                    </div>
                    {entry.isPrivate && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        <EyeOff className="w-3 h-3" />
                        <span className="text-xs">Private</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editEntry(entry)}
                    className="p-2 text-neutral-400 hover:text-blue-600 transition-colors"
                    title="Edit entry"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-4 line-clamp-3">{entry.content}</p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {(entry.gratitude?.some(g => g.trim()) || entry.goals?.some(g => g.trim())) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  {entry.gratitude?.some(g => g.trim()) && (
                    <div>
                      <h5 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        Gratitude
                      </h5>
                      <ul className="space-y-1">
                        {entry.gratitude.filter(g => g.trim()).map((item, index) => (
                          <li key={index} className="text-sm text-green-600 flex items-start">
                            <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {entry.goals?.some(g => g.trim()) && (
                    <div>
                      <h5 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Goals
                      </h5>
                      <ul className="space-y-1">
                        {entry.goals.filter(g => g.trim()).map((goal, index) => (
                          <li key={index} className="text-sm text-blue-600 flex items-start">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Journal Insights</h3>
        <p className="text-neutral-600">Coming soon! Track your emotional patterns and growth over time.</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Book className="w-6 h-6 mr-2" />
                Personal Journal
              </h1>
              <p className="text-purple-100 mt-1">Your private space for reflection and growth</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'list', label: 'My Entries', icon: Book },
              { id: 'write', label: 'Write', icon: Edit3 },
              { id: 'insights', label: 'Insights', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeView === tab.id
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeView === 'list' && renderListView()}
          {activeView === 'write' && renderWriteView()}
          {activeView === 'insights' && renderInsights()}
        </div>
      </div>
    </div>
  );
};

export default Journal;