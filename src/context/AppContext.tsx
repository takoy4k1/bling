import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Goal, Quest, ShopItem, Friend, Achievement, JournalEntry, CharacterCustomization } from '../types';
import { initialProfile, initialGoals, initialQuests, initialShopItems, initialFriends, initialAchievements, initialJournalEntries } from '../data/mockData';
import { sound, triggerConfetti, triggerStarBurst } from '../utils/audioAndFx';

interface AppContextType {
  profile: UserProfile;
  goals: Goal[];
  quests: Quest[];
  shopItems: ShopItem[];
  friends: Friend[];
  achievements: Achievement[];
  journalEntries: JournalEntry[];
  activePage: string;
  setActivePage: (page: string) => void;
  selectedGoalId: string | null;
  setSelectedGoalId: (id: string | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  // Actions
  toggleQuestCompletion: (questId: string) => void;
  addQuest: (quest: Omit<Quest, 'id' | 'completed' | 'streak'>) => void;
  deleteQuest: (questId: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'progressPercent' | 'createdAt'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  buyShopItem: (item: ShopItem) => boolean;
  equipItem: (type: keyof CharacterCustomization, value: string) => void;
  updateCharacter: (customization: Partial<CharacterCustomization>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  cheerFriend: (friendId: string) => void;
  addFriend: (handle: string, name: string, customAvatar?: Partial<CharacterCustomization>, sharedGoal?: string) => boolean;
  deleteFriend: (friendId: string) => void;
  updateProfile: (updates: { username?: string; email?: string; characterName?: string; title?: string }) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'glowquest_clean_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_goals`);
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_quests`);
    return saved ? JSON.parse(saved) : initialQuests;
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_shop`);
    return saved ? JSON.parse(saved) : initialShopItems;
  });

  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_friends`);
    return saved ? JSON.parse(saved) : initialFriends;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_achievements`);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_journal`);
    return saved ? JSON.parse(saved) : initialJournalEntries;
  });

  const [activePage, setActivePage] = useState<string>('dashboard');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_goals`, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_quests`, JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_shop`, JSON.stringify(shopItems));
  }, [shopItems]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_friends`, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_achievements`, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_journal`, JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Handle XP addition & level ups
  const awardXpAndCoins = (xpAmount: number, coinAmount: number) => {
    setProfile(prev => {
      let newXp = prev.xp + xpAmount;
      let newLevel = prev.level;
      let newXpTarget = prev.xpToNextLevel;

      if (newXp >= newXpTarget) {
        newLevel += 1;
        newXp = newXp - newXpTarget;
        newXpTarget = Math.round(newXpTarget * 1.35);

        if (prev.soundEnabled) sound.playLevelUp();
        triggerStarBurst();
      } else {
        if (prev.soundEnabled) sound.playChime();
        triggerConfetti(35);
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpTarget,
        coins: prev.coins + coinAmount,
      };
    });
  };

  const toggleQuestCompletion = (questId: string) => {
    setQuests(prev =>
      prev.map(q => {
        if (q.id === questId) {
          const willComplete = !q.completed;
          if (willComplete) {
            awardXpAndCoins(q.xpReward, q.coinReward);
          } else {
            // Deduct reward if toggled off
            setProfile(p => ({
              ...p,
              xp: Math.max(0, p.xp - q.xpReward),
              coins: Math.max(0, p.coins - q.coinReward),
            }));
            if (profile.soundEnabled) sound.playPop();
          }
          return {
            ...q,
            completed: willComplete,
            streak: willComplete ? q.streak + 1 : Math.max(0, q.streak - 1),
          };
        }
        return q;
      })
    );
  };

  const addQuest = (newQuestData: Omit<Quest, 'id' | 'completed' | 'streak'>) => {
    const quest: Quest = {
      ...newQuestData,
      id: `quest-${Date.now()}`,
      completed: false,
      streak: 0,
    };
    setQuests(prev => [quest, ...prev]);
    if (profile.soundEnabled) sound.playPop();
  };

  const deleteQuest = (questId: string) => {
    setQuests(prev => prev.filter(q => q.id !== questId));
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'progressPercent' | 'createdAt'>) => {
    const totalMilestones = goalData.milestones.length;
    const completedMilestones = goalData.milestones.filter(m => m.completed).length;
    const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      progressPercent,
      createdAt: new Date().toISOString(),
    };

    setGoals(prev => [newGoal, ...prev]);
    awardXpAndCoins(50, 30);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(g => (g.id === updatedGoal.id ? updatedGoal : g)));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
    if (selectedGoalId === goalId) {
      setSelectedGoalId(null);
    }
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev =>
      prev.map(goal => {
        if (goal.id !== goalId) return goal;

        const updatedMilestones = goal.milestones.map(m => {
          if (m.id === milestoneId) {
            const nextCompleted = !m.completed;
            if (nextCompleted) {
              awardXpAndCoins(40, 25);
            }
            return { ...m, completed: nextCompleted };
          }
          return m;
        });

        const total = updatedMilestones.length;
        const done = updatedMilestones.filter(m => m.completed).length;
        const progressPercent = total > 0 ? Math.round((done / total) * 100) : 0;

        return {
          ...goal,
          milestones: updatedMilestones,
          progressPercent,
        };
      })
    );
  };

  const buyShopItem = (item: ShopItem): boolean => {
    if (profile.coins < item.cost) {
      return false;
    }

    setProfile(prev => ({
      ...prev,
      coins: prev.coins - item.cost,
      unlockedItemIds: [...prev.unlockedItemIds, item.id],
    }));

    setShopItems(prev =>
      prev.map(i => (i.id === item.id ? { ...i, unlocked: true } : i))
    );

    // Equip right away
    equipItem(item.type, item.id.replace(`${item.type}-`, ''));
    if (profile.soundEnabled) sound.playChime();
    triggerConfetti(40);
    return true;
  };

  const equipItem = (type: keyof CharacterCustomization, value: string) => {
    setProfile(prev => ({
      ...prev,
      character: {
        ...prev.character,
        [type]: value,
      },
    }));
    if (profile.soundEnabled) sound.playPop();
  };

  const updateCharacter = (customization: Partial<CharacterCustomization>) => {
    setProfile(prev => ({
      ...prev,
      character: {
        ...prev.character,
        ...customization,
      },
    }));
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    awardXpAndCoins(35, 20);
  };

  const cheerFriend = (friendId: string) => {
    setFriends(prev =>
      prev.map(f => {
        if (f.id === friendId) {
          return { ...f, cheersCount: f.cheersCount + 1 };
        }
        return f;
      })
    );
    if (profile.soundEnabled) sound.playChime();
    triggerConfetti(30);
  };

  const addFriend = (
    handle: string, 
    name: string, 
    customAvatar?: Partial<CharacterCustomization>,
    sharedGoal?: string
  ): boolean => {
    const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const newFriend: Friend = {
      id: `f-${Date.now()}`,
      name: name.trim() || 'My Bestie',
      handle: formattedHandle,
      level: 1,
      xp: 0,
      streak: 1,
      sharedGoalTitle: sharedGoal || 'Growing together on GLOWQUEST ✨',
      sharedGoalProgress: 0,
      recentAchievement: 'Joined the Garden 🌱',
      online: true,
      cheersCount: 0,
      lastActive: 'Just now',
      avatar: {
        name: name.trim() || 'Bestie',
        title: 'Glow Friend ✨',
        vibe: customAvatar?.vibe || 'coquette',
        skinTone: customAvatar?.skinTone || '#fed7aa',
        hairStyle: customAvatar?.hairStyle || 'bob',
        hairColor: customAvatar?.hairColor || '#4a2810',
        eyeStyle: customAvatar?.eyeStyle || 'sparkle',
        eyeColor: customAvatar?.eyeColor || '#3b82f6',
        outfit: customAvatar?.outfit || 'ribbon-cardigan',
        accessory: customAvatar?.accessory || 'ribbon-bow',
        background: customAvatar?.background || 'cherry-cloud',
        pet: customAvatar?.pet || 'bunny',
        expression: customAvatar?.expression || 'happy',
      },
    };
    setFriends(prev => [newFriend, ...prev]);
    awardXpAndCoins(20, 15);
    return true;
  };

  const deleteFriend = (friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  const updateProfile = (updates: { username?: string; email?: string; characterName?: string; title?: string }) => {
    setProfile(prev => ({
      ...prev,
      username: updates.username !== undefined ? updates.username : prev.username,
      email: updates.email !== undefined ? updates.email : prev.email,
      character: {
        ...prev.character,
        name: updates.characterName !== undefined ? updates.characterName : prev.character.name,
        title: updates.title !== undefined ? updates.title : prev.character.title,
      },
    }));
    if (profile.soundEnabled) sound.playPop();
  };

  const toggleTheme = () => {
    setProfile(prev => ({
      ...prev,
      themeMode: prev.themeMode === 'dreamy' ? 'dark' : 'dreamy',
    }));
  };

  const toggleSound = () => {
    setProfile(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const resetAllData = () => {
    localStorage.clear();
    setProfile(initialProfile);
    setGoals(initialGoals);
    setQuests(initialQuests);
    setShopItems(initialShopItems);
    setFriends(initialFriends);
    setAchievements(initialAchievements);
    setJournalEntries(initialJournalEntries);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        goals,
        quests,
        shopItems,
        friends,
        achievements,
        journalEntries,
        activePage,
        setActivePage,
        selectedGoalId,
        setSelectedGoalId,
        isAuthenticated,
        setIsAuthenticated,
        toggleQuestCompletion,
        addQuest,
        deleteQuest,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleMilestone,
        buyShopItem,
        equipItem,
        updateCharacter,
        addJournalEntry,
        cheerFriend,
        addFriend,
        deleteFriend,
        updateProfile,
        toggleTheme,
        toggleSound,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
