import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings as SettingsIcon, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  ShieldCheck, 
  RotateCcw, 
  User, 
  Lock,
  Heart,
  Palette
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    profile, 
    toggleTheme, 
    toggleSound, 
    resetAllData, 
    setActivePage 
  } = useApp();

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
          <span>Settings & Preferences</span>
          <SettingsIcon className="w-6 h-6 text-zinc-500" />
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
          Control audio effects, privacy defaults, visual theme, and demo account data.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Profile & Account Details */}
        <div className="glow-card rounded-3xl p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-rose-500" />
            <span>Profile Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/50 border border-pink-100 dark:border-zinc-700">
              <span className="text-zinc-400 font-bold uppercase text-[10px]">Username</span>
              <p className="font-semibold text-zinc-800 dark:text-zinc-100 mt-0.5 text-sm">{profile.username}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/50 border border-pink-100 dark:border-zinc-700">
              <span className="text-zinc-400 font-bold uppercase text-[10px]">Email</span>
              <p className="font-semibold text-zinc-800 dark:text-zinc-100 mt-0.5 text-sm">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('wardrobe')}
            className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
          >
            Edit Character Avatar & Wardrobe →
          </button>
        </div>

        {/* Audio & Visual Options */}
        <div className="glow-card rounded-3xl p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-500" />
            <span>Audio & Aesthetics</span>
          </h2>

          <div className="space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-pink-50/40 dark:bg-zinc-800/40 border border-pink-100 dark:border-zinc-700">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Aesthetic Color Mode
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Switch between Dreamy Pastel Rose and Cozy Midnight Indigo
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="btn-secondary px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {profile.themeMode === 'dreamy' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                <span>{profile.themeMode === 'dreamy' ? 'Enable Dark' : 'Enable Dreamy'}</span>
              </button>
            </div>

            {/* Sound FX Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-pink-50/40 dark:bg-zinc-800/40 border border-pink-100 dark:border-zinc-700">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Chime & Level-Up Sound FX
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Cute Web Audio synthesizers when checking quests and leveling up
                </p>
              </div>

              <button
                onClick={toggleSound}
                className="btn-secondary px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {profile.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-green-500" /> : <VolumeX className="w-3.5 h-3.5 opacity-40" />}
                <span>{profile.soundEnabled ? 'Enabled' : 'Muted'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Social Safeguards */}
        <div className="glow-card rounded-3xl p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Wellbeing & Privacy Safeguards</span>
          </h2>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-200 space-y-2">
            <p className="font-bold">✨ Anti-Burnout Pledge:</p>
            <p className="leading-relaxed">
              GLOWQUEST never imposes harsh streak penalties, shame messages, or weight/appearance rankings. Missing a day activates gentle recovery mechanics, allowing you to resume with your progress intact.
            </p>
          </div>
        </div>

        {/* Danger / Data Reset Zone */}
        <div className="glow-card rounded-3xl p-6 border border-rose-200 dark:border-rose-950/50 space-y-4">
          <h2 className="font-heading text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Storage</span>
          </h2>

          <p className="text-xs text-zinc-600 dark:text-zinc-300">
            Clear locally saved quests, coins, and unlocks to restore GLOWQUEST to its fresh demo state.
          </p>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh default sample data?')) {
                resetAllData();
              }
            }}
            className="px-4 py-2 rounded-xl border border-rose-300 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Demo Data to Default
          </button>
        </div>
      </div>
    </div>
  );
};
