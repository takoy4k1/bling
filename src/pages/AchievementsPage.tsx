import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Sparkles, 
  Coins, 
  CheckCircle2, 
  Lock, 
  Flame, 
  Award,
  Crown,
  Medal,
  TrendingUp
} from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { achievements, profile } = useApp();

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalCount = achievements.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Trophy Room & Badges</span>
            <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-400" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Unlock achievements through sustainable consistency, creativity, and honoring your wellbeing!
          </p>
        </div>

        {/* Unlocked score badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-100 dark:bg-zinc-800 text-rose-600 dark:text-pink-300 font-bold text-xs sm:text-sm shadow-xs">
          <Sparkles className="w-4 h-4" />
          <span>{unlockedCount} / {totalCount} Badges Unlocked</span>
        </div>
      </div>

      {/* Overview Progress Card */}
      <div className="glow-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-heading text-base font-bold text-zinc-800 dark:text-zinc-200">
              Total Quest Masteries
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Complete milestones and journal reflections to earn bonus coins and rare titles.
            </p>
          </div>
          <span className="text-xl font-extrabold text-rose-500">{completionPercent}%</span>
        </div>

        <div className="h-3 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((ach) => {
          const isUnlocked = !!ach.unlockedAt;
          const progressPercent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

          return (
            <div
              key={ach.id}
              className={`glow-card rounded-3xl p-5 flex flex-col justify-between space-y-4 transition-all ${
                isUnlocked
                  ? 'border-pink-300/80 bg-white/95 dark:bg-zinc-800/95 shadow-md shadow-pink-200/20'
                  : 'opacity-70 bg-zinc-50/80 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${
                    isUnlocked ? 'bg-pink-100 dark:bg-pink-950/80' : 'bg-zinc-200 dark:bg-zinc-800'
                  }`}>
                    {ach.icon}
                  </div>

                  {isUnlocked ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold text-zinc-800 dark:text-zinc-100">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-pink-50 dark:border-zinc-800">
                <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>Progress: {ach.progress}/{ach.maxProgress}</span>
                  <span className="font-bold">{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUnlocked ? 'bg-emerald-500' : 'bg-rose-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1 font-bold text-yellow-600 dark:text-yellow-400">
                  <span className="text-[11px] text-zinc-400 font-normal">
                    {ach.unlockedAt ? `Earned ${ach.unlockedAt}` : 'Reward'}
                  </span>
                  <span>+{ach.rewardCoins} 🪙 / +{ach.rewardXp} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
