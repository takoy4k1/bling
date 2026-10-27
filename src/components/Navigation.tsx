import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  ShoppingBag, 
  Users, 
  BookHeart, 
  Trophy, 
  Settings, 
  Flame, 
  Coins, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  UserCircle 
} from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';

export const Navigation: React.FC = () => {
  const { profile, activePage, setActivePage, toggleTheme, toggleSound } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles, badge: null },
    { id: 'goals', label: 'Glow Goals', icon: Target, badge: null },
    { id: 'quests', label: 'Daily Quests', icon: CheckCircle2, badge: 'Today' },
    { id: 'wardrobe', label: 'Wardrobe & Shop', icon: ShoppingBag, badge: null },
    { id: 'friends', label: 'Social Garden', icon: Users, badge: null },
    { id: 'achievements', label: 'Trophies', icon: Trophy, badge: null },
    { id: 'journal', label: 'Reflections', icon: BookHeart, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-zinc-950/80 border-b border-pink-100 dark:border-pink-950/40 px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Character Badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActivePage('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-400 flex items-center justify-center text-white shadow-md shadow-pink-300/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
                GLOWQUEST
              </span>
              <p className="text-[11px] font-medium text-pink-400 dark:text-pink-300">Level Up Your Real Life</p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-pink-50/70 dark:bg-zinc-900/70 p-1.5 rounded-full border border-pink-100 dark:border-zinc-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-rose-600 dark:text-pink-400 shadow-sm shadow-pink-200/50 scale-[1.02]'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-rose-500 hover:bg-white/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-500' : ''}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Stats: Streak, Coins, XP & Quick Settings */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Streak pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
            <span>{profile.streakDays}d</span>
          </div>

          {/* Coins pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800/60 text-yellow-800 dark:text-yellow-300 text-xs font-bold shadow-xs">
            <Coins className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span>{profile.coins}</span>
          </div>

          {/* Level pill */}
          <button 
            onClick={() => setActivePage('wardrobe')}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-rose-50 dark:bg-zinc-800 border border-pink-200 dark:border-pink-900/50 text-xs hover:border-pink-300 transition-all cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-pink-300">
              <CharacterAvatar customization={profile.character} size="sm" showBackground={false} animate={false} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-pink-500">Lv.{profile.level}</span>
            </div>
          </button>

          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2 rounded-full text-zinc-500 hover:text-rose-500 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {profile.themeMode === 'dreamy' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-pink-200/60 dark:border-zinc-800 px-3 py-2 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Home', icon: Sparkles },
          { id: 'goals', label: 'Goals', icon: Target },
          { id: 'quests', label: 'Quests', icon: CheckCircle2 },
          { id: 'wardrobe', label: 'Style', icon: ShoppingBag },
          { id: 'friends', label: 'Friends', icon: Users },
          { id: 'journal', label: 'Journal', icon: BookHeart },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-rose-500 font-bold' : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-rose-500' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
