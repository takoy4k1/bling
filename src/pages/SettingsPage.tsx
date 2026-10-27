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
    updateProfile,
    toggleTheme, 
    toggleSound, 
    resetAllData, 
    setActivePage 
  } = useApp();

  const [username, setUsername] = React.useState(profile.username);
  const [characterName, setCharacterName] = React.useState(profile.character.name);
  const [characterTitle, setCharacterTitle] = React.useState(profile.character.title);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      username: username.trim() || 'AriaGlow',
      characterName: characterName.trim() || 'Aria',
      title: characterTitle.trim() || 'Glow Novice ✨',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
          <span>Settings & Preferences</span>
          <SettingsIcon className="w-6 h-6 text-zinc-500" />
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
          Customize your display name, friend connections, audio, and visual theme.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Profile & Account Details */}
        <div className="glow-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-rose-500" />
              <span>Your Identity & Display Name</span>
            </h2>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full animate-bounce">
                Saved! ✨
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-zinc-600 dark:text-zinc-300 font-bold mb-1">Account Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. takoy4k1"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-zinc-600 dark:text-zinc-300 font-bold mb-1">Character Name</label>
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="e.g. Maya, Alex, Leo"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-zinc-600 dark:text-zinc-300 font-bold mb-1">Hero Title</label>
                <input
                  type="text"
                  value={characterTitle}
                  onChange={(e) => setCharacterTitle(e.target.value)}
                  placeholder="e.g. Stargazer ✨"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActivePage('wardrobe')}
                className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Open Wardrobe & Styling →
              </button>
              <button
                type="submit"
                className="btn-glow px-5 py-2 text-xs font-bold cursor-pointer"
              >
                Save My Name
              </button>
            </div>
          </form>
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
