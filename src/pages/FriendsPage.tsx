import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { 
  Users, 
  Sparkles, 
  Flame, 
  HeartHandshake, 
  UserPlus, 
  Target, 
  ShieldCheck, 
  Trophy, 
  Share2,
  Check,
  Award
} from 'lucide-react';

export const FriendsPage: React.FC = () => {
  const { friends, cheerFriend, addFriend, deleteFriend } = useApp();

  const [newHandle, setNewHandle] = useState('');
  const [newName, setNewName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) return;

    addFriend(newHandle, newName);
    setNewHandle('');
    setNewName('');
    setShowAddModal(false);
  };

  const copyInviteLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '/join?ref=aria');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Social Garden & Friends</span>
            <Users className="w-6 h-6 text-rose-500" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Grow alongside your inner circle. Send daily sparkles, celebrate shared milestones, and protect private habits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={copyInviteLink}
            className="btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Invite Link'}</span>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-glow px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Friend</span>
          </button>
        </div>
      </div>

      {/* Friendly Group Challenge Banner */}
      <div className="glow-card rounded-3xl p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-rose-50 dark:from-zinc-900 dark:via-purple-950/30 dark:to-zinc-900 border border-pink-200 dark:border-pink-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
              Weekly Group Quest ✨
            </span>
            <h2 className="font-heading text-xl font-extrabold text-zinc-900 dark:text-white">
              The 100-Hour Glow-Up Study & Routine Sprint
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Cooperative group challenge: Complete any study, hydration, or creative quests to contribute to the garden pool!
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-xs font-bold text-rose-500">76 / 100 Quests Done</span>
            <div className="w-44 h-2.5 bg-pink-200 dark:bg-zinc-700 rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" style={{ width: '76%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Friend Modal */}
      {showAddModal && (
        <div className="glow-card rounded-3xl p-6 border-2 border-rose-300 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-rose-500" />
              <span>Connect with a Friend</span>
            </h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleAddFriendSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Friend's Display Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Maya"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Username or Handle
                </label>
                <input
                  type="text"
                  required
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  placeholder="e.g. @mayabloom"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn-secondary px-4 py-2 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-glow px-5 py-2 text-xs font-bold cursor-pointer"
              >
                Send Friend Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Friends Cards Grid or Empty State */}
      {friends.length === 0 ? (
        <div className="glow-card rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-950/80 text-rose-500 mx-auto flex items-center justify-center text-3xl shadow-sm">
            🌸
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100">
              Your Social Garden is Ready to Bloom
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Add your friends or besties to cheer each other on, celebrate milestones together, and tackle the group challenge!
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-glow px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Your First Friend</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="glow-card rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-transform"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <CharacterAvatar customization={friend.avatar} size="md" showBackground={true} />
                      {friend.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" title="Online now" />
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-pink-100 dark:bg-zinc-700 text-rose-600 dark:text-pink-300">
                        Lv.{friend.level} {friend.avatar.title.split(' ')[0]}
                      </span>
                      <h3 className="font-heading text-base font-bold text-zinc-800 dark:text-zinc-100 mt-1">
                        {friend.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium">{friend.handle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteFriend(friend.id)}
                    className="p-1.5 text-zinc-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Remove Friend"
                  >
                    ✕
                  </button>
                </div>

                {/* Shared goal activity */}
                {friend.sharedGoalTitle && (
                  <div className="p-3 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/50 border border-pink-100 dark:border-zinc-700/60 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-zinc-700 dark:text-zinc-200 truncate max-w-[170px]">
                        {friend.sharedGoalTitle}
                      </span>
                      <span className="text-rose-500 font-bold">{friend.sharedGoalProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-pink-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                        style={{ width: `${friend.sharedGoalProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Recent badge */}
                {friend.recentAchievement && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Trophy className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    <span className="line-clamp-1">Earned: {friend.recentAchievement}</span>
                  </div>
                )}
              </div>

              {/* Cheer interaction button */}
              <div className="pt-3 border-t border-pink-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">Active {friend.lastActive}</span>
                <button
                  onClick={() => cheerFriend(friend.id)}
                  className="btn-glow px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Sparkle Cheer</span>
                  <span>✨ {friend.cheersCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Friendly Privacy Callout */}
      <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <p>
          <strong>Peaceful Privacy Guarantee:</strong> Competition on GLOWQUEST is 100% friendly and optional. Private goals never appear on your friends' garden feeds.
        </p>
      </div>
    </div>
  );
};
