import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Flame, 
  Coins, 
  ArrowRight, 
  Plus, 
  Calendar, 
  Clock, 
  HeartHandshake, 
  TrendingUp, 
  Award,
  ChevronRight,
  Smile,
  ShieldCheck,
  Send
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    profile, 
    goals, 
    quests, 
    friends, 
    achievements, 
    toggleQuestCompletion, 
    setActivePage, 
    setSelectedGoalId,
    cheerFriend 
  } = useApp();

  const [coachResponse, setCoachResponse] = useState<string>('');
  const [userReflection, setUserReflection] = useState<string>('');

  const completedQuestsToday = quests.filter(q => q.completed).length;
  const totalQuestsToday = quests.length;
  const questProgressPercent = totalQuestsToday > 0 ? Math.round((completedQuestsToday / totalQuestsToday) * 100) : 0;

  // AI Glow Coach rule-based dynamic encouraging responses
  const coachWisdom = [
    "“Small consistent actions beat occasional intensity every single time.”",
    "“Your future self is already smiling at the gentle choices you're making today.”",
    "“Resting when your body asks isn't losing progress; it's refueling for the climb.”",
    "“Celebrate every tiny checkmark. Momentum is built feather by feather.”",
  ];

  const handleAskCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReflection.trim()) return;

    const query = userReflection.toLowerCase();
    if (query.includes('tired') || query.includes('exhausted') || query.includes('burnout')) {
      setCoachResponse("Take a deep breath, lovely. You don't need to conquer the mountain today. How about completing just 1 small hydration or stretch quest, and giving yourself an early cozy evening?");
    } else if (query.includes('deadline') || query.includes('behind') || query.includes('late')) {
      setCoachResponse("Deadlines are flexible guiding lights, not iron cages! Let's slice your next milestone in half. What is the single smallest 5-minute action you can do right now?");
    } else if (query.includes('unmotivated') || query.includes('stuck') || query.includes('hard')) {
      setCoachResponse("Remember your 'Why': you started this quest to honor yourself. Lower the bar to ridiculous simplicity: do 2 minutes of focus. Action creates motivation, not vice-versa!");
    } else {
      setCoachResponse("You're doing wonderfully. Look at your streak: you've showed up! Celebrate this exact moment, grab a sip of water, and pick whichever quest feels easiest first.");
    }
    setUserReflection('');
  };

  // Next upcoming deadline
  const nextDeadlineGoal = [...goals].sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())[0];
  const daysLeft = nextDeadlineGoal 
    ? Math.max(0, Math.ceil((new Date(nextDeadlineGoal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Banner: Character, Greeting, Level & Quick Progress */}
      <div className="glow-card rounded-3xl p-6 lg:p-8 relative overflow-hidden bg-gradient-to-r from-pink-50/80 via-purple-50/60 to-rose-50/70 dark:from-zinc-900/80 dark:via-purple-950/20 dark:to-zinc-900/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Avatar and Welcome Message */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative group cursor-pointer" onClick={() => setActivePage('wardrobe')}>
              <CharacterAvatar customization={profile.character} size="lg" showBackground={true} />
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[11px] shadow-md border-2 border-white">
                Lv.{profile.level}
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-800/80 border border-pink-200 dark:border-pink-900/50 text-xs font-semibold text-rose-500 mb-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Today's Vibe: {profile.character.title}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Radiant Day, <span className="text-rose-500">{profile.character.name}</span>! ✨
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1 max-w-md">
                {coachWisdom[Math.floor(Math.random() * coachWisdom.length)]}
              </p>
            </div>
          </div>

          {/* Quick Level Progress Bar & Stat Highlights */}
          <div className="w-full md:w-72 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 dark:border-zinc-700/80 shadow-xs space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-200">Level {profile.level} Progression</span>
              <span className="font-semibold text-rose-500">{profile.xp} / {profile.xpToNextLevel} XP</span>
            </div>
            
            {/* XP Bar */}
            <div className="h-3 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100))}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-pink-100 dark:border-zinc-700/50 text-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Streak</p>
                <p className="text-sm font-extrabold text-orange-500 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-orange-500" />
                  {profile.streakDays} Days
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Glow Coins</p>
                <p className="text-sm font-extrabold text-yellow-500 flex items-center justify-center gap-1">
                  <Coins className="w-4 h-4 fill-yellow-400" />
                  {profile.coins}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Daily Quests Checklist & Goal Countdown Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Today's Quests */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950 text-rose-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-zinc-900 dark:text-white">Daily Quests</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {completedQuestsToday} of {totalQuestsToday} finished ({questProgressPercent}%)
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('quests')}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Quests</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quests list */}
          <div className="space-y-2.5">
            {quests.slice(0, 5).map((quest) => (
              <div
                key={quest.id}
                onClick={() => toggleQuestCompletion(quest.id)}
                className={`glow-card p-3.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  quest.completed 
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 opacity-80' 
                    : 'hover:border-pink-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    aria-label={`Mark ${quest.title} as completed`}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      quest.completed
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'border-2 border-pink-300 dark:border-zinc-600 hover:border-rose-400'
                    }`}
                  >
                    {quest.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div>
                    <p className={`text-xs sm:text-sm font-semibold ${
                      quest.completed ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-100'
                    }`}>
                      {quest.icon} {quest.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span className="capitalize">{quest.category}</span>
                      <span>•</span>
                      <span className="text-orange-500 font-semibold">{quest.streak}d streak</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/80 text-rose-600 dark:text-pink-300">
                    +{quest.xpReward} XP
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                    +{quest.coinReward} 🪙
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActivePage('quests')}
            className="w-full py-2.5 rounded-2xl border-2 border-dashed border-pink-200 dark:border-zinc-700 text-xs font-bold text-pink-500 hover:bg-pink-50 dark:hover:bg-zinc-800/50 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Daily Quest</span>
          </button>
        </div>

        {/* Right Column (5 cols): Goal Deadlines & Next Focus */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-zinc-900 dark:text-white">Active Goals</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Milestone timelines</p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('goals')}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Goal cards */}
          <div className="space-y-3">
            {goals.slice(0, 3).map((goal) => {
              const remainingDays = Math.max(0, Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
              return (
                <div
                  key={goal.id}
                  onClick={() => {
                    setSelectedGoalId(goal.id);
                    setActivePage('goals');
                  }}
                  className="glow-card p-4 rounded-2xl space-y-3 cursor-pointer hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-100 dark:bg-zinc-700 text-pink-600 dark:text-pink-300">
                        {goal.category}
                      </span>
                      <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-100 mt-1 line-clamp-1">
                        {goal.title}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-rose-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {remainingDays}d left
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>{goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} Milestones</span>
                      <span className="font-bold text-zinc-700 dark:text-zinc-200">{goal.progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next milestone reminder callout */}
          {nextDeadlineGoal && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800 border border-amber-200 dark:border-amber-900/50 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  Target Approaching in {daysLeft} Days:
                </p>
                <p className="text-amber-700 dark:text-amber-300/80 line-clamp-1">{nextDeadlineGoal.title}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive AI Glow-Up Coach & Social Garden Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Glow Coach Card (7 cols) */}
        <div className="lg:col-span-7 glow-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-white shadow-md shadow-pink-300/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white">
                Mimi — Your Glow-Up Coach
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Supportive guidance without guilt or pressure
              </p>
            </div>
          </div>

          {coachResponse ? (
            <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 animate-in fade-in duration-300">
              <p className="font-medium leading-relaxed">{coachResponse}</p>
              <button
                onClick={() => setCoachResponse('')}
                className="mt-2 text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Ask another question
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/50 border border-pink-100 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300">
              <p>
                Feeling overwhelmed or need encouragement breaking down a goal? Tell Mimi how you're feeling today:
              </p>
            </div>
          )}

          <form onSubmit={handleAskCoach} className="flex gap-2">
            <input
              type="text"
              value={userReflection}
              onChange={(e) => setUserReflection(e.target.value)}
              placeholder="e.g. 'Feeling tired after work' or 'Deadline is next week'..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="submit"
              className="btn-glow px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Social Garden Snapshot (5 cols) */}
        <div className="lg:col-span-5 glow-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-500" />
              <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white">
                Friends' Recent Cheers
              </h3>
            </div>
            <button
              onClick={() => setActivePage('friends')}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 cursor-pointer"
            >
              Garden ({friends.length})
            </button>
          </div>

          <div className="space-y-3">
            {friends.slice(0, 2).map((friend) => (
              <div
                key={friend.id}
                className="p-3 rounded-2xl bg-pink-50/60 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-pink-200">
                    <CharacterAvatar customization={friend.avatar} size="sm" showBackground={false} animate={false} />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-zinc-800 dark:text-zinc-100">
                      {friend.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {friend.recentAchievement || friend.sharedGoalTitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => cheerFriend(friend.id)}
                  className="px-3 py-1 rounded-full bg-white dark:bg-zinc-700 text-rose-500 border border-pink-200 dark:border-pink-900 text-xs font-bold hover:bg-rose-50 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>✨</span>
                  <span>{friend.cheersCount}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => setActivePage('journal')}
              className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-rose-500 transition-colors"
            >
              📝 Open Evening Reflections & Wins Journal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
