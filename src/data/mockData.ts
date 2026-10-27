import { Goal, Quest, ShopItem, Friend, Achievement, JournalEntry, UserProfile } from '../types';

export const initialProfile: UserProfile = {
  id: 'usr-1',
  email: 'hero@glowquest.app',
  username: 'Hero',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 50,
  streakDays: 1,
  themeMode: 'dreamy',
  soundEnabled: true,
  unlockedItemIds: ['outfit-cardigan', 'hair-waves', 'acc-ribbon', 'bg-cherry', 'pet-bunny'],
  character: {
    name: 'Hero',
    title: 'Glow Novice ✨',
    vibe: 'coquette',
    skinTone: '#fed7aa',
    hairStyle: 'long-waves',
    hairColor: '#4a2810',
    eyeStyle: 'sparkle',
    eyeColor: '#3b82f6',
    outfit: 'ribbon-cardigan',
    accessory: 'ribbon-bow',
    background: 'cherry-cloud',
    pet: 'bunny',
    expression: 'happy',
  },
};

// Start with empty goals so the user creates their own personal goals
export const initialGoals: Goal[] = [];

// Starter starter daily quests for day 1
export const initialQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Drink a fresh glass of water to hydrate',
    category: 'lifestyle',
    xpReward: 25,
    coinReward: 15,
    completed: false,
    isDaily: true,
    date: new Date().toISOString().split('T')[0],
    frequency: 'daily',
    streak: 0,
    icon: '💧',
  },
  {
    id: 'quest-2',
    title: '5-Minute mindful morning stretch or breathing',
    category: 'appearance',
    xpReward: 30,
    coinReward: 20,
    completed: false,
    isDaily: true,
    date: new Date().toISOString().split('T')[0],
    frequency: 'daily',
    streak: 0,
    icon: '✨',
  },
];

export const initialShopItems: ShopItem[] = [
  // Outfits
  { id: 'outfit-cardigan', name: 'Pink Ribbon Cardigan', type: 'outfit', cost: 0, unlocked: true, previewColor: '#fda4af', icon: '🎀', description: 'Coquette knit with dainty strawberry pink ribbons.' },
  { id: 'outfit-knit', name: 'Cozy Apricot Sweater', type: 'outfit', cost: 120, unlocked: false, previewColor: '#fed7aa', icon: '🧶', description: 'Oversized warm knit for chilly study sessions.' },
  { id: 'outfit-tracksuit', name: 'Y2K Velvet Tracksuit', type: 'outfit', cost: 220, unlocked: false, previewColor: '#c084fc', icon: '⚡', description: 'Retro lilac athletic comfort with nostalgic silver stripes.' },
  { id: 'outfit-celestial', name: 'Celestial Midnight Gown', type: 'outfit', cost: 350, unlocked: false, previewColor: '#312e81', icon: '🌌', description: 'Deep starry navy fabric dusted with golden starlight.' },
  { id: 'outfit-school', name: 'Academia Prep Blazer', type: 'outfit', cost: 180, unlocked: false, previewColor: '#1e293b', icon: '📚', description: 'Smart tailored dark blazer for focused study vibes.' },
  { id: 'outfit-fairy', name: 'Fairy Meadow Sundress', type: 'outfit', cost: 260, unlocked: false, previewColor: '#86efac', icon: '🧚', description: 'Pastel mint green petals woven into a magical dress.' },

  // Hairstyle
  { id: 'hair-waves', name: 'Gentle Long Waves', type: 'hairStyle', cost: 0, unlocked: true, icon: '💇‍♀️', description: 'Soft flowing waves with sweet side bangs.' },
  { id: 'hair-twinbuns', name: 'Sweet Twin Space Buns', type: 'hairStyle', cost: 150, unlocked: false, icon: '🍡', description: 'High playfully tied double buns with mini ribbons.' },
  { id: 'hair-afropuffs', name: 'Crown Afro Puffs', type: 'hairStyle', cost: 160, unlocked: false, icon: '👑', description: 'Full, glorious, radiant natural puffs.' },
  { id: 'hair-wolfcut', name: 'Chic Shaggy Wolf Cut', type: 'hairStyle', cost: 200, unlocked: false, icon: '✨', description: 'Effortlessly cool layered haircut with bouncy volume.' },
  { id: 'hair-bob', name: 'Classic Parisian Bob', type: 'hairStyle', cost: 140, unlocked: false, icon: '👒', description: 'Polished sleek jawline bob.' },
  { id: 'hair-ponytail', name: 'High Cascade Ponytail', type: 'hairStyle', cost: 130, unlocked: false, icon: '🎀', description: 'High ponytail full of lively bounce.' },

  // Accessories
  { id: 'acc-ribbon', name: 'Coquette Red Ribbon Bow', type: 'accessory', cost: 0, unlocked: true, icon: '🎀', description: 'Classic silk hair bow that brings soft charm.' },
  { id: 'acc-angelwings', name: 'Feather Angel Wings', type: 'accessory', cost: 300, unlocked: false, icon: '🪽', description: 'Pure white glowing wings that flutter with pride.' },
  { id: 'acc-starclips', name: 'Golden Star Barrettes', type: 'accessory', cost: 120, unlocked: false, icon: '⭐', description: 'Glittering hair clips that catch the light.' },
  { id: 'acc-glasses', name: 'Retro Wire Frames', type: 'accessory', cost: 110, unlocked: false, icon: '👓', description: 'Dainty gold round glasses for a studious look.' },
  { id: 'acc-headphones', name: 'Pastel Cyber Headphones', type: 'accessory', cost: 240, unlocked: false, icon: '🎧', description: 'Pink wireless cans playing lo-fi beats.' },
  { id: 'acc-tiara', name: 'Princess Starlight Tiara', type: 'accessory', cost: 400, unlocked: false, icon: '👑', description: 'Royal jeweled crown for milestone masteries.' },

  // Backgrounds
  { id: 'bg-cherry', name: 'Cherry Blossom Cloud', type: 'background', cost: 0, unlocked: true, icon: '🌸', description: 'Soft pink cotton candy clouds with gentle petals.' },
  { id: 'bg-lavender', name: 'Lavender Fairy Bedroom', type: 'background', cost: 180, unlocked: false, icon: '🪻', description: 'Cozy pastel aesthetic bedroom bathed in twilight.' },
  { id: 'bg-study', name: 'Warm Oak & Tea Study', type: 'background', cost: 160, unlocked: false, icon: '☕', description: 'Golden hour nook with stacks of books and chamomile tea.' },
  { id: 'bg-starlit', name: 'Midnight Starlit Garden', type: 'background', cost: 250, unlocked: false, icon: '🌙', description: 'Deep indigo garden blooming under shooting stars.' },
  { id: 'bg-arcade', name: 'Y2K Cyber Neon Arcade', type: 'background', cost: 220, unlocked: false, icon: '🕹️', description: 'Vibrant magenta and violet retro game glow.' },
  { id: 'bg-lofi', name: 'Cozy Rainy Lo-Fi Cafe', type: 'background', cost: 200, unlocked: false, icon: '🌧️', description: 'Steaming mugs, raindrop windows, and soft jazz.' },

  // Pets
  { id: 'pet-bunny', name: 'Marshmallow the Bunny', type: 'pet', cost: 0, unlocked: true, icon: '🐰', description: 'A round fluffy companion who loves gentle cuddles.' },
  { id: 'pet-cat', name: 'Mochi the Blue Cat', type: 'pet', cost: 200, unlocked: false, icon: '🐱', description: 'A cute curious kitty who purrs when you finish quests.' },
  { id: 'pet-shiba', name: 'Boba the Shiba Pup', type: 'pet', cost: 250, unlocked: false, icon: '🐕', description: 'Always smiling and cheering on your daily streaks!' },
  { id: 'pet-dragon', name: 'Pip the Chibi Dragon', type: 'pet', cost: 400, unlocked: false, icon: '🐉', description: 'Breaths tiny sparkle puffs when you hit level milestones.' },
  { id: 'pet-ghostie', name: 'Spook the Cozy Spirit', type: 'pet', cost: 180, unlocked: false, icon: '👻', description: 'A sweet gentle ghost that floats faithfully beside you.' },
];

// Clean initial empty friends list so user adds their actual friends
export const initialFriends: Friend[] = [];

export const initialAchievements: Achievement[] = [
  { id: 'ach-1', title: 'First Quest', description: 'Complete your very first daily quest on GLOWQUEST', icon: '🌱', progress: 0, maxProgress: 1, rewardCoins: 50, rewardXp: 100 },
  { id: 'ach-2', title: 'Seven Days of Progress', description: 'Maintain a 7-day consistency streak across your goals', icon: '🔥', progress: 0, maxProgress: 7, rewardCoins: 100, rewardXp: 200 },
  { id: 'ach-3', title: 'Goal Getter', description: 'Create 3 separate glow-up goals with mapped milestones', icon: '🎯', progress: 0, maxProgress: 3, rewardCoins: 80, rewardXp: 150 },
  { id: 'ach-4', title: 'Creative Streak', description: 'Log entries in your glow reflections journal 5 times', icon: '🎨', progress: 0, maxProgress: 5, rewardCoins: 75, rewardXp: 120 },
  { id: 'ach-5', title: 'Study Champion', description: 'Complete 10 focused study or skill practice quests', icon: '📚', progress: 0, maxProgress: 10, rewardCoins: 120, rewardXp: 250 },
  { id: 'ach-6', title: 'Consistency Master', description: 'Achieve a 14-day streak of nourishing healthy habits', icon: '👑', progress: 0, maxProgress: 14, rewardCoins: 250, rewardXp: 500 },
  { id: 'ach-7', title: 'First Goal Completed', description: 'Cross the finish line on 100% of milestones in a major goal', icon: '🏆', progress: 0, maxProgress: 1, rewardCoins: 300, rewardXp: 600 },
  { id: 'ach-8', title: 'Wardrobe Stylist', description: 'Unlock and equip 3 distinct aesthetic items from the shop', icon: '👗', progress: 0, maxProgress: 3, rewardCoins: 60, rewardXp: 100 },
];

// Clean initial empty reflections journal
export const initialJournalEntries: JournalEntry[] = [];
