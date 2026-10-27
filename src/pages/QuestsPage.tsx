import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlowCategory, Quest } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Flame, 
  Sparkles, 
  Coins, 
  Trash2, 
  Calendar, 
  Layers, 
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';

export const QuestsPage: React.FC = () => {
  const { quests, toggleQuestCompletion, addQuest, deleteQuest, profile } = useApp();

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GlowCategory>('appearance');
  const [newXp, setNewXp] = useState(30);
  const [newCoins, setNewCoins] = useState(15);
  const [newIcon, setNewIcon] = useState('✨');
  const [isDaily, setIsDaily] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const categories: { id: GlowCategory; label: string; icon: string }[] = [
    { id: 'appearance', label: 'Self-Care', icon: '✨' },
    { id: 'mental', label: 'Mental Wellness', icon: '🌸' },
    { id: 'academics', label: 'Study & Work', icon: '💻' },
    { id: 'fitness', label: 'Movement', icon: '🧘‍♀️' },
    { id: 'hobbies', label: 'Creativity', icon: '🎨' },
    { id: 'lifestyle', label: 'Lifestyle', icon: '🌿' },
  ];

  const handleAddQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addQuest({
      title: newTitle.trim(),
      category: newCategory,
      xpReward: newXp,
      coinReward: newCoins,
      isDaily,
      date: new Date().toISOString().split('T')[0],
      icon: newIcon,
    });

    setNewTitle('');
  };

  const filteredQuests = quests.filter((q) => {
    if (filter === 'pending') return !q.completed;
    if (filter === 'completed') return q.completed;
    return true;
  });

  const completedCount = quests.filter(q => q.completed).length;
  const totalCount = quests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 7-day habit heatmap data simulation
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityHeatmap = [4, 5, 3, 6, 5, 4, completedCount];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header with completion summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Daily Quests & Habit Tracker</span>
            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-400" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Complete small habits to claim daily XP, earn coins, and fuel your character level!
          </p>
        </div>

        {/* Quick Streak Card */}
        <div className="flex items-center gap-3 bg-white/80 dark:bg-zinc-800/80 px-4 py-2.5 rounded-2xl border border-pink-100 dark:border-zinc-700 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-500">
            <Flame className="w-5 h-5 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-400">Streak Shield Active</p>
            <p className="text-sm font-extrabold text-zinc-800 dark:text-zinc-100">
              {profile.streakDays} Days Strong
            </p>
          </div>
        </div>
      </div>

      {/* Consistency Progress Bar & 7-Day Mini Heatmap */}
      <div className="glow-card rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Today's Routine Completion ({completedCount}/{totalCount})
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Forgiving recovery active: missing a quest never resets your character progress!
            </p>
          </div>
          <span className="text-sm font-extrabold text-rose-500">{progressPercent}%</span>
        </div>

        <div className="h-3 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Weekly consistency blocks */}
        <div className="pt-2 border-t border-pink-100 dark:border-zinc-800/70">
          <p className="text-[11px] font-bold text-zinc-400 uppercase mb-2">Past 7 Days Consistency Heatmap</p>
          <div className="grid grid-cols-7 gap-2 text-center">
            {days.map((day, idx) => {
              const count = activityHeatmap[idx];
              const intensity = count >= 5 ? 'bg-rose-500 text-white' : count >= 3 ? 'bg-pink-300 dark:bg-pink-700 text-zinc-900 dark:text-white' : 'bg-pink-100 dark:bg-zinc-800 text-zinc-500';
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-zinc-400 font-medium">{day}</span>
                  <div className={`w-full py-1.5 rounded-lg text-xs font-bold ${intensity} transition-transform hover:scale-105`}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quest Creator Bar */}
      <div className="glow-card rounded-3xl p-5">
        <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-rose-500" />
          <span>Add Custom Quest</span>
        </h3>

        <form onSubmit={handleAddQuest} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Read 15 pages of fiction, drink 500ml water, stretch..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="submit"
              className="btn-glow px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Add Quest</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Icon:</span>
              {['✨', '💧', '🧘‍♀️', '💻', '🌸', '📚', '🎨', '🧹'].map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setNewIcon(ic)}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${
                    newIcon === ic ? 'bg-pink-200 dark:bg-zinc-700 scale-110 shadow-xs' : 'hover:bg-pink-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Category:</span>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GlowCategory)}
                className="px-2 py-1 rounded-lg border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-pink-100/60 dark:bg-zinc-800/60 p-1 rounded-xl">
          {(['all', 'pending', 'completed'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-colors cursor-pointer ${
                filter === mode
                  ? 'bg-white dark:bg-zinc-700 text-rose-500 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Showing {filteredQuests.length} quests
        </span>
      </div>

      {/* Quests List */}
      <div className="space-y-2.5">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`glow-card p-4 rounded-2xl flex items-center justify-between gap-3 transition-all ${
              quest.completed ? 'opacity-80 bg-rose-50/30 dark:bg-rose-950/20' : ''
            }`}
          >
            <div 
              className="flex items-center gap-3.5 flex-1 cursor-pointer"
              onClick={() => toggleQuestCompletion(quest.id)}
            >
              <button
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  quest.completed
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'border-2 border-pink-300 dark:border-zinc-600 hover:border-rose-400'
                }`}
              >
                {quest.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </button>

              <div>
                <p className={`text-sm font-semibold ${
                  quest.completed ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-100'
                }`}>
                  {quest.icon} {quest.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="capitalize">{quest.category}</span>
                  <span>•</span>
                  <span className="text-orange-500 font-semibold">{quest.streak} day streak</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/80 text-rose-600 dark:text-pink-300 text-xs font-bold">
                +{quest.xpReward} XP
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold">
                +{quest.coinReward} 🪙
              </span>

              <button
                onClick={() => deleteQuest(quest.id)}
                className="p-1.5 text-zinc-300 hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                title="Remove Quest"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
