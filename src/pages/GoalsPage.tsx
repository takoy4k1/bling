import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Goal, GlowCategory, Milestone } from '../types';
import { 
  Target, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Clock, 
  Lock, 
  Globe, 
  Trash2, 
  Edit3, 
  ArrowLeft,
  Heart,
  ChevronRight,
  TrendingUp,
  Compass
} from 'lucide-react';

export const GoalsPage: React.FC = () => {
  const { 
    goals, 
    addGoal, 
    updateGoal, 
    deleteGoal, 
    toggleMilestone, 
    selectedGoalId, 
    setSelectedGoalId 
  } = useApp();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // New goal wizard form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GlowCategory>('appearance');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [whyReason, setWhyReason] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [newMilestonesText, setNewMilestonesText] = useState('Step 1: Get started\nStep 2: Halfway check-in\nStep 3: Celebrate finish');

  const categories = [
    { id: 'all', label: 'All Quests 🌟' },
    { id: 'appearance', label: '✨ Self-Care' },
    { id: 'mental', label: '🧠 Mental Wellness' },
    { id: 'academics', label: '📚 Career & Study' },
    { id: 'fitness', label: '💪 Movement' },
    { id: 'hobbies', label: '🎨 Creativity' },
    { id: 'lifestyle', label: '🧹 Lifestyle' },
  ];

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedMilestones: Milestone[] = newMilestonesText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map((text, idx) => ({
        id: `m-${Date.now()}-${idx}`,
        title: text,
        completed: false,
      }));

    addGoal({
      title,
      description,
      category,
      priority,
      startDate,
      targetDate,
      whyReason: whyReason || 'To feel radiant, fulfilled, and centered.',
      linkedHabitIds: [],
      isPrivate,
      milestones: parsedMilestones.length > 0 ? parsedMilestones : [{ id: `m-${Date.now()}`, title: 'First Action Step', completed: false }],
    });

    // Reset form
    setTitle('');
    setDescription('');
    setWhyReason('');
    setIsCreating(false);
  };

  const selectedGoal = goals.find(g => g.id === selectedGoalId);

  const filteredGoals = filterCategory === 'all'
    ? goals
    : goals.filter(g => g.category === filterCategory);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Glow Goals & Milestone Journey</span>
            <Sparkles className="w-6 h-6 text-rose-500 animate-spin" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Turn your long-term dreams into achievable, measurable milestone adventures.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedGoalId(null);
            setIsCreating(true);
          }}
          className="btn-glow px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Glow Goal</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-rose-500 text-white shadow-sm shadow-pink-300/40'
                : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 border border-pink-100 dark:border-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Content: Goal Detail View or List/Grid View */}
      {selectedGoal ? (
        /* Selected Goal Detail Card */
        <div className="glow-card rounded-3xl p-6 lg:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedGoalId(null)}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all goals</span>
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                selectedGoal.isPrivate 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
                  : 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300'
              }`}>
                {selectedGoal.isPrivate ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                <span>{selectedGoal.isPrivate ? 'Private Goal' : 'Shared with Friends'}</span>
              </span>

              <button
                onClick={() => deleteGoal(selectedGoal.id)}
                className="p-2 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Delete Goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full">
              {selectedGoal.category}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              {selectedGoal.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {selectedGoal.description}
            </p>
          </div>

          {/* Timeline and Days Remaining */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-pink-50/60 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700 text-xs">
            <div>
              <p className="text-zinc-400 font-bold uppercase text-[10px]">Start Date</p>
              <p className="font-semibold text-zinc-700 dark:text-zinc-200 mt-0.5">{selectedGoal.startDate}</p>
            </div>
            <div>
              <p className="text-zinc-400 font-bold uppercase text-[10px]">Target Deadline</p>
              <p className="font-semibold text-zinc-700 dark:text-zinc-200 mt-0.5">{selectedGoal.targetDate}</p>
            </div>
            <div>
              <p className="text-zinc-400 font-bold uppercase text-[10px]">Days Remaining</p>
              <p className="font-bold text-rose-500 mt-0.5">
                {Math.max(0, Math.ceil((new Date(selectedGoal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} days
              </p>
            </div>
          </div>

          {/* Why statement */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <Heart className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
            <div>
              <p className="font-bold">My Personal Why:</p>
              <p className="mt-0.5 italic">{selectedGoal.whyReason}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-200">
                Milestones Completion: {selectedGoal.milestones.filter(m => m.completed).length} of {selectedGoal.milestones.length}
              </span>
              <span className="font-extrabold text-rose-500 text-sm">{selectedGoal.progressPercent}%</span>
            </div>
            <div className="h-3 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${selectedGoal.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Milestones list */}
          <div className="space-y-3">
            <h3 className="font-heading text-base font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" />
              <span>Step-by-Step Milestones</span>
            </h3>

            <div className="space-y-2">
              {selectedGoal.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  onClick={() => toggleMilestone(selectedGoal.id, milestone.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    milestone.completed
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-zinc-400 dark:text-zinc-500'
                      : 'bg-white dark:bg-zinc-800/80 border-pink-100 dark:border-zinc-700 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        milestone.completed ? 'bg-rose-500 text-white' : 'border-2 border-zinc-300 dark:border-zinc-600'
                      }`}
                    >
                      {milestone.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <span className={`text-xs sm:text-sm font-medium ${milestone.completed ? 'line-through' : 'text-zinc-800 dark:text-zinc-100'}`}>
                      {milestone.title}
                    </span>
                  </div>

                  {milestone.dueDate && (
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {milestone.dueDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Encouraging status */}
          <div className="text-center p-4 rounded-2xl bg-pink-50/60 dark:bg-zinc-800/60 text-xs font-semibold text-rose-600 dark:text-pink-300">
            🌸 "You're building momentum! Every milestone checked off brings you closer to your brightest self."
          </div>
        </div>
      ) : isCreating ? (
        /* Create Goal Wizard Modal / Form */
        <div className="glow-card rounded-3xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Create a New Glow Goal</span>
            </h2>
            <button
              onClick={() => setIsCreating(false)}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateGoal} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Goal Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master 30 Days of Pilates & Daily Hydration"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GlowCategory)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="appearance">✨ Appearance & Self-Care</option>
                  <option value="mental">🧠 Mental Wellness & Confidence</option>
                  <option value="academics">📚 Academics & Career</option>
                  <option value="fitness">💪 Fitness & Habits</option>
                  <option value="hobbies">🎨 Hobbies & Creativity</option>
                  <option value="lifestyle">🧹 Lifestyle & Organization</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Completion Deadline
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Description & Vision
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what success looks like in peaceful detail..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Why does this matter to you? (Emotional Fuel)
              </label>
              <input
                type="text"
                value={whyReason}
                onChange={(e) => setWhyReason(e.target.value)}
                placeholder="e.g. To feel confident when speaking and love my daily reflection."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Mini Milestones (One per line)
              </label>
              <textarea
                rows={3}
                value={newMilestonesText}
                onChange={(e) => setNewMilestonesText(e.target.value)}
                className="w-full px-4 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="privateCheck"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 text-rose-500 rounded focus:ring-rose-400"
              />
              <label htmlFor="privateCheck" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Keep this goal private (will not appear in your friends' shared feed)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="btn-secondary px-5 py-2 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-glow px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Save & Launch Quest</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Goals List Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => {
            const daysRemaining = Math.max(0, Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
            const completedMilestones = goal.milestones.filter(m => m.completed).length;

            return (
              <div
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className="glow-card rounded-3xl p-5 flex flex-col justify-between space-y-4 cursor-pointer hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300">
                      {goal.category}
                    </span>
                    <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {daysRemaining}d left
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-base font-bold text-zinc-900 dark:text-white line-clamp-1">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      {goal.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-pink-100 dark:border-zinc-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>{completedMilestones}/{goal.milestones.length} Milestones</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{goal.progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                        style={{ width: `${goal.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] text-zinc-400 italic flex items-center gap-1">
                      {goal.isPrivate ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      {goal.isPrivate ? 'Private' : 'Shared'}
                    </span>
                    <span className="text-rose-500 font-bold flex items-center gap-0.5">
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
