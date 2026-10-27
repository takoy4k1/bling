import React from 'react';
import { useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { GoalsPage } from './pages/GoalsPage';
import { QuestsPage } from './pages/QuestsPage';
import { WardrobeShopPage } from './pages/WardrobeShopPage';
import { FriendsPage } from './pages/FriendsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { JournalPage } from './pages/JournalPage';
import { SettingsPage } from './pages/SettingsPage';

export function AppContent() {
  const { activePage, profile } = useApp();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
        return <Onboarding />;
      case 'dashboard':
        return <Dashboard />;
      case 'goals':
        return <GoalsPage />;
      case 'quests':
        return <QuestsPage />;
      case 'wardrobe':
        return <WardrobeShopPage />;
      case 'friends':
        return <FriendsPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'journal':
        return <JournalPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  const isLandingOrOnboarding = activePage === 'landing' || activePage === 'onboarding';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${profile.themeMode === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-dreamy text-zinc-800'}`}>
      {!isLandingOrOnboarding && <Navigation />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
