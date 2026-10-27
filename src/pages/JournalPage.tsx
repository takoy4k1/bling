import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JournalEntry } from '../types';
import { 
  BookHeart, 
  Sparkles, 
  Plus, 
  Calendar, 
  Heart, 
  Sun, 
  Smile, 
  Award,
  Trash2
} from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { journalEntries, addJournalEntry } = useApp();

  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState<'radiant' | 'happy' | 'peaceful' | 'tired' | 'reflective'>('radiant');
  const [wins, setWins] = useState('');
  const [challenges, setChallenges] = useState('');
  const [lessons, setLessons] = useState('');
  const [gratitude, setGratitude] = useState('');

  const moods: { id: 'radiant' | 'happy' | 'peaceful' | 'tired' | 'reflective'; label: string; icon: string }[] = [
    { id: 'radiant', label: 'Radiant', icon: '✨' },
    { id: 'happy', label: 'Happy', icon: '🌸' },
    { id: 'peaceful', label: 'Peaceful', icon: '🍃' },
    { id: 'reflective', label: 'Reflective', icon: '🌙' },
    { id: 'tired', label: 'Tired / Resting', icon: '🧸' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !wins.trim()) return;

    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      title: title || 'Quiet evening reflection',
      mood,
      wins: wins || 'Showed up for myself today.',
      challenges: challenges || 'Took things one breath at a time.',
      lessons: lessons || 'Patience with my growth is a superpower.',
      gratitude: gratitude || 'Warm tea and gentle progress.',
    });

    setTitle('');
    setWins('');
    setChallenges('');
    setLessons('');
    setGratitude('');
    setIsWriting(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Reflections & Wins Journal</span>
            <BookHeart className="w-6 h-6 text-rose-500" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            A sacred space to log your non-linear growth, celebrate micro-wins, and practice self-compassion.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(true)}
          className="btn-glow px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Journal Entry (+35 XP)</span>
        </button>
      </div>

      {/* Writing Form */}
      {isWriting && (
        <div className="glow-card rounded-3xl p-6 lg:p-8 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Evening Glow Check-In</span>
            </h2>
            <button
              onClick={() => setIsWriting(false)}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Current Energy & Mood
              </label>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      mood === m.id
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-pink-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-pink-100'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Entry Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Small steps are still sacred progress"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  🌟 Today's Wins (No victory is too small!)
                </label>
                <textarea
                  rows={3}
                  value={wins}
                  onChange={(e) => setWins(e.target.value)}
                  placeholder="e.g. Drank 2L water, took a mindful break, completed module 1..."
                  className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  🧸 Challenges Faced
                </label>
                <textarea
                  rows={3}
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="e.g. Felt a bit sluggish after 3pm, wanted to procrastinate..."
                  className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  💡 Lessons & Gentle Realizations
                </label>
                <textarea
                  rows={3}
                  value={lessons}
                  onChange={(e) => setLessons(e.target.value)}
                  placeholder="e.g. A 10-minute stretch resets my afternoon fatigue better than coffee..."
                  className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  💖 Gratitude Note
                </label>
                <textarea
                  rows={3}
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder="e.g. Grateful for fresh air, sweet supportive friends, and quiet evenings..."
                  className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="btn-secondary px-4 py-2 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-glow px-6 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Save Reflection & Collect XP</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {journalEntries.map((entry) => (
          <div
            key={entry.id}
            className="glow-card rounded-3xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-pink-100 dark:bg-zinc-800 text-base">
                  {entry.mood === 'radiant' ? '✨' : entry.mood === 'happy' ? '🌸' : entry.mood === 'peaceful' ? '🍃' : entry.mood === 'reflective' ? '🌙' : '🧸'}
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-zinc-800 dark:text-zinc-100">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {entry.date}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500">
                {entry.mood}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              {entry.wins && (
                <div className="p-3.5 rounded-2xl bg-pink-50/60 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700 space-y-1">
                  <p className="font-bold text-rose-600 dark:text-pink-300">🌟 Wins Celebrated</p>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{entry.wins}</p>
                </div>
              )}

              {entry.gratitude && (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-1">
                  <p className="font-bold text-amber-700 dark:text-amber-300">💖 Gratitude</p>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{entry.gratitude}</p>
                </div>
              )}

              {entry.lessons && (
                <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 space-y-1">
                  <p className="font-bold text-purple-600 dark:text-purple-300">💡 Lessons Learned</p>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{entry.lessons}</p>
                </div>
              )}

              {entry.challenges && (
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1">
                  <p className="font-bold text-zinc-600 dark:text-zinc-400">🧸 Challenges Overcome</p>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{entry.challenges}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
