import React from 'react';
import { useApp } from '../context/AppContext';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  CheckCircle2, 
  ShoppingBag, 
  Users, 
  Heart, 
  ShieldCheck, 
  Flame, 
  Star 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, profile } = useApp();

  return (
    <div className="min-h-screen space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Brand Hero */}
      <div className="text-center space-y-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-900 text-xs sm:text-sm font-bold text-rose-600 dark:text-pink-300 shadow-xs">
          <Sparkles className="w-4 h-4 animate-spin text-rose-500" />
          <span>The Cozy Gamified Life & Habit Simulator</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Turn Your Real Life Goals Into A{' '}
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Dreamy RPG Quest
          </span> ✨
        </h1>

        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Level up your personal health, study routines, career milestones, and self-care. Customize your personal character avatar, earn coins, and glow up alongside your friends!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActivePage('onboarding')}
            className="btn-glow px-8 py-3.5 text-sm sm:text-base font-extrabold flex items-center gap-2.5 cursor-pointer shadow-lg shadow-pink-400/30"
          >
            <span>Create Your Free Character</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActivePage('dashboard')}
            className="btn-secondary px-6 py-3.5 text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Demo Dashboard</span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </button>
        </div>
      </div>

      {/* Interactive Hero Character Preview Card */}
      <div className="glow-card rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-tr from-pink-50/90 via-purple-50/50 to-amber-50/60 dark:from-zinc-900 dark:via-purple-950/20 dark:to-zinc-900 border-2 border-pink-200/80">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative group cursor-pointer" onClick={() => setActivePage('wardrobe')}>
              <CharacterAvatar customization={profile.character} size="xl" showBackground={true} />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs shadow-md border-2 border-white">
                Lv.{profile.level} {profile.character.name}
              </div>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-5 font-semibold">
              Live Custom SVG Avatar • Cute Reactions
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
              Your Daily Journey
            </span>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Watch yourself transform day by day
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Every small glass of water, study pomodoro, or meditation session gives your character XP and shiny coins. Unlock cozy clothes, room backdrops, and companions without toxic hustle culture.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700">
                <span className="text-sm font-extrabold text-orange-500 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-orange-500" /> 8-Day Streak
                </span>
                <p className="text-[11px] text-zinc-500 mt-0.5">Forgiving streak protection</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700">
                <span className="text-sm font-extrabold text-yellow-500 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400" /> 450 Glow Coins
                </span>
                <p className="text-[11px] text-zinc-500 mt-0.5">Shop unlocked cosmetics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
        <div className="glow-card rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-rose-500 text-xl font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-base font-bold text-zinc-900 dark:text-white">
            1. Milestone Mapping
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Break big fuzzy ambitions (like launching a portfolio or glowing skin) into concrete daily steps and countdown deadlines.
          </p>
        </div>

        <div className="glow-card rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 text-xl font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-base font-bold text-zinc-900 dark:text-white">
            2. Wardrobe Boutique
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Spend earned quest coins on cottagecore ribbons, Y2K velvet tracksuits, anime hair dyes, and floating pets.
          </p>
        </div>

        <div className="glow-card rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 text-xl font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-base font-bold text-zinc-900 dark:text-white">
            3. Social Garden
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Celebrate friends' milestones, send sparkling encouragement, and tackle shared group quests in a shame-free space.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center pt-8 border-t border-pink-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-400">
          GLOWQUEST ✨ Built with love for real-life dreamers • Zero shame, 100% gentle growth
        </p>
      </div>
    </div>
  );
};
