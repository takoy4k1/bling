import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { ShopItem, CharacterCustomization } from '../types';
import { 
  ShoppingBag, 
  Sparkles, 
  Coins, 
  Check, 
  Lock, 
  Shirt, 
  Scissors, 
  Crown, 
  Image, 
  Heart,
  Palette,
  Eye,
  Smile
} from 'lucide-react';

export const WardrobeShopPage: React.FC = () => {
  const { 
    profile, 
    shopItems, 
    buyShopItem, 
    equipItem, 
    updateCharacter 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wardrobe' | 'shop'>('wardrobe');
  const [shopCategory, setShopCategory] = useState<'all' | 'outfit' | 'hairStyle' | 'accessory' | 'background' | 'pet'>('all');
  const [wardrobeSection, setWardrobeSection] = useState<'appearance' | 'hair' | 'outfit' | 'accessories' | 'background' | 'companion'>('outfit');

  const skinTones = ['#fed7aa', '#fcd34d', '#fbcfe8', '#d97706', '#92400e', '#451a03'];
  const hairColors = ['#4a2810', '#18181b', '#d97706', '#fb7185', '#a855f7', '#38bdf8', '#fef08a'];
  const eyeColors = ['#3b82f6', '#10b981', '#6366f1', '#ec4899', '#78350f', '#09090b'];
  const eyeStyles = [
    { id: 'sparkle', label: 'Sparkle Anime ✨' },
    { id: 'gentle', label: 'Gentle Smile 🌸' },
    { id: 'starry', label: 'Starry Dreamer 🌟' },
    { id: 'cat-eye', label: 'Playful Cat-Eye 🐱' },
    { id: 'sleepy', label: 'Cozy Sleepy 🌙' },
  ];
  const expressions = [
    { id: 'happy', label: 'Happy Smile 😊' },
    { id: 'proud', label: 'Proud Smirk 😏' },
    { id: 'sparkle', label: 'Radiant Joy 💖' },
    { id: 'determined', label: 'Determined Focus ✊' },
    { id: 'sleepy', label: 'Cozy Nap 😴' },
  ];

  const filteredShopItems = shopCategory === 'all'
    ? shopItems
    : shopItems.filter(i => i.type === shopCategory);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Character Wardrobe & Magic Boutique</span>
            <Sparkles className="w-6 h-6 text-pink-500 animate-spin" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Spend your earned glow coins on aesthetic outfits, cozy companions, and dreamy room backdrops!
          </p>
        </div>

        {/* Coins indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 self-start sm:self-auto font-bold text-sm shadow-xs">
          <Coins className="w-5 h-5 text-yellow-500 fill-yellow-400" />
          <span>{profile.coins} Glow Coins</span>
        </div>
      </div>

      {/* Main Grid: Live Character Stage & Customizer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Live Doll Display */}
        <div className="lg:col-span-5 glow-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 sticky top-24">
          <div className="relative">
            <CharacterAvatar customization={profile.character} size="xl" showBackground={true} />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs shadow-md border-2 border-white">
              Lv.{profile.level} {profile.character.name}
            </div>
          </div>

          <div className="pt-2">
            <h3 className="font-heading text-lg font-bold text-zinc-800 dark:text-zinc-100">
              {profile.character.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Vibe: <span className="font-bold text-rose-500 uppercase">{profile.character.vibe}</span> • Expression: <span className="capitalize">{profile.character.expression}</span>
            </p>
          </div>

          {/* Quick Expression Switcher */}
          <div className="w-full pt-3 border-t border-pink-100 dark:border-zinc-800 space-y-2">
            <p className="text-[11px] font-bold uppercase text-zinc-400">Live Expression</p>
            <div className="grid grid-cols-3 gap-1.5">
              {expressions.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => equipItem('expression', exp.id)}
                  className={`px-2 py-1.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                    profile.character.expression === exp.id
                      ? 'bg-rose-500 text-white shadow-xs font-bold'
                      : 'bg-pink-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-pink-100'
                  }`}
                >
                  {exp.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Wardrobe & Shop Panels */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Top Toggle: Wardrobe vs Shop */}
          <div className="flex bg-pink-100/60 dark:bg-zinc-800/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('wardrobe')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'wardrobe'
                  ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-pink-300 shadow-md scale-[1.01]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              <Shirt className="w-4 h-4" />
              <span>Wardrobe & Styling</span>
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-pink-300 shadow-md scale-[1.01]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Boutique Shop</span>
            </button>
          </div>

          {activeTab === 'wardrobe' ? (
            /* WARDROBE SECTION */
            <div className="glow-card rounded-3xl p-6 space-y-6">
              
              {/* Wardrobe Subcategories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'outfit', label: 'Outfits 👗' },
                  { id: 'hair', label: 'Hair & Colors 💇‍♀️' },
                  { id: 'appearance', label: 'Face & Eyes 👀' },
                  { id: 'accessories', label: 'Accessories 🎀' },
                  { id: 'companion', label: 'Pets 🐰' },
                  { id: 'background', label: 'Room Backdrops 🌸' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setWardrobeSection(sec.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      wardrobeSection === sec.id
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-pink-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-pink-100'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              {/* OUTFITS */}
              {wardrobeSection === 'outfit' && (
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Equipped & Unlocked Outfits
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'ribbon-cardigan', name: 'Pink Ribbon Cardigan', icon: '🎀', preview: '#fda4af' },
                      { id: 'cozy-knit', name: 'Cozy Apricot Sweater', icon: '🧶', preview: '#fed7aa' },
                      { id: 'y2k-tracksuit', name: 'Y2K Tracksuit', icon: '⚡', preview: '#a855f7' },
                      { id: 'celestial-gown', name: 'Celestial Gown', icon: '🌌', preview: '#312e81' },
                      { id: 'school-blazer', name: 'Academia Blazer', icon: '📚', preview: '#1e293b' },
                      { id: 'fairy-dress', name: 'Fairy Sundress', icon: '🧚', preview: '#86efac' },
                    ].map((item) => {
                      const isEquipped = profile.character.outfit === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => equipItem('outfit', item.id)}
                          className={`p-3 rounded-2xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                            isEquipped
                              ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 shadow-xs ring-2 ring-rose-400'
                              : 'border-pink-100 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 hover:border-pink-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xl">{item.icon}</span>
                            <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: item.preview }} />
                          </div>
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">{item.name}</span>
                          <span className={`text-[10px] font-bold ${isEquipped ? 'text-rose-500' : 'text-zinc-400'}`}>
                            {isEquipped ? 'Equipped ✓' : 'Click to Wear'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* HAIR & COLORS */}
              {wardrobeSection === 'hair' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Hairstyle</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'long-waves', label: 'Long Waves' },
                        { id: 'twin-buns', label: 'Twin Space Buns' },
                        { id: 'afro-puffs', label: 'Afro Puffs' },
                        { id: 'wolf-cut', label: 'Wolf Cut' },
                        { id: 'bob', label: 'Cute Bob' },
                        { id: 'ponytail', label: 'High Ponytail' },
                      ].map((h) => (
                        <button
                          key={h.id}
                          onClick={() => equipItem('hairStyle', h.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            profile.character.hairStyle === h.id
                              ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                              : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-pink-100 dark:border-zinc-700 hover:border-pink-300'
                          }`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Hair Dye Color</label>
                    <div className="flex items-center gap-3">
                      {hairColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => equipItem('hairColor', color)}
                          style={{ backgroundColor: color }}
                          className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                            profile.character.hairColor === color ? 'scale-125 border-rose-500 shadow-md' : 'border-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FACE & EYES */}
              {wardrobeSection === 'appearance' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Skin Tone</label>
                    <div className="flex items-center gap-3">
                      {skinTones.map((tone) => (
                        <button
                          key={tone}
                          onClick={() => equipItem('skinTone', tone)}
                          style={{ backgroundColor: tone }}
                          className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                            profile.character.skinTone === tone ? 'scale-125 border-rose-500 shadow-md' : 'border-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Eye Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {eyeStyles.map((e) => (
                        <button
                          key={e.id}
                          onClick={() => equipItem('eyeStyle', e.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            profile.character.eyeStyle === e.id
                              ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                              : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-pink-100 dark:border-zinc-700'
                          }`}
                        >
                          {e.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Eye Color</label>
                    <div className="flex items-center gap-3">
                      {eyeColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => equipItem('eyeColor', color)}
                          style={{ backgroundColor: color }}
                          className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                            profile.character.eyeColor === color ? 'scale-125 border-rose-500 shadow-md' : 'border-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ACCESSORIES */}
              {wardrobeSection === 'accessories' && (
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Accessories & Headwear
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ribbon-bow', label: 'Silk Ribbon Bow 🎀' },
                      { id: 'angel-wings', label: 'Angel Wings 🪽' },
                      { id: 'star-clips', label: 'Star Clips ⭐' },
                      { id: 'wire-glasses', label: 'Wire Glasses 👓' },
                      { id: 'headphones', label: 'Pastel Headphones 🎧' },
                      { id: 'tiara', label: 'Starlight Tiara 👑' },
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => equipItem('accessory', acc.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          profile.character.accessory === acc.id
                            ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-pink-100 dark:border-zinc-700 hover:border-pink-300'
                        }`}
                      >
                        {acc.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PET COMPANION */}
              {wardrobeSection === 'companion' && (
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Active Companions
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'bunny', label: 'Marshmallow (Bunny) 🐰' },
                      { id: 'cat', label: 'Mochi (Cat) 🐱' },
                      { id: 'shiba', label: 'Boba (Shiba) 🐕' },
                      { id: 'dragon-chibi', label: 'Pip (Chibi Dragon) 🐉' },
                      { id: 'ghostie', label: 'Spook (Spirit) 👻' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => equipItem('pet', p.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          profile.character.pet === p.id
                            ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-pink-100 dark:border-zinc-700 hover:border-pink-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ROOM BACKDROP */}
              {wardrobeSection === 'background' && (
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Aesthetic Room Backdrops
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'cherry-cloud', label: 'Cherry Blossom Cloud 🌸' },
                      { id: 'lavender-bedroom', label: 'Lavender Dream Room 🪻' },
                      { id: 'cozy-study', label: 'Warm Oak Study ☕' },
                      { id: 'starlit-garden', label: 'Midnight Garden 🌙' },
                      { id: 'cyber-arcade', label: 'Cyber Arcade 🕹️' },
                      { id: 'lofi-cafe', label: 'Rainy Lo-Fi Cafe 🌧️' },
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => equipItem('background', bg.id)}
                        className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          profile.character.background === bg.id
                            ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-pink-100 dark:border-zinc-700 hover:border-pink-300'
                        }`}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* MAGIC BOUTIQUE SHOP */
            <div className="glow-card rounded-3xl p-6 space-y-6">
              
              {/* Shop category filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Items 🛍️' },
                  { id: 'outfit', label: 'Outfits 👗' },
                  { id: 'hairStyle', label: 'Hairstyles 💇‍♀️' },
                  { id: 'accessory', label: 'Accessories 🎀' },
                  { id: 'background', label: 'Backdrops 🌸' },
                  { id: 'pet', label: 'Pets 🐰' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setShopCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      shopCategory === cat.id
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-pink-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-pink-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Shop items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredShopItems.map((item) => {
                  const isUnlocked = profile.unlockedItemIds.includes(item.id) || item.cost === 0;
                  const canAfford = profile.coins >= item.cost;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-pink-100 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800/90 flex flex-col justify-between gap-3 shadow-xs hover:border-pink-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl p-2 rounded-xl bg-pink-50 dark:bg-zinc-700">{item.icon}</span>
                          <div>
                            <h4 className="font-heading text-xs font-bold text-zinc-900 dark:text-white">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 capitalize">{item.type}</p>
                          </div>
                        </div>

                        <span className="text-xs font-extrabold text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 fill-yellow-400" />
                          {item.cost === 0 ? 'Free' : item.cost}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-pink-50 dark:border-zinc-700">
                        {isUnlocked ? (
                          <button
                            onClick={() => equipItem(item.type, item.id.replace(`${item.type}-`, ''))}
                            className="w-full py-2 rounded-xl bg-pink-100 dark:bg-zinc-700 text-rose-600 dark:text-pink-300 text-xs font-bold hover:bg-pink-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Equip Item</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => buyShopItem(item)}
                            disabled={!canAfford}
                            className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              canAfford
                                ? 'btn-glow'
                                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
                            }`}
                          >
                            <span>{canAfford ? 'Unlock Item' : 'Need More Coins'}</span>
                            <Coins className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
