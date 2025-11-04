'use client';

import { useState, useEffect, useRef } from 'react';
import ChatInterface from '@/components/ChatInterface';
import PersonalitySelector from '@/components/PersonalitySelector';
import StatsPanel from '@/components/StatsPanel';
import PremiumModal from '@/components/PremiumModal';

export default function Home() {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [showPremium, setShowPremium] = useState(false);
  const [userStats, setUserStats] = useState({
    coins: 100,
    xp: 0,
    level: 1,
    streak: 0,
    isPremium: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('soulmate_stats');
    if (saved) {
      setUserStats(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soulmate_stats', JSON.stringify(userStats));
  }, [userStats]);

  const addCoins = (amount: number) => {
    setUserStats(prev => {
      const newCoins = prev.coins + amount;
      const newXp = prev.xp + amount * 2;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return { ...prev, coins: newCoins, xp: newXp, level: newLevel };
    });
  };

  const spendCoins = (amount: number) => {
    if (userStats.coins >= amount) {
      setUserStats(prev => ({ ...prev, coins: prev.coins - amount }));
      return true;
    }
    return false;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">💫</span>
            </div>
            <h1 className="text-3xl font-bold text-white">SoulMate AI</h1>
          </div>
          <button
            onClick={() => setShowPremium(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            ⭐ Premium
          </button>
        </header>

        <StatsPanel stats={userStats} />

        {!selectedPersonality ? (
          <PersonalitySelector onSelect={setSelectedPersonality} />
        ) : (
          <ChatInterface
            personality={selectedPersonality}
            onBack={() => setSelectedPersonality(null)}
            userStats={userStats}
            addCoins={addCoins}
            spendCoins={spendCoins}
            isPremium={userStats.isPremium}
          />
        )}

        {showPremium && (
          <PremiumModal
            onClose={() => setShowPremium(false)}
            onUpgrade={() => {
              setUserStats(prev => ({ ...prev, isPremium: true }));
              setShowPremium(false);
            }}
            currentCoins={userStats.coins}
          />
        )}
      </div>
    </main>
  );
}
