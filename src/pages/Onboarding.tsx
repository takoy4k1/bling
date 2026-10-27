import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterCustomization, GlowCategory } from '../types';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { Sparkles, ArrowRight, Heart, Wand2 } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { profile, updateCharacter, addGoal, setActivePage } = useApp();
  const [step, setStep] = useState<number>(1);

  // Temporary local customization state
  const [character, setCharacter] = useState<CharacterCustomization>(profile.character);
  const [starterGoalTitle, setStarterGoalTitle] = useState('Create my radiant morning & self-care glow routine');
  const [starterCategory, setStarterCategory] = useState<GlowCategory>('appearance');
  const [starterWhy, setStarterWhy] = useState('To step into my confident self and start each day with calm, glowing energy');

  const skinTones = ['#fed7aa', '#fcd34d', '#fbcfe8', '#d97706', '#92400e', '#451a03'];
  const hairStyles = [
    { id: 'long-waves', label: 'Long Waves 🌊' },
    { id: 'twin-buns', label: 'Space Buns 🍡' },
    { id: 'afro-puffs', label: 'Afro Puffs 👑' },
    { id: 'wolf-cut', label: 'Wolf Cut ✨' },
    { id: 'bob', label: 'Cute Bob 🌸' },
    { id: 'ponytail', label: 'High Pony 🎀' },
  ];
  const hairColors = ['#4a2810', '#18181b', '#d97706', '#fb7185', '#a855f7', '#38bdf8', '#fef08a'];
  const outfits = [
    { id: 'ribbon-cardigan', label: 'Coquette Cardigan' },
    { id: 'cozy-knit', label: 'Cozy Knit' },
    { id: 'y2k-tracksuit', label: 'Y2K Tracksuit' },
    { id: 'celestial-gown', label: 'Celestial Gown' },
    { id: 'school-blazer', label: 'Academia Prep' },
    { id: 'fairy-dress', label: 'Fairy Meadow' },
  ];
  const pets = [
    { id: 'bunny', label: 'Marshmallow (Bunny) 🐰' },
    { id: 'cat', label: 'Mochi (Cat) 🐱' },
    { id: 'shiba', label: 'Boba (Shiba) 🐕' },
    { id: 'dragon-chibi', label: 'Pip (Dragon) 🐉' },
    { id: 'ghostie', label: 'Spook (Spirit) 👻' },
  ];

  const handleNextStep = () => {
    if (step === 1) {
      updateCharacter(character);
      setStep(2);
    } else if (step === 2) {
      // Add initial customized goal
      addGoal({
        title: starterGoalTitle,
        description: 'First milestone of my GLOWQUEST personal transformation journey.',
        category: starterCategory,
        priority: 'high',
        startDate: new Date().toISOString().split('T')[0],
        targetDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        whyReason: starterWhy,
        linkedHabitIds: [],
        isPrivate: false,
        milestones: [
          { id: `m-${Date.now()}-1`, title: 'Define simple 3-step ritual', completed: true },
          { id: `m-${Date.now()}-2`, title: 'Maintain 7-day consistency habit', completed: false },
          { id: `m-${Date.now()}-3`, title: 'Celebrate first monthly glow-up win', completed: false },
        ],
      });
      setActivePage('dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full glow-card rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-300/30 dark:bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-300/30 dark:bg-pink-900/30 rounded-full blur-3xl pointer-events-none" />

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-pink-400/40">
              {step}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
              {step === 1 ? 'Step 1: Create Your Character' : 'Step 2: Cast Your First Quest'}
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className={`h-2 w-12 rounded-full transition-all ${step >= 1 ? 'bg-rose-500' : 'bg-pink-200'}`} />
            <div className={`h-2 w-12 rounded-full transition-all ${step >= 2 ? 'bg-rose-500' : 'bg-pink-200'}`} />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Welcome to <span className="text-rose-500">GLOWQUEST</span> ✨
              </h1>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 mt-2">
                Design your personal avatar. As you achieve goals in real life, your character levels up and unlocks dreamy outfits!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Character Preview */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-pink-50/50 dark:bg-zinc-900/50 rounded-3xl border border-pink-100 dark:border-zinc-800">
                <CharacterAvatar customization={character} size="xl" showBackground={true} />
                <div className="mt-4 text-center">
                  <h3 className="font-heading text-lg font-bold text-zinc-800 dark:text-zinc-100">
                    {character.name || 'Your Hero'}
                  </h3>
                  <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-pink-300 font-medium">
                    {character.vibe.toUpperCase()} VIBE
                  </span>
                </div>
              </div>

              {/* Customization controls */}
              <div className="md:col-span-7 space-y-4 max-h-[460px] overflow-y-auto pr-2">
                {/* Character Name & Vibe */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Character Name</label>
                    <input
                      type="text"
                      value={character.name}
                      onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="e.g. Aria, Chloe, Leo"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Aesthetic Vibe</label>
                    <select
                      value={character.vibe}
                      onChange={(e) => setCharacter({ ...character, vibe: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="coquette">🎀 Coquette</option>
                      <option value="y2k">⚡ Y2K Retro</option>
                      <option value="cottagecore">🌿 Cottagecore</option>
                      <option value="clean-girl">✨ Clean Girl</option>
                      <option value="fairycore">🧚 Fairycore</option>
                    </select>
                  </div>
                </div>

                {/* Skin tone */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Skin Tone</label>
                  <div className="flex gap-2">
                    {skinTones.map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => setCharacter({ ...character, skinTone: tone })}
                        style={{ backgroundColor: tone }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          character.skinTone === tone ? 'scale-125 border-rose-500 shadow-md' : 'border-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Hairstyle */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Hairstyle</label>
                  <div className="grid grid-cols-2 gap-2">
                    {hairStyles.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setCharacter({ ...character, hairStyle: h.id })}
                        className={`text-xs py-2 px-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                          character.hairStyle === h.id
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-600 dark:text-rose-300 font-bold'
                            : 'border-pink-100 dark:border-zinc-800 hover:border-pink-300 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Color */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Hair Color</label>
                  <div className="flex gap-2">
                    {hairColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setCharacter({ ...character, hairColor: color })}
                        style={{ backgroundColor: color }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          character.hairColor === color ? 'scale-125 border-rose-500 shadow-md' : 'border-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Outfit */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Starter Outfit</label>
                  <div className="grid grid-cols-2 gap-2">
                    {outfits.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setCharacter({ ...character, outfit: o.id })}
                        className={`text-xs py-2 px-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                          character.outfit === o.id
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-600 dark:text-rose-300 font-bold'
                            : 'border-pink-100 dark:border-zinc-800 hover:border-pink-300 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Companion Pet */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Starter Pet Companion</label>
                  <div className="grid grid-cols-2 gap-2">
                    {pets.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setCharacter({ ...character, pet: p.id })}
                        className={`text-xs py-2 px-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                          character.pet === p.id
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-600 dark:text-rose-300 font-bold'
                            : 'border-pink-100 dark:border-zinc-800 hover:border-pink-300 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-glow px-6 py-3 text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Your Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-extrabold text-zinc-900 dark:text-white">
                What is your first <span className="text-rose-500">Glow Goal?</span>
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                Every big dream starts as an adventurous quest. Choose a focus area that excites you!
              </p>
            </div>

            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Glow Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'appearance', label: '✨ Self-Care' },
                    { id: 'mental', label: '🧠 Wellness' },
                    { id: 'academics', label: '📚 Career & Study' },
                    { id: 'fitness', label: '💪 Habits & Movement' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setStarterCategory(cat.id as GlowCategory)}
                      className={`py-2 px-3 text-xs rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        starterCategory === cat.id
                          ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                          : 'border-pink-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-rose-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Goal Title</label>
                <input
                  type="text"
                  value={starterGoalTitle}
                  onChange={(e) => setStarterGoalTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Why is this important to your future self?
                </label>
                <textarea
                  rows={3}
                  value={starterWhy}
                  onChange={(e) => setStarterWhy(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong>GLOWQUEST Coach Note:</strong> We have broken this into 3 mini-milestones for you. You can customize deadlines and daily habits once you enter your dashboard!
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center max-w-xl mx-auto">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary px-5 py-2.5 text-xs cursor-pointer"
              >
                Back to Character
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Enter GLOWQUEST</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
