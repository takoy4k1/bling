export type GlowCategory = 
  | 'appearance'
  | 'mental'
  | 'academics'
  | 'fitness'
  | 'hobbies'
  | 'money'
  | 'lifestyle'
  | 'custom';

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  notes?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GlowCategory;
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  targetDate: string;
  milestones: Milestone[];
  whyReason: string;
  linkedHabitIds: string[];
  isPrivate: boolean;
  notes?: string;
  photoUrl?: string;
  progressPercent: number; // calculated from milestones or completed units
  createdAt: string;
}

export interface Quest {
  id: string;
  title: string;
  category: GlowCategory;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  isDaily: boolean;
  goalId?: string;
  date: string; // YYYY-MM-DD
  frequency?: 'daily' | 'weekdays' | 'weekly';
  streak: number;
  icon?: string;
}

export interface CharacterCustomization {
  name: string;
  title: string; // e.g. "Dreamy Stargazer", "Glow Apprentice"
  vibe: 'coquette' | 'y2k' | 'cottagecore' | 'cyberpunk' | 'clean-girl' | 'fairycore';
  skinTone: string; // hex
  hairStyle: string; // 'bob', 'long-waves', 'twin-buns', 'afro-puffs', 'wolf-cut', 'ponytail'
  hairColor: string; // hex
  eyeStyle: string; // 'sparkle', 'gentle', 'cat-eye', 'starry', 'sleepy'
  eyeColor: string; // hex
  outfit: string; // 'cozy-knit', 'ribbon-cardigan', 'y2k-tracksuit', 'celestial-gown', 'school-blazer', 'fairy-dress'
  accessory: string; // 'none', 'ribbon-bow', 'angel-wings', 'star-clips', 'wire-glasses', 'headphones', 'tiara'
  background: string; // 'cherry-cloud', 'lavender-bedroom', 'cozy-study', 'starlit-garden', 'cyber-arcade', 'lofi-cafe'
  pet: string; // 'none', 'bunny', 'cat', 'shiba', 'dragon-chibi', 'ghostie'
  expression: 'happy' | 'proud' | 'sparkle' | 'determined' | 'sleepy';
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'outfit' | 'hairStyle' | 'accessory' | 'background' | 'pet';
  cost: number;
  unlocked: boolean;
  previewColor?: string;
  icon: string;
  description: string;
  minLevel?: number;
}

export interface Friend {
  id: string;
  name: string;
  handle: string;
  avatar: CharacterCustomization;
  level: number;
  xp: number;
  streak: number;
  sharedGoalTitle?: string;
  sharedGoalProgress?: number;
  recentAchievement?: string;
  online: boolean;
  cheersCount: number;
  lastActive: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  rewardCoins: number;
  rewardXp: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  mood: 'radiant' | 'happy' | 'peaceful' | 'tired' | 'reflective';
  wins: string;
  challenges: string;
  lessons: string;
  gratitude: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streakDays: number;
  character: CharacterCustomization;
  unlockedItemIds: string[];
  themeMode: 'dreamy' | 'dark';
  soundEnabled: boolean;
}
